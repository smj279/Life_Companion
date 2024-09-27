import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './AdditionalInfoForm.css';

const AdditionalInfoForm = () => {
  const [presentAddress, setPresentAddress] = useState('');
  const [permanentAddress, setPermanentAddress] = useState('');
  const [fathersName, setFathersName] = useState('');
  const [mothersName, setMothersName] = useState('');
  const [dob, setDob] = useState('');
  const [errors, setErrors] = useState({});
  const [formValid, setFormValid] = useState(true);

  const validateForm = () => {
    const errors = {};
    if (!presentAddress || !permanentAddress || !fathersName || !mothersName || !dob) {
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
    localStorage.setItem('presentAddress', presentAddress);
    localStorage.setItem('permanentAddress', permanentAddress);
    localStorage.setItem('fathersName', fathersName);
    localStorage.setItem('mothersName', mothersName);
    localStorage.setItem('dob', dob);

    // Navigate to education page
    window.location.href = '/education';
  };

  return (
    <div className="page-background">
      <div className="Container1">
        <Link to="/profile-form" className="previous-arrow">
          <FaArrowLeft />
        </Link>
        <h1>Additional Information</h1>
        {!formValid && <p style={{ color: 'red' }}>{errors.general}</p>}
        <form onSubmit={handleNext}>
          <input
            type="text"
            placeholder="Present Address"
            value={presentAddress}
            onChange={(e) => setPresentAddress(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Permanent Address"
            value={permanentAddress}
            onChange={(e) => setPermanentAddress(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Father's Name"
            value={fathersName}
            onChange={(e) => setFathersName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Mother's Name"
            value={mothersName}
            onChange={(e) => setMothersName(e.target.value)}
            required
          />
          <label htmlFor="dob" className="dob-label">Date of Birth</label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
          <button type="submit">Next</button>
        </form>
      </div>
    </div>
  );
};

export default AdditionalInfoForm;
