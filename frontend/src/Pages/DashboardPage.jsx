import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './DashboardPage.css';
import logo from '../assets/logo.png';
import storyImage1 from '../assets/story1.jpg'; 
import storyImage2 from '../assets/story2.jpg'; 
import storyImage3 from '../assets/story3.jpg'; 

const DashboardPage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMoreStories = () => {
    setShowMore(!showMore);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    
    navigate('/'); 
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
            <Link to="/dashboard">Home</Link>
            <a href="#">My Profile</a>
            <a href="#">Chosen Partner</a>
            <a href="#">Help</a>
            <a href="#">About Us</a>
            <a href="#">Privacy and Policy</a>
            <a href="#" onClick={handleLogout}>Logout</a>
          </div>
        </div>
      </div>
      <div className="content-section">
        <div className="success-stories">
          <h2>Success Stories</h2>
          <p className="note">At Life Companion, we celebrate the beautiful journeys of love that begin here. Read about our couples who found their perfect match and took their first steps towards a lifetime of happiness together.</p>
          <div className="story">
            <img src={storyImage1} alt="Story 1" />
            <p>Adirtto and Mira found love through Life Companion and tied the knot last year.</p>
            <Link to="/story1" className="read-story">Read The Story</Link>
          </div>
          <div className="story">
            <img src={storyImage2} alt="Story 2" />
            <p>Vikram and Srabonti's journey began on Life Companion, leading to a beautiful wedding.</p>
            <Link to="/story2" className="read-story">Read The Story</Link>
          </div>
          {showMore && (
            <div className="story">
              <img src={storyImage3} alt="Story 3" />
              <p>Akbar and Parvin are another happy couple who met through Life Companion and recently married.</p>
              <Link to="/story3" className="read-story">Read The Story</Link>
            </div>
          )}
          <div className="more-stories" onClick={toggleMoreStories}>
            {showMore ? 'Show Less' : 'More Stories'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
