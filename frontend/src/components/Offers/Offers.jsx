import React from "react";
import "./Offers.css";
import exclucive_image from "../../assets/excl.png";
const Offers = () => {
  return (
    <div className="offers">
      <div className="offers-left">
        <h1>Best offers</h1>
        <h1> offers for you </h1>
        <p>Explore our best offers</p>
        <button>Shop Now</button>
      </div>

      <div className="offers-right">
        <img src={exclucive_image} alt="" />
      </div>
    </div>
  );
};

export default Offers;
