import React from "react";
import "./Admin.css";
import Saidbar from "./../../components/sidebar/Saidbar";
import { Routes, Route } from "react-router-dom";
import Addproduct from "../../components/Addproduct/Addproduct";
import Listproduct from "../../components/Listproduct/Listproduct";
import Removeproduct from "../../components/Removeproduct/Removeproduct";
const Admin = () => {
  return (
    <div className="admin">
      <Saidbar />
      <Routes>
        <Route path="/addproduct" element={<Addproduct />} />
        <Route path="/listproduct" element={<Listproduct />} />
        <Route path="/removeproduts" element={<Removeproduct />} />
      </Routes>
    </div>
  );
};

export default Admin;
