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
} from "src/dtos/organization.dto";
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
  @Get("/users")
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

  @Roles(UserRole.OWNER)
  @UseGuards(UserAuthGuard, RolesGuard)
  @Put("/assign/admin")
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
  @Put("/assign/member")
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
}
