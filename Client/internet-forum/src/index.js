import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
//
import { configureStore } from "@reduxjs/toolkit";
//
const increment = () => {
	return {
		type: "INCREMENT",
	};
};
const decrement = () => {
	return {
		type: "DECREMENT",
	};
};
//
const counter = (state = 0, action) => {
	switch (action.type) {
		case "INCREMENT":
			return state + 1;
		case "DECREMENT":
			return state - 1;
	}
};
//
const store = configureStore({reducer:counter});
//
store.subscribe(()=> console.log(store.getState()))
//
store.dispatch(increment())
store.dispatch(decrement())
store.dispatch(decrement())
//
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
