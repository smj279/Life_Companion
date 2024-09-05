require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Your previous authentication routes
const http = require('http');
const { Server } = require('socket.io');
const Message = require('./models/Message'); // New model for chat messages

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Assuming the frontend is running on port 5173
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

// Authentication routes
app.use('/api/auth', authRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Hello from Express');
});

// Socket.io connection for chat functionality
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Event listener for sending a message
  socket.on('send_message', async (data) => {
    const { senderId, receiverId, content } = data;
    
    try {
      const message = new Message({
        senderId,
        receiverId,
        content,
      });
      await message.save(); // Save message to MongoDB

      // Emit the message to the receiver
      io.emit('receive_message', message);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  // Event listener for user disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
