const express = require('express');
const router = express.Router();
const healthCtrl = require('../controllers/healthCalc.controller.js');
const auth = require('../middleware/auth.js');

// save a calculation (protected)
router.post('/save',auth,healthCtrl.saveCalculation);
// get history (protected)
router.get('/history', auth, healthCtrl.getCalculations);
// get all entries (protected, could be admin only later)
router.get('/all', auth, healthCtrl.getAllCalculations);

module.exports = router;
