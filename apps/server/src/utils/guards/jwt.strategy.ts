import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService
        .get("FIRE_BASE_PUBLIC_CRET")
        .replace(/\\n/g, "\n"),
    });
  }

  async validate(payload: any) {
    const { name, email } = payload;
    const first_name = name.split(" ")[0];
    const last_name = name.split(" ")[1];

    return { first_name, last_name, email };
  }
}
