import React, { useEffect, useState } from "react";
import "./NewCollections.css";
import axios from "axios";
import Item from "../items/Item";

const NewCollections = () => {
  const [new_collection, setNew_collection] = useState([]);

  const feachData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/v1/newproducts/newcollection"
      );
      console.log(res.data); // Log the data to check its structure

      // Accessing the products array correctly
      if (res.data && Array.isArray(res.data.products)) {
        setNew_collection(res.data.products);
        console.log("Products have been fetched in the new collection");
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
    console.log(new_collection);
  }, [new_collection]);

  return (
    <div className="new-collections">
      <h1>New Collections</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item, index) => (
          <Item
            key={index}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default NewCollections;
