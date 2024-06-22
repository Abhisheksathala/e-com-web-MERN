import React, { useContext, useRef, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Nav_drop from "./../../assets/dropdown_icon.png";

import logo from "../../assets/logo-el.png";
import cart_icon from "../../assets/cart_icon.png";
import { ShopContext } from "../../context/ShopContext";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();
  const dropDown = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img className="logo-nav" src={logo} alt="" />
        <p>ECHO</p>
      </div>
      <img className="nav-dropdown" onClick={dropDown} src={Nav_drop} alt="" />
      <ul ref={menuRef} className="nav-menu">
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          {" "}
          <Link to="/">shop{menu === "shop" ? <hr /> : <></>}</Link>
        </li>
        <li
          onClick={() => {
            setMenu("mens");
          }}
        >
          {" "}
          <Link to="/mens">men{menu === "mens" ? <hr /> : <></>}</Link>
        </li>
        <li
          onClick={() => {
            setMenu("womens");
          }}
        >
          {" "}
          <Link to="/womens"> women{menu === "womens" ? <hr /> : <></>}</Link>
        </li>
        <li
          onClick={() => {
            setMenu("kids");
          }}
        >
          {" "}
          <Link to="/kids">kids{menu === "kids" ? <hr /> : <></>}</Link>{" "}
        </li>
      </ul>

      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <button
            onClick={() => {
              localStorage.clear();
              window.location.replace("/login");
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button>LOGIN</button>
          </Link>
        )}

        <Link to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
