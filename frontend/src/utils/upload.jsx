import axios from 'axios';

const upload = async (file) => {
  const formData = new FormData();
  formData.append('profilePicture', file);  // Use 'profilePicture' as the key

  try {
    const token = localStorage.getItem('token');
    
    // Make a POST request to the backend route you created
    const response = await axios.post('http://localhost:5000/api/auth/upload', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',  // Ensure correct content type
      },
    });

    const { user } = response.data;
    return user.profilePicture;  // Return the updated profile picture URL
  } catch (error) {
    console.error('Error uploading profile picture:', error);
  }
};

export default upload;
