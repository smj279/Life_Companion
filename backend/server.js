require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users'); // Import the new routes
const messageRoutes = require('./routes/messages'); // Import the new routes
const http = require('http');
const { Server } = require('socket.io');
const Message = require('./models/Message');
const Notification = require('./models/Notification');


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:5173' }));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Authentication and User routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // Use the new routes
app.use('/api/messages', messageRoutes); // Use the new routes


// Basic route
app.get('/', (req, res) => {
  res.send('Hello from Express');
});

// Add this route in your server.js for creating notifications
app.post('/api/notifications', async (req, res) => {
  const { userId, type, content } = req.body;

  try {
    const notification = new Notification({
      userId,
      type,
      content,
    });
    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to get notifications by user ID
app.get('/api/notifications/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const notifications = await Notification.find({ userId });
    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Socket.io connection for chat functionality
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join_room', ({ senderId, receiverId }) => {
    const room = [senderId, receiverId].sort().join('_');
    socket.join(room);
    console.log('Joined room:', room); // Debugging statement
  });

  socket.on('send_message', async (data) => {
    console.log('Received message data:', data); // Add this line to check data being received
    const { senderId, receiverId, content } = data;
    const room = [senderId, receiverId].sort().join('_');
    console.log('Sending message from', senderId, 'to', receiverId); // Debugging statement

    try {
      const message = new Message({
        senderId,
        receiverId,
        message: content, // renamed content to message as per your schema
      });
      await message.save();

      io.to(room).emit('receive_message', message);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
