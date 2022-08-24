import React from "react";
import "components/navbar/navbar.css";
import logo from "assets/logo_white.png";
// import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
function Navbar() {
  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_logo">
          <img className="logo" src={logo} alt="logo" />
        </div>
        <div className="gpt3__navbar-links_container">
          <p>
            <a href="#home">Home</a>
          </p>
          <p>
            <a href="#about">About</a>
          </p>
          <p>
            <a href="#signup">Sign Up</a>
          </p>
        </div>
      </div>
      <div className="gpt3__navbar-sign">
        <p>
          <a href="#signin">Sign In</a>
        </p>
      </div>
    </div>
  );
}

export default Navbar;
