import { Module } from "@nestjs/common";
import { EventService } from "./event.service";
import { EventController } from "./event.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserOrganization } from "src/entities";
import { BullModule } from "@nestjs/bullmq";
import { EventProcessor } from "./event.processor";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserOrganization]),
    BullModule.registerQueue({ name: "event" }),
  ],
  controllers: [EventController],
  providers: [EventService, EventProcessor],
  exports: [EventService],
})
export class EventModule {}
