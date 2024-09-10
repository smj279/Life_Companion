import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './OthersProfile.css';

const OthersProfile = () => {
  const { userId } = useParams(); // Fetch userId from the URL
  const [user, setUser] = useState(null); // Store user data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login'); // Redirect if not authenticated
          return;
        }

        const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }

        const data = await response.json();
        setUser(data); // Set fetched user data
        setLoading(false); // Update loading state
      } catch (err) {
        setError(err.message); // Set error message
        setLoading(false); // Stop loading
      }
    };

    fetchUserDetails();
  }, [userId, navigate]);

  if (loading) {
    return <div>Loading...</div>; // Display loading indicator
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  return (
    <div className="others-profile-container">
      <div className="others-profile-card">
        <div className="others-profile-picture">
          <img src="/path/to/profile-picture.jpg" alt="Profile" />
        </div>
        <h2 className="others-profile-name">{user.fullName}</h2>

        <div className="others-profile-content">
          <div className="others-profile-section">
            <h3>About Me</h3>
            <p>Date of Birth: {new Date(user.dob).toLocaleDateString()}</p>
            <p>Gender: {user.gender}</p>
            <p>Present Address: {user.presentAddress}</p>
            <p>Permanent Address: {user.permanentAddress}</p>
            <p>Occupation: {user.occupation}</p>
            <p>Religion: {user.religion}</p>
          </div>
        </div>

        <div className="others-profile-actions">
          <button className="others-action-button">Match</button>
          <button className="others-action-button">Message</button>
          <button className="others-action-button">More Information</button>
        </div>
      </div>
    </div>
  );
};

export default OthersProfile;
