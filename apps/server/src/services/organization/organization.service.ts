import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  AssignOrginazationDTO,
  CreateOrganizationDTO,
} from "src/dtos/organization.dto";
import { Organization, UserOrganization, UserRole } from "src/entities";
import { createApiKey, createID } from "src/utils";
import { Repository } from "typeorm";
import { UserService } from "../user";

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepo: Repository<Organization>,
    @InjectRepository(UserOrganization)
    private userOrganizationRepo: Repository<UserOrganization>,

    private readonly userService: UserService,
  ) {}

  async findById(id: string) {
    try {
      return await this.organizationRepo.findOne({ where: { id } });
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findbyName(name: string) {
    try {
      return await this.organizationRepo.findOne({ where: { name } });
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create({
    organization,
    user_email,
  }: {
    organization: CreateOrganizationDTO;
    user_email: string;
  }) {
    try {
      const oldOrg = await this.findbyName(organization.name);
      if (oldOrg) {
        throw new HttpException(
          "Organization already exists",
          HttpStatus.BAD_REQUEST,
        );
      }

      const user = await this.userService.findOneByEmail(user_email);
      if (!user) {
        throw new HttpException("User not found", HttpStatus.BAD_REQUEST);
      }

      const newOrg = await this.organizationRepo.save({
        ...organization,
        id: createID("org"),
        api_key: createApiKey(),
      });

      await this.userOrganizationRepo.save({
        id: createID("user_org"),
        organization_id: newOrg.id,
        user_id: user.id,
        role: UserRole.OWNER,
      });

      return newOrg;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async assignUser(
    { user_email, role }: AssignOrginazationDTO,
    organization_id: string,
  ) {
    try {
      const user = await this.userService.findOneByEmail(user_email);
      if (!user) {
        throw new HttpException("User not found", HttpStatus.BAD_REQUEST);
      }

      const org = await this.findById(organization_id);
      if (!org) {
        throw new HttpException(
          "Organization not found",
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.userOrganizationRepo.save({
        id: createID("user_org"),
        organization_id,
        user_id: user.id,
        role: UserRole[role],
      });

      return org;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
