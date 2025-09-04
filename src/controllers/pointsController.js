// backend/controllers/pointsController.js
const User = require('../models/User');
const History = require('../models/History');

// Claim points for a user
const claimPoints = async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Generate random points between 1 and 10
    const points = Math.floor(Math.random() * 10) + 1;
    
    // Find user and update points
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.points += points;
    await user.save();
    
    // Create history record
    const history = new History({
      userId: user._id,
      userName: user.name,
      points
    });
    await history.save();
    
    res.json({
      user: {
        id: user._id,
        name: user.name,
        points: user.points
      },
      pointsAwarded: points
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  claimPoints
};