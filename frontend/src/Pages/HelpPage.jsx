import React from 'react';
import './HelpPage.css';

const HelpPage = () => {
  return (
    <div className="help-page">
      <h1>Welcome to Our Matrimony Help Center</h1>

      <section>
        <h2>Frequently Asked Questions (FAQs)</h2>
        <div className="faq">
          <div className="question">
            <h3>How do I create an account?</h3>
            <p>To create an account, follow these steps:</p>
            <ol>
              <p>Go to the <a href="/signup">Signup Page</a>.</p>
              <p>Fill in your personal details, including your first name, last name, email, and password.</p>
              <p>Enter your date of birth to ensure you meet the age requirements.</p>
              <p>Select your gender from the dropdown menu.</p>
              <p>Provide your phone number for account verification purposes.</p>
              <p>Enter your address details, including city, state, and country.</p>
              <p>Optionally, you can upload a profile picture to personalize your account.</p>
              <p>Click the "Sign Up" button to submit your registration form.</p>
              <p>Check your email for a confirmation message from our team.</p>
              <p>Follow the instructions in the email to verify your account and complete the signup process.</p>
            </ol>
          </div>
          <div className="question">
            <h3>How do I edit my profile?</h3>
            <p>To update your profile information, follow these steps:</p>
            <ol>
              <p>Log in to your account.</p>
              <p>Navigate to your profile page by clicking on your profile icon or name in the top-right corner.</p>
              <p>Click on the "Edit Profile" button located on your profile page.</p>
              <p>Update your information in the provided fields (e.g., personal details, profile picture).</p>
              <p>Click "Save" to apply the changes and update your profile.</p>
            </ol>
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
        <p>For customer support, please contact us at <a href="mailto:marjanamonir02@gmail.com">marjanamonir02@gmail.com</a>.</p>
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