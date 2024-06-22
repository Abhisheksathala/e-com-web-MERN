import React, { useContext } from "react";
import "./css/shopCategory.css";
import { ShopContext } from "../context/ShopContext";
import dropdown_icon from "../assets/dropdown_icon.png";
import Item from "../components/items/Item";

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);

  console.log("Props:", props); // Verify props
  console.log("All Products:", all_product); // Verify context value

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopCategory-indexSort">
        <p>
          <span>showing 1-12</span>out of 36 products
        </p>
        <div className="shopcategory-sort">
          sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {all_product &&
          all_product.map((item, index) => {
            if (props.category === item.category) {
              return (
                <Item
                  key={index}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                />
              );
            }
            else{
              return null
            }
          })}
      </div>
      <div className="shopecategory-loadmore">
Exploremore
      </div>
    </div>
  );
};

export default ShopCategory;
