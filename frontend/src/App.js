import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "./components/Product";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { Routes, Route } from "react-router-dom";
import Logout from "./components/Logout";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

const App = () => {
  return (
    <div>
      {/* <Product /> */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/addproduct" element={<Product />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
};

export default App;
