import UserModel from "../models/User.js";
const Addtocart = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.user.id });

    if (user) {
      if (user.cartData[req.body.itemId]) {
        user.cartData[req.body.itemId] += 1;
      } else {
        user.cartData[req.body.itemId] = 1;
      }
      await UserModel.findOneAndUpdate(
        { _id: req.user.id },
        { $set: { cartData: user.cartData } }
      );

      res.status(200).json({ success: true, message: "Cart Updated" });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const reamoveCart = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.user.id });

    if (user) {
      if (user.cartData[req.body.itemId] > 0) {
        user.cartData[req.body.itemId] -= 1;
      } else {
        user.cartData[req.body.itemId] = 1;
      }
      await UserModel.findOneAndUpdate(
        { _id: req.user.id },
        { $set: { cartData: user.cartData } }
      );

      res.status(200).json({ success: true, message: "Cart Updated" });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {}
};

///get cart data
const getCartData = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.user.id });
    if (user) {
      res.status(200).json({ success: true, cartData: user.cartData });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { Addtocart, reamoveCart, getCartData };
