import React from "react";

function UnitPriceDetails({ price_per_unit }: { price_per_unit: number }) {
  return (
    <div className="mt-6 flex flex-col grow">
      <div className="overflow-hidden border rounded-md overflow-x-auto">
        <table className="border-gray-30 min-w-full">
          <thead className="bg-gray-10">
            <tr>
              <th
                scope="col"
                className="border-gray-30 bg-gray-20 px-3 py-2 text-left whitespace-nowrap"
              >
                <span className="text-sm text-gray-60 font-semibold">
                  Amount
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="group">
              <td className="px-3 py-2 border-t border-gray-30 whitespace-nowrap bg-white">
                <span className="text-sm text-gray-60">${price_per_unit}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UnitPriceDetails;
