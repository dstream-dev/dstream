import React from "react";
import { Select } from "../../components/Select";
import { MetricAggregationType } from "../../interfaces/Metric";

const aggregate_types = [
  {
    id: MetricAggregationType.SUM,
    name: "SUM",
  },
  {
    id: MetricAggregationType.COUNT,
    name: "COUNT",
  },
  {
    id: MetricAggregationType.MAX,
    name: "MAX",
  },
  {
    id: MetricAggregationType.MIN,
    name: "MIN",
  },
  {
    id: MetricAggregationType.AVERAGE,
    name: "AVERAGE",
  },
];

function CreateMetric() {
  const [conditions, setConditions] = React.useState<
    Array<{ id: number; property: string; condition: string; value: string }>
  >([
    {
      id: 0,
      property: "",
      condition: "",
      value: "",
    },
  ]);

  const [aggregateValues, setAggreagteValues] = React.useReducer(
    (
      state: {
        aggregate_field_name: string;
        aggregation_type: MetricAggregationType;
      },
      newState: {
        type: "aggregate_field_name" | "aggregation_type";
        value: string | MetricAggregationType;
      }
    ) => {
      return { ...state, [newState.type]: newState.value };
    },
    {
      aggregation_type: MetricAggregationType.COUNT,
      aggregate_field_name: "",
    }
  );
  const [metricDetails, setMetricDetails] = React.useReducer(
    (
      state: {
        name: string;
        description: string;
      },
      newState: {
        type: "name" | "description";
        value: string;
      }
    ) => {
      return { ...state, [newState.type]: newState.value };
    },
    {
      name: "",
      description: "",
    }
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6 border-b-2 py-4">
        <h1 className="font-semibold text-gray-900 text-lg">
          Create New Metrics
        </h1>
        <button
          type="button"
          onClick={() => {
            console.log("kkk");
            // navigate("/metrics/create");
          }}
          className="bg-gray-900 hover:bg-gray-500 text-white text-sm py-2 px-4 rounded"
        >
          Save
        </button>
      </div>

      <div
        key="filter"
        className="flex justify-between items-start gap-2 flex-col mb-6 border-b-2 py-4"
      >
        <div className="flex justify-between items-center w-full">
          <div>
            <p className="text-gray-900">Create Filter</p>
            <span className="text-sm text-gray-400">
              Define event rules for your billable metric.
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setConditions((prv) => {
                const val = [...prv];
                val.push({
                  id: conditions.length,
                  property: "",
                  value: "",
                  condition: "",
                });

                return val;
              });
            }}
            className="bg-gray-300 hover:bg-gray-500 text-gray-900 hover:text-gray-50 text-sm py-2 px-4 rounded"
          >
            Add condition
          </button>
        </div>
        {conditions.map((item, index) => {
          return (
            <div key={index} className="flex flex-col w-full items-start gap-2">
              <div key={item.id} className="flex gap-2 ">
                <Select
                  placeholder="Select Property"
                  value={null}
                  onChange={(val: any) => console.log(val)}
                  options={[
                    {
                      id: "aa",
                      name: "nhhh",
                    },
                  ]}
                  primaryColor="blue"
                  isSearchable={true}
                  classNames={{ menu: " z-50 absolute bg-[#fff] w-full" }}
                />
                <Select
                  placeholder="Select condition"
                  value={null}
                  onChange={(val: any) => console.log(val)}
                  options={[
                    {
                      id: "aa",
                      name: "nhhh",
                    },
                  ]}
                  primaryColor="blue"
                  isSearchable={true}
                  classNames={{ menu: " z-50 absolute bg-[#fff] w-full" }}
                />
                <Select
                  placeholder="Select value"
                  value={null}
                  onChange={(val: any) => console.log(val)}
                  options={[
                    {
                      id: "aa",
                      name: "nhhh",
                    },
                  ]}
                  primaryColor="blue"
                  isSearchable={true}
                  classNames={{ menu: " z-50 absolute bg-[#fff] w-full" }}
                />

                <button
                  type="button"
                  onClick={() => {
                    setConditions((prv) => {
                      const val = [...prv];
                      val.splice(index, 1);
                      return val;
                    });
                  }}
                  className="bg-gray-300 hover:bg-gray-500 text-gray-900 hover:text-gray-50 text-sm py-2 px-4 rounded"
                >
                  Remove
                </button>
              </div>
              {index !== conditions.length - 1 && (
                <div
                  key={`${index}-${item.id}`}
                  className="flex justify-center items-center"
                >
                  <p className="text-gray-900">AND</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div
        key="aggregation"
        className="flex justify-between items-start gap-5 flex-col mb-6 w-full"
      >
        <div className="flex justify-between items-center w-full">
          <div>
            <p className="text-gray-900">Aggregation</p>
            <span className="text-sm text-gray-400">
              Specify how to calculate a billable amount.
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center gap-6 w-full">
          <div className="mb-6 w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Aggration Type
            </label>
            <Select
              placeholder="Select Aggregation Type"
              value={{ name: aggregateValues.aggregation_type, id: "" } || null}
              onChange={(val: any) => {
                setAggreagteValues({
                  type: "aggregation_type",
                  value: val?.id,
                });
              }}
              options={aggregate_types}
              primaryColor="blue"
              isSearchable={true}
              classNames={{ menu: " z-50 absolute bg-[#fff] w-full" }}
            />
          </div>
          {aggregateValues.aggregation_type !== MetricAggregationType.COUNT && (
            <div className="mb-6 w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Aggregate Field Name
              </label>
              <Select
                placeholder="Select Aggregation Type"
                value={
                  { name: aggregateValues.aggregate_field_name, id: "" } || null
                }
                onChange={(val: any) => {
                  setAggreagteValues({
                    type: "aggregate_field_name",
                    value: val?.id,
                  });
                }}
                options={aggregate_types}
                primaryColor="blue"
                isSearchable={true}
                classNames={{ menu: " z-50 absolute bg-[#fff] w-full" }}
              />
            </div>
          )}
        </div>
      </div>

      <div
        key="details"
        className="flex justify-between items-start gap-5 flex-col mb-6 w-full"
      >
        <div className="flex justify-between items-center w-full">
          <div>
            <p className="text-gray-900">Details</p>
            <span className="text-sm text-gray-400">
              Fill in information below about your metric
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center flex-col gap-6 w-full">
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Name
            </label>
            <input
              type="text"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="name e.g. dStream"
              value={metricDetails.name}
              onChange={(e) => {
                setMetricDetails({
                  type: "name",
                  value: e.target.value,
                });
              }}
              required
            />
          </div>

          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Description <span className="text-gray-400">(Optional)</span>
            </label>
            <textarea
              rows={5}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Description e.g. User for calculate number of apis calls"
              value={metricDetails.description}
              onChange={(e) => {
                setMetricDetails({
                  type: "description",
                  value: e.target.value,
                });
              }}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateMetric;
