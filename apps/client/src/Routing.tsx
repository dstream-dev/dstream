import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard/Dashboard";

const Routing = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<Dashboard />} />
  </Routes>
);

export default Routing;
