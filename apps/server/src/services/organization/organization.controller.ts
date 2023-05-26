import {
  Put,
  Get,
  Post,
  Body,
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
      return await this.organizationService.create({
        organization: organization,
        user_email: user.email,
      });
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
  ) {
    try {
      return await this.organizationService.update({
        id: id,
        data: organization,
      });
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
  ) {
    try {
      return await this.organizationService.assignUser({
        user_email: user_email.user_email,
        organization_id: id,
        role: UserRole.ADMIN,
      });
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
  ) {
    try {
      return await this.organizationService.assignUser({
        user_email: user_email.user_email,
        organization_id: id,
        role: UserRole.MEMBER,
      });
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles(UserRole.OWNER)
  @UseGuards(UserAuthGuard, RolesGuard)
  @Put("/remove/admin/:id")
  async removeAdmin(
    @Headers("x-organization-id") id: string,
    @Param("id") user_id: string,
  ) {
    try {
      return await this.organizationService.removeUser({
        user_id: user_id,
        organization_id: id,
      });
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles(UserRole.OWNER, UserRole.ADMIN)
  @UseGuards(UserAuthGuard, RolesGuard)
  @Put("/remove/member/:id")
  async removeMember(
    @Headers("x-organization-id") id: string,
    @Param("id") user_id: string,
  ) {
    try {
      return await this.organizationService.removeUser({
        user_id: user_id,
        organization_id: id,
      });
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
