const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User schema
        required: true,
    },
    book_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book', // Reference to the Book schema
        // required: true,
    },
    edition_key: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.models.Review || mongoose.model('Review', reviewSchema);
