// backend/routes/pointsRoutes.js
const express = require('express');
const { claimPoints } = require('../controllers/pointsController');
const { validateUserId } = require('../middleware/validation');

const router = express.Router();

router.post('/claim', validateUserId, claimPoints);

module.exports = router;