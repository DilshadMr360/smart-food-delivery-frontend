import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/frontend_assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/storeContext";
import { toast } from "react-toastify";
import { FaShoppingCart } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { GiShoppingBag } from "react-icons/gi";
import { RiLogoutBoxRFill } from "react-icons/ri";
import "../../App.css"
const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken, user, setUser  } =
    useContext(StoreContext);

  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the user name from localStorage if available
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUser(storedUserName);
    }
  }, [setUser]); // This will run only once when the component mounts

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setToken("");
    toast.success("Logout successfully");
    navigate("/");
  };

  return (
    <div className="main_header ">
      <div className="navbar">
        <Link to="/">
          {" "}
          <img src={assets.logo2} alt="" className="logo" />
        </Link>
        <ul className="navbar-menu">
          <Link
            to="/"
            onClick={() => setMenu("home")}
            className={menu === "home" ? "active" : ""}
          >
            home
          </Link>
          <a
            href="#explore-menu"
            onClick={() => setMenu("menu")}
            className={menu === "menu" ? "active" : ""}
          >
            menu
          </a>
          <a
            href="#about-us"
            onClick={() => setMenu("about-us")}
            className={menu === "about-us" ? "active" : ""}
          >
            About Us
          </a>
          <a
            href="#footer"
            onClick={() => setMenu("contact-us")}
            className={menu === "contact-us" ? "active" : ""}
          >
            contact-us
          </a>
        </ul>
        <div className="navbar-right">
          {token && <h1 className="user-text">Hi {user ? user : "User"}</h1>}
          <div className="navbar-search-icon">
            <Link to="/cart">
              <FaShoppingCart style={{ fontSize: "24px" }} />
            </Link>
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>
          {!token ? (
            <button onClick={() => setShowLogin(true)}>sign in</button>
          ) : (
            <div className="navbar-profile">
              <FaCircleUser style={{ fontSize: "24px" }} />
              <ul className="nav-profile-dropdown">
                <li onClick={() => navigate("/myprofile")}>
                  <FaUser />
                  <p>Profile</p>
                </li>
                <hr />
                <li onClick={() => navigate("/myorders")}>
                  <GiShoppingBag />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <RiLogoutBoxRFill />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
