import {
  Get,
  Body,
  Post,
  Headers,
  UseGuards,
  Controller,
  HttpStatus,
  HttpException,
  Param,
  Put,
} from "@nestjs/common";
import { PlansService } from "./plans.service";
import { Roles, RolesGuard, UserAuthGuard } from "src/utils";
import { UserRole } from "src/entities";
import { PlanDTO } from "src/dtos";

@Controller("plan")
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Roles(UserRole.OWNER, UserRole.ADMIN, UserRole.MEMBER)
  @UseGuards(UserAuthGuard, RolesGuard)
  @Get("/all")
  async findAll(@Headers("x-organization-id") org_id: string) {
    try {
      return await this.plansService.findAll({ org_id });
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles(UserRole.OWNER, UserRole.ADMIN, UserRole.MEMBER)
  @UseGuards(UserAuthGuard, RolesGuard)
  @Get(":id")
  async findOne(
    @Headers("x-organization-id") org_id: string,
    @Param("id") id: string,
  ) {
    try {
      return await this.plansService.findOne({ org_id, id });
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles(UserRole.OWNER, UserRole.ADMIN)
  @UseGuards(UserAuthGuard, RolesGuard)
  @Post()
  async create(
    @Headers("x-organization-id") org_id: string,
    @Body() createPlanDto: PlanDTO,
  ) {
    try {
      return await this.plansService.create({ org_id, data: createPlanDto });
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  // @Roles(UserRole.OWNER, UserRole.ADMIN)
  // @UseGuards(UserAuthGuard, RolesGuard)
  // @Put(":id")
  // async update(
  //   @Headers("x-organization-id") org_id: string,
  //   @Param("id") id: string,
  //   @Body() updatePlanDto: PlanDTO,
  // ) {
  //   try {
  //     return await this.plansService.update({
  //       org_id,
  //       id,
  //       data: updatePlanDto,
  //     });
  //   } catch (err) {
  //     throw new HttpException(
  //       err.message,
  //       err.status || HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }
}
