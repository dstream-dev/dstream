import {
  Get,
  Body,
  Post,
  Param,
  Headers,
  UseGuards,
  Controller,
  HttpStatus,
  HttpException,
  Query,
} from "@nestjs/common";
import { EventService } from "./event.service";
import { CreateEventDTO, GetEventsDTO } from "src/dtos";
import { Roles, RolesGuard, UserAuthGuard } from "src/utils";
import { UserRole } from "src/entities";

@Controller("event")
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async create(@Body() createEventDto: CreateEventDTO) {
    try {
      return await this.eventService.createEventJob(createEventDto);
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles(UserRole.ADMIN, UserRole.MEMBER, UserRole.OWNER)
  @UseGuards(UserAuthGuard, RolesGuard)
  @Get("properties")
  async getProperties(@Headers("x-organization-id") id: string) {
    try {
      return await this.eventService.getProperties(id);
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles(UserRole.ADMIN, UserRole.MEMBER, UserRole.OWNER)
  @UseGuards(UserAuthGuard, RolesGuard)
  @Get()
  async getEvents(
    @Headers("x-organization-id") id: string,
    @Query() query: GetEventsDTO,
  ) {
    try {
      return await this.eventService.getEvents({
        org_id: id,
        page: query.page,
      });
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles(UserRole.ADMIN, UserRole.MEMBER, UserRole.OWNER)
  @UseGuards(UserAuthGuard, RolesGuard)
  @Get("properties/values/:property")
  async getPropertyValues(
    @Headers("x-organization-id") id: string,
    @Param("property") property: string,
  ) {
    try {
      return await this.eventService.getPropertyValues(id, property);
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
