// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Pages/Header';
import ContentSection from './Pages/ContentSection';
import NewSection from './Pages/NewSection';
import CarouselSection from './Pages/CarouselSection';
import ProfileForm from './Pages/ProfileForm';
import AdditionalInfoForm from './Pages/AdditionalInfoForm';
import Education from './Pages/Education';
import MoreInfo from './Pages/MoreInfo';  // Make sure this path matches the new MoreInfo page
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import DashboardPage from './Pages/DashboardPage';
import Story1 from './Pages/Story1';
import Story2 from './Pages/Story2';
import Story3 from './Pages/Story3';
import AboutUs from './Pages/About'; 
import HelpPage from './Pages/HelpPage';
import Profile from './Pages/Profile';

import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <NewSection />
              <CarouselSection />
              <ContentSection />
            </>
          } />
          
          <Route path="/profile-form" element={<ProfileForm />} />
          <Route path="/additional-info" element={<AdditionalInfoForm/>} />
          <Route path="/education" element={<Education/>} />
          <Route path="/more-info" element={<MoreInfo />} />  {/* Route for More Info */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/story1" element={<Story1 />} />
          <Route path="/story2" element={<Story2 />} />
          <Route path="/story3" element={<Story3 />} />
          <Route path="/about-us" element={<AboutUs />} /> {/* Use AboutUs component */}
          <Route path="/help" element={<HelpPage/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
