import React from "react";
import "./App.css";
import Routing from "./Routing";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
      <Routing />
      <Toaster position="bottom-right"></Toaster>
    </>
  );
}

export default App;
