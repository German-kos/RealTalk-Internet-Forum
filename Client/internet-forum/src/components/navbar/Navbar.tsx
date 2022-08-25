import React from "react";
import "components/navbar/navbar.css";
import logo from "assets/logo_white.png";
// import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-links">
        <div className="navbar-links_container">
          <p>
            <a href="#home">Home</a>
          </p>
          <p>
            <a href="#about">About</a>
          </p>
          <p></p>
        </div>
      </div>
      <div className="navbar-links_logo">
        <img className="logo" src={logo} alt="logo" />
      </div>
      <div className="navbar-sign">
        <p>
          <a href="#signin">Sign In</a>
        </p>
        <button type="button">Sign Up</button>
      </div>
    </div>
  );
}

export default Navbar;
