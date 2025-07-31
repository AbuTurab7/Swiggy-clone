import NavBar from "./NavBar";
import Body from "./Body";
import Restaurant from "./Restaurant";
import "./Home.css";
import { Routes, Route } from "react-router";
import { useState } from "react";
import { Coordinates } from "./ContextApi";
import CartPage from "./CartPage";
export default function Home() {
  const [coords, setCoords] = useState({ lat: 22.057437, lng: 78.9381729 });

  return (
    <Coordinates.Provider value={{ coords, setCoords }}>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route path="/" element={<Body />} />
          <Route path="/restaurant/:id" element={<Restaurant />} />
          <Route path="/restaurant/cart" element={<CartPage />} />
          <Route path="*" element={<h1>Coming Soon...</h1>} />
        </Route>
      </Routes>
    </Coordinates.Provider>
  );
}
