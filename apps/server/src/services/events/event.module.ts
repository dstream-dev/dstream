import { Module } from "@nestjs/common";
import { EventService } from "./event.service";
import { EventController } from "./event.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserOrganization } from "src/entities";

@Module({
  imports: [TypeOrmModule.forFeature([UserOrganization])],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
