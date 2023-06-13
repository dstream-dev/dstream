import React from "react";
import "./App.css";
import Routing from "./Routing";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import SideBar from "./components/SideBar";
import { AuthContext } from "./context/AuthContext";
import { IUserOrganization } from "./interfaces";
import { useOnClickOutside } from "./hooks";

function App() {
  const modelRef = React.useRef(null);
  const navigate = useNavigate();
  const {
    loggedIn,
    setLoggedIn,
    fetchAccessToken,
    activeOrganization,
    setActiveOrganization,
  } = React.useContext(AuthContext);
  const [openDropdown, setOpenDropdown] = React.useState<boolean>(false);
  const organizations: Array<IUserOrganization> =
    JSON.parse(localStorage.getItem("user") || "{}")?.organizations || [];
  useOnClickOutside(modelRef, () => setOpenDropdown(false));

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
      <div className={`${!loggedIn ? "" : "sm:ml-64 flex flex-col"} `}>
        {loggedIn && activeOrganization && (
          <div className="w-full bg-white shadow p-4">
            <div className="flex float-right">
              <div className="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={() => setOpenDropdown(!openDropdown)}
                  >
                    {
                      organizations.find(
                        (org) => org.organization_id === activeOrganization
                      )?.organization.name
                    }
                    <svg
                      className="-mr-1 h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {openDropdown && (
                  <div
                    ref={modelRef}
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    tabIndex={-1}
                  >
                    <div className="py-1" role="none">
                      {organizations.map((org) => (
                        <div
                          key={org.id}
                          className="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
                          role="menuitem"
                          tabIndex={-1}
                          onClick={() => {
                            console.log("ss");
                            setActiveOrganization(org.organization_id);
                            setOpenDropdown(false);
                          }}
                        >
                          {org.organization.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <div className={`${loggedIn ? "p-4" : ""}`}>
          <Routing />
        </div>
      </div>
      <Toaster position="bottom-right"></Toaster>
    </>
  );
}

export default App;
