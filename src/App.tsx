import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/index";
import { Home, CharacterDetails } from "./containers/index";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:searchTerm/page/:pageNumber" element={<Home />} />
        <Route path="/page/:pageNumber" element={<Home />} />
        <Route
          path="/page/:pageNumber/:characterId"
          element={<CharacterDetails />}
        />
        <Route
          path="/:searchTerm/page/:pageNumber/:characterId"
          element={<CharacterDetails />}
        />
      </Routes>
    </div>
  );
}

export default App;
