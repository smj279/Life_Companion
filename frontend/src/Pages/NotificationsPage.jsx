// src/components/NotificationsPage.jsx
import React, { useState, useEffect } from 'react';
import './NotificationsPage.css';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications from the backend
    const fetchNotifications = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch('http://localhost:5000/api/auth/notifications', {
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

  return (
    <div className="notifications-page">
      <h2>Notifications</h2>
      <div className="notification-list">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div key={index} className="notification-item">
              <p>{notification.message}</p>
              <button
                onClick={() => handleMatch(notification.userId)}
                className="match-buttonn"
              >
                Match
              </button>
            </div>
          ))
        ) : (
          <p>No notifications yet.</p>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
