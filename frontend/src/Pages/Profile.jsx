import React, { useState } from 'react';
import './Profile.css';
import storyImage3 from '../assets/story3.jpg'; 

const Profile = () => {
  const [profileData, setProfileData] = useState({
    profilePicture: null,
    name: "Mahfuj Rahman",
    dateOfBirth: "20/11/2003",
    presentAddress: "sun",
    permanentAddress: "aust",
    fathersName: "abc",
    mothersName: "abc"
  });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProfileData();
//   }, []);

//   const fetchProfileData = async () => {
//     try {
//       const response = await fetch('http://example.com/api/profile');
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       setProfileData(data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching profile data:', error);
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!profileData) {
//     return <div>Error: Unable to fetch profile data</div>;
//   }

  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-picture">
          <img src={storyImage3} alt="Profile" />
        </div>
        <div className="profile-name">
          <h2>{profileData.name}</h2>
        </div>
      </div>
      <div className="profile-details">
        <div className="profile-detail-item">
          <strong>Date of Birth:</strong> {profileData.dateOfBirth}
        </div>
        <div className="profile-detail-item">
          <strong>Present Address:</strong> {profileData.presentAddress}
        </div>
        <div className="profile-detail-item">
          <strong>Permanent Address:</strong> {profileData.permanentAddress}
        </div>
        <div className="profile-detail-item">
          <strong>Father's Name:</strong> {profileData.fathersName}
        </div>
        <div className="profile-detail-item">
          <strong>Mother's Name:</strong> {profileData.mothersName}
        </div>
      </div>
    </div>
  );
};

export default Profile;