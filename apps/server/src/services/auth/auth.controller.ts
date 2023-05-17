import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthUser, IAuthUserDecorator, UserAuthGuard } from "src/utils";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(UserAuthGuard)
  @Post()
  async register(@AuthUser() user: IAuthUserDecorator) {
    try {
      return await this.authService.register({
        email: user.email,
        last_name: user.last_name,
        first_name: user.first_name,
      });
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
