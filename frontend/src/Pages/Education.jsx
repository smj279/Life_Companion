// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaArrowLeft } from 'react-icons/fa';
// import './Education.css'; 

// const Education = () => {
//   const [school, setSchool] = useState('');
//   const [schoolYear, setSchoolYear] = useState('');
//   const [college, setCollege] = useState('');
//   const [collegeYear, setCollegeYear] = useState('');
//   const [university, setUniversity] = useState('');
//   const [universityYear, setUniversityYear] = useState('');
//   const [currentStatus, setCurrentStatus] = useState('');
//   const [occupation, setOccupation] = useState('');

//   const occupations = [
//     'Accountant', 'Architect', 'Artist', 'Banker', 'Business', 'Carpenter', 'Chef', 'Chemical Engineer', 'Cleaner', 'Corporate Officer',
//     'Dentist', 'Designer', 'Doctor', 'Engineer', 'Student', 'Teacher', 'Lawyer', 'Musician', 
//     'Scientist', 'Management', 'Healthcare', 'Other'
//   ];

//   const handleNextClick = (e) => {
//     if (!school || !schoolYear || !college || !collegeYear || !university || !universityYear || !currentStatus || !occupation) {
//       e.preventDefault();
//       alert('Please fill out all fields');
//     }
//   };

//   return (
//     <div className="page-background">
//       <div className="Container3">
//         <Link to="/additional-info" className="previous-arrow">
//           <FaArrowLeft />
//         </Link>
//         <h1>Education Information</h1>
//         <form>
//           <input
//             type="text"
//             placeholder="School"
//             value={school}
//             onChange={(e) => setSchool(e.target.value)}
//             className="styled-input"
//           />
//           <input
//             type="text"
//             placeholder="Year Completed School"
//             value={schoolYear}
//             onChange={(e) => setSchoolYear(e.target.value)}
//             className="styled-input"
//           />
//           <input
//             type="text"
//             placeholder="College"
//             value={college}
//             onChange={(e) => setCollege(e.target.value)}
//             className="styled-input"
//           />
//           <input
//             type="text"
//             placeholder="Year Completed College"
//             value={collegeYear}
//             onChange={(e) => setCollegeYear(e.target.value)}
//             className="styled-input"
//           />
//           <input
//             type="text"
//             placeholder="University"
//             value={university}
//             onChange={(e) => setUniversity(e.target.value)}
//             className="styled-input"
//           />
//           <input
//             type="text"
//             placeholder="Year Completed University"
//             value={universityYear}
//             onChange={(e) => setUniversityYear(e.target.value)}
//             className="styled-input"
//           />
//           <input
//             type="text"
//             placeholder="Current Status"
//             value={currentStatus}
//             onChange={(e) => setCurrentStatus(e.target.value)}
//             className="styled-input"
//           />
//           <select
//             value={occupation}
//             onChange={(e) => setOccupation(e.target.value)}
//             className="styled-input"
//           >
//             <option value="">Select Occupation</option>
//             {occupations.map((occupation) => (
//               <option key={occupation} value={occupation}>
//                 {occupation}
//               </option>
//             ))}
//           </select>
//           <Link to="/signup" onClick={handleNextClick}>
//             <button type="button" className="styled-button">Next</button>
//           </Link>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Education;




import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './Education.css'; 

const Education = () => {
  const [school, setSchool] = useState('');
  const [schoolYear, setSchoolYear] = useState('');
  const [college, setCollege] = useState('');
  const [collegeYear, setCollegeYear] = useState('');
  const [university, setUniversity] = useState('');
  const [universityYear, setUniversityYear] = useState('');
  const [currentStatus, setCurrentStatus] = useState('');
  const [occupation, setOccupation] = useState('');

  const occupations = [
    'Accountant', 'Architect', 'Artist', 'Banker', 'Business', 'Carpenter', 'Chef', 'Chemical Engineer', 'Cleaner', 'Corporate Officer',
    'Dentist', 'Designer', 'Doctor', 'Engineer', 'Student', 'Teacher', 'Lawyer', 'Musician', 
    'Scientist', 'Management', 'Healthcare', 'Other'
  ];

  const handleNextClick = (e) => {
    if (!school || !schoolYear || !college || !collegeYear || !university || !universityYear || !currentStatus || !occupation) {
      e.preventDefault();
      alert('Please fill out all fields');
    }
  };

  return (
    <div className="education-container">
      <Link to="/additional-info" className="previous-arrow">
        <FaArrowLeft />
      </Link>
      <h1 className="education-title">Education Information</h1>
      <form>
        <div className="input-group">
          <label htmlFor="school" className="education-label">School</label>
          <input
            type="text"
            id="school"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            className="education-input"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="schoolYear" className="education-label">Year Completed School</label>
          <input
            type="text"
            id="schoolYear"
            value={schoolYear}
            onChange={(e) => setSchoolYear(e.target.value)}
            className="education-input"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="college" className="education-label">College</label>
          <input
            type="text"
            id="college"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            className="education-input"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="collegeYear" className="education-label">Year Completed College</label>
          <input
            type="text"
            id="collegeYear"
            value={collegeYear}
            onChange={(e) => setCollegeYear(e.target.value)}
            className="education-input"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="university" className="education-label">University</label>
          <input
            type="text"
            id="university"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            className="education-input"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="universityYear" className="education-label">Year Completed University</label>
          <input
            type="text"
            id="universityYear"
            value={universityYear}
            onChange={(e) => setUniversityYear(e.target.value)}
            className="education-input"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="currentStatus" className="education-label">Current Status</label>
          <input
            type="text"
            id="currentStatus"
            value={currentStatus}
            onChange={(e) => setCurrentStatus(e.target.value)}
            className="education-input"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="occupation" className="education-label">Occupation</label>
          <select
            id="occupation"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            className="education-input"
            required
          >
            <option value="">Select Occupation</option>
            {occupations.map((occupation) => (
              <option key={occupation} value={occupation}>
                {occupation}
              </option>
            ))}
          </select>
        </div>
        <Link to="/signup" onClick={handleNextClick}>
          <button type="button" className="styled-button">Next</button>
        </Link>
      </form>
    </div>
  );
};

export default Education;


