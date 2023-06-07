import Axios from "../utils/Axios";

export async function getAllEvents({ page }: { page: number }) {
  return Axios({
    method: "GET",
    url: `/event?page=${page}`,
  });
}
