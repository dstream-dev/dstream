import Axios from "../utils/Axios";

export async function getPlans() {
  return Axios({
    method: "GET",
    url: "/plan/all",
  });
}

export async function getPlan({ id }: { id: string }) {
  return Axios({
    method: "GET",
    url: `/plan/${id}`,
  });
}

export async function createPlan({
  data,
}: {
  data: {
    name: string;
    description?: string;
    currency: string;
    external_plan_id?: string;
    payment_term: string;
    min_charges_amount: number;
    min_charges_name: string;
    charges: Array<{
      metric_id: string;
      cadence: string;
      active_min_charge: boolean;
      min_charge: number;
      pricing_model: string;
      pricing_scheme: object;
    }>;
  };
}) {
  return Axios({
    method: "POST",
    url: "/plan",
    data,
  });
}
