import React, { useState, useEffect } from 'react';
import './ChatBox.css';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';

const socket = io('http://localhost:5000');

const ChatBox = () => {
  const { receiverId } = useParams();
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [receiverName, setReceiverName] = useState('');
  const [loading, setLoading] = useState(true);

  const senderId = localStorage.getItem('userId');
  console.log('Retrieved senderId:', senderId);

  if (!senderId) {
    return <div>Error: No sender ID available</div>;
  }

  useEffect(() => {
    console.log('senderId in useEffect:', senderId);
    console.log('receiverId in useEffect:', receiverId);
    if (!senderId || !receiverId) return;

 
    socket.emit('join_room', { senderId, receiverId });

    // Fetch messages from the backend
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token');

        const response = await fetch(`http://localhost:5000/api/messages/${senderId}/${receiverId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch messages');

        const data = await response.json();
        setChat(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchMessages();

   
    socket.on('receive_message', (message) => {
      setChat((prevChat) => [...prevChat, message]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, [senderId, receiverId]);

  useEffect(() => {
    const fetchReceiverName = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token');
        }

        const response = await fetch(`http://localhost:5000/api/users/${receiverId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch receiver details');
        }

        const data = await response.json();
        setReceiverName(data.fullName);
        setLoading(false);
      } catch (err) {
        console.error(err.message);
        setLoading(false);
      }
    };

    fetchReceiverName();
  }, [receiverId]);

  const sendMessage = () => {
    if (message.trim() === '') return;

    const newMessage = {
      senderId,
      receiverId,
      content: message,
    };

    socket.emit('send_message', newMessage);
    setChat((prevChat) => [...prevChat, newMessage]);
    setMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="chatbox-container">
      <div className="chatbox-header">
        <div className="header-content">
          <div className="header-circle"></div>
          <h1>{receiverName}</h1>
          <div className="three-dot-menu">•••</div>
        </div>
      </div>

      <div className="chatbox-messages">
        {chat.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.senderId === senderId ? 'self' : 'other'}`}>
             {msg.senderId === senderId && <div className="message-label">You</div>}
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
      
      <div className="chatbox-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          onKeyDown={handleKeyDown}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
