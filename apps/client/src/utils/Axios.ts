import axios, { AxiosError } from "axios";

export const BaseUrl =
  window.origin.includes("staging") || window.origin.includes("localhost")
    ? import.meta.env.VITE_APP_STAGING_BAPI
    : import.meta.env.VITE_APP_BAPI;

const AxiosInstance = axios.create({ baseURL: BaseUrl });

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    const organization_id = localStorage.getItem("organization_id") || "";
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    if (organization_id) {
      config.headers["x-organization-id"] = organization_id;
    }
    config.headers["Content-Type"] = "application/json";
    config.headers.Accept = "*/*";

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  (response) => {
    // If the request succeeds, we don't have to do anything and just return the response
    return response;
  },
  (error: AxiosError) => {
    // If the error is due to other reasons, we just throw it back to axios
    return Promise.reject(error);
  }
);

export default AxiosInstance;
