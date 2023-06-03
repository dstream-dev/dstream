import React from "react";
import { toast } from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../../apis";
import Spinner from "../../../components/Spinner";

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

function Organization() {
  const [organizationData, setOrganizationData] = React.useReducer(
    (state: IState, newState: INewState) => {
      return { ...state, [newState.type]: newState.value };
    },
    {
      name: "-",
      address_line1: "-",
      address_line2: "-",
      city: "-",
      state: "-",
      zipcode: "-",
      country: "-",
    }
  );

  const { data, isLoading, isError } = useQuery(
    ["organization_details"],
    () => {
      return api.organization.getOrganizationDetail();
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const updateOrganization = useMutation(
    () => {
      return api.organization.updateOrganization({
        id: data?.data.id,
        data: {
          name:
            organizationData.name === "-"
              ? data?.data.name
              : organizationData.name,
          address_line1:
            organizationData.address_line1 === "-"
              ? data?.data.address_line1
              : organizationData.address_line1,
          address_line2:
            organizationData.address_line2 === "-"
              ? data?.data.address_line2
              : organizationData.address_line2,
          city:
            organizationData.city === "-"
              ? data?.data.city
              : organizationData.city,
          state:
            organizationData.state === "-"
              ? data?.data.state
              : organizationData.state,
          zipcode:
            organizationData.zipcode === "-"
              ? data?.data.zipcode
              : organizationData.zipcode,
          country:
            organizationData.country === "-"
              ? data?.data.country
              : organizationData.country,
        },
      });
    },
    {
      onSuccess: () => {
        toast.success("Organization updated successfully");
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
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <Spinner />
        </div>
      ) : isError ? (
        <div>Something went wrong</div>
      ) : (
        <div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Organization Name
            </label>
            <input
              type="text"
              className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-gray-900 block w-full p-2.5"
              placeholder="Organization name e.g. dStream"
              value={
                organizationData.name !== "-"
                  ? organizationData.name
                  : data.data.name
              }
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
              className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-gray-900 block w-full p-2.5"
              placeholder="Address first line...."
              required
              value={
                organizationData.address_line1 !== "-"
                  ? organizationData.address_line1
                  : data?.data.address_line1
              }
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
              className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-gray-900 block w-full p-2.5"
              placeholder="Address second line...."
              required
              value={
                organizationData.address_line2 !== "-"
                  ? organizationData.address_line2
                  : data?.data.address_line2
              }
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
              className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-gray-900 block w-full p-2.5"
              placeholder="City name, e.g. New York"
              required
              value={
                organizationData.city !== "-"
                  ? organizationData.city
                  : data?.data.city
              }
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
                className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-gray-900 block w-full p-2.5"
                placeholder="State name, e.g. Delhi"
                required
                value={
                  organizationData.state !== "-"
                    ? organizationData.state
                    : data?.data.state
                }
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
                className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-gray-900 block w-full p-2.5"
                placeholder="Zip Code of Office"
                required
                value={
                  organizationData.zipcode !== "-"
                    ? organizationData.zipcode
                    : data?.data.zipcode
                }
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
              className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-gray-900 block w-full p-2.5"
              placeholder="Country name e.g. India"
              required
              value={
                organizationData.country !== "-"
                  ? organizationData.country
                  : data?.data.country
              }
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
            className="text-white bg-gray-900 hover:bg-gray-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={() => {
              updateOrganization.mutate();
            }}
          >
            Update Organization
          </button>
        </div>
      )}
    </div>
  );
}

export default Organization;
