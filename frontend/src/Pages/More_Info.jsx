import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './More_Info.css';

const MoreInfoPage = () => {
  const [religion, setReligion] = useState('');
  const [foodHabit, setFoodHabit] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [hobby, setHobby] = useState('');
  const [errors, setErrors] = useState({});
  const [formValid, setFormValid] = useState(true);

  const validateForm = () => {
    const errors = {};
    
    if (!religion || !foodHabit || !weight || !height || !hobby) {
      errors.general = 'All fields are required';
    }

    if (weight <= 0 || height <= 0) {
      errors.physical = 'Weight and height must be positive numbers';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextClick = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setFormValid(false);
      return;
    }

    // Save to local storage
    localStorage.setItem('religion', religion);
    localStorage.setItem('foodHabit', foodHabit);
    localStorage.setItem('weight', weight);
    localStorage.setItem('height', height);
    localStorage.setItem('hobby', hobby);

    // Navigate to the signup page
    window.location.href = '/signup';
  };

  return (
    <div className="moreinfo-page-background">
      <div className="moreinfo-container">
        <Link to="/education" className="moreinfo-previous-arrow">
          <FaArrowLeft />
        </Link>
        <h1 className="moreinfo-title">More Information</h1>
        {!formValid && (
          <div>
            <p className="moreinfo-alert">{errors.general}</p>
            {errors.physical && <p className="moreinfo-alert">{errors.physical}</p>}
          </div>
        )}
        <form onSubmit={handleNextClick}>
         
          <div className="moreinfo-input-group">
            <label htmlFor="foodHabit">Food Habit</label>
            <input
              type="text"
              id="foodHabit"
              value={foodHabit}
              onChange={(e) => setFoodHabit(e.target.value)}
              required
            />
          </div>
          <div className="moreinfo-input-group">
            <label htmlFor="weight">Weight (in kg)</label>
            <input
              type="number" // Changed to number
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
              min="0" // Added minimum value
            />
          </div>
          <div className="moreinfo-input-group">
            <label htmlFor="height">Height (in cm)</label>
            <input
              type="number" // Changed to number
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
              min="0" // Added minimum value
            />
          </div>
          <div className="moreinfo-input-group">
            <label htmlFor="hobby">Hobby</label>
            <input
              type="text"
              id="hobby"
              value={hobby}
              onChange={(e) => setHobby(e.target.value)}
              required
            />
          </div>
          <div className="moreinfo-input-group">
            <label htmlFor="religion">Religion</label>
            <select
              id="religion"
              value={religion}
              onChange={(e) => setReligion(e.target.value)}
              required
            >
              <option value="">Select your religion</option>
              <option value="Islam">Islam</option>
              <option value="Hindu">Hindu</option>
              <option value="Christian">Christian</option>
              <option value="Buddhist">Buddhist</option>
            </select>
          </div>
          <button type="submit" className="moreinfo-styled-button">
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default MoreInfoPage;
