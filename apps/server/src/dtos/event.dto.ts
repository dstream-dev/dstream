import { IsNotEmpty } from "class-validator";

export class CreateEventDTO {
  @IsNotEmpty()
  org_id: string;

  @IsNotEmpty()
  customer_id: string;

  @IsNotEmpty()
  event_name: string;

  @IsNotEmpty()
  properties: object;
}

export class GetEventsDTO {
  @IsNotEmpty()
  page: number;
}
