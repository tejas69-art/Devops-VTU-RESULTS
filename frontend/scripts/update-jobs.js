const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const DATA_FILE_PATH = path.join(__dirname, '../lib/jobs-data.ts');
const RSS_FEED_URL = 'https://onlinestudy4u.in/category/job-updates/feed/';

async function fetchRssFeed() {
    try {
        console.log('Fetching active job postings from OnlineStudy4U RSS feed...');
        const res = await fetch(RSS_FEED_URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        
        const xmlText = await res.text();
        const $ = cheerio.load(xmlText, { xmlMode: true });
        const items = [];

        $('item').each((_, elem) => {
            const title = $(elem).find('title').text().trim();
            const link = $(elem).find('link').text().trim();
            const pubDate = $(elem).find('pubDate').text().trim();
            const description = $(elem).find('description').text().trim();
            
            if (title && link) {
                items.push({
                    title,
                    link,
                    pubDate,
                    description
                });
            }
        });

        return items;
    } catch (err) {
        console.error('Failed to fetch RSS job feed:', err);
        return [];
    }
}

function cleanDescription(html) {
    if (!html) return '';
    // Strip HTML tags and metadata
    let text = html.replace(/<[^>]*>/g, ' ');
    // Remove common WordPress read-more/ellipsis tags
    text = text.replace(/\[&#8230;\]/g, '...');
    text = text.replace(/\s+/g, ' ').trim();
    // Decode common entities
    text = text.replace(/&amp;/g, '&')
               .replace(/&lt;/g, '<')
               .replace(/&gt;/g, '>')
               .replace(/&quot;/g, '"')
               .replace(/&#39;/g, "'")
               .replace(/&#160;/g, ' ');
    // Cap description preview length
    if (text.length > 220) {
        return text.substring(0, 220) + '...';
    }
    return text;
}

function parseCompanyAndTitle(rawTitle) {
    const companies = [
        'Wipro', 'Deloitte', 'Tech Mahindra', 'TCS', 'Infosys', 'Accenture', 
        'Cognizant', 'Capgemini', 'BSNL', 'SSC', 'ISRO', 'IBM', 'Amazon', 
        'Google', 'Microsoft', 'Oracle', 'Cisco', 'HP', 'Dell', 'L&T', 'Mindtree'
    ];
    
    let company = 'Off Campus';
    let cleanTitle = rawTitle;

    // Try to match standard company names from title
    for (const c of companies) {
        const regex = new RegExp(c, 'i');
        if (regex.test(rawTitle)) {
            company = c;
            break;
        }
    }

    // If company is still 'Off Campus', try extracting the first word/token before separator
    if (company === 'Off Campus') {
        const splitChars = ['–', '-', ':', 'New', 'Recruitment', 'Hiring'];
        for (const char of splitChars) {
            if (rawTitle.includes(char)) {
                const parts = rawTitle.split(char);
                const potentialCompany = parts[0].trim();
                if (potentialCompany.length > 2 && potentialCompany.length < 25) {
                    company = potentialCompany;
                    break;
                }
            }
        }
    }

    // Clean up typical redundant suffixes in title to make it look premium
    cleanTitle = cleanTitle.replace(/Recruitment\s*Drive\s*\d{4}:?/i, 'Recruitment')
                           .replace(/New\s*Off\s*Campus\s*Hiring\s*–?/i, 'Hiring')
                           .replace(/New\s*Hiring\s*–?/i, 'Hiring')
                           .replace(/\[\s*Apply\s*Online\s*\]/i, '')
                           .trim();

    return { company, title: cleanTitle };
}

function parseLocation(rawTitle, rawDescription) {
    const text = (rawTitle + ' ' + rawDescription).toLowerCase();
    if (text.includes('work from home') || text.includes('remote')) {
        return 'Remote (India)';
    }
    
    const cities = ['Bengaluru', 'Bangalore', 'Noida', 'Pune', 'Hyderabad', 'Mumbai', 'Chennai', 'Delhi', 'Kolkata', 'Gurgaon', 'Gujarat', 'Karnataka'];
    for (const city of cities) {
        if (text.includes(city.toLowerCase())) {
            let displayCity = city;
            if (city.toLowerCase() === 'bangalore') displayCity = 'Bengaluru';
            return `${displayCity}, India`;
        }
    }
    return 'India';
}

function parseJobType(rawTitle) {
    const text = rawTitle.toLowerCase();
    if (text.includes('intern') || text.includes('trainee') || text.includes('co-op') || text.includes('apprenticeship')) {
        return 'Internship';
    }
    return 'Full-time';
}

function generateIdFromLink(link) {
    try {
        const urlObj = new URL(link);
        const slug = urlObj.pathname.split('/').filter(Boolean).pop();
        return `onlinestudy4u-${slug || Date.now()}`;
    } catch {
        return `onlinestudy4u-${Date.now()}`;
    }
}

async function extractApplyLink(url) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

    try {
        const res = await fetch(url, {
            signal: controller.signal,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        clearTimeout(timeoutId);

        if (!res.ok) return url;
        const html = await res.text();
        const $ = cheerio.load(html);

        const candidates = [];
        $('a').each((_, elem) => {
            const href = $(elem).attr('href');
            const text = $(elem).text().trim();
            if (!href) return;

            const lowerHref = href.toLowerCase();

            // Skip social media channels
            if (lowerHref.includes('t.me') || lowerHref.includes('telegram') || 
                lowerHref.includes('instagram.com') || lowerHref.includes('whatsapp.com') ||
                lowerHref.includes('youtube.com') || lowerHref.includes('youtu.be') ||
                lowerHref.includes('facebook.com') || lowerHref.includes('twitter.com') ||
                lowerHref.includes('x.com') || lowerHref.includes('pinterest.com') ||
                (lowerHref.includes('linkedin.com') && (lowerHref.includes('/in/') || lowerHref.includes('/company/')))) {
                return;
            }

            // Skip internal site links
            if (lowerHref.includes('onlinestudy4u.in')) {
                return;
            }

            // Skip common sharing/action links
            if (lowerHref.includes('mailto:') || lowerHref.includes('tel:') || 
                lowerHref.includes('javascript:') || lowerHref.startsWith('#')) {
                return;
            }

            // Exclude informational pages
            if (lowerHref.includes('/privacy') || lowerHref.includes('/terms') || 
                lowerHref.includes('/contact') || lowerHref.includes('/about')) {
                return;
            }

            candidates.push({ text, href });
        });

        // Find the best apply link: first link with "click here", "apply", "register"
        const bestMatch = candidates.find(c => {
            const txt = c.text.toLowerCase();
            return txt.includes('click here') || txt.includes('apply') || txt.includes('register');
        });

        return bestMatch ? bestMatch.href : (candidates[0] ? candidates[0].href : url);
    } catch (e) {
        console.warn(`Failed to extract apply link from ${url}:`, e.message || e);
        clearTimeout(timeoutId);
        return url;
    }
}

async function mapRssItem(item) {
    const { company, title } = parseCompanyAndTitle(item.title);
    const location = parseLocation(item.title, item.description);
    const type = parseJobType(item.title);
    const id = generateIdFromLink(item.link);
    const formattedDate = new Date(item.pubDate).toISOString();

    console.log(`Extracting apply URL for: ${title}...`);
    const actualUrl = await extractApplyLink(item.link);

    return {
        id,
        title,
        company,
        location,
        type,
        category: 'Software Development',
        description: cleanDescription(item.description),
        url: actualUrl || item.link,
        postedDate: formattedDate
    };
}

async function run() {
    if (!fs.existsSync(DATA_FILE_PATH)) {
        console.error(`Jobs data file not found at: ${DATA_FILE_PATH}`);
        return;
    }

    let currentFileContent = fs.readFileSync(DATA_FILE_PATH, 'utf8');

    // Extract existing JOBS_DATA array
    const dataMatch = currentFileContent.match(/export const JOBS_DATA: JobListing\[] = (\[[\s\S]*\]);/);
    if (!dataMatch) {
        console.error('Could not find JOBS_DATA declaration inside lib/jobs-data.ts');
        return;
    }

    let jobsData = [];
    try {
        const jsEvalStr = dataMatch[1].replace(/^\s*\/\/.*$/gm, '');
        jobsData = eval(`(${jsEvalStr})`);
    } catch (e) {
        console.error('Error parsing existing jobs data array:', e);
        return;
    }

    // Filter to ONLY keep OnlineStudy4U job postings (removing legacy Remotive / mock VTU listings)
    const initialLength = jobsData.length;
    jobsData = jobsData.filter(job => job.id.startsWith('onlinestudy4u-'));
    const removedCount = initialLength - jobsData.length;
    if (removedCount > 0) {
        console.log(`Filtering: Removed ${removedCount} legacy non-OnlineStudy4U jobs.`);
    }

    let selfHealedCount = 0;
    // Self-heal/update existing listings that still point to onlinestudy4u blog pages
    for (let i = 0; i < jobsData.length; i++) {
        const job = jobsData[i];
        if (job.url.includes('onlinestudy4u.in')) {
            console.log(`Upgrading legacy blog URL for: ${job.title}...`);
            const actualUrl = await extractApplyLink(job.url);
            if (actualUrl && actualUrl !== job.url) {
                console.log(`-> Upgraded to: ${actualUrl}`);
                job.url = actualUrl;
                selfHealedCount++;
            }
        }
    }

    const registeredJobIds = new Set(jobsData.map(j => j.id));

    // Fetch live job postings
    const rssItems = await fetchRssFeed();
    let updatedCount = 0;

    for (const item of rssItems) {
        const checkId = generateIdFromLink(item.link);
        
        // Skip if already in database
        if (!registeredJobIds.has(checkId)) {
            const mapped = await mapRssItem(item);
            jobsData.unshift(mapped); // Add new listings to the top
            updatedCount++;
        }
    }

    // Cap listings array size to 50 items
    if (jobsData.length > 50) {
        jobsData = jobsData.slice(0, 50);
    }

    if (updatedCount > 0 || removedCount > 0 || selfHealedCount > 0) {
        console.log(`Updating jobs database. New: ${updatedCount}, Cleaned: ${removedCount}, Self-Healed: ${selfHealedCount}. Writing to lib/jobs-data.ts...`);
        const formattedArray = JSON.stringify(jobsData, null, 4);
        
        const newFileContent = currentFileContent.replace(
            /export const JOBS_DATA: JobListing\[] = \[[\s\S]*\];/g,
            `export const JOBS_DATA: JobListing[] = ${formattedArray};`
        );
        
        fs.writeFileSync(DATA_FILE_PATH, newFileContent, 'utf8');
        console.log('Jobs update complete!');
    } else {
        console.log('No updates or cleanups required.');
    }
}

run();
