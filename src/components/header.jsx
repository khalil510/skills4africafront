import React from "react";
import { Slide } from 'react-slideshow-image';
import "react-slideshow-image/dist/styles.css";
// Import your global style.css from public (relative to public, use absolute path in public)
<link rel="stylesheet" href="%PUBLIC_URL%/css/style.css" />

export const Header = (props) => {
  const sliderImages = [
    "/img/hero-slide-1.png",
    "/img/hero-slide-2.png",
    "/img/hero-slide-3.png",
    "/img/hero-slide-4.png",
    "/img/image_1f017e.png",
  ];

  const properties = {
    duration: 1000,
    transitionDuration: 500,
    infinite: true,
    indicators: false,
    arrows: false,
    autoplay: true,
    pauseOnHover: false,
  };

  // Inline style for the h1 as requested
  const introH1Style = {
    fontFamily: "'Raleway', sans-serif",
    color: "#fff",
    fontSize: "82px",
    fontWeight: 700,
    textTransform: "uppercase",
    marginTop: 0,
    marginBottom: "10px",
  };

  return (
    <header id="header">
      <div className="intro">
        <Slide {...properties}>
          {sliderImages.map((image, index) => (
            <div key={index} className="each-slide-effect">
              <div
                style={{
                  backgroundImage: `url(${image})`,
                  height: "100vh",
                  width: "100vw",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </div>
          ))}
        </Slide>
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1 style={introH1Style}>
                  {props.data ? props.data.title : "Loading"}
                  <span></span>
                </h1>
                <p>{props.data ? props.data.paragraph : "Loading"}</p>
                <a
                  href="#features"
                  className="btn btn-custom btn-lg page-scroll"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};