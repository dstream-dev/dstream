import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Organization, User, UserOrganization } from "src/entities";
import { createID } from "src/utils";
import { CreateUserDTO } from "src/dtos";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDTO): Promise<User> {
    try {
      const oldUser = await this.findOneByEmail(user.email);
      if (oldUser) {
        throw new HttpException("User already exists.", HttpStatus.FORBIDDEN);
      }

      return this.userRepository.save({ ...user, id: createID("user") });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOneByEmail(email: string) {
    try {
      const users = await this.userRepository
        .createQueryBuilder("user")
        .leftJoinAndMapMany(
          "user.organizations",
          UserOrganization,
          "user_organization",
          "user_organization.user_id = user.id",
        )
        .leftJoinAndMapOne(
          "user_organization.organization",
          Organization,
          "organization",
          "organization.id = user_organization.organization_id",
        )
        .where("user.email = :email", { email })
        .getOne();

      return users;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
