import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../apis";
import Spinner from "../../components/Spinner";
import SwipeUp from "../../components/SwipeUp";
import CreateMetric from "./CreateMetric";
import { toast } from "react-hot-toast";

function Metric() {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = React.useState(false);
  const [editedData, setEditedData] = React.useState(null);

  const { data, isLoading } = useQuery(
    ["metrics"],
    () => {
      return api.metric.getMetrics();
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const deleteMetric = useMutation(
    (id: string) => {
      return api.metric.deleteMetric({ id });
    },
    {
      onSuccess: () => {
        toast.success("Metric deleted successfully");
        queryClient.invalidateQueries(["metrics"]);
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
    <>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-semibold text-gray-900 text-lg">Metrics</h1>
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
            }}
            className="bg-gray-900 hover:bg-gray-500 text-white text-sm py-2 px-4 rounded"
          >
            Create New Metric
          </button>
        </div>

        <div className="flex items-center justify-center h-80 mb-4 rounded bg-gray-50 ">
          <p className="text-2xl text-gray-400 ">+</p>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Created At
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
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
                  {(data?.data || []).map((item: any) => {
                    return (
                      <tr
                        key={item.id}
                        className="bg-white border-b hover:bg-gray-50 w-full"
                      >
                        <th className="px-6 py-4 font-medium text-gray-900">
                          {item.name}
                        </th>
                        <td className="px-6 py-4 truncate max-w-[250px]">
                          {item?.description}
                        </td>
                        <td className="px-6 py-4">
                          {new Intl.DateTimeFormat("en-IN", {
                            timeZone: "IST",
                            dateStyle: "medium",
                          }).format(new Date(item?.created_at))}
                        </td>
                        <td className="px-6 py-4 flex justify-between items-center gap-2 text-right">
                          <button
                            onClick={() => {
                              setIsOpen(true);
                              setEditedData(item);
                            }}
                            className="font-medium text-gray-600 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteMetric.mutate(item.id)}
                            className="font-medium text-gray-600 hover:underline"
                          >
                            Remove
                          </button>
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
        <SwipeUp isOpen={isOpen} close={() => setIsOpen(false)}>
          <CreateMetric
            setIsOpen={setIsOpen}
            setEditedData={setEditedData}
            metricData={editedData}
          />
        </SwipeUp>
      )}
    </>
  );
}

export default Metric;
