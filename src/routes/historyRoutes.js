// backend/routes/historyRoutes.js
const express = require('express');
const { getHistory, getUserHistory } = require('../controllers/historyController');

const router = express.Router();

router.get('/', getHistory);
router.get('/user/:userId', getUserHistory);

module.exports = router;