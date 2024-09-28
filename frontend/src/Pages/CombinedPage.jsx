import React, { useState } from 'react';
import './CombinedPage.css';
import image1 from '../assets/image1.png'; 
import image2 from '../assets/image2.png'; 
import image3 from '../assets/image3.png'; 
import carouselImage1 from '../assets/carousel1.png';
import carouselImage2 from '../assets/carousel2.png';
import carouselImage3 from '../assets/carousel3.png';
import carouselImage4 from '../assets/carousel4.png';


// NewSection Component
const NewSection = () => {
  return (
    <div className="new-section">
      <div className="section-part">
        <img src={image1} alt="Relationship Advise" />
        <h3>Relationship Advise</h3>
        <p>
          Welcome to our Relationship Advice section! Here, you'll find a treasure trove of insights and guidance from our team of seasoned experts. Our dedicated professionals work tirelessly to provide you with comprehensive and heartfelt advice on all aspects of relationships. Whether you're navigating the intricacies of marriage, exploring the world of dating, or searching for that special someone, we’ve got you covered.
        </p>
      </div>
      <div className="section-part">
        <img src={image2} alt="Find Someone Special Near You" />
        <h3>Find Someone Special Near You</h3>
        <p>
          Discover the joy of connecting with your soulmate who might be just around the corner or within your city! Our platform is designed to help you find that special someone who shares your interests, values, and aspirations.
        </p>
      </div>
      <div className="section-part">
        <img src={image3} alt="Let A Matchmaker Help You" />
        <h3>Let A Matchmaker Help You</h3>
        <p>
          Are you a busy professional finding it challenging to meet potential partners? It’s time to consider the expertise of a matchmaker who can streamline your search for love. Our matchmakers are dedicated to understanding your preferences and lifestyle, making it easier for you to find a compatible match.
        </p>
      </div>
    </div>
  );
};

// CarouselSection Component
const CarouselSection = () => {
  const [currentImage, setCurrentImage] = useState(carouselImage1);

  const images = [carouselImage1, carouselImage2, carouselImage3, carouselImage4];
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

// ContentSection Component
const ContentSection = () => {
  return (
    <div className="content-section">
      <h2>LIFE COMPANION THE BEST ONLINE SITE TO CHOOSE YOUR LIFE PARTNER</h2>
      <p>
        "Welcome to our new matrimonial site, where finding your life partner is made easier and more enjoyable than ever before. Our mission is simple yet profound: to help individuals from all walks of life connect with their perfect match in a safe, supportive, and inclusive environment. With advanced search options, personalized matchmaking, and stringent verification processes, we prioritize user satisfaction and safety above all else.But don't just take our word for it—our success stories speak for themselves. From couples who found love at first click to those who discovered lifelong companionship through our platform, our site has become a beacon of hope for those seeking lasting relationships. We pride ourselves on fostering a sense of community and support, offering forums, blogs, and counseling services to guide users every step of the way. Rest assured, your privacy and security are our utmost priorities, and we are committed to maintaining a diverse and inclusive space where everyone feels welcome. Whether you're browsing on your computer or searching on the go with our mobile-friendly platform, we're here to make your journey to love as seamless and enjoyable as possible. And with dedicated customer support available whenever you need it, you can trust that we're always here to help. So join us on this exciting journey, and let's create meaningful connections together."
      </p>
      <div className="about-life">
        <h3>About Life Companion</h3>
        <p>
          Life Companion is a new online website. Through our network, we want to make the process of the relationship journey relatively effortless. All profiles are checked manually with phone verification to ensure a safe environment for the users. We will use the National ID card of the user for authentication work.
        </p>
      </div>

      <div className="footer-links">
        <div className="footer-column">
          <h4 className="footer-headline">Need Help?</h4>
          <ul>
            <li><a href="#">Member Login</a></li>
            <li><a href="#">Sign Up</a></li>
            <li><a href="#">Member Support</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4 className="footer-headline">Company</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Helpful Tips</a></li>
            <li><a href="#">Submit Story</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4 className="footer-headline">Privacy & You</h4>
          <ul>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4 className="footer-headline">More</h4>
          <ul>
            <li><a href="#">Parent Involved</a></li>
            <li><a href="#">Unique Style Wedding</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-note">
        <p>Life Companion is a new online website and should not be used without permission.</p>
      </div>

      <div className="red-section">
        <h3>Get Connected With Us</h3>
        <p>"Opt for a joyful existence by finding the perfect life partner."</p>
      </div>
    </div>
  );
};

// CombinedPage Component
const CombinedPage = () => {
  return (
    <div>
      <NewSection />
      <CarouselSection />
      <ContentSection />
    </div>
  );
};

export default CombinedPage;
