// backend/controllers/leaderboardController.js
const User = require('../models/User');
const { getPaginationParams, createPaginationResponse } = require('../middleware/pagination');

// Get leaderboard with pagination
const getLeaderboard = async (req, res) => {
  try {
    const { page, limit, skip } = getPaginationParams(req);
    
    const [users, total] = await Promise.all([
      User.find()
        .sort({ points: -1, name: 1 })
        .skip(skip)
        .limit(limit),
      User.countDocuments()
    ]);
    
    // Add ranks based on sorted position
    const usersWithRanks = users.map((user, index) => ({
      ...user.toObject(),
      rank: skip + index + 1
    }));
    
    res.json(createPaginationResponse(usersWithRanks, page, limit, total));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getLeaderboard
};