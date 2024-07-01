const Book = require('../models/Book');
const scrapeBooks = require('../scraping/scraper');

exports.getBooks = async (req, res) => {
    const { page = 1, size = 10 } = req.query;
    try {
        scrapeBooks();
        const books = await Book.find()
            .limit(size * 1)
            .skip((page - 1) * size)
            .exec();
        res.status(200).json(books); // Send just the array of books
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
