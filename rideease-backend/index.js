require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');  // Make sure this path is correct
const rideRoutes = require('./routes/rides');
const userRoutes = require('./routes/users');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Use auth routes
app.use('/auth', authRoutes);  // This line is crucial

// Use ride routes (if you have them)
app.use('/api/rides', rideRoutes);
app.use('/rides', rideRoutes);

// Error handling middleware
app.use(errorHandler);

// For debugging: log all incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));