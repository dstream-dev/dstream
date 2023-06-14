function BulkPriceDetails({
  details,
}: {
  details: Array<{ max_units: number; price_per_unit: number }>;
}) {
  return (
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
                  Max units
                </span>
              </th>
              <th
                scope="col"
                className="border-gray-30 bg-gray-20 px-3 py-2 text-left whitespace-nowrap"
              >
                <span className="text-sm text-gray-60 font-semibold">
                  Per unit
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {details.map((detail, index) => (
              <tr key={index} className="group">
                <td className="px-3 py-2 border-t border-gray-30 whitespace-nowrap bg-white border-r">
                  <span className="text-sm text-gray-60">
                    {details.length - 1 === index ? "∞" : detail.max_units}
                  </span>
                </td>

                <td className="px-3 py-2 border-t border-gray-30 whitespace-nowrap bg-white">
                  <span className="text-sm text-gray-60">
                    ${detail.price_per_unit}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BulkPriceDetails;
