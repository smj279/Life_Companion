import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="Shaadi" />
      </div>
      <div className="nav-links">
        <Link to="/login">Login</Link>
        <a href="/help">Help</a>
      </div>
      <div className="form-container">
        <h1>Trusted matrimony to find your better half</h1>
        <Link to="/signup">
          <button type="button">Let's Begin</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;

