import NavBar from "./NavBar";
import Body from "./Body";
import Restaurant from "./Restaurant";
import CartPage from "./CartPage";
import "./Home.css";
import { Routes, Route } from "react-router";
import { useState } from "react";
import { Coordinates } from "./ContextApi";

export default function Home() {
  const [coords, setCoords] = useState({ lat: 22.057437, lng: 78.9381729 });

  return (
    <Coordinates.Provider value={{ coords, setCoords }}>
      {/* Navbar always on top */}
      <NavBar />

      {/* Add padding-top so content starts below navbar */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/restaurant/:id" element={<Restaurant />} />
          <Route path="/restaurant/cart" element={<CartPage />} />
          <Route path="*" element={<h1>Coming Soon...</h1>} />
        </Routes>
      </div>
    </Coordinates.Provider>
  );
}
