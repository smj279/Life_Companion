import React from 'react';
import  './HelpPage.css'
 const HelpPage = () => {
  return (
    <div className="help-page">
      <h1>Welcome to Our Matrimony Help Center</h1>

      <section>
        <h2>Frequently Asked Questions (FAQs)</h2>
        <div className="faq">
          <div className="question">
            <h3>How do I create an account?</h3>
            <p>Steps to create an account on the website.</p>
          </div>
          <div className="question">
            <h3>How do I edit my profile?</h3>
            <p>Instructions on how to update profile information.</p>
          </div>
          {/* Add more FAQ items */}
        </div>
      </section>

      <section>
        <h2>Safety and Privacy</h2>
        <ul>
          <li><a href="/privacy-policy">Privacy Policy</a></li>
          <li><a href="/safety-tips">Safety Tips</a></li>
        </ul>
      </section>

      <section>
        <h2>Contact Information</h2>
        <p>For customer support, please contact us at <a href="mailto:support@example.com">support@example.com</a>.</p>
      </section>

      <section>
        <h2>Additional Resources</h2>
        <ul>
          <li><a href="/terms-of-use">Terms of Use</a></li>
          <li><a href="/feedback">Feedback</a></li>
        </ul>
      </section>

      <footer>
        <ul className="footer-links">
          <li><a href="/about-us">About Us</a></li>
          <li><a href="/careers">Careers</a></li>
          <li><a href="/social-media">Social Media</a></li>
        </ul>
      </footer>
    </div>
  );
};
export default HelpPage;


