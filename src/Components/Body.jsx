import { useContext, useEffect, useState } from "react";
import RestaurantFooter from "./RestaurantFooter";
import RestaurantSlide from "./RestaurantSlide";
import RestaurantsList from "./RestaurantsList";
import RestaurantBoxes from "./restaurantBoxes";
import { Coordinates } from "./ContextApi";
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

  async function fetchData() {
    try {
      const res = await fetch("http://localhost:3000/data");

      // const res = await fetch(
      //   `https://www.swiggy.com/mapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
      // );

      // const res = await fetch(
      //   `https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
      // );

      // const res = await fetch(`https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=22.057437&lng=78.9381729&carousel=true&third_party_vendor=1`);
      // const res = await fetch('/api/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=${lat}&lng=${lng}&carousel=true&third_party_vendor=1')
      const result = await res.json();
      console.log(result);

      // setImages(result?.data?.cards[0]?.card?.card?.imageGridCards?.info);
      // setData(result?.data?.cards[1]?.card?.card);
      // setRestaurants(result?.data?.cards);
      // setRestaurants(
      //   result?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle
      //     ?.restaurants
      // );

      setImages(result?.cards[0]?.card?.card?.imageGridCards?.info);
      setData(result?.cards[1]?.card?.card);
      setRestaurants(result?.cards);
      setPlacesData(result?.cards[6]?.card?.card);
      setCuisinesData(result?.cards[7]?.card?.card);
      setRestaurantsNearData(result?.cards[8]?.card?.card);

      // setImages(result?.data?.cards[0]?.card?.card?.imageGridCards?.info);
      // setData(result?.data?.cards[1]?.card?.card);
      // setRestaurants(result?.data?.cards);
      // setPlacesData(result?.data?.cards[6]?.card?.card);
      // setCuisinesData(result?.data?.cards[7]?.card?.card);
      // setRestaurantsNearData(result?.data?.cards[8]?.card?.card);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, [lat, lng]);

  // console.log(images);
  //     console.log(data);
  //     console.log(restaurants);
  //     console.log(placesData);
  //     console.log(cuisinesData);
  //     console.log(restaurantsNearData);
  // console.log(result);
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
