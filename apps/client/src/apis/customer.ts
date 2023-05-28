import Axios from "../utils/Axios";

export async function creatCustomer(data: {
  name: string;
  email: string;
  timezone: string;
  external_customer_id: string;
}) {
  console.log("data", data);
  return Axios({
    method: "POST",
    url: "/customer",
    data,
  });
}

export async function getAllCustomers() {
  return Axios({
    method: "GET",
    url: "/customer/all",
  });
}
