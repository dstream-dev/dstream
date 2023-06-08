import Axios from "../utils/Axios";

export async function creatCustomer(data: {
  name: string;
  email: string;
  timezone: string;
  external_customer_id: string;
}) {
  return Axios({
    method: "POST",
    url: "/customer",
    data,
  });
}

export async function updateCustomer({
  id,
  data,
}: {
  id: string;
  data: {
    name: string;
    email: string;
    timezone: string;
    external_customer_id: string;
  };
}) {
  return Axios({
    method: "PUT",
    url: `/customer/${id}`,
    data,
  });
}

export async function getAllCustomers() {
  return Axios({
    method: "GET",
    url: "/customer/all",
  });
}

export async function getCustomerById(id: string) {
  return Axios({
    method: "GET",
    url: `/customer/${id}`,
  });
}

export async function updateBalance({
  id,
  data,
}: {
  id: string;
  data: {
    account_balance: number;
    currency: string;
  };
}) {
  return Axios({
    method: "PUT",
    url: `/customer/${id}/balance`,
    data,
  });
}

export async function updateAddress({
  id,
  data,
}: {
  id: string;
  data: {
    address_line1: string;
    address_line2: string;
    city: string;
    state: string;
    zipcode: number;
    country: string;
  };
}) {
  return Axios({
    method: "PUT",
    url: `/customer/${id}/address`,
    data,
  });
}

export async function addSubscription({
  plan_id,
  customer_id,
}: {
  plan_id: string;
  customer_id: string;
}) {
  return Axios({
    method: "PUT",
    url: `/customer/${customer_id}/subscription`,
    data: { plan_id },
  });
}

export async function updateSubscriptionStatus({
  sub_id,
  status,
}: {
  sub_id: string;
  status: boolean;
}) {
  return Axios({
    method: "PUT",
    url: `/customer/subscription/${sub_id}/${
      status ? "activate" : "deactivate"
    }`,
  });
}
