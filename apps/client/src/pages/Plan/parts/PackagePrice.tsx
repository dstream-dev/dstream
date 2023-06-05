import React from "react";
import _ from "lodash";

interface IProps {
  planCharge: {
    metric_id: string;
    cadence: string;
    active_min_charge: boolean;
    min_charge: number;
    pricing_model: string;
    pricing_scheme: any;
  };
  setPlanCharges: React.Dispatch<
    React.SetStateAction<
      {
        metric_id: string;
        cadence: string;
        active_min_charge: boolean;
        min_charge: number;
        pricing_model: string;
        pricing_scheme: any;
      }[]
    >
  >;
  index: number;
}

const PackagePrice = ({ planCharge, setPlanCharges, index }: IProps) => {
  return (
    <>
      <div className="w-full">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Package Size
        </label>
        <input
          type="number"
          className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-gray-900 block w-full p-2.5"
          placeholder="package size"
          value={planCharge.pricing_scheme?.package_size}
          onChange={(e) => {
            setPlanCharges((prv) => {
              const newPlanCharges = [...prv];
              newPlanCharges[index].pricing_scheme.package_size = parseFloat(
                e.target.value
              );
              return newPlanCharges;
            });
          }}
          required
        />
      </div>
      <div className="w-full">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Price Per Package
        </label>
        <input
          type="number"
          className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-gray-900 block w-full p-2.5"
          placeholder="price per package"
          value={planCharge.pricing_scheme?.package_per_price}
          onChange={(e) => {
            setPlanCharges((prv) => {
              const newPlanCharges = _.cloneDeep(prv);
              newPlanCharges[index].pricing_scheme.package_per_price =
                parseFloat(e.target.value);
              return newPlanCharges;
            });
          }}
          required
        />
      </div>
    </>
  );
};

export default PackagePrice;
