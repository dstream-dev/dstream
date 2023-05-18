import React from "react";
import "./App.css";
import Routing from "./Routing";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SideBar from "./components/SideBar";

function App() {
  const navigate = useNavigate();

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <SideBar />
      <div className="p-4 sm:ml-64">
        <Routing />
      </div>
      <Toaster position="bottom-right"></Toaster>
    </>
  );
}

export default App;
