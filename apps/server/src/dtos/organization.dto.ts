import { IsEnum, IsNotEmpty } from "class-validator";

enum UserRole {
  ADMIN = "admin",
  MEMBER = "member",
}

export class CreateOrganizationDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  country_code: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  address_line1: string;

  @IsNotEmpty()
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

  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;
}
