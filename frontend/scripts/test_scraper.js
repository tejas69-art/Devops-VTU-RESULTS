const cheerio = require('cheerio');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function run() {
    try {
        console.log('Fetching RSS feed...');
        const res = await fetch('https://onlinestudy4u.in/category/job-updates/feed/', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        const text = await res.text();
        const $ = cheerio.load(text, { xmlMode: true });
        
        console.log('Parsing items...');
        $('item').each((i, elem) => {
            if (i < 5) {
                const title = $(elem).find('title').text().trim();
                const link = $(elem).find('link').text().trim();
                const pubDate = $(elem).find('pubDate').text().trim();
                const description = $(elem).find('description').text().trim();
                
                console.log(`\nItem ${i}:`);
                console.log('Title:', title);
                console.log('Link:', link);
                console.log('Date:', pubDate);
                console.log('Description Snippet:', description.substring(0, 150) + '...');
            }
        });
    } catch (e) {
        console.error('Error:', e);
    }
}

run();
