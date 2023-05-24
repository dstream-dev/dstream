import React from "react";
import { useNavigate } from "react-router-dom";

function Metric() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-gray-900 text-lg">Metrics</h1>
        <button
          type="button"
          onClick={() => {
            navigate("/metrics/create");
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
                User Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* {isLoading ? (
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
                {(data?.data || []).map((item: IOrganizationUser) => {
                  return (
                    <tr
                      key={item.id}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {item.user.first_name} {item.user.last_name}
                      </th>
                      <td className="px-6 py-4">{item.user.email}</td>
                      <td className="px-6 py-4">{item.role}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => console.log(item.id)}
                          className="font-medium text-gray-600 hover:underline"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </>
            )} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Metric;
