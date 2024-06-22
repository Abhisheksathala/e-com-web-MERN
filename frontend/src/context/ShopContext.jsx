import React, { useEffect, useState } from "react";
import { createContext } from "react";

import axios from "axios";
export const ShopContext = createContext(null);

const getDefultCart = () => {
  let cart = {};
  for (let i = 0; i < 300 + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_product] = useState([{}]);

  const featcData = async () => {
    const res = await axios.get(
      "http://localhost:4000/api/v1/product/getAllProducts"
    );
    if (!res) {
      console.log("error");
    } else {
      setAll_product(res.data.products);
    }
  };
  useEffect(() => {
    featcData();
    console.log("data has been featched");
  }, []);

  useEffect(() => {
    const authToken = localStorage.getItem("auth-token");
    if (authToken) {
      const fetchCartData = async () => {
        try {
          const response = await axios.post(
            "http://localhost:4000/api/v1/cart/getCartData",
            {},
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );

          if (response.data.success) {
            setCartItems(response.data.cartData);
          } else {
            console.log("Failed to fetch cart data:", response.data.message);
          }
        } catch (error) {
          console.error("Error fetching cart data:", error);
        }
      };

      fetchCartData();
    }
  }, []);

  useEffect(() => {}, [all_product]);

  const [cartItmes, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    console.log("Saved cart from local storage:", savedCart); // Check if cart items are loaded correctly
    return savedCart ? JSON.parse(savedCart) : getDefultCart();
  });

  useEffect(() => {
    console.log("Saving cart to localStorage:", cartItmes); // Debug log
    localStorage.setItem("cartItems", JSON.stringify(cartItmes));
  }, [cartItmes]);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (localStorage.getItem("auth-token")) {
      axios
        .post(
          "http://localhost:4000/api/v1/cart/addtocart",
          { itemId },
          {
            method: "post",
            headers: {
              Authorization: `Bearer ${authToken}`, // Include authorization header if required
            },
          }
        )
        .then((response) => {
          // Handle success response if needed
          console.log("Item added to cart successfully:", response.data);
        })
        .catch((error) => {
          // Handle error if request fails
          console.error("Error adding item to cart:", error);
        });
    }
  };
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (localStorage.getItem("auth-token")) {
      axios
        .post(
          "http://localhost:4000/api/v1/cart/reamoveCart",
          { itemId },
          {
            method: "post",
            headers: {
              Authorization: `Bearer ${authToken}`, // Include authorization header if required
            },
          }
        )
        .then((response) => {
          // Handle success response if needed
          console.log("Item removed from cart successfully:", response.data);
        })
        .catch((error) => {
          // Handle error if request fails
          console.error("Error removing item from cart:", error);
        });
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItmes) {
      if (cartItmes[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItmes[item];
        }
      }
    }
    return totalAmount;
  };
  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItmes) {
      if (cartItmes[item] > 0) {
        totalItem += cartItmes[item];
      }
    }
    return totalItem;
  };
  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItmes,
    addToCart,
    removeFromCart,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
