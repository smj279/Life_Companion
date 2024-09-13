import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './DashboardPage.css';
import logo from '../assets/logo.png';
import storyImage1 from '../assets/story1.jpg';
import storyImage2 from '../assets/story2.jpg';
import storyImage3 from '../assets/story3.jpg';
import { FaBell } from 'react-icons/fa'; 
const DashboardPage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [users, setUsers] = useState([]); // State to hold user data
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); // State to store current logged-in user
  const [matchedPartners, setMatchedPartners] = useState([]); // State to hold matched partners
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/auth/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setCurrentUserId(data.userId);
          setCurrentUser(data); // Save the entire current user data
          // Fetch matched partners
          const matchedResponse = await fetch('http://localhost:5000/api/auth/matched-partners', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          const matchedData = await matchedResponse.json();
          setMatchedPartners(matchedData.map(partner => partner._id));
        } else {
          console.error('Error fetching current user data:', data.error);
        }
      } catch (error) {
        console.error('Error fetching current user data:', error);
      }
    };

    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch(`http://localhost:5000/api/auth/users?userId=${currentUserId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUsers(data);
        } else {
          console.error('Error fetching users:', data.error);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUserData().then(fetchUsers);
  }, [currentUserId, navigate]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMoreStories = () => {
    setShowMore(!showMore);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleNext = () => {
    if (scrollIndex < users.length - 3) {
      setScrollIndex(scrollIndex + 3);
    }
  };

  const handlePrevious = () => {
    if (scrollIndex > 0) {
      setScrollIndex(scrollIndex - 3);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleViewProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };

  const handleMatch = async (userId) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:5000/api/auth/match/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setMatchedPartners([...matchedPartners, userId]);
      } else {
        console.error('Error matching user:', await response.json());
      }
    } catch (error) {
      console.error('Error matching user:', error);
    }
  };

  const handleUnmatch = async (userId) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:5000/api/auth/unmatch/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setMatchedPartners(matchedPartners.filter(id => id !== userId));
      } else {
        console.error('Error unmatching user:', await response.json());
      }
    } catch (error) {
      console.error('Error unmatching user:', error);
    }
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
        <div className="notification-icon">
          <button className="notification-button">
            <FaBell className="bell-icon" />
          </button>
        </div>
        <div className="current-user">
          {currentUser && <span>{currentUser.fullName}</span>} 
        </div>
        <div className="dashboard">
          <div className="dropdown" onClick={toggleDropdown}>
            <span className="dropdown-icon">&#9776;</span>
          </div>
          <div 
            ref={dropdownRef}
            className={`dropdown-content ${dropdownOpen ? 'show' : ''}`}
          >
            <Link to="/dashboard">Home</Link>
            <Link to="/profile">My Profile</Link>
            <Link to="/matched-partners">Matched Partners</Link>
            <a href="#">Chat Room</a>
            <a href="/help">Help</a>
            <Link to="/about-us">About us</Link>
            <a href="#" onClick={handleLogout}>Logout</a>
          </div>
        </div>
      </div>

      <div className="content-section">
        <div className="scrollable-section">
          <h2>Recommended Matches</h2>
          <div className="box-container">
            <div className="boxes">
              {users.slice(scrollIndex, scrollIndex + 3).map((user, index) => (
                <div key={index} className="box">
                  <div className="circle"></div>
                  <div className="name">{user.fullName}</div>
                  <div className="details">
                    <p>Present Address: {user.presentAddress}</p>
                    <p>Date of Birth: {new Date(user.dob).toLocaleDateString()}</p>
                    <p>Religion: {user.religion}</p>
                  </div>
                  <div className="buttons">
                    <button className="message-button" onClick={() => handleViewProfile(user._id)}>
                      View Profile
                    </button>
                    {matchedPartners.includes(user._id) ? (
                      <button className="match-button" onClick={() => handleUnmatch(user._id)}>
                        Unmatch
                      </button>
                    ) : (
                      <button className="match-button" onClick={() => handleMatch(user._id)}>
                        Match
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="navigation-buttons">
            <button className="previous-button" onClick={handlePrevious} disabled={scrollIndex === 0}>
              Previous
            </button>
            <button className="next-button" onClick={handleNext} disabled={scrollIndex >= users.length - 3}>
              Next
            </button>
          </div>
        </div>

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
                   <p>David and Sara's journey is a testament to the power of finding the right partner.</p>
                   <Link to="/story2" className="read-story">Read The Story</Link>
                      </div>         
             <div className="show-more-link" onClick={toggleMoreStories}>
                 {showMore ? 'Show Less' : 'Show More'}
                  </div>

                     {showMore && (
                    <div className="story">
                      <img src={storyImage3} alt="Story 3" />
                     <p>John and Lily met on Life Companion and celebrated their wedding in a grand ceremony.</p>
                   <Link to="/story3" className="read-story">Read The Story</Link>
                </div>
               )}
                   </div>

              </div>
          </div>
      );
    };

export default DashboardPage;