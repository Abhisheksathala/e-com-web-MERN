import React from "react";
import "./Breadcrums.css";
import dropdown_icon from "../../assets/breadcrum_arrow.png"

const Breadcrums = (props) => {
  const { product } = props;
  return (
    <div className="breadcrum">
      Home <img src={dropdown_icon} alt="" /> SHOP{" "}
      <img src={dropdown_icon} alt="" /> {product.category}{" "}
      <img src={dropdown_icon} alt="" />
      {product.name}
    </div>
  );
};

export default Breadcrums;
