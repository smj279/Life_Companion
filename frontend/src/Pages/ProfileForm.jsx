// ProfileForm.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import './ProfileForm.css';

const ProfileForm = () => {
  const [profileFor, setProfileFor] = useState('');
  const [gender, setGender] = useState('');
  const [warning, setWarning] = useState('');

  const handleNextClick = (e) => {
    if (!profileFor || !gender) {
      e.preventDefault();
      setWarning('Please select both "Profile For" and "Gender" options.');
    } else {
      // Save to local storage
      localStorage.setItem('profileFor', profileFor);
      localStorage.setItem('gender', gender);
      setWarning('');
    }
  };

  return (
    <div className="profile-form-container">
      <div className="profile-form-content">
        <div className="profile-form">
          {warning && <div className="warning">{warning}</div>}
          <div className="profile-for">
            <h2>This Profile is for</h2>
            <div className="options">
              {['Myself', 'My Son', 'My Daughter', 'My Brother', 'My Sister', 'My Friend', 'My Relative'].map(option => (
                <button
                  key={option}
                  className={profileFor === option ? 'selected' : ''}
                  onClick={() => setProfileFor(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className="gender">
            <h2>Gender</h2>
            <div className="options">
              {['Male', 'Female'].map(option => (
                <button
                  key={option}
                  className={gender === option ? 'selected' : ''}
                  onClick={() => setGender(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <Link to="/additional-info" onClick={handleNextClick}>
            <button className="navigate-signup">Next <FaArrowRight /></button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
