import React, { useContext } from "react";
import "./Productdisplay.css";
import star_icon from "../../assets/star_dull_icon.png";
import { ShopContext } from './../../context/ShopContext';
const Productdisplay = (props) => {
  const { product } = props;
  const {
    addToCart
  } = useContext(ShopContext)
  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="" />
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="prodctdisplay-right-star">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <p>(22)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay_right_price_new">
            ${product.new_price}
          </div>
          <div className="productdisplay_right_price_old">
           
           ${product.old_price}
           
          </div>
        </div>
        <div className="productdiaplay-right-description">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio rerum
          dolore illum tempora dolorum eum. Tempore aliquid voluptates
          consequatur facere.
        </div>
        <div className="productdisplay-right-size">
          <h1>select size</h1>
          <div className="productdisplay-right-size-btn">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XX</div>
          </div>
        </div>
        <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
        <p className="productdisplay-right-category">
          <span>category:</span>Women,T-shirt,crop Top
        </p>
        <p className="productdisplay-right-category">
          <span>Tags:</span>Modren,latest
        </p>
      </div>
    </div>
  );
};

export default Productdisplay;
