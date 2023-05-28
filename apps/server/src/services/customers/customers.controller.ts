import {
  Put,
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
import { CustomersService } from "./customers.service";
import {
  Roles,
  AuthUser,
  RolesGuard,
  UserAuthGuard,
  IAuthUserDecorator,
} from "src/utils";
import { UserRole } from "src/entities";
import {
  CreateCustomerDTO,
  UpdateCustomerDTO,
  CustomerAddressDTO,
} from "src/dtos";
import { activityLog } from "src/utils/activityLog";

@Controller("customer")
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Roles(UserRole.ADMIN, UserRole.OWNER)
  @UseGuards(UserAuthGuard, RolesGuard)
  @Post()
  async createCustomer(
    @Headers("x-organization-id") org_id: string,
    @Body() data: CreateCustomerDTO,
    @AuthUser() user: IAuthUserDecorator,
  ) {
    try {
      const customer = await this.customersService.create({
        data,
        org_id,
      });

      activityLog({
        org_id: org_id,
        by: user.email,
        activity_id: customer.id,
        activity_type: "customer",
        activity: "customer created",
      });

      return customer;
    } catch (e) {
      throw new HttpException(e.message, e.status || HttpStatus.BAD_REQUEST);
    }
  }

  @Roles(UserRole.ADMIN, UserRole.OWNER, UserRole.MEMBER)
  @UseGuards(UserAuthGuard, RolesGuard)
  @Get("/all")
  async getAllCustomers(@Headers("x-organization-id") org_id: string) {
    try {
      return await this.customersService.findAll(org_id);
    } catch (e) {
      throw new HttpException(e.message, e.status || HttpStatus.BAD_REQUEST);
    }
  }

  @Roles(UserRole.ADMIN, UserRole.OWNER, UserRole.MEMBER)
  @UseGuards(UserAuthGuard, RolesGuard)
  @Get("/:id")
  async getCustomerById(
    @Headers("x-organization-id") org_id: string,
    @Param("id") id: string,
  ) {
    try {
      return await this.customersService.findOne({ org_id, id });
    } catch (e) {
      throw new HttpException(e.message, e.status || HttpStatus.BAD_REQUEST);
    }
  }

  @Roles(UserRole.ADMIN, UserRole.OWNER)
  @UseGuards(UserAuthGuard, RolesGuard)
  @Put("/:id")
  async updateCustomer(
    @Headers("x-organization-id") org_id: string,
    @Param("id") id: string,
    @Body() data: UpdateCustomerDTO,
    @AuthUser() user: IAuthUserDecorator,
  ) {
    try {
      const customer = await this.customersService.update({
        id,
        data,
        org_id,
      });

      activityLog({
        org_id: org_id,
        by: user.email,
        activity_id: id,
        activity_type: "customer",
        activity: "customer updated",
      });

      return customer;
    } catch (e) {
      throw new HttpException(e.message, e.status || HttpStatus.BAD_REQUEST);
    }
  }

  @Roles(UserRole.ADMIN, UserRole.OWNER)
  @UseGuards(UserAuthGuard, RolesGuard)
  @Post("/:id/address")
  async addAddress(
    @Headers("x-organization-id") org_id: string,
    @Param("id") id: string,
    @Body() data: CustomerAddressDTO,
    @AuthUser() user: IAuthUserDecorator,
  ) {
    try {
      const customer = await this.customersService.addAddress({
        id,
        data,
        org_id,
      });

      activityLog({
        org_id: org_id,
        by: user.email,
        activity_id: id,
        activity_type: "customer",
        activity: "customer address added",
      });

      return customer;
    } catch (e) {
      throw new HttpException(e.message, e.status || HttpStatus.BAD_REQUEST);
    }
  }
}
