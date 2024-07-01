const Book = require('../models/Book');

exports.getBooks = async (req, res) => {
    const { page = 1, size = 10 } = req.query;
    try {
        const books = await Book.find()
            .limit(size * 1)
            .skip((page - 1) * size)
            .exec();
        const count = await Book.countDocuments();
        res.status(200).json({
            books,
            totalPages: Math.ceil(count / size),
            currentPage: page,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
