import React from "react";
import "./App.css";
import Routing from "./Routing";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import SideBar from "./components/SideBar";
import { AuthContext } from "./context/AuthContext";

function App() {
  const navigate = useNavigate();
  const {
    loggedIn,
    setLoggedIn,
    fetchAccessToken,
    activeOrganization,
    setActiveOrganization,
  } = React.useContext(AuthContext);

  useQuery({
    queryKey: ["accessToken"],
    queryFn: () => fetchAccessToken(),
    refetchInterval: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchIntervalInBackground: false,
  });

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
        setLoggedIn(true);
      }
    }
  }, []);

  return (
    <>
      {loggedIn && activeOrganization && <SideBar />}
      <div className={`${!loggedIn ? "" : "p-4 sm:ml-64"} `}>
        <Routing />
      </div>
      <Toaster position="bottom-right"></Toaster>
    </>
  );
}

export default App;
