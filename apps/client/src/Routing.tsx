import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Setting from "./pages/Settings/Setting";
import CreateOrganization from "./pages/Auth/CreateOrganization";
import Metric from "./pages/Metric/Metric";
import Customer from "./pages/Customer/Customer";
import CustomerDetails from "./pages/Customer/CustomerDetails";
import Plan from "./pages/Plan/Plan";
import PlanDetails from "./pages/Plan/PlanDetails";

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
      <Route path=":id" element={<CustomerDetails />} />
    </Route>
    <Route path="/plans">
      <Route index element={<Plan />} />
      <Route path=":id" element={<PlanDetails />} />
    </Route>
    <Route path="/settings" element={<Setting />} />
  </Routes>
);

export default Routing;
