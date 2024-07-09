import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Header.css'; // Adjust the path based on your actual project structure

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="Shaadi" />
      </div>
      <div className="nav-links">
        <Link to="/login">Login</Link>
        <a href="/help">Help</a>
        <Link to="/about-us">About us</Link>
        <Link to="/Profile">Profile</Link>

      </div>
      <div className="form-container">
        <h1>Trusted matrimony to find your better half</h1>
        <Link to="/profile-form">
          <button type="button">Let's Begin</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
