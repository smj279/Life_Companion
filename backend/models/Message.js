// backend/models/Message.js

const mongoose = require('mongoose');

// Define the message schema
const messageSchema = new mongoose.Schema({
  senderId: {
    type: String,
    required: true,
  },
  receiverId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  }
});

// Create the Message model
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
