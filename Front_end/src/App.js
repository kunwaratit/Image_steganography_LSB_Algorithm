import React, { useState } from "react";
import "./App.css";
import Login from "./Login";
import Register from "./Register";
import Upload from "./Upload";
import Home from "./Home";
import Contact from "./Contact";
import { Route, Router, Routes } from "react-router-dom";
import Navbar from "./nav";

function App() {
  return (
    <>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
