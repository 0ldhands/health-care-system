const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reports.controller.js');
const auth = require('../middleware/auth.js');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Protected routes – only logged-in users
router.get('/', auth, reportsController.getReports);
router.post('/', auth, upload.single('file'), reportsController.addReport);
router.delete('/:id', auth, reportsController.deleteReport);
// allow authenticated users to fetch a report file for viewing
router.get('/viewReports/:id', auth, reportsController.viewReports);

module.exports = router;