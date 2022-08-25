import React, { useState } from "react";
import "components/navbar/navbar.css";
import logo from "assets/logo_white.png";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
function Navbar() {
  // the state which controls the menu in the navbar
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  // toggleMenu => true - for opening the menu
  const openToggleMenu = () => setToggleMenu(true);
  // toggleMenu => false - for closing the menu
  const closeToggleMenu = () => setToggleMenu(false);
  // menu for the navbar
  const Menu = () => (
    <>
      <p>
        <a href="#home">Home</a>
      </p>
      <p>
        <a href="#about">About</a>
      </p>
    </>
  );
  return (
    <div className="navbar">
      <div className="navbar-links">
        <div className="navbar-links_container">
          <Menu />
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
      <div className="navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => closeToggleMenu()}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => openToggleMenu()}
          />
        )}
        {toggleMenu && (
          <div className="navbar-menu_container scale-up-center">
            <div className="navbar-menu_container-links">
              <Menu />
              <div className="navbar-menu_container-links-sign">
                <p>
                  <a href="#signin">Sign In</a>
                </p>
                <button type="button">Sign Up</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
