import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import './FullInformation.css'; // Reuse the same CSS
import { FaBriefcase, FaGraduationCap, FaHeart, FaUtensils, FaBook, FaWeight, FaRuler } from 'react-icons/fa';

const OthersFullInformation = () => {
  const { userId } = useParams(); // Get userId from URL params
  const [educationOccupation, setEducationOccupation] = useState({});
  const [additionalInformation, setAdditionalInformation] = useState({});
  const [photo1, setPhoto1] = useState(''); 
  const [photo2, setPhoto2] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found, please login again.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/users/other-full-info/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setEducationOccupation(data.educationOccupation);
          setAdditionalInformation(data.additionalInformation);
          setPhoto1(data.photo1);
          setPhoto2(data.photo2);
        } else {
          console.error('Error fetching user details:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]); // Add userId to dependency array

  return (
    <div className="profile-container">
      <div className="photo-section">
        <div className="photo-upload-container">
          <img
            src={photo1}
            alt="Photo 1"
            className="profile-photo"
          />
        </div>

        <div className="photo-upload-container">
          <img
            src={photo2}
            alt="Photo 2"
            className="profile-photo"
          />
        </div>
      </div>

      <div className="info-sections">
        <div className="info-card">
          <h2><FaGraduationCap className="icon" /> Education & Occupation</h2>
          <p><FaBriefcase className="icon" /> <strong>Occupation:</strong> {educationOccupation.occupation || 'N/A'}</p>
          <p><strong>School:</strong> {educationOccupation.school || 'N/A'}</p>
          <p><strong>School Year:</strong> {educationOccupation.schoolYear || 'N/A'}</p>
          <p><strong>College:</strong> {educationOccupation.college || 'N/A'}</p>
          <p><strong>College Year:</strong> {educationOccupation.collegeYear || 'N/A'}</p>
          <p><strong>University:</strong> {educationOccupation.university || 'N/A'}</p>
          <p><strong>Status:</strong> {educationOccupation.currentStatus || 'N/A'}</p>
        </div>

        <div className="info-card">
          <h2><FaHeart className="icon" /> Additional Information</h2>
          <p><FaHeart className="icon" /> <strong>Religion:</strong> {additionalInformation.religion || 'N/A'}</p>
          <p><FaUtensils className="icon" /> <strong>Food Habit:</strong> {additionalInformation.foodHabit || 'N/A'}</p>
          <p><FaWeight className="icon" /> <strong>Weight:</strong> {additionalInformation.weight || 'N/A'} kg</p>
          <p><FaRuler className="icon" /> <strong>Height:</strong> {additionalInformation.height || 'N/A'} cm</p>
          <p><FaBook className="icon" /> <strong>Hobby:</strong> {additionalInformation.hobby || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default OthersFullInformation;
