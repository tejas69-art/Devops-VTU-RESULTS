const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const DATA_FILE_PATH = path.join(__dirname, '../lib/vtu-data.ts');
const VTU_RESULTS_URL = 'https://results.vtu.ac.in';

async function fetchActivePortals() {
    try {
        console.log('Fetching VTU Results index...');
        const res = await fetch(VTU_RESULTS_URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        
        const html = await res.text();
        const $ = cheerio.load(html);
        const discoveredLinks = [];

        // Scrape all links matching result formats (usually index.php files)
        $('a').each((_, elem) => {
            const href = $(elem).attr('href') || '';
            const text = $(elem).text().trim();
            
            // Check if the link goes to a results page
            if (href.includes('index') || href.endsWith('/index.php')) {
                const absoluteUrl = href.startsWith('http') ? href : `${VTU_RESULTS_URL}/${href}`;
                discoveredLinks.push({
                    text: text,
                    url: absoluteUrl
                });
            }
        });

        return discoveredLinks;
    } catch (err) {
        console.error('Failed to fetch VTU results server:', err);
        return [];
    }
}

function parseUrlMetadata(url, linkText) {
    const urlLower = url.toLowerCase();
    const isRegular = !urlLower.includes('rv');
    const isCbcs = urlLower.includes('cbcs');
    
    let scheme = 'Main';
    if (isCbcs) scheme = 'CBCS';
    else if (urlLower.includes('noncbcs')) scheme = 'Non-CBCS';

    let year = new Date().getFullYear().toString();
    const yearMatch = url.match(/\d{2}/g);
    if (yearMatch && yearMatch.length > 0) {
        const lastTwoDigits = yearMatch[yearMatch.length - 1];
        year = `20${lastTwoDigits}`;
    }

    let session = 'June/July';
    if (urlLower.includes('dj') || urlLower.includes('nd') || urlLower.includes('d25') || urlLower.includes('jan')) {
        session = 'Dec/Jan';
    } else if (urlLower.includes('spl')) {
        session = 'Special';
    }

    return {
        id: urlLower.split('/').filter(Boolean).pop()?.replace('.php', '') || `exam-${Date.now()}`,
        title: linkText || 'VTU Examination Result Portal',
        year: year,
        session: session,
        program: 'B.E/B.Tech',
        links: [{
            type: isRegular ? 'Regular' : 'Revaluation',
            scheme: scheme,
            url: url
        }]
    };
}

async function run() {
    // 1. Read existing data
    if (!fs.existsSync(DATA_FILE_PATH)) {
        console.error(`Data file not found at: ${DATA_FILE_PATH}`);
        return;
    }
    
    let currentFileContent = fs.readFileSync(DATA_FILE_PATH, 'utf8');
    
    // Extract array content using greedy match since VTU_RESULTS_DATA is the last item
    const dataMatch = currentFileContent.match(/export const VTU_RESULTS_DATA: ExamEvent\[] = (\[[\s\S]*\]);/);
    if (!dataMatch) {
        console.error('Could not find VTU_RESULTS_DATA declaration inside lib/vtu-data.ts');
        return;
    }

    let resultsData = [];
    try {
        // Evaluate the string to get the JS array
        const jsEvalStr = dataMatch[1]
            .replace(/^\s*\/\/.*$/gm, '');
        resultsData = eval(`(${jsEvalStr})`);
    } catch (e) {
        console.error('Error parsing existing results data array:', e);
        return;
    }

    // Get list of already recorded URLs
    const registeredUrls = new Set();
    resultsData.forEach(event => {
        event.links.forEach(l => registeredUrls.add(l.url.toLowerCase()));
    });

    // 2. Fetch live portals
    const livePortals = await fetchActivePortals();
    let updatedCount = 0;

    for (const portal of livePortals) {
        const checkUrl = portal.url.toLowerCase();
        
        if (!registeredUrls.has(checkUrl)) {
            const newEvent = parseUrlMetadata(portal.url, portal.text);
            if (newEvent.id === 'index') {
                continue;
            }
            console.log(`New result link discovered! -> ${portal.url}`);
            
            // Check if we already created an event for this ID, if so, merge links
            const existingEvent = resultsData.find(e => e.id === newEvent.id);
            if (existingEvent) {
                const linkExists = existingEvent.links.some(l => l.url.toLowerCase() === newEvent.links[0].url.toLowerCase());
                if (!linkExists) {
                    existingEvent.links.push(newEvent.links[0]);
                    updatedCount++;
                }
            } else {
                resultsData.unshift(newEvent); // Add to the top of the array
                updatedCount++;
            }
        }
    }

    // 3. Write back changes if any
    if (updatedCount > 0) {
        console.log(`Writing ${updatedCount} updates to lib/vtu-data.ts...`);
        const formattedArray = JSON.stringify(resultsData, null, 4);
        
        const newFileContent = currentFileContent.replace(
            /export const VTU_RESULTS_DATA: ExamEvent\[] = \[[\s\S]*\];/g,
            `export const VTU_RESULTS_DATA: ExamEvent[] = ${formattedArray};`
        );
        
        fs.writeFileSync(DATA_FILE_PATH, newFileContent, 'utf8');
        console.log('Update complete!');
    } else {
        console.log('No new result announcements found.');
    }
}

run();
