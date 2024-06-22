import React, { useState } from "react";
import upload from "../../assets/upload_area.svg";
import "./Addproduct.css";
import axios from "axios";
import { ToastContainer, toast, Slide } from "react-toastify"; // Ensure toastify is imported if you are using it

const BASE_URL = "http://localhost:4000";

const Addproduct = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(upload);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "",
    old_price: "",
    new_price: "",
  });

  const imageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      if (window.URL && window.URL.createObjectURL) {
        setImagePreview(URL.createObjectURL(file));
      } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImagePreview(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const onChangeHandler = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };

  const AddProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productDetails.name);
    formData.append("category", productDetails.category);
    formData.append("old_price", productDetails.old_price);
    formData.append("new_price", productDetails.new_price);
    formData.append("product", image);

    try {
      // Upload the image
      const uploadResponse = await axios.post(`${BASE_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (uploadResponse.data.success) {
        const imageUrl = uploadResponse.data.image_url;
        setProductDetails((prevDetails) => ({
          ...prevDetails,
          image: imageUrl,
        }));

        // Add the product with the image URL
        const productResponse = await axios.post(
          `${BASE_URL}/api/v1/product/addproduct`,
          {
            ...productDetails,
            image: imageUrl,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (productResponse.data.success) {
          setProductDetails({
            name: "",
            image: "",
            category: "",
            old_price: "",
            new_price: "",
          });
          setImagePreview(upload);
          toast.success("Product added successfully!");
        } else {
          toast.error("Failed to add product.");
        }
      } else {
        toast.error("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };
  console.log(productDetails);

  return (
    <form className="add-product" onSubmit={AddProduct}>
      <div className="addproduct-itemfileds">
        <p>Product Name</p>
        <input
          type="text"
          name="name"
          value={productDetails.name}
          onChange={onChangeHandler}
          id=""
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfileds">
          <p>Old Price</p>
          <input
            value={productDetails.old_price}
            onChange={onChangeHandler}
            type="text"
            name="old_price"
            id=""
          />
        </div>
        <div className="addproduct-itemfileds">
          <p>New Price</p>
          <input
            value={productDetails.new_price}
            onChange={onChangeHandler}
            type="text"
            name="new_price"
            id=""
          />
        </div>
      </div>
      <div className="addproduct-itemfileds">
        <p>Category</p>
        <select
          value={productDetails.category}
          onChange={onChangeHandler}
          name="category"
          className="add-product-selecter"
          id=""
        >
          <option> select the Category </option>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kids">Kids</option>
        </select>
      </div>
      <div className="addproduct-itemfileds">
        <p>Image</p>
        <label htmlFor="file-input">
          <img
            className="product-thumbnail"
            src={imagePreview}
            alt="Product Thumbnail"
          />
        </label>
        <input
          accept="image/*"
          className="file-input"
          onChange={imageHandler}
          type="file"
          name="product"
          id="file-input"
          hidden
        />
      </div>
      <button type="submit" className="addproduct-btn">
        ADD
      </button>
    </form>
  );
};

export default Addproduct;
