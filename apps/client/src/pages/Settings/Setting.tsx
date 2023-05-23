import React from "react";
import Organization from "./parts/Organization";
import UserManagement from "./parts/UserManagement";

const settingOptions = [
  {
    id: 1,
    name: "Organization",
    component: <Organization />,
  },
  {
    id: 2,
    name: "User Management",
    component: <UserManagement />,
  },
  {
    id: 3,
    name: "API Key",
  },
];

function Setting() {
  const [selectedOption, setSelectedOption] = React.useState(1);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-700 px-6 md:px-0">
        Settings
      </h1>
      <ul className="flex border-b border-gray-300 text-sm font-medium text-gray-600 mt-3 px-6 md:px-0">
        {settingOptions.map((item) => {
          return (
            <li
              onClick={() => {
                setSelectedOption(item.id);
              }}
              key={item.id}
              className={`mr-8 hover:text-gray-900 text-gray-${
                selectedOption === item.id
                  ? "900 border-b-2 border-gray-800"
                  : "700"
              } cursor-pointer`}
            >
              <p className="py-4 inline-block">{item.name}</p>
            </li>
          );
        })}
      </ul>
      <div className="mt-8">
        {settingOptions.find((item) => item.id === selectedOption)?.component}
      </div>
    </div>
  );
}

export default Setting;
