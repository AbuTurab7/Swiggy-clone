import { useState } from "react";
import "./filter.css";
export default function FilterRest() {

  const [isVegOn , setVegOn]=useState(false);
  const [isNonVegOn , setNonVegOn]=useState(false);

  return (
    <div className="filter-main-container">
      <div className="filter-Inside-container">
        <div className="filter-container " onClick={() => {
            setVegOn(!isVegOn)
            setNonVegOn(false)
        }}>
            <div className="filter-container-slider"></div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Veg_symbol.svg/180px-Veg_symbol.svg.png?20131205102827"
            alt="VEG"
            height={"20px"}
            width={"20px"}
            className={`${isVegOn ? "On" : "off"}`}
          />
        </div>
        <div className="filter-container"
         onClick={() => {
            setNonVegOn(!isNonVegOn)
            setVegOn(false)
         }}
         >
            <div className="filter-container-slider"></div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Non_veg_symbol.svg/180px-Non_veg_symbol.svg.png?20131205102929"
            alt="NON VEG"
            height={"20px"}
            width={"20px"}
            className={`${isNonVegOn ? "On" : "off"}`}
          />
        </div>
        <div className="filter-container">
          <p>Bestseller</p>
        </div>
      </div>
    </div>
  );
}
