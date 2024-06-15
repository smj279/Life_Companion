import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('01'); 
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

   
    if (password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      errors.password = 'Password must be at least 8 characters long and include both letters and numbers.';
    }

    
    if (password !== rePassword) {
      errors.rePassword = 'Passwords do not match.';
    }

    
    const phonePattern = /^01\d{9}$/;
    if (!phonePattern.test(phone)) {
      errors.phone = 'Phone number must be 11 digits long and start with "01".';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
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
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Signup successful');
        navigate('/login');
      } else {
        console.error('Signup error:', data); 
        alert(data.error || 'Signup failed');
      }
    } catch (error) {
      console.error('Network error:', error); 
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="Container1">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <p className="error">{errors.password}</p>}
        <input
          type="password"
          placeholder="Re-Enter Password"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
          required
        />
        {errors.rePassword && <p className="error">{errors.rePassword}</p>}
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        {errors.phone && <p className="error">{errors.phone}</p>}
        <div className="terms">
          <input type="checkbox" id="checkbox" required />
          <label htmlFor="checkbox">
            I agree to the <a href="#">Terms & Conditions</a>
          </label>
        </div>
        <div className="button1">
          <button type="submit">Sign Up</button>
        </div>
      </form>
      <div className="member">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default SignUp;
