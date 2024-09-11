// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to check authentication
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) return res.status(401).json({ error: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};

// Route to handle user signup
router.post('/signup', async (req, res) => {
  const { 
    fullName, userName, password, email, phone, 
    profileFor, gender, presentAddress, permanentAddress, fathersName, mothersName, dob, 
    school, schoolYear, college, collegeYear, university, universityYear, currentStatus, occupation,
    religion, foodHabit, weight, height, hobby 
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      userName,
      password: hashedPassword,
      email,
      phone,
      profileFor,
      gender,
      presentAddress,
      permanentAddress,
      fathersName,
      mothersName,
      dob: new Date(dob),
      school,
      schoolYear,
      college,
      collegeYear,
      university,
      universityYear,
      currentStatus,
      occupation,
      religion,
      foodHabit,
      weight,
      height,
      hobby
    });

    await user.save();

    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Route to handle user login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Route to get the current user's data
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json({ userId: user._id, ...user.toObject() });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to get all users except the current user
router.get('/users', authMiddleware, async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.userId } }).select('fullName presentAddress dob religion');
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to add a user to matched partners
router.post('/match/:userId', authMiddleware, async (req, res) => {
  const { userId } = req.params;
  const currentUserId = req.user.userId;

  try {
    const currentUser = await User.findById(currentUserId);
    if (!currentUser) return res.status(404).json({ error: 'User not found' });

    // Check if user is already matched
    if (currentUser.matchedPartners.includes(userId)) {
      return res.status(400).json({ error: 'User already matched' });
    }

    currentUser.matchedPartners.push(userId);
    await currentUser.save();

    res.status(200).json({ message: 'User matched successfully' });
  } catch (error) {
    console.error('Error matching user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to remove a user from matched partners
router.post('/unmatch/:userId', authMiddleware, async (req, res) => {
  const { userId } = req.params;
  const currentUserId = req.user.userId;

  try {
    const currentUser = await User.findById(currentUserId);
    if (!currentUser) return res.status(404).json({ error: 'User not found' });

    currentUser.matchedPartners = currentUser.matchedPartners.filter(id => id.toString() !== userId);
    await currentUser.save();

    res.status(200).json({ message: 'User unmatched successfully' });
  } catch (error) {
    console.error('Error unmatching user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to get matched partners' profiles
router.get('/matched-partners', authMiddleware, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.userId).populate('matchedPartners', 'fullName presentAddress dob religion');
    if (!currentUser) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(currentUser.matchedPartners); // Return matched partners' details
  } catch (error) {
    console.error('Error fetching matched partners:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
