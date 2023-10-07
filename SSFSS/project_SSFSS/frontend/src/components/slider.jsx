import React, { useState, useEffect } from "react";
import "./slider.css";



const sliderContent = [
  {
    title: "Secure file storage",
    description:
      "Store your files in a highly secure environment with advanced encryption technology.",
  },
  {
    title: "Access Control",
    description:
      "Control who can access your files and folders with fine-grained permissions and management.",
  },
  {
    title: "Collaboration",
    description:
      "Collaborate with your team by sharing files, commenting, and tracking changes in real-time.",
  },
];

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % sliderContent.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prevIndex) =>
        (prevIndex - 1 + sliderContent.length) % sliderContent.length
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="slider-container">
       
      <button className="slider-arrow left" onClick={prevSlide}>
        &lt;
      </button>
      <div className="slider-wrapper">
        {sliderContent.map((slide, index) => (
          <div
            className="slider"
            key={index}
            style={{
              transform: `translateX(${-activeIndex * 100}%)`,
            }}
          >
            <div>
              <h1>{slide.title}</h1>
              <br />
            </div>
            <div>
              <p>{slide.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="slider-arrow right" onClick={nextSlide}>
        &gt;
      </button>
    </div>
  );
};



export default Slider;
