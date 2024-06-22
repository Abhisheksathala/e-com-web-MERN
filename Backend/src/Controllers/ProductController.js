import Product from "./../models/ProductModel.js";

import fs from "fs";

const addProducts = async (req, res) => {
  let products = await Product.find();
  let id;
  if (products.length > 0) {
    id = products[products.length - 1].id + 1;
  } else {
    id = 1;
  }
  try {
    const product = new Product({
      id: id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
      date: req.body.date,
      available: req.body.available, // Fix typo 'avilable' to 'available'
    });

    console.log(product);
    // If image is not provided, throw an error
    if (!product.image) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }
    await product.save();
    console.log("product saved");
    res.status(201).json({
      success: true,
      message: "Product added successfully",
      name: req.body.name,
    });
  } catch (error) {
    console.error("Error adding product:", error); // Change 'err' to 'error'
    res.status(500).json({
      success: false,
      message: "Failed to add product",
      error: error.message, // Change 'err' to 'error'
    });
  }
};

//creating api for the delete products

const deleteProduct = async (req, res) => {
  try {
    const productId = req.body.id;

    console.log("Received request to delete product with id:", productId);
    console.log("Parsed product ID:", productId);

    const parsedId = parseInt(productId);
    if (!productId || isNaN(parsedId)) {
      console.log("Invalid product ID:", productId);
      return res.status(400).json({ error: "Invalid product ID" });
    }
    // Find the product by ID and delete it
    const product = await Product.findOneAndDelete({ id: parsedId });
    console.log("Product found and deleted:", product);

    // If the product doesn't exist, return 404 status
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
        id: req.body.id,
      });
    }

        // Delete the associated image file
        fs.unlink(`uploads/images/${product.image}`, (err) => {
          if (err) {
            console.error("Error deleting image file:", err);
          } else {
            console.log("Image file deleted successfully");
          }
        });
        
    // Product successfully deleted
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      id: req.body.id,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error.message,
    });
  }
};

// creating api for getting all the products

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    console.log("All products fetched", products);
    // CHECKING IF THE PRODCUTED EXIST OR NOT
    if (!products) {
      return res.status(404).json({
        success: false,
        message: "Products not found",
        id: req.body.id,
      });
    }

    // Send the products as a response
    res.status(200).json({
      success: true,
      products: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

export { addProducts, deleteProduct, getAllProducts };
