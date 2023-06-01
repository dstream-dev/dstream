import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Delete,
  Headers,
  UseGuards,
  Controller,
  HttpStatus,
  HttpException,
} from "@nestjs/common";
import { PlansService } from "./plans.service";
import {
  Roles,
  AuthUser,
  RolesGuard,
  UserAuthGuard,
  IAuthUserDecorator,
} from "src/utils";
import { UserRole } from "src/entities";
import { PlanDTO } from "src/dtos";
import { activityLog } from "src/utils/activityLog";

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
    @AuthUser() user: IAuthUserDecorator,
  ) {
    try {
      const newPlan = await this.plansService.create({
        org_id,
        data: createPlanDto,
      });

      activityLog({
        org_id: org_id,
        by: user.email,
        activity_type: "plan",
        activity_id: newPlan.id,
        activity: "new plan created",
      });

      return newPlan;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles(UserRole.OWNER, UserRole.ADMIN)
  @UseGuards(UserAuthGuard, RolesGuard)
  @Put(":id")
  async update(
    @Headers("x-organization-id") org_id: string,
    @Param("id") id: string,
    @Body() updatePlanDto: PlanDTO,
    @AuthUser() user: IAuthUserDecorator,
  ) {
    try {
      const updatedPlan = await this.plansService.update({
        org_id,
        id,
        data: updatePlanDto,
      });

      activityLog({
        org_id: org_id,
        by: user.email,
        activity_type: "plan",
        activity_id: id,
        activity: "plan updated",
      });

      return updatedPlan;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles(UserRole.OWNER, UserRole.ADMIN)
  @UseGuards(UserAuthGuard, RolesGuard)
  @Delete(":id")
  async remove(
    @Headers("x-organization-id") org_id: string,
    @Param("id") id: string,
    @AuthUser() user: IAuthUserDecorator,
  ) {
    try {
      const removeStatus = await this.plansService.delete({ org_id, id });

      activityLog({
        org_id: org_id,
        by: user.email,
        activity_type: "plan",
        activity_id: id,
        activity: "plan deleted",
      });

      return removeStatus;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
