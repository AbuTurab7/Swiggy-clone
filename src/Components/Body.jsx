import { useContext, useEffect, useState } from "react";
import RestaurantFooter from "./RestaurantFooter";
import RestaurantSlide from "./RestaurantSlide";
import RestaurantsList from "./RestaurantsList";
import RestaurantBoxes from "./RestaurantBoxes";
import { Coordinates } from "./ContextApi";
import apiData from './api.json';
import Shimmer from "./Shimmer";
import Dishes from "./Dishes";
import "./Home.css";

export default function Body() {
  const [images, setImages] = useState([]);
  const [data, setData] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [placesData, setPlacesData] = useState([]);
  const [cuisinesData, setCuisinesData] = useState([]);
  const [restaurantsNearData, setRestaurantsNearData] = useState([]);
  const {
    coords: { lat, lng },
  } = useContext(Coordinates);

  useEffect(() => {
    console.log(apiData);
    
  setImages(apiData?.data?.cards[0]?.card?.card?.imageGridCards?.info);
  setData(apiData?.data?.cards[1]?.card?.card);
  setRestaurants(apiData?.data?.cards);
  setPlacesData(apiData?.data?.cards[6]?.card?.card);
  setCuisinesData(apiData?.data?.cards[7]?.card?.card);
  setRestaurantsNearData(apiData?.data?.cards[8]?.card?.card);
}, [lat, lng]);


  return (
    <>
      {restaurantsNearData.id ? (
        <div>
          <div
            className="body-container"
            style={{ width: "77%", margin: "auto" }}
          >
            <Dishes images={images} />
            <RestaurantSlide data={data} restaurants={restaurants} />
            <RestaurantsList restaurants={restaurants} />
            <RestaurantBoxes BoxesData={placesData} />
            <RestaurantBoxes BoxesData={cuisinesData} />
            <RestaurantBoxes BoxesData={restaurantsNearData} />
          </div>
          <RestaurantFooter />
        </div>
      ) : (
        <Shimmer />
      )}
    </>
  );
}
