import mongoose from "mongoose";

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    new_price: { type: Number, required: true },
    old_price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    available: { type: Boolean }, // Fixed typo 'avilable' to 'available'
  },
  { timestamps: true } // Fixed typo 'timestampes' to 'timestamps'
);

const Product = mongoose.model("Product", ProductSchema); // Changed model name to "Product" for convention

export default Product;
