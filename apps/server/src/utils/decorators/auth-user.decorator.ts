import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export interface IAuthUserDecorator {
  email: string;
  first_name: string;
  last_name: string;
}

export const AuthUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    return req.user;
  },
);
