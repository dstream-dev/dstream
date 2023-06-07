import React from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../apis";
import Spinner from "../../components/Spinner";
import SwipeSide from "../../components/SwipeSide";

function Events() {
  const [page, setPage] = React.useState(1);
  const [openEvent, setOpenEvent] = React.useState<null | any>(null);
  const events = useQuery(
    ["events", page],
    () => {
      return api.event.getAllEvents({ page });
    },
    {
      refetchOnWindowFocus: false,
      refetchInterval: 1000 * 3,
      keepPreviousData: true,
    }
  );

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-semibold text-gray-900 text-lg">Events</h1>
      </div>
      <main className="bg-white">
        <div className="flex flex-col">
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
                      <th scope="col" className="px-3 py-3.5 pr-3 text-left">
                        <div className="flex flex-row items-center">
                          <span className="text-gray-60 font-medium uppercase tracking-wider text-xs block truncate">
                            Event name
                          </span>
                        </div>
                      </th>
                      <th scope="col" className="px-3 py-3.5 pr-3 text-left">
                        <div className="flex flex-row items-center">
                          <span className="text-gray-60 font-medium uppercase tracking-wider text-xs block truncate">
                            Customer ID
                          </span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left relative pl-3 pr-4 sm:pr-6"
                      >
                        <div className="flex flex-row items-center">
                          <span className="text-gray-60 font-medium uppercase tracking-wider text-xs block truncate">
                            Properties
                          </span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white rounded-b-lg">
                    {events.isLoading ? (
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
                        {events.data?.data.map((event: any) => (
                          <tr
                            onClick={() => {
                              setOpenEvent(event);
                            }}
                            key={event.id}
                            className="group bg-accent-8 rounded-b-lg h-6 transform transition ease-in-out duration-1000 translate-y-0"
                          >
                            <td className=" px-3 text-sm text-gray-500 pl-4 sm:pl-6 whitespace-nowrap cursor-pointer group-hover:bg-gray-10 py-3">
                              <span className="text-sm text-gray-60 block truncate">
                                {new Intl.DateTimeFormat("en-IN", {
                                  timeZone: "IST",
                                  dateStyle: "short",
                                  timeStyle: "short",
                                }).format(new Date(event?.created_at))}
                              </span>
                            </td>
                            <td className=" px-3 text-sm text-gray-500 whitespace-nowrap cursor-pointer group-hover:bg-gray-10 py-3">
                              <span className="text-sm text-gray-60 block truncate">
                                {event?.event_name}
                              </span>
                            </td>
                            <td className=" px-3 text-sm text-gray-500 whitespace-nowrap cursor-pointer group-hover:bg-gray-10 py-3">
                              <span className="text-sm text-gray-60 block truncate">
                                {event?.customer_id}
                              </span>
                            </td>
                            <td className=" px-3 text-sm text-gray-500 relative pl-3 pr-4 sm:pr-6 whitespace-nowrap cursor-pointer group-hover:bg-gray-10 py-3">
                              <span className="text-sm text-gray-60 block truncate">
                                {JSON.stringify(event?.properties)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row ml-auto pb-3 pt-3 float-right">
          <button
            type="button"
            onClick={() => {
              if (page > 1) setPage(page - 1);
            }}
            className="inline-flex items-center border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ml-1 px-2.5 py-2 border-transparent focus:ring-accent-4"
          >
            <span className="text-sm text-gray-40">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          </button>
          <button
            type="button"
            onClick={() => {
              if (events.data?.data.length > 0) setPage(page + 1);
            }}
            className="inline-flex items-center border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ml-1 px-2.5 py-2 border-transparent focus:ring-accent-4 hover:bg-gray-10"
          >
            <span className="text-sm text-gray-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          </button>
        </div>
      </main>
      {openEvent !== null && (
        <SwipeSide
          head="Properties"
          isOpen={!!openEvent}
          close={() => setOpenEvent(null)}
        >
          <div className="mt-6 flex flex-col grow">
            <div className="overflow-hidden border rounded-md overflow-x-auto">
              <table className="border-gray-30 min-w-full">
                <thead className="bg-gray-10">
                  <tr>
                    <th
                      scope="col"
                      className="border-gray-30 bg-gray-20 px-3 py-2 text-left whitespace-nowrap border-r "
                    >
                      <span className="text-sm text-gray-60 font-semibold">
                        Property Key
                      </span>
                    </th>
                    <th
                      scope="col"
                      className="border-gray-30 bg-gray-20 px-3 py-2 text-left whitespace-nowrap"
                    >
                      <span className="text-sm text-gray-60 font-semibold">
                        Property Value
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(openEvent ? openEvent.properties : {}).map(
                    (detail, index) => (
                      <tr key={index} className="group">
                        <td className="px-3 py-2 border-t border-gray-30 whitespace-nowrap bg-white border-r">
                          <span className="text-sm text-gray-60">
                            {detail[0]}
                          </span>
                        </td>

                        <td className="px-3 py-2 border-t border-gray-30 whitespace-nowrap bg-white">
                          <span className="text-sm text-gray-60">
                            {JSON.stringify(detail[1])}
                          </span>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </SwipeSide>
      )}
    </div>
  );
}

export default Events;
