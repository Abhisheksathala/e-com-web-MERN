import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop";
import ShopCategory from "./pages/ShopCategory.jsx";
import Product from "./pages/Product.jsx";
import Cart from "./pages/Cart.jsx";
import LoginSingup from "./pages/LoginSingup";
import Footer from "./components/Footer/Footer";
import men_banner from "./assets/banner_mens.png";
import women_banner from "./assets/banner_women.png";
import kids_banner from "./assets/banner_kids.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route
            path="/mens"
            element={<ShopCategory banner={men_banner} category="men" />}
          />
          <Route
            path="/womens"
            element={<ShopCategory banner={women_banner} category="women" />}
          />
          <Route
            path="/kids"
            element={<ShopCategory banner={kids_banner} category="kids" />}
          />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSingup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
