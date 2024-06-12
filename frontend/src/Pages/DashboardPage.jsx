import React, { useState } from 'react';
import './DashboardPage.css';
import logo from '../assets/logo.png';
 
const DashboardPage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
 
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
 
  return (
    <div className="dashboard-page">
      <div className="top-section">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="search-box">
          <input type="text" placeholder="Search profile..." />
        </div>
        <div className="dashboard">
          <div className="dropdown" onClick={toggleDropdown}>
            <span className="dropdown-icon">&#9776;</span>
          </div>
          <div className={`dropdown-content ${dropdownOpen ? 'show' : ''}`}>
            <a href="#">Home</a>
            <a href="#">Shop</a>
            <a href="#">Product</a>
            <a href="#">Cart</a>
            <a href="#">Checkout</a>
            <a href="#">%Discount%</a>
            <a href="#">Now this week</a>
          </div>
        </div>
      </div>
      <div className="content-section">
        {/* Add your content here */}
      </div>
    </div>
  );
}
 
export default DashboardPage;
 
