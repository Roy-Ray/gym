// backend/routes/leadRoutes.js
const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');

// POST request to /api/leads
router.post('/', leadController.createLead);

module.exports = router;