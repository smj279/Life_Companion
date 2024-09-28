import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './OthersProfile.css';

const OthersProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMatched, setIsMatched] = useState(false);
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem('userId'); // Get the current logged-in user's ID

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
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
        setUser(data);

        // Check if the user is matched
        const matchedResponse = await fetch('http://localhost:5000/api/auth/matched-partners', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const matchedData = await matchedResponse.json();
        setIsMatched(matchedData.some(partner => partner._id === userId));

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId, navigate]);

  const handleMatch = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:5000/api/auth/match/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setIsMatched(true);
      } else {
        console.error('Error matching user:', await response.json());
      }
    } catch (error) {
      console.error('Error matching user:', error);
    }
  };

  const handleUnmatch = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:5000/api/auth/unmatch/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setIsMatched(false);
      } else {
        console.error('Error unmatching user:', await response.json());
      }
    } catch (error) {
      console.error('Error unmatching user:', error);
    }
  };

  const handleMessage = () => {
    const currentUserId = localStorage.getItem('userId');
    navigate(`/chat/${currentUserId}/${userId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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
            <h3>About</h3>
            <p>Date of Birth: {new Date(user.dob).toLocaleDateString()}</p>
            <p>Gender: {user.gender}</p>
            <p>Present Address: {user.presentAddress}</p>
            <p>Permanent Address: {user.permanentAddress}</p>
            <p>Occupation: {user.occupation}</p>
            <p>Religion: {user.religion}</p>
          </div>
        </div>

        <div className="others-profile-actions">

          {isMatched ? (
            <button className="others-action-button" onClick={handleUnmatch}>Unmatch</button>
          ) : (
            <button className="others-action-button" onClick={handleMatch}>Match</button>
          )}
          <button className="others-action-button" onClick={handleMessage} disabled={!isMatched}>
            Message
          </button>
          <Link to={`/others-full-information/${userId}`} className="others-action-button">
            Full Information
          </Link>
          

        </div>
      </div>
    </div>
  );
};

export default OthersProfile;
