import { UserRole } from "../interfaces";
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
    url: "/organization/all",
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

export async function getOrganizationUsers() {
  return Axios({
    method: "GET",
    url: "/organization/users",
  });
}

export async function assignUser(data: { email: string; role: UserRole }) {
  return Axios({
    method: "POST",
    url: `/organization/assign/${
      data.role === UserRole.ADMIN ? "admin" : "member"
    }`,
    data: {
      user_email: data.email,
    },
  });
}
