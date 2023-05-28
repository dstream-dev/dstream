import React from "react";
import { toast } from "react-hot-toast";
import { ComboBox, Item } from "../../components/ComboBox";
import { timeZonesList } from "../../utils/timeZoneList";
import api from "../../apis";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IProps {
  setIsOpen: (value: boolean) => void;
}

function CreateCustomer({ setIsOpen }: IProps) {
  const queryClient = useQueryClient();
  const [userDetails, setUserDetails] = React.useReducer(
    (
      state: {
        name: string;
        email: string;
        timezone: string;
        external_customer_id: string;
      },
      newState: {
        type: "name" | "email" | "timezone" | "external_customer_id";
        value: string;
      }
    ) => ({ ...state, [newState.type]: newState.value }),
    {
      name: "",
      email: "",
      timezone: "",
      external_customer_id: "",
    }
  );

  const customerCreate = useMutation(
    () => {
      return api.customer.creatCustomer(userDetails);
    },
    {
      onSuccess: () => {
        setIsOpen(false);
        toast.success("Customer created successfully");
        queryClient.invalidateQueries(["customers"]);
      },
      onError: (err: {
        message: string;
        response: { data: { message: string } };
      }) => {
        toast.error(err?.response?.data?.message || err.message);
      },
    }
  );

  return (
    <div className="p-4 ">
      <div className="flex justify-between items-center mb-6 border-b-2 py-4">
        <h1 className="font-semibold text-gray-900 text-lg">
          Customer details
        </h1>
        <div className="flex justify-between items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
            }}
            className="bg-gray-900 hover:bg-gray-500 text-white text-sm py-2 px-4 rounded"
          >
            Cancle
          </button>
          <button
            type="button"
            onClick={() => {
              customerCreate.mutate();
            }}
            className="bg-gray-900 hover:bg-gray-500 text-white text-sm py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </div>

      <div className="flex justify-center items-start gap-8">
        <div
          key="details"
          className="flex justify-between items-center gap-5 flex-col mb-6 w-full max-w-md"
        >
          <div className="flex justify-between items-center w-full">
            <div>
              <p className="text-gray-900">Details</p>
              <span className="text-sm text-gray-400">
                Fill in information about your customer
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center flex-col gap-6 w-full">
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Name
              </label>
              <input
                type="text"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-gray-900 block w-full p-2.5"
                placeholder="name e.g. dStream"
                value={userDetails.name}
                onChange={(e) => {
                  setUserDetails({
                    type: "name",
                    value: e.target.value,
                  });
                }}
                required
              />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                type="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-gray-900 focus:outline-none block w-full p-2.5"
                placeholder="User Email e.g. john@gmail.com"
                value={userDetails.email}
                onChange={(e) => {
                  setUserDetails({
                    type: "email",
                    value: e.target.value,
                  });
                }}
                required
              />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                External ID
              </label>
              <input
                type="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-gray-900 focus:outline-none block w-full p-2.5"
                placeholder="User Email e.g. john@gmail.com"
                value={userDetails.external_customer_id}
                onChange={(e) => {
                  setUserDetails({
                    type: "external_customer_id",
                    value: e.target.value,
                  });
                }}
                required
              />
            </div>

            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Time Zone
              </label>
              <ComboBox
                label=" "
                onSelectionChange={(e) => {
                  setUserDetails({
                    type: "timezone",
                    value: e as string,
                  });
                }}
                placeholder="Select Condition"
              >
                {timeZonesList.map((item: string) => {
                  return <Item key={item}>{item}</Item>;
                })}
              </ComboBox>
            </div>
          </div>
        </div>
        <div className="w-64 flex-none">
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-accent-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
              <span className="text-xs text-gray-900 ml-1 uppercase font-bold">
                Note
              </span>
            </div>
            <div className="mt-4">
              <span className="text-sm text-gray-600">
                In dStream, customers are assigned unique IDs. You can also
                specify your own application&apos;s identifier as an External
                Customer ID, which will be used as an alias to make reporting
                usage events easier.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCustomer;
