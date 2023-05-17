import Axios from "../utils/Axios";

export async function login() {
  return Axios({
    method: "POST",
    url: "/auth",
  });
}
