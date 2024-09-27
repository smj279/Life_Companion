// routes/messages.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const User = require('../models/User'); // Import the User model
const authMiddleware = require('../middleware/authenticateToken'); // Adjust path as needed

// Route to get messages between sender and receiver
router.get('/:senderId/:receiverId', authMiddleware, async (req, res) => {
  const { senderId, receiverId } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId }
      ]
    }).sort({ timestamp: 1 }); 

    const sender = await User.findById(senderId).select('fullName');
    const receiver = await User.findById(receiverId).select('fullName');

    res.status(200).json({ messages, sender, receiver });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
// Cleaned-up delete route
router.delete('/:messageId', authMiddleware, async (req, res) => {
  const { messageId } = req.params;
  const userId = req.user.userId;

  try {
    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    // Ensure the user deleting the message is the one who sent it
    if (message.senderId.toString() !== userId) {
      return res.status(403).json({ error: 'You can only delete your own messages' });
    }

    await message.deleteOne();
    io.to([message.senderId, message.receiverId].sort().join('_')).emit('message_deleted', messageId); // Notify others
    return res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    return res.status(500).json({ error: 'Failed to delete message' });
  }
});

// fetch user 
router.get('/chat-users', authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  
  try {
    const users = await Message.aggregate([
      {
        $match: {
          $or: [{ senderId: userId }, { receiverId: userId }]
        }
      },
      {
        $group: {
          _id: { 
            senderId: '$senderId', 
            receiverId: '$receiverId' 
          }
        }
      }
    ]);

    const userIds = users.flatMap(({ _id }) => [_id.senderId, _id.receiverId]);
    const uniqueUserIds = [...new Set(userIds.filter((id) => id !== userId))]; // Exclude current user

    const userDetails = await User.find({ _id: { $in: uniqueUserIds } }).select('fullName');

    res.status(200).json(userDetails);
  } catch (error) {
    console.error('Error fetching chat users:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;


