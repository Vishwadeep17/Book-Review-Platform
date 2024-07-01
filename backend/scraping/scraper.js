const axios = require('axios');
const cheerio = require('cheerio');
const Book = require('../models/Book');

const scrapeBooks = async () => {
    try {
        const { data } = await axios.get('https://openlibrary.org/trending/daily');
        const $ = cheerio.load(data);

        const books = [];

        $('.bookcover').each((index, element) => {
            const book_id = $(element).attr('data-olid');
            const title = $(element).attr('title');
            const cover_url = $(element).find('img').attr('src');
            books.push({ book_id, title, cover_url });
        });

        for (let book of books) {
            await Book.updateOne(
                { book_id: book.book_id },
                { ...book },
                { upsert: true }
            );
        }
    } catch (error) {
        console.error(error);
    }
};

module.exports = scrapeBooks;
