import React from "react";
import { toast } from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../../apis";
import Close from "../../../assets/icons/Close";
import { ComboBox, Item } from "../../../components/ComboBox";
import { IPlan } from "../../../interfaces";

interface IProps {
  setIsOpen: (value: "balance" | "address" | null) => void;
  customerId: string;
  customerName: string;
}

function AddSubscription({ setIsOpen, customerId, customerName }: IProps) {
  const queryClient = useQueryClient();
  const plans = useQuery(["plans"], () => {
    return api.plan.getPlans();
  });
  const [selectedPlan, setSelectedPlan] = React.useState<string>("");

  const addSubscription = useMutation(
    () => {
      return api.customer.addSubscription({
        customer_id: customerId,
        plan_id: selectedPlan,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["customer", customerId]);
        toast.success("Subscription Added");
        setIsOpen(null);
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
    <div className="relative">
      <div className="flex items-start justify-between p-4 border-b rounded-t ">
        <h3 className="text-xl font-semibold text-gray-900">Assign User</h3>
        <button
          onClick={() => setIsOpen(null)}
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
        >
          <Close classs="w-5 h-5" />
          <span className="sr-only">Close modal</span>
        </button>
      </div>

      <div className="p-6 space-y-6">
        <div className="mb-6 flex justify-between items-center">
          <div className="w-full flex-1">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Customer Name
            </label>
            <span className="text-base text-gray-950">{customerName}</span>
          </div>
          <div className="w-full flex-1">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Customer Id
            </label>
            <span className="text-base text-gray-950">{customerId}</span>
          </div>
        </div>
        {plans.isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Select Plan
            </label>
            <ComboBox
              label=" "
              selectedKey={selectedPlan}
              onSelectionChange={(e) => {
                setSelectedPlan(e as string);
              }}
            >
              {(plans.data?.data || []).map((plan: IPlan) => (
                <Item key={plan.id}>{plan.name}</Item>
              ))}
            </ComboBox>
          </div>
        )}
      </div>

      <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
        <button
          onClick={() => {
            addSubscription.mutate();
          }}
          type="button"
          className="text-white bg-gray-900 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          Add Subscription
        </button>
        <button
          onClick={() => setIsOpen(null)}
          type="button"
          className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-900 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddSubscription;
