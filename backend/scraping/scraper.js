const axios = require('axios');
const cheerio = require('cheerio');
const Book = require('../models/Book');
const { default: mongoose } = require('mongoose');

const scrapeBooks = async () => {
    try {

        const response = await axios.get('https://openlibrary.org/trending/daily');
        const data = response.data;
    
        const books = data.works || [];
    
        if (books.length === 0) {
          console.log('No books found.');
          return;
        }
    
        for (const book of books) {
          // Extract the relevant information
          const edition_key = book.cover_edition_key; // Adjust the field based on your data
          const title = book.title;
          const author = book.author_name ? book.author_name.join(', ') : 'Unknown';
    
          // Debug: Print each book's info
          // console.log({ edition_key, title, author });
    
          // Update or create book in the database
          await Book.findOneAndUpdate(
            { edition_key: edition_key },
            { edition_key, title, author },
            { upsert: true, new: true }
          );
        }
    
        console.log('Trending books updated successfully');
      } catch (error) {
        console.error('Error fetching trending books:', error);
      }
};

module.exports = scrapeBooks;