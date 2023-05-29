import {
  Put,
  Get,
  Post,
  Body,
  Delete,
  Headers,
  UseGuards,
  HttpStatus,
  Controller,
  HttpException,
  Param,
} from "@nestjs/common";
import { OrganizationService } from "./organization.service";
import {
  Roles,
  AuthUser,
  RolesGuard,
  UserAuthGuard,
  IAuthUserDecorator,
} from "src/utils";
import {
  AssignOrginazationDTO,
  CreateOrganizationDTO,
  UpdateOrganizationDTO,
} from "src/dtos";
import { UserRole } from "src/entities";
import { activityLog } from "src/utils/activityLog";

@Controller("organization")
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @UseGuards(UserAuthGuard)
  @Post()
  async createOrganization(
    @Body() organization: CreateOrganizationDTO,
    @AuthUser() user: IAuthUserDecorator,
  ) {
    try {
      const newOrg = await this.organizationService.create({
        organization: organization,
        user_email: user.email,
      });

      activityLog({
        org_id: newOrg.id,
        by: user.email,
        activity_type: "organization",
        activity_id: newOrg.id,
        activity: "organization created",
      });

      return newOrg;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles(UserRole.OWNER, UserRole.ADMIN, UserRole.MEMBER)
  @UseGuards(UserAuthGuard, RolesGuard)
  @Get()
  async getOrganization(@Headers("x-organization-id") id: string) {
    try {
      return await this.organizationService.findById(id);
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles(UserRole.OWNER)
  @UseGuards(UserAuthGuard, RolesGuard)
  @Put()
  async updateOrganization(
    @Headers("x-organization-id") id: string,
    @Body() organization: UpdateOrganizationDTO,
    @AuthUser() user: IAuthUserDecorator,
  ) {
    try {
      const update = await this.organizationService.update({
        id: id,
        data: organization,
      });

      activityLog({
        org_id: id,
        by: user.email,
        activity_type: "organization",
        activity_id: id,
        activity: "organization updated",
      });

      return update;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles(UserRole.OWNER, UserRole.ADMIN, UserRole.MEMBER)
  @UseGuards(UserAuthGuard, RolesGuard)
  @Get("/all")
  async getAllOrganizations(@AuthUser() user: IAuthUserDecorator) {
    try {
      return await this.organizationService.getAllOrganizations(user.email);
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles(UserRole.OWNER, UserRole.ADMIN, UserRole.MEMBER)
  @UseGuards(UserAuthGuard, RolesGuard)
  @Get("/users")
  async getOrganizationUsers(@Headers("x-organization-id") id: string) {
    try {
      return await this.organizationService.getOrganizationUsers(id);
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles(UserRole.OWNER)
  @UseGuards(UserAuthGuard, RolesGuard)
  @Post("/assign/admin")
  async assignAdmin(
    @Headers("x-organization-id") id: string,
    @Body() user_email: AssignOrginazationDTO,
    @AuthUser() user: IAuthUserDecorator,
  ) {
    try {
      const assignAdmin = await this.organizationService.assignUser({
        user_email: user_email.user_email,
        organization_id: id,
        role: UserRole.ADMIN,
      });

      activityLog({
        org_id: id,
        by: user.email,
        activity_type: "organization",
        activity_id: id,
        activity: "admin assigned",
      });

      return assignAdmin;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles(UserRole.OWNER, UserRole.ADMIN)
  @UseGuards(UserAuthGuard, RolesGuard)
  @Post("/assign/member")
  async assignMember(
    @Headers("x-organization-id") id: string,
    @Body() user_email: AssignOrginazationDTO,
    @AuthUser() user: IAuthUserDecorator,
  ) {
    try {
      const assignMember = await this.organizationService.assignUser({
        user_email: user_email.user_email,
        organization_id: id,
        role: UserRole.MEMBER,
      });

      activityLog({
        org_id: id,
        by: user.email,
        activity_type: "organization",
        activity_id: id,
        activity: "member assigned",
      });

      return assignMember;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles(UserRole.OWNER)
  @UseGuards(UserAuthGuard, RolesGuard)
  @Delete("/remove/admin/:id")
  async removeAdmin(
    @Headers("x-organization-id") id: string,
    @Param("id") user_id: string,
    @AuthUser() user: IAuthUserDecorator,
  ) {
    try {
      const removeAdmin = await this.organizationService.removeUser({
        user_id: user_id,
        organization_id: id,
      });

      activityLog({
        org_id: id,
        by: user.email,
        activity_type: "organization",
        activity_id: user_id,
        activity: "admin removed",
      });

      return removeAdmin;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles(UserRole.OWNER, UserRole.ADMIN)
  @UseGuards(UserAuthGuard, RolesGuard)
  @Delete("/remove/member/:id")
  async removeMember(
    @Headers("x-organization-id") id: string,
    @Param("id") user_id: string,
    @AuthUser() user: IAuthUserDecorator,
  ) {
    try {
      const removeMember = await this.organizationService.removeUser({
        user_id: user_id,
        organization_id: id,
      });

      activityLog({
        org_id: id,
        by: user.email,
        activity_type: "organization",
        activity_id: user_id,
        activity: "member removed",
      });

      return removeMember;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
