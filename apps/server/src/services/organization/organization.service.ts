import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  CreateOrganizationDTO,
  UpdateOrganizationDTO,
} from "src/dtos/organization.dto";
import { Organization, User, UserOrganization, UserRole } from "src/entities";
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
      // messageLog('activity', `#{current_user} has created organisation #{neworg.name}`);
      // messageLog('mixpanel', event_name: 'create_organisation', 'user_name')

      return newOrg;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update({ data, id }: { data: UpdateOrganizationDTO; id: string }) {
    try {
      const existsOrg = await this.findById(id);
      if (!existsOrg) {
        throw new HttpException(
          "Organization not found.",
          HttpStatus.NOT_FOUND,
        );
      }

      await this.organizationRepo.update({ id: existsOrg.id }, { ...data });

      return {
        message: "Orginazation updated successfully",
        status: HttpStatus.OK,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async assignUser({
    user_email,
    organization_id,
    role,
  }: {
    user_email: string;
    organization_id: string;
    role: UserRole;
  }) {
    try {
      const user = await this.userService.findOneByEmail(user_email);
      if (!user) {
        throw new HttpException("User not found", HttpStatus.BAD_REQUEST);
      }

      const exists = await this.userOrganizationRepo.findOne({
        where: { user_id: user.id, organization_id: organization_id },
      });

      if (exists) {
        throw new HttpException(
          "User already exists in organization",
          HttpStatus.FORBIDDEN,
        );
      }

      await this.userOrganizationRepo.save({
        id: createID("user_org"),
        organization_id,
        user_id: user.id,
        role: role,
      });

      return {
        message: "User assigned successfully.",
        status: HttpStatus.OK,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllOrganizations(user_email: string) {
    try {
      const user = await this.userService.findOneByEmail(user_email);
      if (!user) {
        throw new HttpException("User not found", HttpStatus.BAD_REQUEST);
      }

      return await this.userOrganizationRepo.find({
        where: { user_id: user.id },
      });
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async removeUser({
    user_id,
    organization_id,
  }: {
    user_id: string;
    organization_id: string;
  }) {
    try {
      const exists = await this.userOrganizationRepo.findOne({
        where: { user_id: user_id, organization_id: organization_id },
      });

      if (!exists) {
        throw new HttpException(
          "User does not exists in organization",
          HttpStatus.FORBIDDEN,
        );
      }

      await this.userOrganizationRepo.delete({ id: exists.id });

      return {
        message: "User removed successfully.",
        status: HttpStatus.OK,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
