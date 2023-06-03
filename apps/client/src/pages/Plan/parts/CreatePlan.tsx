import React from "react";
import { ComboBox, Item } from "../../../components/ComboBox";
import { currencyList } from "../../../utils/currencyList";
import Close from "../../../assets/icons/Close";
import { ChargesCadence, IMetric, PlanPaymentTerm } from "../../../interfaces";
import { useQuery } from "@tanstack/react-query";
import api from "../../../apis";

interface IProps {
  setIsOpen: (value: boolean) => void;
}

function CreatePlan({ setIsOpen }: IProps) {
  const [planDetails, setPlanDetails] = React.useReducer(
    (
      state: {
        currency: string;
        external_plan_id: string;
        payment_term: string;
        min_charges_amount: number;
        min_charges_name: string;
      },
      newState: {
        type:
          | "currency"
          | "external_plan_id"
          | "payment_term"
          | "min_charges_amount"
          | "min_charges_name";
        value: string | number;
      }
    ) => ({ ...state, [newState.type]: newState.value }),
    {
      currency: "USD",
      external_plan_id: "",
      payment_term: "due_on_issue",
      min_charges_amount: 0,
      min_charges_name: "",
    }
  );

  const [planCharges, setPlanCharges] = React.useState<
    Array<{
      metric_id: string;
      cadence: string;
      active_min_charge: boolean;
      min_charge: number;
      pricing_model: string;
      pricing_scheme: object;
    }>
  >([
    {
      metric_id: "",
      cadence: "monthly",
      active_min_charge: false,
      min_charge: 0,
      pricing_model: "unit",
      pricing_scheme: {
        price_per_unit: 0,
      },
    },
  ]);

  const metrics = useQuery(
    ["metrics"],
    () => {
      return api.metric.getMetrics();
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6 border-b-2 py-4 sticky top-0 bg-white z-50">
        <h1 className="font-semibold text-gray-900 text-lg">Create New Plan</h1>
        <div className="flex justify-between items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
            }}
            className="bg-gray-900 hover:bg-white0 text-white text-sm py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              // customerCreate.mutate();
            }}
            className="bg-gray-900 hover:bg-white0 text-white text-sm py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </div>

      <div className="flex items-start justify-between gap-4 relative">
        <div className="w-1/3 sticky top-[90px] self-start">
          <div className="flex flex-col gap-6">
            <h6 className="text-sm text-gray-900 font-semibold mb-4">
              Plan Details
            </h6>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Currency
              </label>
              <ComboBox
                label=" "
                selectedKey={planDetails.currency}
                onSelectionChange={(e) => {
                  setPlanDetails({
                    type: "currency",
                    value: e,
                  });
                }}
              >
                {currencyList.map((currency) => (
                  <Item key={currency}>{currency}</Item>
                ))}
              </ComboBox>
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                External ID
              </label>
              <input
                type="text"
                className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-gray-900 block w-full p-2.5"
                placeholder="external id e.g. 1234"
                value={planDetails.external_plan_id}
                onChange={(e) => {
                  setPlanDetails({
                    type: "external_plan_id",
                    value: e.target.value,
                  });
                }}
                required
              />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Net payment terms
              </label>
              <ComboBox
                label=" "
                selectedKey={planDetails.payment_term}
                onSelectionChange={(e) => {
                  setPlanDetails({
                    type: "payment_term",
                    value: e,
                  });
                }}
              >
                {Object.keys(PlanPaymentTerm).map((paymentTerm) => (
                  <Item key={paymentTerm}>{paymentTerm}</Item>
                ))}
              </ComboBox>
            </div>

            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Minimum charges
              </label>
              <input
                type="number"
                className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-gray-900 block w-full p-2.5"
                placeholder="minimum charges e.g. 100"
                value={planDetails.min_charges_amount}
                onChange={(e) => {
                  setPlanDetails({
                    type: "min_charges_amount",
                    value: e.target.value,
                  });
                }}
                required
              />
            </div>

            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Minimum charges name
              </label>
              <input
                type="text"
                className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-gray-900 block w-full p-2.5"
                placeholder="minimum charges name e.g. Platform fee"
                value={planDetails.min_charges_name}
                onChange={(e) => {
                  setPlanDetails({
                    type: "min_charges_name",
                    value: e.target.value,
                  });
                }}
                required
              />
            </div>
          </div>
        </div>
        <div className="flex-1 h-auto">
          <div className="w-full border-l-2 pl-2">
            <div className="flex items-center justify-between mb-4">
              <h6 className="text-sm text-gray-900 font-semibold">
                Plan Charges
              </h6>
              <button
                type="button"
                onClick={() => {
                  setPlanCharges((prv) => [
                    ...prv,
                    {
                      metric_id: "",
                      cadence: "monthly",
                      active_min_charge: false,
                      min_charge: 0,
                      pricing_model: "unit",
                      pricing_scheme: {
                        price_per_unit: 0,
                      },
                    },
                  ]);
                }}
                className="bg-gray-900 hover:bg-white0 text-white text-sm py-2 px-4 rounded"
              >
                Add Item
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {planCharges.map((planCharge, index) => (
                <div
                  key={index}
                  className="relative w-full p-4 bg-slate-100 rounded-md"
                >
                  <button
                    onClick={() => {
                      setPlanCharges((prv) =>
                        prv.filter((_, i) => i !== index)
                      );
                    }}
                    type="button"
                    className="text-gray-700 bg-transparent text-sm p-1.5 ml-auto inline-flex items-center absolute top-1 right-1 z-20"
                  >
                    <Close classs="w-4 h-4 relative" />
                    <span className="sr-only relative">Delete Charge</span>
                  </button>
                  <div className="flex justify-between relative items-start gap-6">
                    <div className="w-1/3 flex flex-col gap-4 justify-start items-center">
                      <div className="w-full">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Select Metric
                        </label>
                        <ComboBox
                          label=" "
                          selectedKey={planCharge.metric_id}
                          onSelectionChange={(e) => {
                            setPlanCharges((prv) => {
                              const newPlanCharges = [...prv];
                              newPlanCharges[index].metric_id = e as string;
                              return newPlanCharges;
                            });
                          }}
                        >
                          {(metrics.data?.data || []).map((metric: IMetric) => (
                            <Item key={metric.id}>{metric.name}</Item>
                          ))}
                        </ComboBox>
                      </div>
                      <div className="w-full">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Select Cacdence
                        </label>
                        <ComboBox
                          label=" "
                          selectedKey={planCharge.cadence}
                          onSelectionChange={(e) => {
                            setPlanCharges((prv) => {
                              const newPlanCharges = [...prv];
                              newPlanCharges[index].cadence = e as string;
                              return newPlanCharges;
                            });
                          }}
                        >
                          {Object.keys(ChargesCadence).map(
                            (cadence: string) => (
                              <Item key={cadence}>{cadence}</Item>
                            )
                          )}
                        </ComboBox>
                      </div>
                    </div>
                    <div className="flex-1 w-full">djk</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePlan;
