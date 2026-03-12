const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller.js');
const auth = require('../middleware/auth.js');
const multer = require('multer');
const path = require('path');

// multer config for profile image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Public routes
router.post('/signup', authController.signup);
router.post('/signin', authController.signin);

// Protected
router.get('/profile', auth, authController.getProfile);
router.put('/profile-image', auth, upload.single('profileImage'), authController.uploadProfileImage);
router.delete('/profile-image', auth, authController.deleteProfileImage);

module.exports = router;