import React from "react";
import logo from "./logo.svg";
import "./App.css";
import CounterTest from "pages/counter-test-page";
import SignIn from "pages/sign-in";
import { Navbar } from "components";
function App() {
  return (
    <div className="gradient__bg">
      Hello World!
      {/* <CounterTest />
      <hr />
      <SignIn /> */}
      <Navbar />
    </div>
  );
}

export default App;
