// NewSection.jsx
import React from 'react';
import './NewSection.css';
import image1 from '../assets/image1.png'; // Relationship Advise
import image2 from '../assets/image2.png'; // Find Someone Special Near You
import image3 from '../assets/image3.png'; // Let A Matchmaker Help You

const NewSection = () => {
  return (
    <div className="new-section">
      <div className="section-part">
        <img src={image1} alt="Relationship Advise" />
        <h3>Relationship Advise</h3>
        <p>
        Welcome to our Relationship Advice section! Here, you'll find a treasure trove of insights and guidance from our team of seasoned experts. Our dedicated professionals work tirelessly to provide you with comprehensive and heartfelt advice on all aspects of relationships. Whether you're navigating the intricacies of marriage, exploring the world of dating, or searching for that special someone, we’ve got you covered.
        </p>
       
      </div>
      <div className="section-part">
        <img src={image2} alt="Find Someone Special Near You" />
        <h3>Find Someone Special Near You</h3>
        <p>
        Discover the joy of connecting with your soulmate who might be just around the corner or within your city! Our platform is designed to help you find that special someone who shares your interests, values, and aspirations.
        </p>
       
      </div>
      <div className="section-part">
        <img src={image3} alt="Let A Matchmaker Help You" />
        <h3>Let A Matchmaker Help You</h3>
        <p>
        Are you a busy professional finding it challenging to meet potential partners? It’s time to consider the expertise of a matchmaker who can streamline your search for love. Our matchmakers are dedicated to understanding your preferences and lifestyle, making it easier for you to find a compatible match.
        </p>
        
      </div>
    </div>
  );
};

export default NewSection;
