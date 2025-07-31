import Offcanvas from "react-bootstrap/Offcanvas";
import { GoLocation } from "react-icons/go";
import { PiClockCounterClockwise } from "react-icons/pi";
import "./offCanvas.css";
import { useContext, useState } from "react";
import { Coordinates } from "./ContextApi";

export default function LocationOffcanvas({ show, handleClose , handleAddress }) {

  const [inputValue, setInputValue] = useState("");
  const [searchData, setSearchData] = useState([]);
  const { setCoords } = useContext(Coordinates);

  async function fetchSearches(val) {
    try {
      if (val == "") return;
      const res = await fetch(
        `https://www.swiggy.com/dapi/misc/place-autocomplete?input=${val}`
      );
      const result = await res.json();
      console.log(result);
      setSearchData(result?.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchCoords(id) {
    try {
      if (id == "") return;
      const res = await fetch(
        `https://www.swiggy.com/dapi/misc/address-recommend?place_id=${id}`
      );
      const result = await res.json();
      setCoords({
        lat: result?.data[0]?.geometry.location.lat,
        lng: result?.data[0]?.geometry.location.lng,
      });
      console.log(result);
      console.log(result?.data[0]?.geometry.location.lat);
      console.log(result?.data[0]?.geometry.location.lng);
      handleAddress(result?.data[0]?.formatted_address);
        console.log(result?.data[0]?.formatted_address);
        
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Offcanvas show={show} onHide={handleClose} className="custom-offcanvas">
      <Offcanvas.Header closeButton></Offcanvas.Header>
      <Offcanvas.Body>
        <div className="offCanvas-main-container">
          <div className="offCanvas-input-container">
            <input
              id="offCanvas-input"
              type="text"
              value={inputValue}
              placeholder="Search for area, street name.."
              onChange={(e) => {
                fetchSearches(e.target.value);
                setInputValue(e.target.value);
              }}
            />
            {inputValue && (
              <button id="cancel-btn" onClick={() => setInputValue("")}>
                Cancel
              </button>
            )}
          </div>

          {inputValue ? (
            <div className="offCanvas-result-container">
              <ul>
                {searchData.map((search, i) => (
                  <li key={i} onClick={() => fetchCoords(search?.place_id)}>
                    <div className="result-icon-container">
                      <GoLocation />
                    </div>
                    <div className="result-description" onClick={handleClose} >
                      <p id="cityName">
                        {search?.structured_formatting?.main_text}
                      </p>
                      <p style={{ fontSize: "13px", color: "#02060C80" }}>
                        {search?.structured_formatting?.secondary_text}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="offCanvas-result-container border">
              <p id="result" style={{ fontSize: "12px", color: "#02060C99" }}>
                RECENT SEARCHES
              </p>
              <ul>
                <li>
                  <div className="result-icon-container">
                    <PiClockCounterClockwise />
                  </div>
                  <div className="result-description">
                    <p id="cityName">Mumbai</p>
                    <p style={{ fontSize: "13px", color: "#02060C80" }}>
                      Maharastra, India
                    </p>
                  </div>
                </li>
                <li>
                  <div className="result-icon-container">
                    <PiClockCounterClockwise />
                  </div>
                  <div className="result-description">
                    <p id="cityName">Bangalore</p>
                    <p style={{ fontSize: "13px", color: "#02060C80" }}>
                      Karnataka, India
                    </p>
                  </div>
                </li>
                <li>
                  <div className="result-icon-container">
                    <PiClockCounterClockwise />
                  </div>
                  <div className="result-description">
                    <p id="cityName">Lucknow</p>
                    <p style={{ fontSize: "13px", color: "#02060C80" }}>
                      Uttar Pradesh, India
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
