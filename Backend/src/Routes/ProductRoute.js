import express from "express";
import {
  addProducts,
  deleteProduct,
  getAllProducts
} from "../Controllers/ProductController.js";
import upload from "./../Multer/Multer.js";

const productRouter = express.Router();
productRouter.use(express.json());

// Route for adding products with upload middleware included
productRouter.post("/addproduct", upload.single('product'), addProducts);
productRouter.post("/deleteProduct", deleteProduct);
productRouter.get("/getAllProducts", getAllProducts);


export default productRouter;
