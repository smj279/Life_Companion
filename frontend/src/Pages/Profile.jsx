import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();

  // Load profile picture from localStorage if it exists
  const storedProfilePicture = localStorage.getItem('profilePicture') || '/path/to/default-picture.jpg';

  // State variables for profile information
  const [name, setName] = useState('John Doe');
  const [presentAddress, setPresentAddress] = useState('Not provided');
  const [permanentAddress, setPermanentAddress] = useState('Not provided');
  const [dob, setDob] = useState('Not provided');
  const [gender, setGender] = useState('Not provided');
  const [occupation, setOccupation] = useState('Not provided');
  const [religion, setReligion] = useState('Not provided');
  const [profilePicture, setProfilePicture] = useState(storedProfilePicture); // Initialize with stored picture
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    // Fetch user profile data from backend
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/auth/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Send JWT token in headers
          },
        });

        const data = await response.json();
        if (response.ok) {
          // Populate state variables with profile data from backend
          setName(data.fullName);
          setPresentAddress(data.presentAddress);
          setPermanentAddress(data.permanentAddress);
          setDob(new Date(data.dob).toLocaleDateString());
          setGender(data.gender);
          setOccupation(data.occupation);
          setReligion(data.religion);
          setProfilePicture(data.profilePicture || storedProfilePicture); // Handle profile picture from backend
        } else {
          console.error('Error fetching user data:', data.error);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // Handle profile picture change and upload
  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true); // Show loading state

      try {
        // Preview the image locally
        const reader = new FileReader();
        reader.onloadend = () => {
          const uploadedImageUrl = reader.result;
          setProfilePicture(uploadedImageUrl); // Show preview of the image
          localStorage.setItem('profilePicture', uploadedImageUrl); // Store image URL in localStorage
        };
        reader.readAsDataURL(file);

        // Prepare image data for backend upload
        const formData = new FormData();
        formData.append('profilePicture', file);
        
        const token = localStorage.getItem('token');

        // Upload image to the backend
        const uploadResponse = await axios.post('http://localhost:5000/api/auth/upload', formData, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
        });

        if (uploadResponse.status !== 200) {
          throw new Error('Failed to upload image to the server.');
        }

        // Assuming backend returns the URL of the uploaded image
        const uploadedImageUrl = uploadResponse.data.profilePictureUrl;

        // Update profile picture URL after successful upload
        setProfilePicture(uploadedImageUrl);
        localStorage.setItem('profilePicture', uploadedImageUrl); // Store URL

        console.log('Image successfully uploaded:', uploadedImageUrl);

        // Optionally, update user profile with new profile picture URL
        await axios.put('http://localhost:5000/api/auth/updateProfile', 
          { profilePicture: uploadedImageUrl },
          { headers: { 'Authorization': `Bearer ${token}` } }
        );

      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-picture">
          {/* Hidden file input for profile picture */}
          <input 
            type="file" 
            id="profilePictureInput" 
            style={{ display: 'none' }} 
            accept="image/*" 
            onChange={handleProfilePictureChange} // Handle file selection
          />
          {/* Profile picture (clickable) */}
          <img 
            src={profilePicture} 
            alt="Profile" 
            onClick={() => document.getElementById('profilePictureInput').click()} // Trigger file input click
            style={{ cursor: 'pointer', width: '150px', height: '150px', borderRadius: '50%' }} // Styling the picture as a circle
          />
          {loading && <p>Uploading...</p>} {/* Loading indicator */}
        </div>

        {/* Profile information */}
        <h2 className="profile-name">{name}</h2>

        <div className="profile-content">
          <div className="profile-section">
            <h3>About Me</h3>
            <p>Date of Birth: {dob}</p>
            <p>Gender: {gender}</p>
            <p>Present Address: {presentAddress}</p>
            <p>Permanent Address: {permanentAddress}</p>
            <p>Occupation: {occupation}</p>
            <p>Religion: {religion}</p>
          </div>
        </div>

        {/* Profile action buttons */}
        <div className="profile-actions">
          <button className="action-button">Match</button>
          <button className="action-button" onClick={() => navigate('/messages/12345')}>Message</button>
          <button className="action-button" onClick={() => navigate('/full-information')}>Full Information</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;