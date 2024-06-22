import express from "express";
import { Addtocart, reamoveCart,getCartData } from "./../Controllers/AddtoCart.js";
import jwt from "jsonwebtoken";
const CartRout = express.Router();
const feachUser = async (req, res) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .json({ error: "Please authenticate using a valid token" });
  } else {
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      console.log(data);
      req.user = data.user;
      // console.log(req.user);
      next();
    } catch (error) {
      res
        .status(401)
        .json({ error: "Please authenticate using a valid token" });
    }
  }
};

CartRout.post("/addtocart", feachUser, Addtocart);
CartRout.post("/reamoveCart", feachUser, reamoveCart);
CartRout.post("/getCartData", feachUser, getCartData);

export default CartRout;
