import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class CreateCustomerDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  external_customer_id: string;

  @IsNotEmpty()
  timezone: string;
}

export class CustomerAddressDTO {
  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  address_line1: string;

  @IsOptional()
  address_line2: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  zipcode: string;
}

export class UpdateCustomerDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  external_customer_id: string;

  @IsNotEmpty()
  timezone: string;
}

export class CustomerBalanceDTO {
  @IsNotEmpty()
  account_balance: number;

  @IsNotEmpty()
  currency: string;
}
