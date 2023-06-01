export enum PlanPaymentTerm {
  "due_on_issue" = "due_on_issue",
  "net_30" = "net_30",
  "net_45" = "net_45",
  "net_60" = "net_60",
}

export enum ChargesCadence {
  "monthly" = "monthly",
  "quarterly" = "quarterly",
  "biannual" = "biannual",
  "annually" = "annually",
}

export enum PriceModel {
  "unit" = "unit",
  "tiered" = "tiered",
  "package" = "package",
  "bulk" = "bulk",
  "matrix" = "matrix",
}

export interface IPlan {
  id: string;
  name: string;
  description?: string;
  currency: string;
  external_plan_id?: string;
  payment_term: PlanPaymentTerm;
  min_charges: {
    amount: number;
    cadence: string;
  };
  created_at: string;
  updated_at: string;
  charges: IPlanCharges[];
}

export interface IPlanCharges {
  id: string;
  plan_id: string;
  organization_id: string;
  metric_id: string;
  cadence: ChargesCadence;
  active_min_charge: boolean;
  min_charge: number;
  pricing_model: PriceModel;
  pricing_scheme: object;
}
