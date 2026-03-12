const express = require('express');
const router = express.Router();
const nutritionController = require('../controllers/nutrition.controller.js');
const auth = require('../middleware/auth.js'); // if protected

router.post('/search', auth, nutritionController.searchNutrition);
router.get('/history', auth, nutritionController.getHistory);

module.exports = router;