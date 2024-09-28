import React, { useEffect, useState } from 'react';
import './FullInformation.css'; 
import { FaBriefcase, FaGraduationCap, FaHeart, FaUtensils, FaBook, FaWeight, FaRuler } from 'react-icons/fa';
import uploadImage from '../utils/upload'; 

const FullInformation = () => {
  const [educationOccupation, setEducationOccupation] = useState({});
  const [additionalInformation, setAdditionalInformation] = useState({});
  const [photo1, setPhoto1] = useState('https://your-photo-url1.com'); 
  const [photo2, setPhoto2] = useState('https://your-photo-url2.com');
  const [loadingPhoto1, setLoadingPhoto1] = useState(false);
  const [loadingPhoto2, setLoadingPhoto2] = useState(false);

  useEffect(() => {
    const storedPhoto1 = localStorage.getItem('photo1');
    const storedPhoto2 = localStorage.getItem('photo2');
    if (storedPhoto1) setPhoto1(storedPhoto1);
    if (storedPhoto2) setPhoto2(storedPhoto2);

    const fetchFullInfo = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found, please login again.');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/auth/full-info', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setEducationOccupation(data.educationOccupation);
          setAdditionalInformation(data.additionalInformation);
        } else {
          console.error('Error fetching full information:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching full information:', error);
      }
    };

    fetchFullInfo();
  }, []);

  const handlePhoto1Upload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoadingPhoto1(true);
      try {
        const url = await uploadImage(file); 
        setPhoto1(url);
        localStorage.setItem('photo1', url); 
      } catch (error) {
        console.error('Error uploading Photo 1:', error);
      } finally {
        setLoadingPhoto1(false);
      }
    }
  };

  const handlePhoto2Upload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoadingPhoto2(true);
      try {
        const url = await uploadImage(file); 
        setPhoto2(url);
        localStorage.setItem('photo2', url); 
      } catch (error) {
        console.error('Error uploading Photo 2:', error);
      } finally {
        setLoadingPhoto2(false);
      }
    }
  };

  return (
    <div className="profile-container">
      <div className="photo-section">
        <div className="photo-upload-container">
          <input
            type="file"
            id="photo1Input"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handlePhoto1Upload}
          />
          <img
            src={photo1}
            alt="Photo 1"
            className="profile-photo"
            onClick={() => document.getElementById('photo1Input').click()}
          />
          {loadingPhoto1 && <p>Uploading Photo 1...</p>}
        </div>

        <div className="photo-upload-container">
          <input
            type="file"
            id="photo2Input"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handlePhoto2Upload}
          />
          <img
            src={photo2}
            alt="Photo 2"
            className="profile-photo"
            onClick={() => document.getElementById('photo2Input').click()}
          />
          {loadingPhoto2 && <p>Uploading Photo 2...</p>}
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

export default FullInformation;
