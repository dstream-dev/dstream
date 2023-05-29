import { Type } from "class-transformer";
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from "class-validator";
import { MetricAggregationType } from "src/entities";

export class MetricConditionDTO {
  @IsNotEmpty()
  property: string;

  @IsNotEmpty()
  condition: string;

  @IsNotEmpty()
  value: string;

  @IsNotEmpty()
  property_type: string | number;
}

export class CreateMetricDTO {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsEnum(MetricAggregationType)
  aggregation_type: MetricAggregationType;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => MetricConditionDTO)
  condition: MetricConditionDTO[];

  @IsOptional()
  aggregate_field_name: string;
}

export class UpdateMetricDTO {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsEnum(MetricAggregationType)
  aggregation_type: MetricAggregationType;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => MetricConditionDTO)
  condition: MetricConditionDTO[];

  @IsOptional()
  aggregate_field_name: string;
}
