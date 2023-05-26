export enum MetricAggregationType {
  SUM = "SUM",
  AVERAGE = "AVERAGE",
  COUNT = "COUNT",
  MIN = "MIN",
  MAX = "MAX",
}

export interface IMetric {
  id: string;
  name: string;
  description?: string;
  aggregation_type: MetricAggregationType;
  condition: Array<{
    property: string;
    condition: string;
    value: string;
    property_type: string;
  }>;
  aggregate_field_name: string;
  organization_id: string;
  created_at: string;
  updated_at: string;
}
