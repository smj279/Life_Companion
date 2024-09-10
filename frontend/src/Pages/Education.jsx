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
  const [customOccupation, setCustomOccupation] = useState('');
  const [errors, setErrors] = useState({});
  const [formValid, setFormValid] = useState(true);

  const validateForm = () => {
    const errors = {};

    // If "Other" is selected, ensure custom occupation is provided
    if (!school || !schoolYear || !college || !collegeYear || !university || !universityYear || !currentStatus || (!occupation && !customOccupation)) {
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
    localStorage.setItem('occupation', occupation === 'Other' ? customOccupation : occupation);

    // Navigate to more info page
    window.location.href = '/more-info';
  };

  return (
    <div className="page-background1">
      <div className="Edu-container">
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
          <label>Passed Year</label>
          <input
            type="date"
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
          <label>Passed Year</label>
          <input
            type="date"
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
          <label>Passed Year</label>
          <input
            type="date"
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
          
          {/* Dropdown for Occupation (alphabetically ordered) */}
          <select
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            required
          >
            <option value="" disabled>Select Occupation</option>
            <option value="Accountant">Accountant</option>
            <option value="Artist">Artist</option>
            <option value="Businessperson">Businessperson</option>
            <option value="Doctor">Doctor</option>
            <option value="Engineer">Engineer</option>
            <option value="Freelancer">Freelancer</option>
            <option value="Lawyer">Lawyer</option>
            <option value="Researcher">Researcher</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Other">Other</option>
          </select>

          {/* Show custom occupation input only if "Other" is selected */}
          {occupation === 'Other' && (
            <input
              type="text"
              placeholder="Please specify your occupation"
              value={customOccupation}
              onChange={(e) => setCustomOccupation(e.target.value)}
              required
            />
          )}
          
          <button type="submit">Next</button>
        </form>
      </div>
    </div>
  );
};

export default Education;
