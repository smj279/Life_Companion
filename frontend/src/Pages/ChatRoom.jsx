import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChatRoom.css';
import logo from '../assets/logo.png'; 

const ChatRoom = () => {
  const [chatUsers, setChatUsers] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChatUsers = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch('http://localhost:5000/api/messages/chat-users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setChatUsers(data); 
        } else {
          console.error('Error fetching chat users');
        }
      } catch (error) {
        console.error('Error fetching chat users', error);
      }
    };

    fetchChatUsers();
  }, []);

  const handleViewMessages = (senderId, receiverId) => {
    navigate(`/chat/${senderId}/${receiverId}`);
  };

  return (
    <div className="chat-room">
      <div className="top-sectionn1">
      <img src={logo} alt="Logo" className="chat-logo" /> 
        <h2 className="chatroom-title">CHAT-ROOM</h2>
      </div>
      <div className="chatroom-users-container">
        {chatUsers.length === 0 ? (
          <div className="no-chats">No Chats Available</div>
        ) : (
          <div className="chat-list">
            {chatUsers.map((user, index) => (
              <div key={index} className="chat-box">
                <div className="chat-circle"></div>
                <div className="chat-info">
                  <div className="chat-name">
                  {user.fullName} {/* Display full name */}
                    {user.senderId === localStorage.getItem('userId')
                      ? user.receiverId
                      : user.senderId}
                  </div>
                </div>
                <button
                  className="view-chat-button"
                  onClick={() => handleViewMessages(user.senderId, user.receiverId)}
                >
                  View Messages
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;
