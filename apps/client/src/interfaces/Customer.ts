export interface ICustomer {
  id: string;
  name: string;
  email: string;
  timeZone: string;
  external_customer_id: string;
  organization_id: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  zipcode: string;
  account_balance: number;
  currency: string;
  created_at: Date;
  updated_at: Date;
}
