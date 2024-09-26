import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './NotificationsPage.css';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch('http://localhost:5000/api/notifications/user-notifications', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setNotifications(data);
        } else {
          console.error('Error fetching notifications:', data.error);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleViewProfile = async (matchedUserId) => {
    console.log('Matched User ID:', matchedUserId);
    const token = localStorage.getItem('token'); // Retrieve the token
    
    if (!token) {
        console.error('No token found, user might not be authenticated');
        return; // Prevent further execution if there's no token
    }

    try {
        console.log(`Fetching user profile from /api/users/${matchedUserId}`);
        const response = await fetch(`http://localhost:5000/api/users/${matchedUserId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` // Include the token in the Authorization header
            },
        });
        
        if (!response.ok) {
            const errorText = await response.text(); // Get the error response text
            console.error('Error fetching user profile:', response.status, errorText);
            throw new Error(`Error: ${response.status}`);
        }

        const userProfile = await response.json();
        navigate(`/profile/${matchedUserId}`); // Navigate to the profile page
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
};

  

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        notifications.map((notification) => (
          <div key={notification._id} className="notification">
            <p>{notification.content}</p>
            <button className="message-button" onClick={() => handleViewProfile(notification.matchedUserId)}>
              View Profile
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default NotificationPage;
