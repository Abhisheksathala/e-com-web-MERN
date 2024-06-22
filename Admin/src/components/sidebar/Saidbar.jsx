import React from "react";
import "./Saidbar.css";
import { Link } from "react-router-dom";
import icon from "../../assets/Product_Cart.svg";
import icon_list from "../../assets/Product_list_icon.svg";
import rem_list from "../../assets/icons8-order-100.png";
const Saidbar = () => {
  return (
    <div className="sidebar">
      <Link to={"/addproduct"} style={{ textDecoration: "none" }}>
        <div className="said-bar-item">
          <img src={icon} alt="" />
          <p>add product</p>
        </div>
      </Link>
      <Link to={"/listproduct"} style={{ textDecoration: "none" }}>
        <div className="said-bar-item">
          <img src={icon_list} alt="" />
          <p> product List</p>
        </div>
      </Link>
      <Link to={"/removeproduts"} style={{ textDecoration: "none" }}>
        <div className="said-bar-item">
          <img className="order" src={rem_list} alt="" />
          <p>orders</p>
        </div>
      </Link>
    </div>
  );
};

export default Saidbar;
