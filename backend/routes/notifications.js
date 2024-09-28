// routes/notifications.js
const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const authMiddleware = require('../middleware/authenticateToken'); // Assuming you have auth middleware

// Route to fetch notifications for the logged-in user
router.get('/user-notifications', authMiddleware, async (req, res) => {
    const userId = req.user.userId; // Extract user ID from the authenticated user
  
    try {
      // Fetch all notifications for the user
      const notifications = await Notification.find({ userId }).populate('matchedUserId', 'fullName presentAddress dob religion');
      
      // Return notifications along with user profile details
      res.status(200).json(notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  

// Route to mark all notifications as read
router.put('/mark-all-read', authMiddleware, async (req, res) => {
  const userId = req.user.userId;

  try {
    // Mark all notifications as read
    await Notification.updateMany({ userId, isRead: false }, { $set: { isRead: true } });

    res.status(200).json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Error marking notifications as read:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to mark a single notification as read
router.put('/mark-read/:notificationId', authMiddleware, async (req, res) => {
  const { notificationId } = req.params;

  try {
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    // Check if the notification belongs to the logged-in user
    if (notification.userId !== req.user.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    notification.isRead = true;
    await notification.save();

    res.status(200).json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to delete a notification
router.delete('/delete/:notificationId', authMiddleware, async (req, res) => {
  const { notificationId } = req.params;

  try {
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    // Check if the notification belongs to the logged-in user
    if (notification.userId !== req.user.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await notification.remove();

    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
