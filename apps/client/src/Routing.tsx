import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";

const Routing = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<div />} />
  </Routes>
);

export default Routing;
