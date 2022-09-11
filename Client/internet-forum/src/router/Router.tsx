import { SignIn, SignUp } from "containers";
import Home from "containers/home/Home";
import Layout from "layout/Layout";
import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import RoutesWrapper from "./RoutesWrapper";

function Router() {
  return (
    <BrowserRouter>
      <RoutesWrapper />
    </BrowserRouter>
  );
}
export default Router;
