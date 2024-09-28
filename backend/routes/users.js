// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authenticateToken = require('../middleware/authenticateToken');

// Route to get a specific user's details by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('fullName dob gender presentAddress permanentAddress occupation religion');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to get the current user's data (without password)
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ userId: user._id, ...user.toObject() });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to get all users except the current user
router.get('/users', authenticateToken, async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.userId } }).select('fullName presentAddress dob religion');
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to fetch the current user's full information (Education & Occupation + Additional Information)
router.get('/full-info', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select(
      'occupation school schoolYear college collegeYear university currentStatus religion foodHabit weight height hobby'
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      educationOccupation: {
        occupation: user.occupation,
        school: user.school,
        schoolYear: user.schoolYear,
        college: user.college,
        collegeYear: user.collegeYear,
        university: user.university,
        currentStatus: user.currentStatus,
      },
      additionalInformation: {
        religion: user.religion,
        foodHabit: user.foodHabit,
        weight: user.weight,
        height: user.height,
        hobby: user.hobby,
      },
    });
  } catch (error) {
    console.error('Error fetching full information:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
