// App.js
import React from 'react';
import './About1.css';
import Header from './Header';
import AboutSection from './AboutSection';
import Footer from './Footer';

function About1() {
    const sections = [
        {
            title: 'Our Mission',
            content: 'We are dedicated to helping individuals find their perfect life partner through our innovative platform.',
            image: 'about-image.jpg', // Replace with actual image path
        },
        {
            title: 'Our Team',
            content: 'We are a passionate team of experts committed to ensuring your journey to finding love is smooth and enjoyable.',
            image: 'team-image.jpg', // Replace with actual image path
        }
    ];

    return (
        <div className="App">
            <Header />
            <main>
                {sections.map((section, index) => (
                    <AboutSection
                        key={index}
                        title={section.title}
                        content={section.content}
                        image={section.image}
                    />
                ))}
            </main>
            <Footer />
        </div>
    );
}

export default App;
