//re4set
import { useState } from "react";
import { IoLockClosedOutline, IoCloseOutline ,IoEyeOffOutline} from "react-icons/io5";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; 
import './forgotPassword.css';

export default function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams(); 
  console.log("Token from URL:", token);
  const [password, setPassword] = useState(''); 
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');


  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
        const res = await axios.post("http://localhost:8000/auth/reset-password/${token}", { password });
        setMessage(res.data.message);
        if (res.status === 200) {
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        }
    } catch (e) {
        setError(e.response?.data?.message || 'Something went wrong. Please try again.');
        console.log(e);
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="min-h-screen flex flex-col justify-center px-5 bg-backgroundColor">
      <div className="wrapper">
        <div className="forgot-password-box">
          <form onSubmit={handleResetPassword}>
            <h2>Reset Password</h2>
            <span className="icon-close" onClick={() => navigate('/')}>
              <IoCloseOutline />
            </span>

            <div className="input-box">
              <span className="icon">
                <IoLockClosedOutline />
              </span>
              <input
                type={showPassword ? "text" : "password"} // Toggle between text and password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label>New Password</label>
              <span
                className="toggle-password-visibility" // Styling for the icon
                onClick={() => setShowPassword(!showPassword)} // Toggle state on click
              >
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOffOutline />}
              </span>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Update Password'}
            </button>

            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}