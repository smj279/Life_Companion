import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="Container1">
      <h2>Welcome Back!</h2>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="User Name" />
        <input type="password" placeholder="Password" />
        <div className="recover-password">
          <a href="#">Forgot password</a>
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="member">
        Don't have an account? <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
};

export default Login;
