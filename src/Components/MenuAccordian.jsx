import Accordion from "react-bootstrap/Accordion";
import { IoMdStarOutline } from "react-icons/io";
import { useState } from "react";
import "./menuAccordian.css";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart } from "../Utilities/cartSlice";
import toast from "react-hot-toast";
import { Link } from "react-router";
function MenuAccordian({ menuData, restInfo }) {

  const cart = useSelector((state) => state.cartSlice.cartItems);
  const getResInfoFromLocalStore = useSelector(
    (state) => state.cartSlice.restInfo
  );

  const dispatch = useDispatch();
  const [addShow, setAddShow] = useState(false);
  const [diffRest, setDiffRest] = useState(false);
  const [pendingItem, setPendingItem] = useState(null);

  function handleAddCart(item) {
    const isAdded = cart.find((data) => data.id === item.id);

    if (!isAdded) {
      if (
        getResInfoFromLocalStore.name === restInfo.name ||
        getResInfoFromLocalStore.length === 0
      ) {
        dispatch(addToCart({ item, restInfo }));
        setAddShow(true);
      } else {
        setDiffRest(true);
        setPendingItem(item);
      }
    } else {
      toast.error("Item Already Added ");
    }
  }

  function handleDiffRest() {
    dispatch(clearCart());
    if (pendingItem) {
      dispatch(addToCart({ item: pendingItem, restInfo }));
      setAddShow(true);
      setPendingItem(null);
    }
    setDiffRest(false);
  }

  const VEG =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Veg_symbol.svg/180px-Veg_symbol.svg.png?20131205102827";
  const NON_VEG =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Non_veg_symbol.svg/180px-Non_veg_symbol.svg.png?20131205102929";
  return (
    <>
      {menuData.map((menu, i) => {
        const card = menu?.card?.card;
        if (card?.itemCards) {
          return (
            <div className="filtered-menu-card-container" key={i}>
              <Accordion
                defaultActiveKey={[`0`]}
                alwaysOpen
                className="custom-accordion"
              >
                <Accordion.Item eventKey={`0`}>
                  <Accordion.Header>
                    <span style={{ fontWeight: "700" }}>
                      {menu?.card?.card?.title}({card?.itemCards.length})
                    </span>
                  </Accordion.Header>
                  <Accordion.Body>
                    {card?.itemCards.map((item, i) => (
                      <div className="filtered-menu-card" key={i}>
                        <div className="filtered-menu-card-details">
                          <div className="filtered-menu-logo-container">
                            <img
                              height={"15px"}
                              width={"15px"}
                              src={
                                item?.card?.info?.itemAttribute
                                  ?.vegClassifier === "VEG"
                                  ? VEG
                                  : NON_VEG
                              }
                              alt="logo"
                            />
                            {item?.card?.info?.isBestseller && (
                              <div className="bestseller-container">
                                <IoMdStarOutline style={{ fontSize: "14px" }} />{" "}
                                <p
                                  style={{ fontSize: "14px", marginTop: "2px" }}
                                >
                                  Bestseller
                                </p>
                              </div>
                            )}
                          </div>
                          <p style={{ fontSize: "18px", color: "#02060CBF" }}>
                            {item?.card?.info?.name}
                          </p>
                          <p style={{ fontSize: "15px", color: "#02060CEB" }}>
                            {" "}
                            ₹
                            {(item?.card?.info?.defaultPrice ||
                              item?.card?.info?.price) / 100}
                          </p>
                          <p style={{ fontSize: "13px", color: "#02060C99" }}>
                            {" "}
                            {item?.card?.info?.description}
                          </p>
                        </div>
                        <div className="filtered-menu-card-image-container">
                          <div className="img-container">
                            <img
                              className={
                                item?.card?.info?.nextAvailableAtMessage
                                  ? "blackAndwhite"
                                  : ""
                              }
                              src={
                                item?.card?.info?.imageId
                                  ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item.card.info.imageId}`
                                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/800px-Image_not_available.png"
                              }
                              alt="item image"
                            />
                          </div>
                          {item?.card?.info?.nextAvailableAtMessage ? (
                            <button className="btn-store-closed" disabled>
                              {item?.card?.info?.nextAvailableAtMessage}
                            </button>
                          ) : (
                            <button
                              onClick={() => handleAddCart(item?.card?.info)}
                              className="btn-store-open"
                            >
                              ADD
                            </button>
                          )}
                          {item?.card?.info?.addons && (
                            <p style={{ fontSize: "11px", color: "#02060C73" }}>
                              Customisable
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          );
        } else {
          return (
            <div className="filtered-menu-card-container" key={i}>
              <p id="nested-menu-card-container-title">
                {card.title}({card?.categories.length})
              </p>
              {card?.categories.map((item, idx) => (
                <div className="nested-menu-card-container" key={idx}>
                  <Accordion
                    defaultActiveKey={[`0`]}
                    alwaysOpen
                    className="custom-accordion-nested"
                  >
                    <Accordion.Item eventKey={`0`}>
                      <Accordion.Header>
                        {item?.title}({item?.itemCards.length})
                      </Accordion.Header>
                      <Accordion.Body>
                        {card?.categories.map((singleItem, i) => (
                          <div className="singleItem-container" key={i}>
                            {singleItem?.itemCards.map((item, i) => (
                              <div className="filtered-menu-card" key={i}>
                                <div className="filtered-menu-card-details">
                                  <div className="filtered-menu-logo-container">
                                    <img
                                      height={"15px"}
                                      width={"15px"}
                                      src={
                                        item?.card?.info?.itemAttribute
                                          ?.vegClassifier === "VEG"
                                          ? VEG
                                          : NON_VEG
                                      }
                                      alt="logo"
                                    />
                                  </div>
                                  <p
                                    style={{
                                      fontSize: "18px",
                                      color: "#02060CBF",
                                    }}
                                  >
                                    {item?.card?.info?.name}
                                  </p>
                                  <p
                                    style={{
                                      fontSize: "15px",
                                      color: "#02060CEB",
                                    }}
                                  >
                                    {" "}
                                    ₹
                                    {(item?.card?.info?.defaultPrice ||
                                      item?.card?.info?.price) / 100}
                                  </p>
                                  <p
                                    style={{
                                      fontSize: "13px",
                                      color: "#02060C99",
                                    }}
                                  >
                                    {" "}
                                    {item?.card?.info?.description}
                                  </p>
                                </div>
                                <div className="filtered-menu-card-image-container">
                                  <div className="img-container">
                                    <img
                                      className={
                                        item?.card?.info?.nextAvailableAtMessage
                                          ? "blackAndwhite"
                                          : ""
                                      }
                                      src={
                                        item?.card?.info?.imageId
                                          ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item.card.info.imageId}`
                                          : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/800px-Image_not_available.png"
                                      }
                                      alt="item image"
                                    />
                                  </div>
                                  {item?.card?.info?.nextAvailableAtMessage ? (
                                    <button
                                      className="btn-store-closed"
                                      disabled
                                    >
                                      {item?.card?.info?.nextAvailableAtMessage}
                                    </button>
                                  ) : (
                                    <button
                                      className="btn-store-open"
                                      onClick={() =>
                                        handleAddCart(item?.card?.info)
                                      }
                                    >
                                      ADD
                                    </button>
                                  )}

                                  <p
                                    style={{
                                      fontSize: "11px",
                                      color: "#02060C73",
                                    }}
                                  >
                                    Customisable
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ))}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              ))}
            </div>
          );
        }
      })}
      {addShow && (
        <div className="itemAddedToast">
          <p>{cart.length} item Added</p>
          <Link to="/restaurant/cart" className="toast-cart-link">
            <span onClick={() => setAddShow(false)}>
              <p>VIEW CART</p>
              <MdOutlineShoppingBag />
            </span>
          </Link>
        </div>
      )}
      {diffRest && (
        <div className="diffRestToast">
          <p
            style={{
              fontSize: "20px",
              color: "#02060C",
              marginBottom: "5px",
            }}
          >
            Items already in cart
          </p>
          <p style={{ fontSize: "13px", color: "#02060CCC" }}>
            Your cart contains items from other restaurant. Would you like to
            reset your cart for adding items from this restaurant?
          </p>
          <div className="diffRestToast-btn-container">
            <button id="no" onClick={() => setDiffRest(false)}>
              No
            </button>
            <button id="yes" onClick={() => handleDiffRest()}>
              YES, START FRESH
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default MenuAccordian;
