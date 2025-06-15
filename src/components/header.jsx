// src/components/Header.jsx
import React from "react";
// Import the Slide component and its CSS
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'; // Don't forget to import its CSS

export const Header = (props) => {
  // Define your slider images
  const sliderImages = [
    "img/hero-slide-1.png", // Make sure these files exist in public/img/
    "img/hero-slide-2.png",
    "img/hero-slide-3.png",
    "img/hero-slide-4.png",
    "img/image_1f017e.png", // Image 4
  ];

  // Define properties for the slideshow
  const properties = {
    duration: 1000, // Display each slide for 1 second (1000ms)
    transitionDuration: 500, // Transition speed between slides in milliseconds
    infinite: true,
    indicators: false, // Set to true if you want navigation dots
    arrows: false, // Set to true if you want navigation arrows
    autoplay: true,
    pauseOnHover: false, // Continues playing on hover
    // Additional properties can be found in react-slideshow-image docs
  };

  return (
    <header id="header">
      <div className="intro">
        {/* Slider for background images */}
        <Slide {...properties}>
          {sliderImages.map((image, index) => (
            <div key={index} className="each-slide-effect">
              {/* This div will hold the background image for each slide */}
              <div style={{ backgroundImage: `url(${image})` }}>
                {/* Optional: You can put specific content for each slide here if needed */}
              </div>
            </div>
          ))}
        </Slide>

        {/* Overlay and intro text, positioned on top of the slider */}
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1>
                  {props.data ? props.data.title : "Loading"}
                  <span></span>
                </h1>
                <p>{props.data ? props.data.paragraph : "Loading"}</p>
                <a
                  href="#features"
                  className="btn btn-custom btn-lg page-scroll"
                >
                  Learn More
                </a>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};