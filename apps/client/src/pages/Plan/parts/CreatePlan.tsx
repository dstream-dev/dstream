import React from "react";

interface IProps {
  setIsOpen: (value: boolean) => void;
}

function CreatePlan({ setIsOpen }: IProps) {
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
            className="bg-gray-900 hover:bg-gray-500 text-white text-sm py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              // customerCreate.mutate();
            }}
            className="bg-gray-900 hover:bg-gray-500 text-white text-sm py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </div>

      <div className="flex items-start justify-between gap-4 relative">
        <div className="w-1/3 sticky top-[90px] self-start">
          <div>
            <h6 className="text-sm text-gray-900 font-semibold">
              Plan Details
            </h6>
          </div>
        </div>
        <div className="flex-1 h-auto">
          <div className="w-full border-l-2 pl-2">dshjnkn</div>
        </div>
      </div>
    </div>
  );
}

export default CreatePlan;
