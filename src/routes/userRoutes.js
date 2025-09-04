// backend/routes/userRoutes.js
const express = require('express');
const { getUsers, addUser, getUserStats } = require('../controllers/userController');
const { validateUser } = require('../middleware/validation');

const router = express.Router();

router.get('/', getUsers);
router.post('/', validateUser, addUser);
router.get('/:id/stats', getUserStats);

module.exports = router;