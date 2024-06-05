import React from 'react';
import Header from './Pages/Header';
import ContentSection from './Pages/ContentSection';
import NewSection from './Pages/NewSection';
import CarouselSection from './Pages/CarouselSection';


function App() {
  return (
    <div className="app">
      <Header />
      <NewSection />
      <CarouselSection />
      <ContentSection />
      
    </div>
  );
}

export default App;
