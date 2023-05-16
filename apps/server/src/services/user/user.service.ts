import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/entities";
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

  async findOneByEmail(email: string): Promise<User | null> {
    try {
      return this.userRepository
        .createQueryBuilder("user")
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
}
