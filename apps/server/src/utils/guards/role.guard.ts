import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import { User, UserOrganization } from "src/entities";
import { Repository } from "typeorm";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,

    @InjectRepository(UserOrganization)
    private userOrg: Repository<UserOrganization>,
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>("roles", context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const organization_id = request.headers["x-organization-id"];

    const org = await this.userOrg
      .createQueryBuilder("userOrg")
      .innerJoinAndMapOne(
        "userOrg.user",
        User,
        "user",
        "user.id = userOrg.user_id",
      )
      .where("userOrg.organization_id = :organization_id", {
        organization_id: organization_id,
      })
      .andWhere("user.email = :user_email", { user_email: user.email })
      .getOne();

    const hasRole = () => roles.includes(org.role);
    return org && org.role && hasRole();
  }
}
