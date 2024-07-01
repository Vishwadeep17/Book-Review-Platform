const schedule = require('node-schedule');
const scrapeBooks = require('../scraping/scraper');

const startScheduler = () => {
    schedule.scheduleJob('0 0 * * *', async () => {
        console.log('Running daily book scrape...');
        await scrapeBooks();
    });
};

module.exports = startScheduler;
