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
    if (!religion || !foodHabit || !weight || !height || !hobby) {
      e.preventDefault();
      alert('Please fill out all fields');
    }
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
        <Link to="/signup" onClick={handleNextClick}>
          <button type="button" className="styled-button">Next</button>
        </Link>
      </form>
    </div>
    </div>
  );
};

export default MoreInfo;
