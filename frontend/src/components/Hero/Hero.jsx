import React from "react";
import Hand_icon from "../../assets/hand_icon.png";
import arrow_icon from "../../assets/arrow.png";
import hero_imae from "../../assets/women.png";
import "./Hero.css";
const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2 className="h2">Where Fashion Finds its Voice</h2>
        <div className="Hero-text">
          <div className="hero-hand-icon">
            <p class="glitch" data-text="Explore">
              Explore
            </p>
          </div>
          <p> Echo's New</p>
          <p>New Arrivals!</p>
        </div>
        <div>
          <button className="hero-latest-btn">Latest collection</button>
          <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_imae} alt="" />
      </div>
    </div>
  );
};

export default Hero;
