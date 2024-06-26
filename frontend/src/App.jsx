import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Pages/Header';
import ContentSection from './Pages/ContentSection';
import NewSection from './Pages/NewSection';
import CarouselSection from './Pages/CarouselSection';
import ProfileForm from './Pages/ProfileForm';
import AdditionalInfoForm from './Pages/AdditionalInfoForm';
import Education from './Pages/Education';
//import More_Info from './Pages/More_Info';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
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
           {/* <Route path="/more-info" component= {<More_Info/>}/> */}
           <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;




