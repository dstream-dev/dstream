import { Module } from "@nestjs/common";
import { CustomersController } from "./customers.controller";
import { CustomersService } from "./customers.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer, CustomerPlan, UserOrganization } from "src/entities";
import { PlansModule } from "../plans";

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer, UserOrganization, CustomerPlan]),
    PlansModule,
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService],
})
export class CustomersModule {}
