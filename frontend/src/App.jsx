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

import FullInformation from './Pages/FullInformation'; // Ensure the import is correct
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import DashboardPage from './Pages/DashboardPage';
import NotificationsPage from './Pages/NotificationsPage';
import Story1 from './Pages/Story1';
import Story2 from './Pages/Story2';
import Story3 from './Pages/Story3';
import AboutUs from './Pages/About';
import HelpPage from './Pages/HelpPage';

import Profile from './Pages/Profile'; // Renamed component for logged-in user profile
import OthersProfile from './Pages/OthersProfile'; // New component for viewing other users' profiles
import ChatBox from './Pages/ChatBox'; // Import ChatBox component
import MatchedPartners from './Pages/MatchedPartners'; // Import MatchedPartners component
import ChatRoom from './Pages/ChatRoom'; // Import ChatRoom component

import { UserProvider } from './context/UserContext'; // Import UserProvider
import './App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="app">
          <Routes>
            {/* Main page */}
            <Route 
              path="/" 
              element={
                <>
                  <Header />
                  <NewSection />
                  <CarouselSection />
                  <ContentSection />
                </>
              } 
            />
            
            {/* Other routes */}
            <Route path="/profile-form" element={<ProfileForm />} />
            <Route path="/additional-info" element={<AdditionalInfoForm />} />
            <Route path="/education" element={<Education />} />

            {/* Full Information Route */}
            <Route path="/full-information" element={<FullInformation />} /> {/* Correct route */}

            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/story1" element={<Story1 />} />
            <Route path="/story2" element={<Story2 />} />
            <Route path="/story3" element={<Story3 />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/help" element={<HelpPage />} />

            {/* New route for logged-in user's profile */}
            <Route path="/profile" element={<Profile />} /> 

            {/* New route for viewing other users' profiles */}
            <Route path="/profile/:userId" element={<OthersProfile />} /> 

            {/* New route for matched partners */}
            <Route path="/matched-partners" element={<MatchedPartners />} />

            {/* ChatBox route - included if needed separately */}
            <Route path="/chat/:senderId/:receiverId" element={<ChatBox />} /> {/* Chat route */}

            {/* New route for ChatRoom */}
            <Route path="/chat-room" element={<ChatRoom />} /> {/* ChatRoom route */}
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
