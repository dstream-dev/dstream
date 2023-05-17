import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "../user";
import { CreateUserDTO } from "src/dtos";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(userData: CreateUserDTO) {
    try {
      const user = await this.userService.findOneByEmail(userData.email);
      if (!user) {
        return await this.userService.create(userData);
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
