import React from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../apis";
import Spinner from "../../components/Spinner";
import SwipeUp from "../../components/SwipeUp";
import { ICustomer } from "../../interfaces";
import CreateCustomer from "./CreateCustomer";

function Customer() {
  const [isOpen, setIsOpen] = React.useState(false);

  const { data, isLoading } = useQuery(
    ["customers"],
    () => {
      return api.customer.getAllCustomers();
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-semibold text-gray-900 text-lg">Customers</h1>
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
            }}
            className="bg-gray-900 hover:bg-gray-500 text-white text-sm py-2 px-4 rounded"
          >
            Create New Customer
          </button>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  External Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody className="w-full">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={4}
                    rowSpan={4}
                    className="flex justify-center items-center h-96"
                  >
                    <Spinner />
                  </td>
                </tr>
              ) : (
                <>
                  {(data?.data || []).map((item: ICustomer) => {
                    return (
                      <tr
                        onClick={() => console.log(item)}
                        key={item.id}
                        className="bg-white border-b hover:bg-gray-50 w-full cursor-pointer"
                      >
                        <th className="px-6 py-4 font-medium text-gray-900">
                          {item.name}
                        </th>
                        <td className="px-6 py-4 truncate max-w-[250px]">
                          {item?.external_customer_id}
                        </td>
                        <td className="px-6 py-4">
                          {new Intl.DateTimeFormat("en-IN", {
                            timeZone: "IST",
                            dateStyle: "medium",
                          }).format(new Date(item?.created_at))}
                        </td>
                      </tr>
                    );
                  })}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {isOpen && (
        <SwipeUp
          isOpen={isOpen}
          close={() => {
            setIsOpen(false);
          }}
        >
          <CreateCustomer setIsOpen={setIsOpen} />
        </SwipeUp>
      )}
    </>
  );
}

export default Customer;
