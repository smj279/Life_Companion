// src/components/Profile.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate(); // Create navigate function from react-router-dom

  const [name, setName] = useState('John Doe');
  const [presentAddress, setPresentAddress] = useState('Not provided');
  const [permanentAddress, setPermanentAddress] = useState('Not provided');
  const [fathersName, setFathersName] = useState('Not provided');
  const [mothersName, setMothersName] = useState('Not provided');
  const [dob, setDob] = useState('Not provided');
  const [location, setLocation] = useState('Not provided');

  useEffect(() => {
    const storedName = localStorage.getItem('name') || 'John Doe';
    const storedPresentAddress = localStorage.getItem('presentAddress') || 'Not provided';
    const storedPermanentAddress = localStorage.getItem('permanentAddress') || 'Not provided';
    const storedFathersName = localStorage.getItem('fathersName') || 'Not provided';
    const storedMothersName = localStorage.getItem('mothersName') || 'Not provided';
    const storedDob = localStorage.getItem('dob') || 'Not provided';
    const storedLocation = localStorage.getItem('location') || 'Not provided';

    setName(storedName);
    setPresentAddress(storedPresentAddress);
    setPermanentAddress(storedPermanentAddress);
    setFathersName(storedFathersName);
    setMothersName(storedMothersName);
    setDob(storedDob);
    setLocation(storedLocation);
  }, []);

  // Function to handle "More Information" button click
  const handleMoreInfoClick = () => {
    navigate('/more-info'); // Navigate to the MoreInfo page
  };

  // Function to handle "Message" button click
  const handleMessageClick = () => {
    // Assuming there is a user ID available, replace 'userId' with actual dynamic user ID
    const userId = '12345'; // Example user ID, replace with real logic
    navigate(`/messages/${userId}`); // Navigate to the MessagePage (previously Chat) for messaging
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Profile Picture and Name */}
        <div className="profile-picture">
          <img src="/path/to/profile-picture.jpg" alt="Profile" />
        </div>
        <h2 className="profile-name">{name}</h2>

        {/* Profile Sections */}
        <div className="profile-content">
          {/* About Me Section */}
          <div className="profile-section">
            <h3>About Me</h3>
            <p>Date of Birth: {dob}</p>
            <p>Present Address: {presentAddress}</p>
            <p>Permanent Address: {permanentAddress}</p>
            <p>Father's Name: {fathersName}</p>
            <p>Mother's Name: {mothersName}</p>
          </div>

          {/* My Location Section */}
          <div className="profile-section">
            <h3>My Location</h3>
            <p>{location}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="profile-actions">
          <button className="action-button">Match</button>
          <button className="action-button" onClick={handleMessageClick}>Message</button> {/* Navigate to chat page */}
          <button className="action-button" onClick={handleMoreInfoClick}>More Information</button> {/* Navigate to MoreInfo */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
