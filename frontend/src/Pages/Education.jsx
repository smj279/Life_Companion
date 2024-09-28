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

  const occupations = [
    "Student", "Engineer", "Doctor", "Nurse", "Teacher", "Scientist", 
    "Artist", "Designer", "Architect", "Software Developer", "Accountant", 
    "Manager", "Chef", "Musician", "Writer", "Data Analyst", "Salesperson", 
    "Marketing Specialist", "Web Developer", "Researcher", "Consultant", 
    "Electrician", "Plumber", "Mechanic", "Firefighter", "Police Officer", 
    "Paramedic", "Pharmacist", "Veterinarian", "Graphic Designer", 
    "Construction Worker", "Real Estate Agent", "Insurance Agent", 
    "Social Worker", "Business Analyst", "Project Manager", 
    "Human Resources Specialist", "Customer Service Representative", 
    "Secretary", "Administrative Assistant", "Barista", "Cashier", 
    "Waiter", "Event Planner", "Fashion Designer", "Photographer", 
    "Journalist", "Public Relations Specialist", "Pilot", "Flight Attendant", 
    "Travel Agent", "Fitness Trainer", "Interior Designer", 
    "Web Designer", "Entrepreneur", "Data Scientist"
  ];

  const currentStatuses = [
    "Unemployed", "Employed Full-Time", "Employed Part-Time", 
    "Self-Employed", "Intern", "Freelancer", 
    "Student", "Retired", "Looking for Work"
  ];

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
          <input
            type="date"
            placeholder="University Year"
            value={universityYear}
            onChange={(e) => setUniversityYear(e.target.value)}
            required
          />
          <select 
            value={currentStatus} 
            onChange={(e) => setCurrentStatus(e.target.value)} 
            required
          >
            <option value="" disabled>Select Current Status</option>
            {currentStatuses.map((status, index) => (
              <option key={index} value={status}>{status}</option>
            ))}
          </select>
          <select 
            value={occupation} 
            onChange={(e) => setOccupation(e.target.value)} 
            required
          >
            <option value="" disabled>Select Occupation</option>
            {occupations.map((occ, index) => (
              <option key={index} value={occ}>{occ}</option>
            ))}
          </select>
          <button type="submit">Next</button>
        </form>
      </div>
    </div>
  );
};

export default Education;
