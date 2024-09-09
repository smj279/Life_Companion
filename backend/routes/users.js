// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Make sure this path is correct

// Middleware to authenticate the user and extract userId
const authenticateToken = require('../middleware/authenticateToken'); // You'll need to create this middleware

// Route to get recommended users
router.get('/recommended', authenticateToken, async (req, res) => {
  const { userId } = req.user; // Extract userId from authenticated token

  try {
    const users = await User.find({ _id: { $ne: userId } }); // Fetch all users except the current user

    // If needed, you can apply additional filtering, sorting, or logic here

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching recommended users:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
