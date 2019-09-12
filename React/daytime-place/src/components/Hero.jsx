import React from "react";
import Slider from "react-slick";

import "./Hero.scss";

import fried1 from "../assets/fried-1.jpg";
import fried3 from "../assets/fried-3.jpg";
import fried4 from "../assets/fried-4.jpg";


const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  return (
    <>
      <div className="Hero">
        <h1>We'll deepfry your face!</h1>
        <div>
          If the sun's up we're open and we'll fry your stuff!
        </div>
      </div>
      <div style={{backgroundColor: "black", marginBottom: "2rem"}}>
        <Slider {...settings}>
          <div className="image">
            <img src={fried1} alt="HELLO" />
          </div>
          <div className="image">
            <img src={fried3} alt="HELLO" />
          </div>
          <div className="image">
            <img src={fried4} alt="HELLO" />
          </div>
        </Slider>
      </div>
    </>
  );
}

export default Hero;