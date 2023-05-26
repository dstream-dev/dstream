import React from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import api from "../../apis";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface IState {
  name: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
}

interface INewState {
  type:
    | "name"
    | "address_line1"
    | "address_line2"
    | "city"
    | "state"
    | "zipcode"
    | "country";
  value: string;
}

function CreateOrganization() {
  const navigate = useNavigate();
  const { setActiveOrganization, setLogedIn } = React.useContext(AuthContext);
  const [organizationData, setOrganizationData] = React.useReducer(
    (state: IState, newState: INewState) => {
      return { ...state, [newState.type]: newState.value };
    },
    {
      name: "",
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
    }
  );

  const createOrg = useMutation(
    () => {
      return api.organization.createOrganization(organizationData);
    },
    {
      onSuccess: (data) => {
        setActiveOrganization(data.data.id);
        localStorage.setItem("organization_id", data.data.id);
        setLogedIn(true);
        navigate("/dashboard");
      },
      onError: (error: {
        message: string;
        response: {
          data: {
            message: string;
          };
        };
      }) => {
        toast.error(error.response?.data?.message || error.message);
      },
    }
  );

  return (
    <div className=" max-w-[800px] flex flex-col m-auto">
      <div className="my-4">
        <h1 className="text-gray-900 font-bold text-2xl">
          Create Organizarion to Start
        </h1>
      </div>
      <div className="w-full">
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Organizarion Name
          </label>
          <input
            type="text"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Organization name e.g. dStream"
            value={organizationData.name}
            onChange={(e) => {
              setOrganizationData({
                type: "name",
                value: e.target.value,
              });
            }}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Address Line 1
          </label>
          <input
            type="text"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Adddres first line...."
            required
            value={organizationData.address_line1}
            onChange={(e) => {
              setOrganizationData({
                type: "address_line1",
                value: e.target.value,
              });
            }}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Address Line 2
            <span className="text-gray-400 font-normal ml-2">(Optional)</span>
          </label>
          <input
            type="text"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Adddres second line...."
            required
            value={organizationData.address_line2}
            onChange={(e) => {
              setOrganizationData({
                type: "address_line2",
                value: e.target.value,
              });
            }}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            City
          </label>
          <input
            type="text"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="City name, e.g. New York"
            required
            value={organizationData.city}
            onChange={(e) => {
              setOrganizationData({
                type: "city",
                value: e.target.value,
              });
            }}
          />
        </div>
        <div className="flex gap-4 w-full">
          <div className="mb-6 w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              State
            </label>
            <input
              type="text"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="State name, e.g. Delhi"
              required
              value={organizationData.state}
              onChange={(e) => {
                setOrganizationData({
                  type: "state",
                  value: e.target.value,
                });
              }}
            />
          </div>
          <div className="mb-6 w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              ZipCode
            </label>
            <input
              type="number"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Zip Code of Office"
              required
              value={organizationData.zipcode}
              onChange={(e) => {
                setOrganizationData({
                  type: "zipcode",
                  value: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Country
          </label>
          <input
            type="text"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Country name e.g. India"
            required
            value={organizationData.country}
            onChange={(e) => {
              setOrganizationData({
                type: "country",
                value: e.target.value,
              });
            }}
          />
        </div>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={() => {
            createOrg.mutate();
          }}
        >
          Create Organization
        </button>
      </div>
    </div>
  );
}

export default CreateOrganization;
