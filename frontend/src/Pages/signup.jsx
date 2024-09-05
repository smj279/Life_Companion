// SignUp.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './SignUp.css';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [formValid, setFormValid] = useState(true);
  const [warningMessage, setWarningMessage] = useState('');
  const navigate = useNavigate();

  // Retrieve data from local storage
  const profileFor = localStorage.getItem('profileFor');
  const gender = localStorage.getItem('gender');
  const presentAddress = localStorage.getItem('presentAddress');
  const permanentAddress = localStorage.getItem('permanentAddress');
  const fathersName = localStorage.getItem('fathersName');
  const mothersName = localStorage.getItem('mothersName');
  const dob = localStorage.getItem('dob');
  const school = localStorage.getItem('school');
  const schoolYear = localStorage.getItem('schoolYear');
  const college = localStorage.getItem('college');
  const collegeYear = localStorage.getItem('collegeYear');
  const university = localStorage.getItem('university');
  const universityYear = localStorage.getItem('universityYear');
  const currentStatus = localStorage.getItem('currentStatus');
  const occupation = localStorage.getItem('occupation');
  const religion = localStorage.getItem('religion');
  const foodHabit = localStorage.getItem('foodHabit');
  const weight = localStorage.getItem('weight');
  const height = localStorage.getItem('height');
  const hobby = localStorage.getItem('hobby');

  const validateForm = () => {
    const errors = {};

    if (!fullName) {
      errors.fullName = 'Full Name is required.';
    }

    if (!userName) {
      errors.userName = 'User Name is required.';
    }

    if (password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      errors.password = 'Password must be at least 8 characters long and include both letters and numbers.';
    }

    if (password !== rePassword) {
      errors.rePassword = 'Passwords do not match.';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      errors.email = 'Invalid email address.';
    }

    const phonePattern = /^01[356789]\d{8}$/;
    if (!phonePattern.test(phone)) {
      errors.phone = 'Invalid phone number.';
    }

    if (!termsAccepted) {
      errors.termsAccepted = 'You must accept the terms and conditions.';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setFormValid(false);
      setWarningMessage('Please correct the form errors.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          userName,
          password,
          email,
          phone,
          profileFor,
          gender,
          presentAddress,
          permanentAddress,
          fathersName,
          mothersName,
          dob,
          school,
          schoolYear,
          college,
          collegeYear,
          university,
          universityYear,
          currentStatus,
          occupation,
          religion,
          foodHabit,
          weight,
          height,
          hobby,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Signup successful');
        // Clear localStorage after successful signup
        localStorage.clear();
        navigate('/login');
      } else {
        console.error('Signup error:', data);
        setWarningMessage(data.error || 'Signup failed');
      }
    } catch (error) {
      console.error('Network error:', error);
      setWarningMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="page-background">
      <div className="Container1">
        <Link to="/more-info" className="previous-arrow">
          <FaArrowLeft />
        </Link>
        <h1>Sign Up</h1>
        {!formValid && <p className="warning-message">{warningMessage}</p>}
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          {errors.fullName && <p className="error-message">{errors.fullName}</p>}
          
          <input
            type="text"
            placeholder="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          {errors.userName && <p className="error-message">{errors.userName}</p>}
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
          
          <input
            type="password"
            placeholder="Confirm Password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            required
          />
          {errors.rePassword && <p className="error-message">{errors.rePassword}</p>}
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
          
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          {errors.phone && <p className="error-message">{errors.phone}</p>}
          
          <label className="terms-label">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            I accept the terms and conditions
          </label>
          {errors.termsAccepted && <p className="error-message">{errors.termsAccepted}</p>}
          
          <button type="submit" disabled={!termsAccepted}>Sign Up</button>
          {warningMessage && <p className="warning-message">{warningMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
