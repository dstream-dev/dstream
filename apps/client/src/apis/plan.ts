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
