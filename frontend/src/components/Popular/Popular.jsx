import React, { useEffect, useState } from "react";
import "./Popular.css";
import axios from "axios";
import Item from "../items/Item";

const Popular = (props) => {
  const [data_product, setData_product] = useState([]);

  const feachData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/v1/newproducts/popular-in-women"
      );
      console.log(res.data); // Log the data to check its structure

      // Accessing the products array correctly
      if (res.data && Array.isArray(res.data.products)) {
        setData_product(res.data.products);
        console.log("Products have been fetched in the women collection", res.data.products);
      } else {
        console.error("Error: res.data.products is not an array");
      }
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  useEffect(() => {
    feachData();
  }, []);

  useEffect(() => {
    console.log(data_product);
  }, [data_product]);

  return (
    <div className="popular">
      <h1>Popular in Women</h1>
      <hr />
      <div className="popular-item">
        {data_product.map((item, index) => (
          <div key={index}>
            <Item
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Popular;
