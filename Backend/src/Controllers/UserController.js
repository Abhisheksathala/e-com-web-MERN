import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const check = await UserModel.findOne({ email });
    if (check) {
      return res.status(400).json({
        success: false,
        error: "Existing user",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        error: "Please enter a valid email",
      });
    }

    if (!password || password.length <= 5) {
      return res.status(400).json({
        success: false,
        error: "Please enter a valid password longer than 5 characters",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword, // Store hashed password in 'password' field
      cartData: cart,
    });

    const user = await newUser.save();
    const token = await createToken({ id: user.id });
    console.log(`User ${user.name} registered successfully. Token: ${token}`);
    return res.status(201).json({
      success: true,
      message: "User registered",
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      // Use 500 for internal server error
      success: false,
      message: "Internal server error at registration",
      error: error.message,
    });
  }
};

const createToken = async (data) => {
  // Receive data parameter
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = await createToken({ id: user.id });
    console.log(`User ${user.name} logged in successfully. Token: ${token}`);
    res.status(200).json({
      success: true,
      message: "User logged in",
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export { signUp, loginUser }; // Corrected export names
