const Review = require('../models/Review');

// Create a new review
const createReview = async (req, res) => {
    const { book_id, rating, comment } = req.body;
    try {
        const review = new Review({
            user: req.user.id,
            book_id,
            rating,
            comment,
        });
        await review.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all reviews with pagination
const getReviews = async (req, res) => {
    const { page = 1, size = 10 } = req.query;
    try {
        const reviews = await Review.find()
            .populate('user', 'username')
            .limit(size * 1)
            .skip((page - 1) * size)
            .exec();
        const count = await Review.countDocuments();
        res.status(200).json({
            reviews,
            totalPages: Math.ceil(count / size),
            currentPage: page,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single review
const getReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id).populate('user', 'username');
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a review
const updateReview = async (req, res) => {
    const { rating, comment } = req.body;
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        if (review.user.toString() !== req.user.id) {
            return res.status(401).json({ error: 'Not authorized' });
        }
        review.rating = rating || review.rating;
        review.comment = comment || review.comment;
        await review.save();
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a review
const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        if (review.user.toString() !== req.user.id) {
            return res.status(401).json({ error: 'Not authorized' });
        }
        await review.remove();
        res.status(204).json({ message: 'Review removed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createReview,
    getReviews,
    getReview,
    updateReview,
    deleteReview,
};
