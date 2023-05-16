import { Module } from "@nestjs/common";
import { OrganizationController } from "./organization.controller";
import { OrganizationService } from "./organization.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Organization, UserOrganization } from "src/entities";
import { UserModule } from "../user";

@Module({
  imports: [
    TypeOrmModule.forFeature([Organization, UserOrganization]),
    UserModule,
  ],
  controllers: [OrganizationController],
  providers: [OrganizationService],
  exports: [OrganizationService],
})
export class OrganizationModule {}
