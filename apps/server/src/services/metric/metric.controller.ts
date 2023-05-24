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
} from "@nestjs/common";
import { MetricService } from "./metric.service";
import {
  Roles,
  AuthUser,
  RolesGuard,
  UserAuthGuard,
  IAuthUserDecorator,
} from "src/utils";
import { UserRole } from "src/entities";
import { CreateMetricDto } from "src/dtos";

@Controller("metric")
export class MetricController {
  constructor(private readonly metriceService: MetricService) {}

  @Roles(UserRole.ADMIN, UserRole.OWNER)
  @UseGuards(UserAuthGuard, RolesGuard)
  @Post()
  async create(
    @Body() data: CreateMetricDto,
    @Headers("x-organization-id") organization_id: string,
    @AuthUser() user: IAuthUserDecorator,
  ) {
    try {
      return await this.metriceService.create({
        organization_id,
        data,
      });
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles(UserRole.ADMIN, UserRole.OWNER, UserRole.MEMBER)
  @UseGuards(UserAuthGuard, RolesGuard)
  @Get("/:id")
  async getMetrics(
    @Headers("x-organization-id") organization_id: string,
    @Param("id") id: string,
    @AuthUser() user: IAuthUserDecorator,
  ) {
    try {
      return await this.metriceService.findByID({
        organization_id: organization_id,
        id: id,
      });
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles(UserRole.ADMIN, UserRole.OWNER, UserRole.MEMBER)
  @UseGuards(UserAuthGuard, RolesGuard)
  @Get("/all")
  async getAllMetrics(@Headers("x-organization-id") organization_id: string) {
    try {
      return await this.metriceService.findAll(organization_id);
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
