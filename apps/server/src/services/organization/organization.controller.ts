import {
  Post,
  Body,
  Controller,
  HttpException,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import { OrganizationService } from "./organization.service";
import { AuthUser, IAuthUserDecorator, UserAuthGuard } from "src/utils";
import { CreateOrganizationDTO } from "src/dtos/organization.dto";

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
}
