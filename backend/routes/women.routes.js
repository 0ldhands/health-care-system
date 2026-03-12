const express = require('express');
const router = express.Router();
const womenController = require('../controllers/women.controller.js');
const auth = require('../middleware/auth.js');

// Protected routes
router.post('/add', auth, womenController.addWomenRecord);   // Add a new women record
router.get('/history', auth, womenController.getWomenRecords); // Get all records of user

module.exports = router;