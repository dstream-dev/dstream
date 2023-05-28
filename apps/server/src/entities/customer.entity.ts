import {
  Index,
  Column,
  Entity,
  BaseEntity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("customer")
@Index(["organization_id", "external_customer_id"], { unique: true })
@Index(["organization_id", "email"], { unique: true })
@Index(["organization_id", "name"], { unique: true })
@Index(["organization_id"])
@Index(["email"])
@Index(["name"])
@Index(["external_customer_id"])
export class Customer extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  organization_id: string;

  @Column()
  external_customer_id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  timezone: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  address_line1: string;

  @Column({ nullable: true })
  address_line2: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  zipcode: string;

  @Column({ default: 0 })
  account_balance: number;

  @Column({ default: "USD" })
  currency: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
