import React from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  return (
    <div className="Container1">
      <h1>Sign Up</h1>
      <form>
        <input type="text" placeholder="Full Name" />
        <input type="text" placeholder="User Name" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Re-Enter Password" />
        <input type="email" placeholder="Email Address" />
        <input type="tel" placeholder="Phone Number" />
      </form>
      <div className="terms">
        <input type="checkbox" id="checkbox" />
        <label htmlFor="checkbox">
          I agree to the <a href="#">Terms & Conditions</a>
        </label>
      </div>
      <div className="button1">
        <button>Sign Up</button>
        {/* <Link to="/more-info">
          <button>Next</button>
        </Link> */}
      </div>
      <div className="member">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default SignUp;
