// backend/models/Notification.js

const mongoose = require('mongoose');

// Define the notification schema
const notificationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true, // Define the type of notification (e.g., match, message, etc.)
  },
  content: {
    type: String,
    required: true, // The actual message/content of the notification
  },
  isRead: {
    type: Boolean,
    default: false, // Mark if the notification has been read or not
  },
  timestamp: {
    type: Date,
    default: Date.now, // Automatically set the timestamp to the current date/time
  }
});

// Create the Notification model
const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
