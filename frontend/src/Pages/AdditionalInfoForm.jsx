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

  const handleNextClick = (e) => {
    if (!presentAddress || !permanentAddress || !fathersName || !mothersName || !dob) {
      e.preventDefault();
      alert('Please fill out all fields');
    }
  };

  return (
    <div className="page-background">
      <div className="Container2">
        <Link to="/profile-form" className="previous-arrow">
          <FaArrowLeft />
        </Link>
        <h1>Additional Information</h1>
        <form>
          <textarea
            placeholder="Present Address"
            value={presentAddress}
            onChange={(e) => setPresentAddress(e.target.value)}
          />
          <textarea
            placeholder="Permanent Address"
            value={permanentAddress}
            onChange={(e) => setPermanentAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Father's Name"
            value={fathersName}
            onChange={(e) => setFathersName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Mother's Name"
            value={mothersName}
            onChange={(e) => setMothersName(e.target.value)}
          />
          <label htmlFor="dob">Date of Birth</label>
          <input
            id="dob"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <Link to="/education" onClick={handleNextClick} className="left-align">
            <button type="button" className="button2">Next</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default AdditionalInfoForm;

