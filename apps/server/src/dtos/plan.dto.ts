import { Type } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  ValidateIf,
  ValidateNested,
} from "class-validator";
import { ChargesCadence, PlanPaymentTerm, PriceModel } from "src/entities";

export class PlanChargesDTO {
  @IsNotEmpty()
  metric_id: string;

  @IsNotEmpty()
  @IsEnum(ChargesCadence)
  cadence: ChargesCadence;

  @IsNotEmpty()
  active_min_charge: boolean;

  @ValidateIf((o) => o.active_min_charge === true)
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

  @IsOptional()
  min_charges_amount: number;

  @ValidateIf((o) => o.min_charges_amount > 0)
  @IsNotEmpty()
  min_charges_name: string;

  @ValidateNested({ each: true })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => PlanChargesDTO)
  charges: PlanChargesDTO[];
}
