import { Type } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from "class-validator";
import { ChargesCadence, PlanPaymentTerm, PriceModel } from "src/entities";

class PlanMinChargesDTO {
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  name: string;
}

export class PlanChargesDTO {
  @IsNotEmpty()
  metric_id: string;

  @IsNotEmpty()
  @IsEnum(ChargesCadence)
  cadence: ChargesCadence;

  @IsNotEmpty()
  active_min_charge: boolean;

  @IsNotEmpty()
  min_charge: number;

  @IsNotEmpty()
  @IsEnum(PriceModel)
  pricing_model: PriceModel;

  @IsNotEmpty()
  pricing_scheme: object;
}

export class PlanDTO {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  currency: string;

  @IsOptional()
  external_plan_id: string;

  @IsNotEmpty()
  @IsEnum(PlanPaymentTerm)
  payment_term: PlanPaymentTerm;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => PlanMinChargesDTO)
  min_charges: PlanMinChargesDTO;

  @ValidateNested({ each: true })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => PlanChargesDTO)
  charges: PlanChargesDTO[];
}
