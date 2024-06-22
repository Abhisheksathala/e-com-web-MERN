import React from "react";
import Navbar from "./components/Navbra/Navbar";
import Admin from "./pages/Admin/Admin";
import "./App.css";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <div className="app">
      <ToastContainer />
      <Navbar />
      <Admin />
    </div>
  );
};

export default App;
