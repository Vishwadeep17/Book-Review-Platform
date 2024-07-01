import React, { useState, useEffect } from "react";
import axiosInstance from "../AxiosInstance"; 
import axios from "axios";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [bookId, setBookId] = useState('');
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND}/api/reviews`);
      setReviews(res.data.reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleCreateReview = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(`${process.env.REACT_APP_BACKEND}/api/reviews`, { book_id: bookId, rating, comment });
      setReviews([...reviews, res.data]);
      setBookId('');
      setRating(1);
      setComment('');
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleDeleteReview = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND}/api/reviews/${id}`);
      setReviews(reviews.filter((review) => review._id !== id));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleEditReview = async (id) => {
    const reviewToEdit = reviews.find((review) => review._id === id);
    if (reviewToEdit) {
      setEditingReviewId(id);
      setBookId(reviewToEdit.book_id);
      setRating(reviewToEdit.rating);
      setComment(reviewToEdit.comment);
    }
  };

  const handleUpdateReview = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${process.env.REACT_APP_BACKEND}/api/reviews/${editingReviewId}`, { rating, comment });
      setReviews(reviews.map((review) => (review._id === editingReviewId ? res.data : review)));
      setEditingReviewId(null);
      setBookId('');
      setRating(1);
      setComment('');
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const cancelEdit = () => {
    setEditingReviewId(null);
    setBookId('');
    setRating(1);
    setComment('');
  };

  return (
    <div>
      <h1>Reviews</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h2>Create Review</h2>
      <form onSubmit={editingReviewId ? handleUpdateReview : handleCreateReview}>
        <input
          type="text"
          placeholder="Book ID"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Rating (1-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="5"
          required
        />
        <textarea
          placeholder="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button type="submit">{editingReviewId ? 'Update Review' : 'Create Review'}</button>
        {editingReviewId && <button type="button" onClick={cancelEdit}>Cancel</button>}
      </form>
      <h2>All Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review._id}>
            <p>Book ID: {review.book_id}</p>
            <p>Rating: {review.rating}</p>
            <p>Comment: {review.comment}</p>
            <button onClick={() => handleEditReview(review._id)}>Edit</button>
            <button onClick={() => handleDeleteReview(review._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
