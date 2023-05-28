import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Setting from "./pages/Settings/Setting";
import CreateOrganization from "./pages/Auth/CreateOrganization";
import Metric from "./pages/Metric/Metric";
import Customer from "./pages/Customer/Customer";

const Routing = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/onboard" element={<CreateOrganization />} />
    <Route path="/" element={<Dashboard />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/metrics">
      <Route index element={<Metric />} />
    </Route>
    <Route path="/customers">
      <Route index element={<Customer />} />
    </Route>
    <Route path="/settings" element={<Setting />} />
  </Routes>
);

export default Routing;
