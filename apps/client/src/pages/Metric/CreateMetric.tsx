import React from "react";
import { MetricAggregationType } from "../../interfaces/Metric";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../apis";
import { ComboBox, Item } from "../../components/ComboBox";
import Spinner from "../../components/Spinner";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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

const conditions = {
  string: [
    {
      id: 0,
      name: "match",
    },
    {
      id: 1,
      name: "not_match",
    },
  ],
  number: [
    {
      id: 0,
      name: "equal",
    },
    {
      id: 1,
      name: "greater_than",
    },
    {
      id: 2,
      name: "less_than",
    },
  ],
};

function CreateMetric() {
  const navigate = useNavigate();
  const [filters, setFilters] = React.useState<
    Array<{
      property: string;
      condition: string;
      value: string;
      property_type: string;
    }>
  >([
    {
      property: "",
      condition: "",
      value: "",
      property_type: "",
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

  const { data, isLoading } = useQuery(
    ["metric", "properties"],
    () => {
      return api.metric.getProperties();
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const createMetric = useMutation(
    () => {
      const payload = {
        name: metricDetails.name,
        description: metricDetails.description,
        condition: filters.map((item) => {
          return {
            property: item.property,
            condition: item.condition,
            value: item.value,
            property_type: item.property_type,
          };
        }),
        aggregation_type: aggregateValues.aggregation_type,
        aggregate_field_name: aggregateValues.aggregate_field_name,
      };

      if (payload.condition.length === 0) {
        return Promise.reject({ message: "Please add altesat one filter" });
      }
      if (
        (payload.aggregation_type !== "COUNT" &&
          !payload.aggregate_field_name) ||
        !payload.aggregation_type
      ) {
        return Promise.reject({ message: "Please select aggregate field" });
      }

      return api.metric.createMetric(payload);
    },
    {
      onSuccess: () => {
        toast.success("Metric created successfully");
        navigate("/metrics");
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
    <div>
      <div className="flex justify-between items-center mb-6 border-b-2 py-4">
        <h1 className="font-semibold text-gray-900 text-lg">
          Create New Metrics
        </h1>
        <button
          type="button"
          onClick={() => {
            createMetric.mutate();
          }}
          className="bg-gray-900 hover:bg-gray-500 text-white text-sm py-2 px-4 rounded"
        >
          Save
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-16">
          <Spinner />
        </div>
      ) : (
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
                setFilters((prv) => {
                  const val = [...prv];
                  val.push({
                    property: "",
                    value: "",
                    condition: "",
                    property_type: "",
                  });

                  return val;
                });
              }}
              className="bg-gray-300 hover:bg-gray-500 text-gray-900 hover:text-gray-50 text-sm py-2 px-4 rounded"
            >
              Add condition
            </button>
          </div>
          {filters.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-col w-full items-start gap-2"
              >
                <div key={index} className="flex gap-2 justify-stretch">
                  <ComboBox
                    label=" "
                    onSelectionChange={(e) => {
                      setFilters((prv) => {
                        const val = [...prv];
                        val[index].property = e as string;
                        val[index].property_type = data?.data?.properties.find(
                          (item: {
                            name: string;
                            type: string;
                            value?: Array<string>;
                          }) => item.name === e
                        )?.type;
                        return val;
                      });
                    }}
                    placeholder="Select Property"
                  >
                    {(data?.data?.properties || []).map(
                      (item: {
                        name: string;
                        type: string;
                        value?: Array<string>;
                      }) => {
                        return <Item key={item.name}>{item.name}</Item>;
                      }
                    )}
                  </ComboBox>
                  <ComboBox
                    label=" "
                    onSelectionChange={(e) => {
                      setFilters((prv) => {
                        const val = [...prv];
                        val[index].condition = e as string;
                        return val;
                      });
                    }}
                    placeholder="Select Condition"
                  >
                    {(
                      conditions[
                        filters[index].property_type === "String"
                          ? "string"
                          : "number"
                      ] || []
                    ).map((item: { id: number; name: string }) => {
                      return <Item key={item.name}>{item.name}</Item>;
                    })}
                  </ComboBox>
                  {filters[index].property_type === "String" ? (
                    <ComboBox
                      label=" "
                      onSelectionChange={(e) => {
                        setFilters((prv) => {
                          const val = [...prv];
                          val[index].value = e as string;
                          return val;
                        });
                      }}
                      placeholder="Select Property"
                    >
                      {(
                        data?.data?.properties.find(
                          (item: {
                            name: string;
                            type: string;
                            value?: Array<string>;
                          }) => item.name === filters[index].property
                        )?.value || []
                      ).map((item: string) => {
                        return <Item key={item}>{item}</Item>;
                      })}
                    </ComboBox>
                  ) : (
                    <input
                      type="number"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-gray-900 block p-2"
                      placeholder="value e.g. 12"
                    />
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setFilters((prv) => {
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
                {index !== filters.length - 1 && (
                  <div
                    key={`${index}`}
                    className="flex justify-center items-center"
                  >
                    <p className="text-gray-900">AND</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

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
            <ComboBox
              label=" "
              defaultInputValue="COUNT"
              onSelectionChange={(e) => {
                setAggreagteValues({
                  type: "aggregation_type",
                  value: e as string,
                });
              }}
              placeholder="Select Property"
            >
              {(aggregate_types || []).map(
                (item: { id: string; name: string }) => {
                  return <Item key={item.name}>{item.name}</Item>;
                }
              )}
            </ComboBox>
          </div>
          {aggregateValues.aggregation_type !== "COUNT" && (
            <div className="mb-6 w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Aggregate Field Name
              </label>
              <ComboBox
                label=" "
                onSelectionChange={(e) => console.log(e)}
                placeholder="Select Property"
              >
                {(data?.data?.properties || []).map(
                  (item: {
                    name: string;
                    type: string;
                    value?: Array<string>;
                  }) => {
                    return item.type === "Int64" ? (
                      <Item key={item.name}>{item.name}</Item>
                    ) : null;
                  }
                )}
              </ComboBox>
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
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-gray-900 block w-full p-2.5"
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
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-gray-900  block w-full p-2.5"
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
