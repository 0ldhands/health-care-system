const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Cookie config — UNCOMMENTED and fixed
const COOKIE_OPTIONS = {
  httpOnly: false,
  sameSite: 'lax',   // Changed from 'none' to 'lax' for development (cross-origin with credentials)
  secure: false,       // Keep false for localhost development
  maxAge: 60 * 60 * 1000
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword=await bcrypt.hash(password,10)

    const user = new User({ name, email, password:hashedPassword });
    await user.save();

    // const token =await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // res.cookie('token', token, COOKIE_OPTIONS);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: { id: user._id, name: user.name, email: user.email, profileImage: user.profileImage || null }
    });
  } catch (error) {
    console.error('Signup error:', error.message);
    res.status(500).json({ error: 'Failed to create user rrrrr', details: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, COOKIE_OPTIONS);

    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage || null
      }
    });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
};

exports.signout = (req, res) => {
  res.clearCookie('token', COOKIE_OPTIONS);
  res.json({ success: true, message: 'Logged out successfully' });
};

// return current user including profileImage
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage || null
      }
    });
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ error: 'Failed to load profile' });
  }
};

// upload profile image and save path
exports.uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const user = await User.findByIdAndUpdate(
      req.userId,
      { profileImage: req.file.filename },
      { new: true }
    ).select('-password');
    res.json({ success: true, user });
  } catch (err) {
    console.error('Upload profile image error:', err);
    res.status(500).json({ error: 'Failed to upload image' });
  }
};

// remove profile image
exports.deleteProfileImage = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      { profileImage: null },
      { new: true }
    ).select('-password');
    res.json({ success: true, user });
  } catch (err) {
    console.error('Delete profile image error:', err);
    res.status(500).json({ error: 'Failed to delete image' });
  }
};