import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './Home.css';  // Import the CSS file

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [bookId, setBookId] = useState('');
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');
  const config = {
    headers: {Authorization: `Bearer ${token}`}
  };

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
      const res = await axios.post(`${process.env.REACT_APP_BACKEND}/api/reviews`, { edition_key: bookId, rating, comment });
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
      await axios.delete(`${process.env.REACT_APP_BACKEND}/api/reviews/${id}`, config);
      setReviews(reviews.filter((review) => review._id !== id));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleEditReview = async (id) => {
    const reviewToEdit = reviews.find((review) => review._id === id);
    if (reviewToEdit) {
      setEditingReviewId(id);
      setBookId(reviewToEdit.edition_key);
      setRating(reviewToEdit.rating);
      setComment(reviewToEdit.comment);
    }
  };

  const handleUpdateReview = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${process.env.REACT_APP_BACKEND}/api/reviews/${editingReviewId}`, { rating, comment }, config);
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
      <div className="reviews-header">
        <h1>Reviews</h1>
        <Link to="/books">Books</Link>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h2>Create Review</h2>
      <form onSubmit={editingReviewId ? handleUpdateReview : handleCreateReview}>
        <input
          type="text"
          placeholder="Edition Key"
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
            <p>Edition Key: {review.edition_key}</p>
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
