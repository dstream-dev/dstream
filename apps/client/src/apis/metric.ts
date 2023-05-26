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

export async function updateMetric({
  id,
  data,
}: {
  id: string;
  data: {
    name: string;
    description: string;
    aggregation_type: string;
    condition: object;
    aggregate_field_name: string;
  };
}) {
  return Axios({
    method: "PUT",
    url: `/metric/${id}`,
    data,
  });
}

export async function deleteMetric({ id }: { id: string }) {
  return Axios({
    method: "DELETE",
    url: `/metric/${id}`,
  });
}
