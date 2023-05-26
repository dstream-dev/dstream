import {
  BaseEntity,
  Column,
  Index,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

export enum MetricAggregationType {
  SUM = "SUM",
  AVERAGE = "AVERAGE",
  COUNT = "COUNT",
  MIN = "MIN",
  MAX = "MAX",
}

@Entity("metric")
@Index(["organization_id", "name"], { unique: true })
@Index(["organization_id"])
@Index(["name"])
export class Metric extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column("json")
  condition: object;

  @Column()
  organization_id: string;

  @Column({
    type: "enum",
    enum: MetricAggregationType,
    default: MetricAggregationType.COUNT,
  })
  aggregation_type: MetricAggregationType;

  @Column({ nullable: true })
  aggregate_field_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
