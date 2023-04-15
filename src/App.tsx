import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { Home } from "./containers/home/Home";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/page/:pageNumber" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
