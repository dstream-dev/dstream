import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

export enum UserRole {
  OWNER = "owner",
  ADMIN = "admin",
  MEMBER = "member",
}

@Entity("user_organization")
@Index(["user_id"])
@Index(["organization_id"])
@Index(["user_id", "organization_id"], { unique: true })
export class UserOrganization extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @Column()
  organization_id: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.MEMBER,
  })
  role: UserRole;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
