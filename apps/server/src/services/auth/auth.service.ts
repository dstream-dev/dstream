import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "../user";
import { CreateUserDTO } from "src/dtos";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(userData: CreateUserDTO) {
    try {
      return await this.userService.create(userData);
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async login(user_email: string) {
    try {
      const user = await this.userService.findOneByEmail(user_email);
      if (!user) {
        throw new HttpException("User not found.", HttpStatus.NOT_FOUND);
      }

      return user;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
