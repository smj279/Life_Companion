//forgot
import { useState } from "react";
import { IoMailOutline, IoCloseOutline } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './forgotPassword.css'

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await axios.post("http://localhost:8000/auth/forgot-password", { email });
      setMessage(res.data.message);
    } catch (e) {
      setError(e.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-5 bg-backgroundColor">
      <div className="wrapper">
        <div className="forgot-password-box">
          <form onSubmit={handleForgotPassword}>
            <h2>Forgot Password</h2>
            <span className="icon-close" onClick={() => navigate('/')}>
              <IoCloseOutline />
            </span>

            <div className="input-box">
              <span className="icon">
                <IoMailOutline />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>Email</label>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>

            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}