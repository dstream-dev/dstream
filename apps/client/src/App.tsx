import React from "react";
import "./App.css";
import Routing from "./Routing";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SideBar from "./components/SideBar";
import { AuthContext } from "./context/AuthContext";

function App() {
  const navigate = useNavigate();
  const { logedIn, setLogedIn, activeOrganization, setActiveOrganization } =
    React.useContext(AuthContext);

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    const orgs = localStorage.getItem("organization_id");
    if (orgs) {
      setActiveOrganization(orgs);
    }
    if (!user) {
      navigate("/login");
    } else {
      if (!orgs) {
        navigate("/onboard");
      } else {
        setLogedIn(true);
      }
    }
  }, []);

  return (
    <>
      {logedIn && activeOrganization && <SideBar />}
      <div className={`${!logedIn ? "" : "p-4 sm:ml-64"} `}>
        <Routing />
      </div>
      <Toaster position="bottom-right"></Toaster>
    </>
  );
}

export default App;
