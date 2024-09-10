// more-info.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './More_Info.css';

const MoreInfo = () => {
  const [religion, setReligion] = useState('');
  const [foodHabit, setFoodHabit] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [hobby, setHobby] = useState('');

  const handleNextClick = (e) => {
    e.preventDefault();

    if (!religion || !foodHabit || !weight || !height || !hobby) {
      alert('Please fill out all fields');
      return;
    }

    // Save to local storage
    localStorage.setItem('religion', religion);
    localStorage.setItem('foodHabit', foodHabit);
    localStorage.setItem('weight', weight);
    localStorage.setItem('height', height);
    localStorage.setItem('hobby', hobby);

    // Navigate to signup page
    window.location.href = '/signup';
  };

  return (
    <div className="page-background2">
    <div className="info-container">
      <Link to="/education" className="previous-arrow">
        <FaArrowLeft />
      </Link>
      <h1 className="info-title">More Information</h1>
      <form>
        <div className="input-group">
          <label htmlFor="religion" className="info-label">Religion</label>
          <input
            type="text"
            id="religion"
            value={religion}
            onChange={(e) => setReligion(e.target.value)}
            className="info-input"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="foodHabit" className="info-label">Food Habit</label>
          <input
            type="text"
            id="foodHabit"
            value={foodHabit}
            onChange={(e) => setFoodHabit(e.target.value)}
            className="info-input"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="weight" className="info-label">Weight(kg)</label>
          <input
            type="text"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="info-input"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="height" className="info-label">Height(cm)</label>
          <input
            type="text"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="info-input"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="hobby" className="info-label">Hobby</label>
          <input
            type="text"
            id="hobby"
            value={hobby}
            onChange={(e) => setHobby(e.target.value)}
            className="info-input"
            required
          />
        </div>
        <button type="button" className="styled-button" onClick={handleNextClick}>Next</button>
      </form>
    </div>
    </div>
  );
};

export default MoreInfo;
