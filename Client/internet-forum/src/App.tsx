import React from "react";
import logo from "./logo.svg";
import "./App.css";
import CounterTest from "pages/counter-test-page";
import SignIn from "pages/sign-in";

function App() {
  return (
    <div className="App">
      Hello World!
      <CounterTest />
      <hr />
      <SignIn />
    </div>
  );
}

export default App;
