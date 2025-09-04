// backend/middleware/validation.js
const validateUser = (req, res, next) => {
  const { name } = req.body;
  
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ message: 'Valid name is required' });
  }
  
  if (name.trim().length > 50) {
    return res.status(400).json({ message: 'Name must be less than 50 characters' });
  }
  
  next();
};

const validateUserId = (req, res, next) => {
  const { userId } = req.body;
  
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }
  
  next();
};

module.exports = {
  validateUser,
  validateUserId
};