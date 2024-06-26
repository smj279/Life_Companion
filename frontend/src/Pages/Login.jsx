
import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  return (
    <div className="Container1">
      <h2>Welcome Back!</h2>
      <h2>Login</h2>
      <form>
        <input type="text" placeholder="User Name" />
        <input type="password" placeholder="Password" />
      </form>
      <div className="recover-password">
        <a href="#">Forgot password</a>
      </div>
      <button>Login</button>
      <div className="member">
        Don't have an account? <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
};

export default Login;


