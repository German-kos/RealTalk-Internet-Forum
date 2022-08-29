import React from "react";
import logo from "./logo.svg";
import "./App.css";
import CounterTest from "pages/counter-test-page";
import SignIn from "pages/sign-in";
import { Navbar } from "components";
import Router from "router/Router";
function App() {
  return (
    // <div className="gradient__bg">
    //   {/* <CounterTest />
    //   <hr />
    //   <SignIn /> */}
    //   <Navbar />
    // </div>
    <div className="gradient__bg">
      <Router />
    </div>
  );
}

export default App;
