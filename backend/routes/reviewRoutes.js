const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
    createReview,
    getReviews,
    getReview,
    updateReview,
    deleteReview,
} = require('../controllers/reviewController'); // Ensure this import is correct
const router = express.Router();

router.route('/').post(protect, createReview).get(getReviews);
router
    .route('/:id')
    .get(getReview)
    .put(protect, updateReview)
    .delete(protect, deleteReview);

module.exports = router;
