// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer'); // Import multer for file uploads
require('dotenv').config();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files in the "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

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
      hobby,
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

// Route to upload profile picture
router.post('/upload', authMiddleware, upload.single('profilePicture'), async (req, res) => {
  const userId = req.user.userId;

  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Assuming you serve the images statically, construct the URL
    const imageUrl = `/uploads/${req.file.filename}`; // This is the relative URL to the uploaded image
    console.log(imageUrl)

    // Update the user's profile picture in the database
    const user = await User.findByIdAndUpdate(userId, {
      profilePicture: imageUrl, // Store the image URL in the database
    }, { new: true });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return the profile picture URL back to the frontend
    res.status(200).json({ message: 'Profile picture uploaded successfully', profilePicture: imageUrl });
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
