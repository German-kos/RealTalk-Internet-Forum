import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Navbar } from "components";
import Router from "router/Router";
function App() {
  return (
    <div className="gradient__bg">
      <Router />
    </div>
  );
}

export default App;
