import { SignIn, SignUp } from "containers";
import Home from "containers/home/Home";
import Layout from "layout/Layout";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
