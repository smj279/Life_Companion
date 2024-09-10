// src/Pages/FullInformation.jsx

import React from 'react';
import './FullInformation.css'; // Ensure this file exists

import { FaBriefcase, FaGraduationCap, FaHeart, FaUtensils, FaBook, FaWeight, FaRuler } from 'react-icons/fa';

const FullInformation = () => {
  const educationInfo = {
    school: 'ABC High School',
    schoolYear: '2010 - 2014',
    college: 'XYZ College',
    collegeYear: '2014 - 2016',
    university: 'University of DEF',
    currentStatus: 'Employed',
    occupation: 'Software Engineer',
  };

  const additionalInfo = {
    religion: 'Christianity',
    foodHabit: 'Vegetarian',
    weight: '75kg',
    height: '5\'10"',
    hobby: 'Reading',
  };

  return (
    <div className="profile-container">
      <div className="photo-section">
        <img src="https://your-photo-url1.com" alt="Photo 1" className="profile-photo" />
        <img src="https://your-photo-url2.com" alt="Photo 2" className="profile-photo" />
      </div>

      <div className="info-sections">
        <div className="info-card">
          <h2><FaGraduationCap className="icon" /> Education & Occupation</h2>
          <p><FaBriefcase className="icon" /> <strong>Occupation:</strong> {educationInfo.occupation}</p>
          <p><strong>School:</strong> {educationInfo.school}</p>
          <p><strong>School Year:</strong> {educationInfo.schoolYear}</p>
          <p><strong>College:</strong> {educationInfo.college}</p>
          <p><strong>College Year:</strong> {educationInfo.collegeYear}</p>
          <p><strong>University:</strong> {educationInfo.university}</p>
          <p><strong>Status:</strong> {educationInfo.currentStatus}</p>
        </div>

        <div className="info-card">
          <h2><FaHeart className="icon" /> Additional Information</h2>
          <p><FaHeart className="icon" /> <strong>Religion:</strong> {additionalInfo.religion}</p>
          <p><FaUtensils className="icon" /> <strong>Food Habit:</strong> {additionalInfo.foodHabit}</p>
          <p><FaWeight className="icon" /> <strong>Weight:</strong> {additionalInfo.weight}</p>
          <p><FaRuler className="icon" /> <strong>Height:</strong> {additionalInfo.height}</p>
          <p><FaBook className="icon" /> <strong>Hobby:</strong> {additionalInfo.hobby}</p>
        </div>
      </div>
    </div>
  );
};

export default FullInformation;