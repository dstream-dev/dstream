import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../apis";
import { IPlanCharges } from "../../interfaces";
import Spinner from "../../components/Spinner";
import PackagePriceDetails from "./parts/PackagePriceDetails";
import UnitPriceDetails from "./parts/UnitPriceDetails";
import TieredPriceDetails from "./parts/TieredPriceDetails";
import BulkPriceDetails from "./parts/BulkPriceDetails";

function PlanDetails() {
  const { id } = useParams();

  const { data, isLoading } = useQuery(
    ["plan", id],
    () => {
      return api.plan.getPlan({ id: id || "" });
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6 border-b-[1px] pb-4">
        <h1 className="font-semibold text-gray-900 text-lg">
          {data?.data.name || ""}
        </h1>
        <button
          type="button"
          onClick={() => {
            // setIsOpen(true);
          }}
          className="bg-white border border-gray-950 text-gray-950 hover:bg-gray-900 hover:text-white text-sm py-2 px-4 rounded"
        >
          Delete
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col gap-5 justify-center items-start w-full">
          <div className="flex flex-col justify-center items-start gap-3 w-full">
            <div className="flex w-full items-center justify-between border-b-[1px] border-gray-200 py-2">
              <h1 className="font-semibold text-gray-900 text-lg">
                Plan Details
              </h1>
            </div>
            <div className="flex gap-3 justify-between items-start w-full">
              <div className="flex flex-col justify-center items-start gap-2 flex-1">
                <div className="flex items-start justify-center flex-col gap-1">
                  <p className="text-sm text-gray-600 font-semibold">
                    Plan Name
                  </p>
                  <span className="text-sm text-gray-800">
                    {data?.data.name || "-"}
                  </span>
                </div>
                <div className="flex items-start justify-center flex-col gap-1">
                  <p className="text-sm text-gray-600 font-semibold">
                    Plan Description
                  </p>
                  <span className="text-sm text-gray-800">
                    {data?.data.description || "-"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-center items-start gap-2  w-1/3">
                <div className="flex items-start justify-center flex-col gap-1">
                  <p className="text-sm text-gray-600 font-semibold">
                    Plan External Id
                  </p>
                  <span className="text-sm text-gray-800">
                    {data?.data.external_plan_id || "-"}
                  </span>
                </div>
                <div className="flex items-start justify-center flex-col gap-1">
                  <p className="text-sm text-gray-600 font-semibold">
                    Payment Term
                  </p>
                  <span className="text-sm text-gray-800">
                    {data?.data.payment_term}
                  </span>
                </div>
                <div className="flex items-start justify-center flex-col gap-1">
                  <p className="text-sm text-gray-600 font-semibold">
                    Payment Currency
                  </p>
                  <span className="text-sm text-gray-800">
                    {data?.data.currency}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-start gap-3 w-full">
            <div className="flex w-full items-center justify-between border-b-[1px] border-gray-200 py-2">
              <h1 className="font-semibold text-gray-900 text-lg">
                Plan Charges
              </h1>
            </div>
            <div className="flex flex-col gap-3 justify-center items-start w-2/3">
              {data?.data.charges.map((charge: IPlanCharges) => {
                return (
                  <div
                    key={charge.id}
                    className="flex flex-col grow px-4 py-5 border shadow-sm rounded-lg w-full"
                  >
                    <div className="mt-0.5 flex flex-row items-center cursor-pointer">
                      <div className="mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                          className="w-5 l-5 text-accent-1 group-hover:text-gray-60"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <div className="flex">
                        <h4 className="text-base text-accent-1 font-semibold">
                          API requests
                        </h4>
                      </div>
                    </div>
                    <div className="flex flex-col grow px-7">
                      <div className="flex flex-col">
                        <div className="grid grid-cols-3 gap-x-6 mt-4">
                          <div className="col-span-1 border-r pr-4">
                            <label className="flex">
                              <span className="text-sm text-gray-70 font-medium">
                                Billable metric
                              </span>
                            </label>
                            <div className="mt-1">
                              <span className="text-sm text-gray-80">
                                API requests
                              </span>
                            </div>
                          </div>
                          <div className="col-span-1 border-r pr-4">
                            <label className="flex">
                              <span className="text-sm text-gray-70 font-medium">
                                Cadence
                              </span>
                            </label>
                            <div className="mt-1">
                              <span className="text-sm text-gray-80">
                                {charge.cadence}
                              </span>
                            </div>
                          </div>
                          <div className="col-span-1 pr-4">
                            <label className="flex">
                              <span className="text-sm text-gray-70 font-medium">
                                Pricing model
                              </span>
                            </label>
                            <div className="mt-1">
                              <span className="text-sm text-gray-80">
                                {charge.pricing_model}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {charge.pricing_model === "package" && (
                        <PackagePriceDetails
                          package_per_price={
                            charge.pricing_scheme?.package_per_price
                          }
                          package_size={charge.pricing_scheme?.package_size}
                        />
                      )}
                      {charge.pricing_model === "unit" && (
                        <UnitPriceDetails
                          price_per_unit={charge.pricing_scheme?.price_per_unit}
                        />
                      )}
                      {charge.pricing_model === "tiered" && (
                        <TieredPriceDetails details={charge.pricing_scheme} />
                      )}
                      {charge.pricing_model === "bulk" && (
                        <BulkPriceDetails details={charge.pricing_scheme} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlanDetails;
