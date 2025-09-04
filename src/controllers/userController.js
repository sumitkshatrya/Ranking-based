const User = require('../models/User');
const { getPaginationParams, createPaginationResponse } = require('../middleware/pagination');

// Initialize default users
const initializeUsers = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const defaultUsers = [
        { name: 'Rahul' },
        { name: 'Kamal' },
        { name: 'Sanak' },
        { name: 'Priya' },
        { name: 'Amit' },
        { name: 'Neha' },
        { name: 'Vikram' },
        { name: 'Sneha' },
        { name: 'Raj' },
        { name: 'Anjali' }
      ];
      await User.insertMany(defaultUsers);
      console.log('Default users created successfully');
    }
  } catch (error) {
    console.error('Error initializing users:', error);
  }
};

// Get all users with pagination
const getUsers = async (req, res) => {
  try {
    const { page, limit, skip } = getPaginationParams(req);
    const [users, total] = await Promise.all([
      User.find().sort({ points: -1, name: 1 }).skip(skip).limit(limit),
      User.countDocuments()
    ]);
    res.json(createPaginationResponse(users, page, limit, total));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new user
const addUser = async (req, res) => {
  try {
    const { name } = req.body;
    const user = new User({ name: name.trim() });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user statistics
const getUserStats = async (req, res) => {
  try {
    const { id } = req.params;
    const { page, limit, skip } = getPaginationParams(req);
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const usersWithHigherPoints = await User.countDocuments({
      points: { $gt: user.points }
    });
    const rank = usersWithHigherPoints + 1;

    res.json({
      user,
      rank,
      history: {} // populate from history later
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  initializeUsers,
  getUsers,
  addUser,
  getUserStats
}; 