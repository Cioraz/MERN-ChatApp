const express = require('express');
// Dotenv to store all environment variables
const dotenv = require('dotenv');
// Connecting to the database
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
// Error middlewares
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Configuring dotenv
dotenv.config();
// Connecting to database
connectDB();
const app = express();

// To accept Json Data
app.use(express.json());

// To check if API is running
app.get('/', (req, res) => {
    res.send("API running ")
});

// To use the routes in the app
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);

// Error middlewares
app.use(notFound);
app.use(errorHandler);

// Dotenv to get the port stored in it
const PORT = process.env.PORT | 5000
app.listen(PORT, console.log(`Port running on ${PORT}`));

// sunil123 123