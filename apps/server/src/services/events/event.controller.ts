import {
  Body,
  Post,
  Controller,
  HttpStatus,
  HttpException,
} from "@nestjs/common";
import { EventService } from "./event.service";

@Controller("event")
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async create(@Body() createEventDto: any) {
    try {
      console.log(createEventDto);
      // return await this.eventService.create(createEventDto);
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
