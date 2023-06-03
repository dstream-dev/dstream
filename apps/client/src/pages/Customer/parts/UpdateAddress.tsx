import React from "react";
import Close from "../../../assets/icons/Close";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../apis";
import { toast } from "react-hot-toast";

interface IProps {
  setIsOpen: (value: "balance" | "address" | null) => void;
  id: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  zipcode: number;
  country: string;
}

const UpdateAddress = ({
  setIsOpen,
  id,
  address_line1,
  address_line2,
  city,
  state,
  zipcode,
  country,
}: IProps) => {
  const queryClient = useQueryClient();
  const [address, setAddress] = React.useReducer(
    (
      state: {
        address_line1: string;
        address_line2: string;
        city: string;
        state: string;
        zipcode: number;
        country: string;
      },
      newState: {
        type:
          | "address_line1"
          | "address_line2"
          | "city"
          | "state"
          | "zipcode"
          | "country";
        value: string;
      }
    ) => {
      return { ...state, [newState.type]: newState.value };
    },
    {
      address_line1,
      address_line2,
      city,
      state,
      zipcode,
      country,
    }
  );

  const updateAddress = useMutation(
    () => {
      return api.customer.updateAddress({
        id,
        data: {
          address_line1: address.address_line1,
          address_line2: address.address_line2,
          city: address.city,
          state: address.state,
          zipcode: address.zipcode,
          country: address.country,
        },
      });
    },
    {
      onSuccess: () => {
        toast.success("Address updated successfully");
        queryClient.invalidateQueries(["customer", id]);
        setIsOpen(null);
      },
      onError: () => {
        toast.error("Something went wrong");
      },
    }
  );

  return (
    <div className="relative">
      <div className="flex items-start justify-between p-4 border-b rounded-t ">
        <h3 className="text-xl font-semibold text-gray-900">Address Details</h3>
        <button
          onClick={() => setIsOpen(null)}
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
        >
          <Close classs="w-5 h-5" />
          <span className="sr-only">Close modal</span>
        </button>
      </div>

      <div className="p-6 space-y-6">
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Address Line 1
          </label>
          <input
            type="string"
            className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-gray-900 focus:outline-none block w-full p-2.5"
            placeholder="Address Line 1 e.g. 123 Main St"
            value={address.address_line1}
            onChange={(e) => {
              setAddress({ type: "address_line1", value: e.target.value });
            }}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Address Line 2
          </label>
          <input
            type="string"
            className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-gray-900 focus:outline-none block w-full p-2.5"
            placeholder="Address Line 2 e.g. Apt 123"
            value={address.address_line2}
            onChange={(e) => {
              setAddress({ type: "address_line2", value: e.target.value });
            }}
            required
          />
        </div>
        <div className="flex gap-4 justify-between items-center">
          <div className="mb-6 w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              City
            </label>
            <input
              type="string"
              className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-gray-900 focus:outline-none block w-full p-2.5"
              placeholder="City e.g. San Francisco"
              value={address.city}
              onChange={(e) => {
                setAddress({ type: "city", value: e.target.value });
              }}
              required
            />
          </div>
          <div className="mb-6 w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              State
            </label>
            <input
              type="string"
              className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-gray-900 focus:outline-none block w-full p-2.5"
              placeholder="State e.g. "
              value={address.state}
              onChange={(e) => {
                setAddress({ type: "state", value: e.target.value });
              }}
              required
            />
          </div>
        </div>
        <div className="flex gap-4 justify-between items-center">
          <div className="mb-6 w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Zipcode
            </label>
            <input
              type="number"
              className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-gray-900 focus:outline-none block w-full p-2.5"
              placeholder="Address Line 1 e.g. 123 Main St"
              value={address.zipcode}
              onChange={(e) => {
                setAddress({ type: "zipcode", value: e.target.value });
              }}
              required
            />
          </div>
          <div className="mb-6 w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Country
            </label>
            <input
              type="string"
              className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-gray-900 focus:outline-none block w-full p-2.5"
              placeholder="Address Line 1 e.g. 123 Main St"
              value={address.country}
              onChange={(e) => {
                setAddress({ type: "country", value: e.target.value });
              }}
              required
            />
          </div>
        </div>
      </div>

      <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
        <button
          onClick={() => {
            updateAddress.mutate();
          }}
          type="button"
          className="text-white bg-gray-900 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          Update Address
        </button>
        <button
          onClick={() => setIsOpen(null)}
          type="button"
          className="text-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-900 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateAddress;
