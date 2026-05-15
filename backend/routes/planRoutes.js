// backend/routes/planRoutes.js
const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');

// GET request to /api/plans
router.get('/', planController.getAllPlans);

module.exports = router;