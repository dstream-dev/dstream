interface IProps {
  package_size: string;
  package_per_price: string;
}

function PackagePriceDetails({ package_size, package_per_price }: IProps) {
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
                  Package size
                </span>
              </th>
              <th
                scope="col"
                className="border-gray-30 bg-gray-20 px-3 py-2 text-left whitespace-nowrap"
              >
                <span className="text-sm text-gray-60 font-semibold">
                  Per package
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="group">
              <td className="px-3 py-2 border-t border-gray-30 whitespace-nowrap bg-white border-r">
                <span className="text-sm text-gray-60">{package_size}</span>
              </td>
              <td className="px-3 py-2 border-t border-gray-30 whitespace-nowrap bg-white">
                <span className="text-sm text-gray-60">
                  ${package_per_price}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PackagePriceDetails;
