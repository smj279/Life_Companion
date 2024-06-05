// CarouselSection.jsx
import React, { useState } from 'react';
import './CarouselSection.css';
import image1 from '../assets/carousel1.png';
import image2 from '../assets/carousel2.png';
import image3 from '../assets/carousel3.png';
import image4 from '../assets/carousel4.png';

const CarouselSection = () => {
  const [currentImage, setCurrentImage] = useState(image1);

  const images = [image1, image2, image3, image4];
  const captions = [
    "Find your perfect match",
    "Join thousands of happy couples",
    "Safe and secure platform",
    "Start your love journey today"
  ];

  const handleImageClick = (index) => {
    setCurrentImage(images[index]);
  };

  return (
    <div className="carousel-section">
      <div className="carousel-image-container">
        <img src={currentImage} alt="Carousel" className="carousel-image" />
      </div>
      <div className="carousel-thumbnails">
        {images.map((img, index) => (
          <div key={index} className="thumbnail" onClick={() => handleImageClick(index)}>
            <img src={img} alt={`Thumbnail ${index + 1}`} className="thumbnail-image" />
            <div className="thumbnail-caption">{captions[index]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselSection;
