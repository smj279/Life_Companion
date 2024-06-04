import React from 'react';
import './Header.css';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="Shaadi" />
      </div>
      <div className="nav-links">
        <a href="/login">Login</a>
        <a href="/help">Help</a>
      </div>
      <div className="form-container">
        <h1>Trusted matrimony to find your better half</h1>
        <form>
          <button type="submit">Let's Begin</button>
        </form>
      </div>
    </div>
  );
};

export default Header;
