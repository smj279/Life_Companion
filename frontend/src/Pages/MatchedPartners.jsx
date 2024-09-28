import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MatchedPartners.css';
import logo from '../assets/logo.png';

const MatchedPartners = () => {
  const [matchedPartners, setMatchedPartners] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatchedPartners = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/auth/matched-partners', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setMatchedPartners(data);
        } else {
          console.error('Error fetching matched partners:', data.error);
        }
      } catch (error) {
        console.error('Error fetching matched partners:', error);
      }
    };

    fetchMatchedPartners();
  }, [navigate]);

  const handleViewProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div>
      <div className="top-section11">
        <img src={logo} alt="Logo" className="logo" />
        <h2 className="matched-partners-title">YOUR MATCHED PARTNERS</h2>
        <div className="selected-count">{matchedPartners.length}-Selected</div>
      </div>

      <div className="matched-partners-container">
        {matchedPartners.length === 0 ? (
          <div className="no-matched-partners">No Matched Partner Available</div>
        ) : (
          <div className="matched-partners-list">
            {matchedPartners.map((user, index) => (
              <div key={index} className="matched-partner-box">
                <div className="partner-circle"></div>
                <div className="partner-info">
                  <div className="name">{user.fullName}</div>
                </div>
                <button className="view-profile-button" onClick={() => handleViewProfile(user._id)}>
                  View Profile
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchedPartners;
