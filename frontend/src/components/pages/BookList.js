    import React, { useEffect, useState } from 'react';
    import axios from 'axios';

    const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND}/api/books`); 
        setBooks(response.data);
        } catch (error) {
        console.error('Error fetching books:', error);
        }
    };

    return (
        <div>
        <h1>Book List</h1>
        <ul>
            {books.map((book) => (
            <li key={book._id}>
                <strong>{book.title}</strong> by {book.author}
                <p>{book.description}</p>
            </li>
            ))}
        </ul>
        </div>
    );
    };

    export default BookList;
