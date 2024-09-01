// education.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './Education.css';

const Education = () => {
  const [school, setSchool] = useState('');
  const [schoolYear, setSchoolYear] = useState('');
  const [college, setCollege] = useState('');
  const [collegeYear, setCollegeYear] = useState('');
  const [university, setUniversity] = useState('');
  const [universityYear, setUniversityYear] = useState('');
  const [currentStatus, setCurrentStatus] = useState('');
  const [occupation, setOccupation] = useState('');
  const [errors, setErrors] = useState({});
  const [formValid, setFormValid] = useState(true);

  const validateForm = () => {
    const errors = {};

    if (!school || !schoolYear || !college || !collegeYear || !university || !universityYear || !currentStatus || !occupation) {
      errors.general = 'All fields are required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setFormValid(false);
      return;
    }

    // Save to local storage
    localStorage.setItem('school', school);
    localStorage.setItem('schoolYear', schoolYear);
    localStorage.setItem('college', college);
    localStorage.setItem('collegeYear', collegeYear);
    localStorage.setItem('university', university);
    localStorage.setItem('universityYear', universityYear);
    localStorage.setItem('currentStatus', currentStatus);
    localStorage.setItem('occupation', occupation);

    // Navigate to more info page
    window.location.href = '/more-info';
  };

  return (
    <div className="page-background">
      <div className="Container1">
        <Link to="/additional-info" className="previous-arrow">
          <FaArrowLeft />
        </Link>
        <h1>Education</h1>
        {!formValid && <p style={{ color: 'red' }}>{errors.general}</p>}
        <form onSubmit={handleNext}>
          <input
            type="text"
            placeholder="School"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="School Year"
            value={schoolYear}
            onChange={(e) => setSchoolYear(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="College"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="College Year"
            value={collegeYear}
            onChange={(e) => setCollegeYear(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="University"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="University Year"
            value={universityYear}
            onChange={(e) => setUniversityYear(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Current Status"
            value={currentStatus}
            onChange={(e) => setCurrentStatus(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Occupation"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            required
          />
          <button type="submit">Next</button>
        </form>
      </div>
    </div>
  );
};

export default Education;
