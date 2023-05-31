import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

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

@Entity("plan")
@Index(["organization_id", "external_plan_id"], { unique: true })
@Index(["organization_id", "name"], { unique: true })
@Index(["organization_id"])
@Index(["external_plan_id"])
@Index(["name"])
export class Plan extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: "USD" })
  currency: string;

  @Column({ nullable: true })
  external_plan_id: string;

  @Column({
    type: "enum",
    enum: PlanPaymentTerm,
    default: PlanPaymentTerm.due_on_issue,
  })
  payment_term: PlanPaymentTerm;

  @Column()
  organization_id: string;

  @Column("json")
  min_charges: {
    amount: number;
    name: string;
  };

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

@Entity("plan_charges")
@Index(["organization_id", "metric_id", "plan_id"], { unique: true })
@Index(["organization_id", "plan_id"])
@Index(["organization_id", "metric_id"])
@Index(["plan_id", "metric_id"], { unique: true })
@Index(["organization_id"])
@Index(["metric_id"])
@Index(["plan_id"])
export class PlanCharges extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  metric_id: string;

  @Column()
  organization_id: string;

  @Column()
  plan_id: string;

  @Column({
    type: "enum",
    enum: ChargesCadence,
    default: ChargesCadence.monthly,
  })
  cadence: ChargesCadence;

  @Column({ default: false })
  active_min_charge: boolean;

  @Column({ default: 0 })
  min_charge: number;

  @Column({
    type: "enum",
    enum: PriceModel,
    default: PriceModel.unit,
  })
  pricing_model: PriceModel;

  @Column("json")
  pricing_scheme: object;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
