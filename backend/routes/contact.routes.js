const express = require('express');
const router = express.Router();
const { sendMessage } = require('../controllers/contact.controller');
const auth=require("../middleware/auth.js")

// POST /api/contact
router.post('/',auth,sendMessage);

module.exports = router;
