const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    book_id: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Review', ReviewSchema);
