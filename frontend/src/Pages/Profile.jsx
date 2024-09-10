import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('John Doe');
  const [presentAddress, setPresentAddress] = useState('Not provided');
  const [permanentAddress, setPermanentAddress] = useState('Not provided');
  const [dob, setDob] = useState('Not provided');
  const [location, setLocation] = useState('Not provided');
  const [gender, setGender] = useState('Not provided');
  const [occupation, setOccupation] = useState('Not provided');
  const [religion, setReligion] = useState('Not provided');

  useEffect(() => {
    const storedName = localStorage.getItem('name') || 'John Doe';
    const storedPresentAddress = localStorage.getItem('presentAddress') || 'Not provided';
    const storedPermanentAddress = localStorage.getItem('permanentAddress') || 'Not provided';
    const storedDob = localStorage.getItem('dob') || 'Not provided';
    const storedLocation = localStorage.getItem('location') || 'Not provided';
    const storedGender = localStorage.getItem('gender') || 'Not provided';
    const storedOccupation = localStorage.getItem('occupation') || 'Not provided';
    const storedReligion = localStorage.getItem('religion') || 'Not provided';

    setName(storedName);
    setPresentAddress(storedPresentAddress);
    setPermanentAddress(storedPermanentAddress);
    setDob(storedDob);
    setLocation(storedLocation);
    setGender(storedGender);
    setOccupation(storedOccupation);
    setReligion(storedReligion);
  }, []);

  const handleMoreInfoClick = () => {
    navigate('/more-info');
  };

  const handleMessageClick = () => {
    const userId = '12345';
    navigate(`/messages/${userId}`);
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-picture">
          <img src="/path/to/profile-picture.jpg" alt="Profile" />
        </div>
        <h2 className="profile-name">{name}</h2>

        <div className="profile-content">
          <div className="profile-section">
            <h3>About Me</h3>
            <p>Date of Birth: {dob}</p>
            <p>Gender: {gender}</p>
            <p>Present Address: {presentAddress}</p>
            <p>Permanent Address: {permanentAddress}</p>
            <p>Occupation: {occupation}</p>
            <p>Religion: {religion}</p>
          </div>
        </div>

        <div className="profile-actions">
          <button className="action-button">Match</button>
          <button className="action-button" onClick={handleMessageClick}>Message</button>
          <button className="action-button" onClick={handleMoreInfoClick}>More Information</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
