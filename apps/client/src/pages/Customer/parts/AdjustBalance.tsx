import React from "react";
import Close from "../../../assets/icons/Close";
import { useMutation } from "@tanstack/react-query";
import api from "../../../apis";
import { toast } from "react-hot-toast";

interface IProps {
  setIsOpen: (value: "balance" | "address" | null) => void;
  id: string;
  currency: string;
  account_balance: number;
}

const AdjustBalance = ({
  setIsOpen,
  id,
  currency,
  account_balance,
}: IProps) => {
  const [balance, setBalance] = React.useReducer(
    (
      state: {
        account_balance: number;
        currency: string;
      },
      newState: { type: "account_balance" | "currency"; value: string }
    ) => {
      return { ...state, [newState.type]: newState.value };
    },
    { account_balance, currency }
  );

  const updateBalance = useMutation(
    () => {
      return api.customer.updateBalance({
        id,
        data: {
          account_balance: balance.account_balance,
          currency: balance.currency,
        },
      });
    },
    {
      onSuccess: () => {
        toast.success("Balance updated successfully");
        setIsOpen(null);
      },
      onError: () => {
        toast.error("Something went wrong");
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
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Ammount
          </label>
          <input
            type="number"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-gray-900 focus:outline-none block w-full p-2.5"
            placeholder="Enter ammount for balance"
            value={balance.account_balance}
            onChange={(e) => {
              setBalance({
                type: "account_balance",
                value: e.target.value,
              });
            }}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Currency
          </label>
          <input
            type="string"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-gray-900 focus:outline-none block w-full p-2.5"
            placeholder="Enter ammount for balance"
            value={balance.currency}
            onChange={(e) => {
              setBalance({
                type: "currency",
                value: e.target.value,
              });
            }}
            required
          />
        </div>
      </div>

      <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
        <button
          onClick={() => {
            updateBalance.mutate();
          }}
          type="button"
          className="text-white bg-gray-900 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          Update Balance
        </button>
        <button
          onClick={() => setIsOpen(null)}
          type="button"
          className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-900 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
        >
          Cancle
        </button>
      </div>
    </div>
  );
};

export default AdjustBalance;
