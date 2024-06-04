import React from 'react';
import './Header.css';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="Shaadi" />
      </div>
      <div className="form-container">
        <h1>Trusted Matrimony & Matchmaking Service</h1>
        <form>
          <div className="form-group">
            <label htmlFor="lookingFor">I'm looking for a</label>
            <select id="lookingFor">
              <option>Woman</option>
              <option>Man</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="age">aged</label>
            <input type="number" id="age" placeholder="22" /> to
            <input type="number" id="ageTo" placeholder="27" />
          </div>
          <div className="form-group">
            <label htmlFor="religion">of religion</label>
            <select id="religion">
              <option>Select</option>
              <option>Hindu</option>
              <option>Muslim</option>
              <option>Christian</option>
              <option>Sikh</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="location">and living in</label>
            <select id="location">
              <option>Select</option>
              <option>India</option>
              <option>USA</option>
              <option>UK</option>
              <option>Canada</option>
              <option>Other</option>
            </select>
          </div>
          <button type="submit">Let's Begin</button>
        </form>
      </div>
    </div>
  );
};

export default Header;
