import Axios from "../utils/Axios";

export async function createOrganization(data: {
  name: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
}) {
  return Axios({
    method: "POST",
    url: "/organization",
    data: data,
  });
}

export async function getAllOrganizations() {
  return Axios({
    method: "GET",
    url: "/organization/users",
  });
}

export async function getOrganizationDetail() {
  return Axios({
    method: "GET",
    url: "/organization",
  });
}

export async function updateOrganization({
  id,
  data,
}: {
  id: string;
  data: {
    name: string;
    address_line1: string;
    address_line2: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
  };
}) {
  return Axios({
    method: "PUT",
    url: "/organization",
    data: data,
    headers: {
      "x-organization-id": id,
    },
  });
}
