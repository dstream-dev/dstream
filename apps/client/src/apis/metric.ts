import Axios from "../utils/Axios";

export function getProperties() {
  return Axios({
    method: "GET",
    url: "/event/properties",
  });
}

export function createMetric(data: {
  name: string;
  description: string;
  aggregation_type: string;
  condition: object;
  aggregate_field_name: string;
}) {
  return Axios({
    method: "POST",
    url: "/metric",
    data,
  });
}

export async function getMetrics() {
  return Axios({
    method: "GET",
    url: "/metric/all",
  });
}
