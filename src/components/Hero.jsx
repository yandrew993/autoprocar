import React, { useEffect, useState } from 'react';
import './Hero.scss';

const slidesData = [
  {
    src: 'https://i.ibb.co/NnQgM65c/web.jpg',
    alt: 'Auto Repair Service 1',
  },
  {
    src: 'https://i.ibb.co/NgtCG6px/web1.jpg',
    alt: 'Auto Repair Service 2',
  },
  {
    src: 'https://i.ibb.co/TBFKTTtY/webb.jpg',
    alt: 'Auto Repair Service 3',
  },
  {
    src: 'https://i.ibb.co/NnQgM65c/web.jpg',
    alt: 'Auto Repair Service 4',
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="hero"
      style={{
        minHeight: '100vh',
        height: '100dvh',
        display: 'flex',
        alignItems: 'center',
        padding: 0,
      }}
    >
      <div className="hero-inner" style={{ width: '100%' }}>
        <div className="hero-content">
          <h1>Expert Car Repair You Can Trust</h1>
          <p className="hero-desc">
            Serving the community with over 15 years of experience in professional
            auto repair and maintenance. Your vehicle's health is our top priority.
          </p>
          <div className="hero-buttons">
            <a href="#booking" className="btn primary">
              Book an Appointment
            </a>
          </div>
        </div>
        <div className="slideshow-container">
          <div className="slideshow-wrapper">
            {slidesData.map((slide, idx) => (
              <img
                key={idx}
                src={slide.src}
                alt={slide.alt}
                className={`slide${
                  idx === currentSlide ? ' active' : ''
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;