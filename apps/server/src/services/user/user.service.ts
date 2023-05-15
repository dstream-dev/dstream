import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Organization, User } from "src/entities";
import { createID } from "src/utils";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    try {
      return this.userRepository.save({ ...user, id: createID("user") });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOneByEmail(email: string): Promise<User | null> {
    try {
      return this.userRepository
        .createQueryBuilder("user")
        .innerJoinAndMapOne(
          "user.organization",
          Organization,
          "organization",
          "organization.id = user.organization_id",
        )
        .where("user.email = :email", { email })
        .getOne();
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOneById(id: string): Promise<User | null> {
    try {
      return this.userRepository.findOne({ where: { id } });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAllByOrganizationId(organization_id: string): Promise<User[]> {
    try {
      return this.userRepository
        .createQueryBuilder()
        .where("organization_id = :organization_id", { organization_id })
        .getMany();
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
