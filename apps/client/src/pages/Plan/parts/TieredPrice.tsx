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

const TieredPrice = ({ planCharge, setPlanCharges, index }: IProps) => {
  return (
    <div className="w-full">
      <label className="block mb-2 text-sm font-medium text-gray-900">
        Tier pricing structure
      </label>
      <div className="align-middle inline-block min-w-full">
        <div className="border-gray-40 rounded-md border">
          <table className="min-w-full rounded-t-md divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-10">
                <th
                  scope="col"
                  className="p-2  text-left text-sm font-medium text-gray-60 border-r"
                >
                  <div className="flex">First unit</div>
                </th>
                <th
                  scope="col"
                  className="p-2  text-left text-sm font-medium text-gray-60 border-r"
                >
                  <div className="flex">Last unit</div>
                </th>
                <th
                  scope="col"
                  className="p-2  text-left text-sm font-medium text-gray-60"
                >
                  <div className="flex">Per unit</div>
                </th>
              </tr>
            </thead>
            <tbody className="border-none">
              {(planCharge?.pricing_scheme || [])?.map(
                (tier: any, tireIndex: number) => {
                  return (
                    <tr key={tireIndex} className="m-0 p-0 relative border-t">
                      <td className="relative whitespace-nowrap text-sm font-medium text-gray-900 m-0 p-0 overflow-hidden border-r">
                        <input
                          type="text"
                          className="p-2 block w-full text-sm border-none focus:ring-0 focus:ring-offset-0 ring-0 ring-offset-0 text-gray-900"
                          disabled={tireIndex === 0}
                          placeholder="0"
                          value={tireIndex === 0 ? "0" : tier.from}
                          onChange={(e) => {
                            setPlanCharges((prev) => {
                              const newPrev = _.cloneDeep(prev);
                              newPrev[index].pricing_scheme[tireIndex].from =
                                parseFloat(e.target.value || "0");

                              return newPrev;
                            });
                          }}
                        />
                      </td>
                      <td className="relative whitespace-nowrap text-sm font-medium text-gray-900 m-0 p-0 overflow-hidden border-r">
                        <input
                          type="text"
                          className="p-2 block w-full text-sm border-none focus:ring-0 focus:ring-offset-0 ring-0 ring-offset-0"
                          placeholder={
                            (planCharge?.pricing_scheme || []).length - 1 ===
                            tireIndex
                              ? "∞"
                              : "0"
                          }
                          disabled={
                            (planCharge?.pricing_scheme || []).length - 1 ===
                            tireIndex
                          }
                          value={
                            (planCharge?.pricing_scheme || []).length - 1 ===
                            tireIndex
                              ? "∞"
                              : tier.to
                          }
                          onChange={(e) => {
                            setPlanCharges((prev) => {
                              const newPrev = _.cloneDeep(prev);
                              newPrev[index].pricing_scheme[tireIndex].to =
                                parseFloat(e.target.value || "0");

                              return newPrev;
                            });
                          }}
                        />
                      </td>
                      <td className="relative whitespace-nowrap text-sm font-medium text-gray-900 m-0 p-0 overflow-hidden">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-400 sm:text-sm">$</span>
                          </div>
                          <input
                            type="number"
                            className="pl-8 py-2 block w-full pr-12 sm:text-sm px-6 border-none focus:ring-0 focus:ring-offset-0 ring-0 ring-offset-0"
                            placeholder="0.00"
                            value={tier.price_per_unit}
                            onChange={(e) => {
                              setPlanCharges((prev) => {
                                const newPrev = _.cloneDeep(prev);
                                newPrev[index].pricing_scheme[
                                  tireIndex
                                ].price_per_unit = parseFloat(
                                  e.target.value || "0"
                                );

                                return newPrev;
                              });
                            }}
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-gray-400 sm:text-sm">
                              USD
                            </span>
                          </div>
                        </div>
                      </td>
                      {tireIndex !== 0 &&
                        tireIndex !==
                          (planCharge?.pricing_scheme || []).length - 1 && (
                          <div
                            className="float-right flex absolute mt-2.5 -ml-2 cursor-pointer z-20"
                            onClick={() => {
                              setPlanCharges((prev) => {
                                const newPrev = _.cloneDeep(prev);
                                newPrev[index].pricing_scheme.splice(
                                  tireIndex,
                                  1
                                );

                                return newPrev;
                              });
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                              className="h-4 w-4 text-gray-900 bg-white hover:text-accent-3"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </div>
                        )}
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
        <button
          className="text-gray-950 font-bold text-sm mt-2 cursor-pointer w-max outline-none focus:outline-none"
          onClick={() => {
            setPlanCharges((prev) => {
              const newPrev = _.cloneDeep(prev);
              newPrev[index].pricing_scheme.splice(
                newPrev[index].pricing_scheme.length - 1,
                0,
                {
                  from: 0,
                  to: 0,
                  price_per_unit: 0,
                }
              );

              return newPrev;
            });
          }}
        >
          + Add another Tier
        </button>
      </div>
    </div>
  );
};

export default TieredPrice;
