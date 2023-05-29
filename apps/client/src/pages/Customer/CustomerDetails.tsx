import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import api from "../../apis";
import Spinner from "../../components/Spinner";
import Modal from "../../components/Modal";
import AdjustBalance from "./parts/AdjustBalance";
import CreateCustomer from "./parts/CreateCustomer";

function CustomerDetails() {
  const { id } = useParams();
  const customerDetails = useQuery(["customer", id], () => {
    return api.customer.getCustomerById(id || "");
  });
  const modealRef = React.useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState<
    "balance" | "address" | "details" | null
  >(null);

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-semibold text-gray-900 text-lg">
            {customerDetails?.data?.data.name || ""}
          </h1>
          <button
            type="button"
            onClick={() => {
              // setIsOpen(true);
            }}
            className="bg-gray-900 hover:bg-gray-500 text-white text-sm py-2 px-4 rounded"
          >
            Add Plan
          </button>
        </div>

        <div className="flex items-center justify-center h-80 mb-4 rounded bg-gray-50 ">
          <p className="text-2xl text-gray-400 ">+</p>
        </div>

        {customerDetails.isLoading ? (
          <div className="flex justify-center items-center h-96">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col gap-5 justify-center items-start w-full">
            <div className="flex flex-col justify-center items-start gap-3 w-full">
              <div className="flex w-full items-center justify-between border-b-[1px] border-gray-200 py-2">
                <h1 className="font-semibold text-gray-900 text-lg">Balance</h1>
                <span
                  className="text-sm font-semibold text-gray-500 underline cursor-pointer"
                  onClick={() => setIsOpen("balance")}
                >
                  Edit Balance
                </span>
              </div>
              <div className="flex flex-col justify-center items-start gap-2">
                <div className="flex items-start justify-center flex-col gap-1">
                  <p className="text-base text-gray-600 font-semibold">
                    Current Balance
                  </p>
                  <span className="text-sm text-gray-800">
                    {customerDetails?.data?.data.account_balance}
                  </span>
                </div>
                <div className="flex items-start justify-center flex-col gap-1">
                  <p className="text-base text-gray-600 font-semibold">
                    Currency
                  </p>
                  <span className="text-sm text-gray-800">
                    {customerDetails?.data?.data.currency}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center items-start gap-3 w-full">
              <div className="flex w-full items-center justify-between border-b-[1px] border-gray-200 py-2">
                <h1 className="font-semibold text-gray-900 text-lg">
                  Customer Details
                </h1>
                <span
                  className="text-sm font-semibold text-gray-500 underline cursor-pointer"
                  onClick={() => setIsOpen("details")}
                >
                  Edit Details
                </span>
              </div>
              <div className="flex flex-wrap justify-between items-start w-full">
                <div className="flex items-start justify-center flex-col gap-1 w-1/2 mb-4">
                  <p className="text-base text-gray-600 font-semibold">
                    Customer Name
                  </p>
                  <span className="text-sm text-gray-800">
                    {customerDetails?.data?.data.name}
                  </span>
                </div>
                <div className="flex items-start justify-center flex-col gap-1 w-1/2 mb-4">
                  <p className="text-base text-gray-600 font-semibold">
                    Customer Email
                  </p>
                  <span className="text-sm text-gray-800">
                    {customerDetails?.data?.data.email}
                  </span>
                </div>

                <div className="flex items-start justify-center flex-col gap-1 w-1/2 mb-4">
                  <p className="text-base text-gray-600 font-semibold">
                    External Id
                  </p>
                  <span className="text-sm text-gray-800">
                    {customerDetails?.data?.data.external_customer_id}
                  </span>
                </div>
                <div className="flex items-start justify-center flex-col gap-1 w-1/2 mb-4">
                  <p className="text-base text-gray-600 font-semibold">
                    Customer Id
                  </p>
                  <span className="text-sm text-gray-800">
                    {customerDetails?.data?.data.id}
                  </span>
                </div>
                <div className="flex items-start justify-center flex-col gap-1 w-1/2 mb-4">
                  <p className="text-base text-gray-600 font-semibold">
                    Time zone
                  </p>
                  <span className="text-sm text-gray-800">
                    {customerDetails?.data?.data.timezone}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {isOpen && (
        <Modal refNode={modealRef} onClose={() => setIsOpen(null)}>
          <div
            ref={modealRef}
            className="relative w-full max-w-2xl max-h-full bg-white rounded-lg shadow"
          >
            {isOpen === "balance" && (
              <AdjustBalance
                setIsOpen={setIsOpen}
                id={customerDetails?.data?.data.id}
                currency={customerDetails?.data?.data.currency}
                account_balance={customerDetails?.data?.data.account_balance}
              />
            )}
            {isOpen === "details" && (
              <CreateCustomer
                setIsOpen={() => {
                  setIsOpen(null);
                }}
                customerData={{
                  id: customerDetails?.data?.data.id,
                  name: customerDetails?.data?.data.name,
                  email: customerDetails?.data?.data.email,
                  external_customer_id:
                    customerDetails?.data?.data.external_customer_id,
                  timezone: customerDetails?.data?.data.timezone,
                }}
              />
            )}
          </div>
        </Modal>
      )}
    </>
  );
}

export default CustomerDetails;
