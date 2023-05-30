import Axios from "../utils/Axios";
import axios from "axios";

export async function login() {
  return Axios({
    method: "POST",
    url: "/auth",
  });
}

export const fetchAccessToken = async (rt: string) => {
  const config = {
    method: "post",
    url: `https://securetoken.googleapis.com/v1/token?key=${
      import.meta.env.VITE_FIREBASE_API_KEY
    }`,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      grant_type: "refresh_token",
      refresh_token: rt,
    },
  };

  const res = await axios(config);

  if (res?.data) return res.data;

  return false;
};
