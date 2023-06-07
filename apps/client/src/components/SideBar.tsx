import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useOutsideClick } from "../utils/outSideClickHook";
import Logo from "../assets/Logo";
import { AuthContext } from "../context/AuthContext";

function SideBar() {
  const navigate = useNavigate();
  const sideBarRef = React.useRef(null);
  const { setLoggedIn } = React.useContext(AuthContext);
  const [sideBarOpen, setSideBarOpen] = React.useState<boolean>(false);
  const [bigScreen, setBigScreen] = React.useState<boolean>(false);
  useOutsideClick(sideBarRef, () => setSideBarOpen(false));

  const sideBarOptions = [
    {
      id: 1,
      icon: (
        <svg
          className="w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900 "
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
          <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
        </svg>
      ),
      name: "Dashboard",
      route: "/dashboard",
    },
    {
      id: 2,
      name: "Billable Metric",
      route: "/metrics",
    },
    {
      id: 3,
      name: "Plans",
      route: "/plans",
    },
    {
      id: 4,
      name: "Customers",
      route: "/customers",
    },
    // {
    //   id: 5,
    //   name: "Invoices",
    //   route: "/invoices",
    // },
    {
      id: 6,
      name: "Events",
      route: "/events",
    },
  ];

  React.useEffect(() => {
    if (window.innerWidth > 640) {
      setBigScreen(true);
    }
  }, []);
  return (
    <>
      <button
        type="button"
        onClick={() => setSideBarOpen(true)}
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
      >
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        ref={sideBarRef}
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          bigScreen
            ? "translate-x-0"
            : sideBarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col px-3 py-4 overflow-y-auto bg-gray-50 shadow-xl">
          <div className="mb-4">
            <Logo width="150" height="64" />
          </div>
          <ul className="space-y-2 font-medium">
            {sideBarOptions.map((item) => {
              return (
                <li key={item.id}>
                  <Link
                    to={item.route}
                    className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 "
                  >
                    {/* {item.icon} */}
                    <span className="ml-3">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto w-full">
            <button
              onClick={() => {
                navigate("/settings");
              }}
              type="button"
              className="flex w-full items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 "
            >
              <span className="ml-3 font-semibold">Settings</span>
            </button>
            <button
              onClick={() => {
                localStorage.clear();
                setLoggedIn(false);
                navigate("/login");
              }}
              type="button"
              className="flex w-full items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 "
            >
              <span className="ml-3 font-semibold">LogOut</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default SideBar;
