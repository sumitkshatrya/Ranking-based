const mongoose = require('mongoose');
const History = require('../models/History');
const { getPaginationParams, createPaginationResponse } = require('../middleware/pagination');

// Get points history with pagination
const getHistory = async (req, res) => {
  try {
    const { page, limit, skip } = getPaginationParams(req);
    
    const [history, total] = await Promise.all([
      History.find()
        .populate('userId', 'name')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      History.countDocuments()
    ]);
    
    res.json(createPaginationResponse(history, page, limit, total));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user's points history
const getUserHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page, limit, skip } = getPaginationParams(req);
    
    const [history, total] = await Promise.all([
      History.find({ userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      History.countDocuments({ userId })
    ]);
    
    // Calculate total points earned
    const totalPoints = await History.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: '$points' } } }
    ]);
    
    res.json({
      history: createPaginationResponse(history, page, limit, total),
      totalPointsEarned: totalPoints[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getHistory,
  getUserHistory
};