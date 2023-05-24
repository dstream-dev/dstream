import { Module } from "@nestjs/common";
import { EventService } from "./event.service";
import { EventController } from "./event.controller";

@Module({
  imports: [],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
