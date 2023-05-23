import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateOrganizationDTO {
  @IsNotEmpty()
  name: string;

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

export class AssignOrginazationDTO {
  @IsNotEmpty()
  user_email: string;
}

export class UpdateOrganizationDTO {
  @IsNotEmpty()
  name: string;

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
