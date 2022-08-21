import React from "react";
import "components/navbar/navbar.css";
import logo from "assets/logo.png";
// import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
function Navbar() {
  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_logo">
          <img className="logo" src={logo} alt="logo" />
        </div>
        <div className="gpt3__navbar-links_container"></div>
        <p>
          <a href="#home">Home</a>
        </p>
        <p>
          <a href="#home">Home</a>
        </p>
        <p>
          <a href="#home">Home</a>
        </p>
        <p>
          <a href="#home">Home</a>
        </p>
      </div>
    </div>
  );
}

export default Navbar;
