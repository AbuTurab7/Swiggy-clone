import { IoBagOutline, IoHelpBuoyOutline, IoPersonOutline } from "react-icons/io5";
import { addUser, removeUser } from "../Utilities/authSlice";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { auth, provider } from "../config/firebaseAuth";
import { TbCircleDashedPercentage } from "react-icons/tb";
import { signInWithPopup, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import NavDropdown from "react-bootstrap/NavDropdown";
import { RiArrowDropDownLine } from "react-icons/ri";
import LocationOffcanvas from "./Locationoffcanvas";
import { Outlet, useNavigate } from "react-router";
import Container from "react-bootstrap/Container";
import Popover from "react-bootstrap/Popover";
import { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import { SiSwiggy } from "react-icons/si";
import { CiSearch } from "react-icons/ci";
import Nav from "react-bootstrap/Nav";
import toast from "react-hot-toast";
import "./offCanvas.css";
import "./navbar.css";

export default function NavBar() {
  const cart = useSelector((state) => state.cartSlice.cartItems);
  const userData = useSelector((state) => state.authSlice.userData);

  const [address, setAddress] = useState("Chhindwara, Madhya Pradesh 4800");
  const [show, setShow] = useState(false);
  const [user, setUser] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAddress = (data) => setAddress(data);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  async function handleAuth() {
    try {
      const result = await signInWithPopup(auth, provider);
      toast.success("Sign In succesfully");
      const userName = result?.user?.displayName;
      dispatch(addUser(userName));
    } catch (error) {
      console.error("Google sign-in error:", error.code, error.message);
      alert("Login failed: " + error.message);
    }
  }
  async function handleLogOut() {
    try {
      await signOut(auth);
      dispatch(removeUser());
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3"></Popover.Header>
      <Popover.Body>
        <button id="logOutBtn" onClick={handleLogOut}>
          Log out
        </button>
      </Popover.Body>
    </Popover>
  );
  return (
    <>
      <Navbar expand="lg" className="navbar ">
        <Container className="navbarContainer">
          <div className="logo-drop-container">
            <Navbar.Brand href="/">
              <div className="logo-container">
                <SiSwiggy />
              </div>
            </Navbar.Brand>
            <NavDropdown
              onClick={handleShow}
              title={
                <div className="navbar-address-container">
                  <p
                    id="navbar-other"
                    style={{ fontSize: "14px", textDecoration: "underline" }}
                  >
                    Other
                  </p>
                  <p id="navbar-address">{address.substring(0, 31)}...</p>
                  <RiArrowDropDownLine id="arrow" />
                </div>
              }
              id="dropdown-split-basic"
            ></NavDropdown>
            <LocationOffcanvas
              show={show}
              handleClose={handleClose}
              handleAddress={handleAddress}
            />
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <div className="navLink-container">
              <Nav className="me-auto">
                <Nav.Link href="*">
                  <div className="corporate-container ">
                    <IoBagOutline />
                    <p>Swiggy Corporate</p>
                  </div>
                </Nav.Link>
                <Nav.Link href="*">
                  <div className="search-container">
                    <CiSearch />
                    <p>Search</p>
                  </div>
                </Nav.Link>
                <Nav.Link href="*">
                  <div className="offer-container">
                    <TbCircleDashedPercentage />
                    <p>Offers</p>
                  </div>
                </Nav.Link>
                <Nav.Link href="*">
                  <div className="help-container">
                    <IoHelpBuoyOutline />
                    <p>Help</p>
                  </div>
                </Nav.Link>
                {user ? (
                  <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    overlay={popover}
                  >
                    <Nav.Link>
                      <div className="sign-in-container">
                        <IoPersonOutline />
                        <p>{user}</p>
                      </div>
                    </Nav.Link>
                  </OverlayTrigger>
                ) : (
                  <Nav.Link onClick={handleAuth}>
                    <div className="sign-in-container">
                      <IoPersonOutline />
                      <p>Sign In</p>
                    </div>
                  </Nav.Link>
                )}
                <Nav.Link href="/restaurant/cart">
                  <div className="cart-container">
                    {/* <CiShoppingBasket /> */}
                    <p>[{cart.length}] Cart</p>
                  </div>
                </Nav.Link>
              </Nav>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}
