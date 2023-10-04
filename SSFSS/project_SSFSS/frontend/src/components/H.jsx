import React, { useState, useEffect } from 'react';
import './h.css';

function H() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = ['Slide 1', 'Slide 2', 'Slide 3'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider-container">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === currentIndex ? 'active' : ''}`}
        >
          {slide}
        </div>
      ))}
    </div>
  );
}

export default H;
