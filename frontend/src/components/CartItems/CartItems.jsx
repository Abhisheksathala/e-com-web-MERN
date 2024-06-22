import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../context/ShopContext";
import remove from "../../assets/cart_cross_icon.png";

const CartItems = () => {
  const { all_product, cartItmes,getTotalCartAmount, removeFromCart } =
    useContext(ShopContext);
  return (
    <div className="cartItems">
      <div className="cartformet-main">
        <p>product</p>
        <p>Title</p>
        <p>price</p>
        <p>Quantity</p>
        <p>total price</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        console.log(e);
        if (cartItmes[e.id] > 0) {
          return (
            <div>
              <div className="cartformet-main cart-items-formet">
                <img src={e.image} alt="" className="carticaon-product-icon" />
                <p>{e.name}</p>
                <p>{e.new_price}</p>
                <button className="cartItems-quantty">{cartItmes[e.id]}</button>
                <p>{e.new_price * cartItmes[e.id]}</p>
                <img
                  className="cart-remov-icon"
                  src={remove}
                  onClick={() => {
                    removeFromCart(e.id);
                  }}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        } else {
          return null;
        }
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>cart Total</h1>
          <div>
            <div className="cartitems-otal-items">
              <p>subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-otal-items">
              <p>shipping fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-otal-items">
              <h3>total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
            <button className="btn">PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitem-prmocde">
          <p>apply promocode</p>
          <div className="cartitem-promo-box">
            <input type="text" placeholder="enter promo code" />
            <button>submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
