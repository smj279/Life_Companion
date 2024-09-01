// About.jsx

import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <h1 className="about-heading">About Our Matrimony Site</h1>
      <p className="about-description">
        Welcome to our matrimony platform, where we believe in fostering meaningful connections
        that last a lifetime. Our goal is to create a safe and supportive environment for individuals
        seeking life partners.
      </p>
      <h2 className="mission-heading">Our Mission</h2>
      <p className="mission-description">
        At Life Companion, we are dedicated to helping people find their perfect match
        with ease and confidence. We understand the importance of compatibility and are committed
        to facilitating genuine relationships based on shared values, interests, and life goals.
      </p>
      <h2 className="why-choose-heading">Why Choose Us?</h2>
      <ul className="why-choose-list">
        <li><strong>Comprehensive Profiles:</strong> Detailed profiles help you understand potential matches.</li>
        <li><strong>Advanced Matching:</strong> Our algorithms ensure compatibility based on your preferences.</li>
        <li><strong>Security First:</strong> We prioritize your safety with robust privacy settings and verification.</li>
        <li><strong>Supportive Community:</strong> Join a community of like-minded individuals looking for serious relationships.</li>
        <li><strong>User-Friendly Interface:</strong> Easy navigation and intuitive design make your experience seamless.</li>
      </ul>
      <h2 className="contact-heading">Contact Us</h2>
      <p className="contact-description">
        Have questions or feedback? We'd love to hear from you! Reach out to our support team at
        <a href="mailto:support@[yourdomain].com" className="contact-email">support@[yourdomain].com</a>
        or follow us on social media for updates and tips.
      </p>
    </div>
  );
}

export default About;