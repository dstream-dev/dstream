import { Module } from "@nestjs/common";
import { PlansController } from "./plans.controller";
import { PlansService } from "./plans.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Plan, PlanCharges, UserOrganization } from "src/entities";

@Module({
  imports: [TypeOrmModule.forFeature([UserOrganization, Plan, PlanCharges])],
  controllers: [PlansController],
  providers: [PlansService],
  exports: [PlansService],
})
export class PlansModule {}
