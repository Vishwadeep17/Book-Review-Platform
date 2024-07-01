const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Ensure this import is correct
const startScheduler = require('./scheduler/scheduler');

dotenv.config();

connectDB(); // Make sure this line is correct

const app = express();

app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/books', require('./routes/bookRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

startScheduler();
