import { Module } from "@nestjs/common";
import { CustomersController } from "./customers.controller";
import { CustomersService } from "./customers.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer, UserOrganization } from "src/entities";

@Module({
  imports: [TypeOrmModule.forFeature([Customer, UserOrganization])],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService],
})
export class CustomersModule {}
