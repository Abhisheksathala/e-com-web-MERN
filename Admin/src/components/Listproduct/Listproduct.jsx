import React, { useState, useEffect } from "react";
import "./Listproduct.css";
import axios from "axios";
import { toast } from "react-toastify";
import cross_icon from "../../assets/cross_icon.png";

const Listproduct = () => {
  const [allproducts, setAllproducts] = useState([]);

  const BASE_URL = "http://localhost:4000";

  const fetchlist = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/product/getAllProducts`);
      console.log("RES:", res.data);
      if (res.data.success) {
        setAllproducts(res.data.products);
      } else {
        toast.error("An error occurred while fetching the list.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("An error occurred while fetching data.");
    }
  };

  console.log("allproducts:", allproducts);
  useEffect(() => {
    fetchlist();
  }, []);

  useEffect(() => {
    console.log("allproducts:", allproducts);
  }, [allproducts]);

  const removeProducts = async (ProductId) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/product/deleteProduct",
        {
          id: ProductId,
        }
      );
      console.log("RES:", res.data);
      if (res.data.success) {
        toast.success("Product deleted successfully");
        await fetchlist();
      } else {
        toast.error("An error occurred while deleting the product.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("An error occurred while deleting the product.");
    }
  };

  return (
    <div className="listproducts">
      <h1>All products</h1>
      <div className="listproducts-formet-main">
        <p>Product</p>
        <p>Title</p>
        <p>old-price</p>
        <p>new-price</p>
        <p>category</p>
        <p>Remove</p>
      </div>
      <div className="listtproductts-allroducts">
        {allproducts.map((items, index) => {
          return (
            <div
              key={index}
              className="listproducts-formet-main listproducts-formet"
            >
              <img src={items.image} alt="" className="listrodcut-img" />
              <p>{items.name}</p>
              <p>{items.old_price}</p>
              <p>{items.new_price}</p>
              <p>{items.category}</p>
              <button
                onClick={() => {
                  removeProducts(items.id);
                }}
              >
                <img src={cross_icon} className="listtime-remove-icon" alt="" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Listproduct;
