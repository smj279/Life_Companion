// src/Pages/MessagePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // For route params
import io from 'socket.io-client';
import axios from 'axios';
import './MessagePage.css';

const socket = io('http://localhost:5000');

const MessagePage = () => {
  const { userId } = useParams(); // Get recipient user ID from URL
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // Assuming you'll fetch current user from context or state

  useEffect(() => {
    // Fetch current user
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('/api/current-user');
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    // Fetch messages from backend
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/api/messages/${currentUser._id}/${userId}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    // Listen for new messages
    socket.on('receive_message', (data) => {
      if (data.sender === userId || data.recipient === userId) {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    });

    return () => {
      socket.off('receive_message');
    };
  }, [userId, currentUser]);

  const sendMessage = async () => {
    if (message.trim() === '') return;

    const messageData = {
      sender: currentUser._id,
      recipient: userId,
      message,
      timestamp: new Date(),
    };

    try {
      await axios.post('/api/messages', messageData);
      socket.emit('send_message', messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="message-page">
      <div className="message-header">
        <h2>Chat with {userId}</h2>
      </div>
      <div className="message-list">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-item ${msg.sender === currentUser._id ? 'sent' : 'received'}`}
          >
            <p>{msg.message}</p>
            <span className="message-timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default MessagePage;
