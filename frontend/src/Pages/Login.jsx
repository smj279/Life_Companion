import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        console.error('Login error:', data.error); 
        alert(data.error);
      }
    } catch (error) {
      console.error('Login error:', error); 
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="Container1">
      <h2>Welcome Back!</h2>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
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
