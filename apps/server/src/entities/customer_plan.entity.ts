import {
  Index,
  Column,
  Entity,
  BaseEntity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("customer_plan")
@Index(["organization_id", "plan_id", "customer_id"], { unique: true })
@Index(["organization_id", "plan_id"])
@Index(["organization_id", "customer_id"])
@Index(["plan_id", "customer_id"], { unique: true })
@Index(["organization_id"])
@Index(["customer_id"])
@Index(["plan_id"])
export class CustomerPlan extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  customer_id: string;

  @Column()
  organization_id: string;

  @Column()
  plan_id: string;

  @Column()
  plan_name: string;

  @Column({ default: true })
  status: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
