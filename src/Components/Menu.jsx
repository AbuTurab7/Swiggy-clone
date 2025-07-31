import { GiThornedArrow } from "react-icons/gi";
import { IoSearchOutline } from "react-icons/io5";
import MenuAccordian from "./MenuAccordian";
import RestFilter from "./RestFilter";
import "./menu.css";
export default function Menu({ menu , restInfo }) {
  const filteredMenu = menu?.filter((data) => (data?.card?.card?.itemCards || data?.card?.card?.categories));
  console.log(filteredMenu);
  console.log(menu);



  return (
    <>
      <div className="restaurant-menu-container">
        <div className="restaurant-menu-header">
          <GiThornedArrow id="left" />
          <p style={{ fontSize: "13px" }}>MENU</p>
          <GiThornedArrow id="right" />
        </div>
        <div className="restaurant-menu-search-container">
          <div className="restaurant-menu-search">
            <p style={{ fontSize: "14px" }}>Search for dishes</p>
            <IoSearchOutline />
          </div>
        </div>
        <div className="restaurant-menu-filter-container">
          <RestFilter/>
        </div>
        <div className="restaurant-menu-card-container">
          <MenuAccordian menuData={filteredMenu} restInfo={restInfo}/>
        </div>
      </div>
    </>
  );
}
