// backend/server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const connectDB = require('./src/config/database');
const errorHandler = require('./src/middleware/errorHandler');

// Route imports
const userRoutes = require('./src/routes/userRoutes');
const pointsRoutes = require('./src/routes/pointsRoutes');
const leaderboardRoutes = require('./src/routes/leaderboardRoutes');
const historyRoutes = require('./src/routes/historyRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// General middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/points', pointsRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/history', historyRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;