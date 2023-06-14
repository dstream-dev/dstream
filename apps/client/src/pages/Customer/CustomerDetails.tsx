import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import api from "../../apis";
import Spinner from "../../components/Spinner";
import Modal from "../../components/Modal";
import AdjustBalance from "./parts/AdjustBalance";
import CreateCustomer from "./parts/CreateCustomer";
import UpdateAddress from "./parts/UpdateAddress";
import AddSubscription from "./parts/AddSubscription";
import { toast } from "react-hot-toast";

function CustomerDetails() {
  const { id } = useParams();
  const customerDetails = useQuery(
    ["customer", id],
    () => {
      return api.customer.getCustomerById(id || "");
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState<
    "balance" | "address" | "details" | "subscription" | null
  >(null);

  const updateSubscriptionStatus = useMutation(
    ({ sub_id, status }: { sub_id: string; status: boolean }) => {
      return api.customer.updateSubscriptionStatus({ sub_id, status: status });
    },
    {
      onSuccess: () => {
        toast.success("Subscription status updated successfully");
        customerDetails.refetch();
      },
      onError: () => {
        toast.error("Something went wrong");
      },
    }
  );

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
              setIsOpen("subscription");
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

            <div className="flex flex-col">
              <h1 className="font-semibold text-gray-900 text-lg mb-2">
                Plans
              </h1>
              <div className="relative -my-2 -mx-4 sm:-mx-6 lg:-mx-8">
                <div className="min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="border min-w-full rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300 table-fixed rounded-md bg-gray-10 w-full">
                      <thead className="rounded-t-lg">
                        <tr className="rounded-t-lg">
                          <th
                            scope="col"
                            className="px-3 py-3.5 pr-3 text-left pl-4 sm:pl-6"
                          >
                            <div className="flex flex-row items-center">
                              <span className="text-gray-60 font-medium uppercase tracking-wider text-xs block truncate">
                                Timestamp
                              </span>
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 pr-3 text-left"
                          >
                            <div className="flex flex-row items-center">
                              <span className="text-gray-60 font-medium uppercase tracking-wider text-xs block truncate">
                                Plan name
                              </span>
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 pr-3 text-left"
                          >
                            <div className="flex flex-row items-center">
                              <span className="text-gray-60 font-medium uppercase tracking-wider text-xs block truncate">
                                Plan Status
                              </span>
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left relative pl-3 pr-4 sm:pr-6"
                          >
                            <div className="flex flex-row items-center">
                              <span className="text-gray-60 font-medium uppercase tracking-wider text-xs block truncate"></span>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white rounded-b-lg">
                        {(customerDetails.data?.data?.subscriptions || []).map(
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          (subscription: any) => (
                            <tr
                              key={subscription.id}
                              className="group bg-accent-8 rounded-b-lg h-6 transform transition ease-in-out duration-1000 translate-y-0"
                            >
                              <td className=" px-3 text-sm text-gray-500 pl-4 sm:pl-6 whitespace-nowrap cursor-pointer group-hover:bg-gray-10 py-3">
                                <span className="text-sm text-gray-60 block truncate">
                                  {new Intl.DateTimeFormat("en-IN", {
                                    timeZone: "IST",
                                    dateStyle: "short",
                                    timeStyle: "short",
                                  }).format(new Date(subscription?.created_at))}
                                </span>
                              </td>
                              <td className=" px-3 text-sm text-gray-500 whitespace-nowrap cursor-pointer group-hover:bg-gray-10 py-3">
                                <span className="text-sm text-gray-60 block truncate">
                                  {subscription?.plan_name}
                                </span>
                              </td>
                              <td className=" px-3 text-sm text-gray-500 whitespace-nowrap cursor-pointer group-hover:bg-gray-10 py-3">
                                <span className="text-sm text-gray-60 block truncate">
                                  {subscription?.status ? "Active" : "Inactive"}
                                </span>
                              </td>
                              <td className=" px-3 text-sm text-gray-500 relative pl-3 pr-4 sm:pr-6 whitespace-nowrap cursor-pointer group-hover:bg-gray-10 py-3">
                                <span
                                  onClick={() => {
                                    updateSubscriptionStatus.mutate({
                                      sub_id: subscription?.id,
                                      status: !subscription?.status,
                                    });
                                  }}
                                  className="text-sm text-gray-60 block truncate font-semibold underline"
                                >
                                  {subscription?.status
                                    ? "Deactivate"
                                    : "Activate"}
                                </span>
                              </td>
                            </tr>
                          )
                        )}
                        {(customerDetails.data?.data?.subscriptions || [])
                          ?.length === 0 && (
                          <tr className="group bg-accent-8 rounded-b-lg h-6 transform transition ease-in-out duration-1000 translate-y-0">
                            <td className=" px-3 text-sm text-gray-500 pl-4 sm:pl-6 whitespace-nowrap cursor-pointer group-hover:bg-gray-10 py-3">
                              <span className="text-sm text-gray-60 block truncate">
                                No active plans
                              </span>
                            </td>
                            <td className=" px-3 text-sm text-gray-500 whitespace-nowrap cursor-pointer group-hover:bg-gray-10 py-3">
                              <span className="text-sm text-gray-60 block truncate">
                                -
                              </span>
                            </td>
                            <td className=" px-3 text-sm text-gray-500 whitespace-nowrap cursor-pointer group-hover:bg-gray-10 py-3">
                              <span className="text-sm text-gray-60 block truncate">
                                -
                              </span>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
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

            <div className="flex flex-col justify-center items-start gap-3 w-full">
              <div className="flex w-full items-center justify-between border-b-[1px] border-gray-200 py-2">
                <h1 className="font-semibold text-gray-900 text-lg">
                  Address Details
                </h1>
                <span
                  className="text-sm font-semibold text-gray-500 underline cursor-pointer"
                  onClick={() => setIsOpen("address")}
                >
                  Edit Address
                </span>
              </div>
              <div className="flex flex-wrap justify-between items-start w-full">
                <div className="flex items-start justify-center flex-col gap-1 w-1/2 mb-4">
                  <p className="text-base text-gray-600 font-semibold">
                    Address Line 1
                  </p>
                  <span className="text-sm text-gray-800">
                    {customerDetails?.data?.data.address_line1 || "-"}
                  </span>
                </div>
                <div className="flex items-start justify-center flex-col gap-1 w-1/2 mb-4">
                  <p className="text-base text-gray-600 font-semibold">
                    City Name
                  </p>
                  <span className="text-sm text-gray-800">
                    {customerDetails?.data?.data.city || "-"}
                  </span>
                </div>

                <div className="flex items-start justify-center flex-col gap-1 w-1/2 mb-4">
                  <p className="text-base text-gray-600 font-semibold">
                    Address Line 2
                  </p>
                  <span className="text-sm text-gray-800">
                    {customerDetails?.data?.data.address_line2 || "-"}
                  </span>
                </div>
                <div className="flex items-start justify-center flex-col gap-1 w-1/2 mb-4">
                  <p className="text-base text-gray-600 font-semibold">
                    Country
                  </p>
                  <span className="text-sm text-gray-800">
                    {customerDetails?.data?.data.country || "-"}
                  </span>
                </div>
                <div className="flex items-start justify-center flex-col gap-1 w-1/2 mb-4">
                  <p className="text-base text-gray-600 font-semibold">State</p>
                  <span className="text-sm text-gray-800">
                    {customerDetails?.data?.data.state || "-"}
                  </span>
                </div>
                <div className="flex items-start justify-center flex-col gap-1 w-1/2 mb-4">
                  <p className="text-base text-gray-600 font-semibold">
                    Zip Code
                  </p>
                  <span className="text-sm text-gray-800">
                    {customerDetails?.data?.data.zipcode || "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {isOpen && (
        <Modal refNode={modalRef} onClose={() => setIsOpen(null)}>
          <div
            ref={modalRef}
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
            {isOpen === "address" && (
              <UpdateAddress
                setIsOpen={setIsOpen}
                id={customerDetails?.data?.data.id}
                address_line1={customerDetails?.data?.data.address_line1}
                address_line2={customerDetails?.data?.data.address_line2}
                city={customerDetails?.data?.data.city}
                country={customerDetails?.data?.data.country}
                state={customerDetails?.data?.data.state}
                zipcode={customerDetails?.data?.data.zipcode}
              />
            )}
            {isOpen === "subscription" && (
              <AddSubscription
                setIsOpen={setIsOpen}
                customerId={customerDetails.data?.data.id}
                customerName={customerDetails.data?.data.name}
              />
            )}
          </div>
        </Modal>
      )}
    </>
  );
}

export default CustomerDetails;
