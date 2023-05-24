import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { MetricAggregationType } from "src/entities";

export class CreateMetricDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsEnum(MetricAggregationType)
  aggregation_type: MetricAggregationType;

  @IsNotEmpty()
  condition: object;

  @IsOptional()
  aggregate_field_name: string;
}
