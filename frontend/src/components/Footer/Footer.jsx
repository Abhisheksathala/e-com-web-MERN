import React from "react";
import "./Footer.css";
import logo from "../../assets/logo-el.png";
import instagram_icon from "../../assets/instagram_icon.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={logo} alt="" />
        <p>ECHO</p>
      </div>
      <ul className="footer-links">
        <li>company</li>
        <li>Products</li>
        <li>offices</li>
        <li>about</li>
        <li>contact</li>
      </ul>

      <div className="footer-social-icon">
        <ul>
          <li>
            <a href="#">
              <i class="fab fa-facebook-f icon"></i>{" "}
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fab fa-twitter icon"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fab fa-linkedin-in icon"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fab fa-google-plus-g icon"></i>
            </a>
          </li>
        </ul>
      </div>

      <div className="footer-copy-right">
        <hr />
        <p>© 2024 Echo. All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
