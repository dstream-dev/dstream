import { UserRole } from ".";

export interface IOrganization {
  id: string;
  name: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  created_at: string;
  updated_at: string;
}

export interface IUserOrganization {
  id: string;
  user_id: string;
  organization_id: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}
