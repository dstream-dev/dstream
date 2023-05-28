import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import {
  Customer,
  Metric,
  Organization,
  User,
  UserOrganization,
} from "./entities";
import { JwtStrategy } from "./utils";
import {
  UserModule,
  AuthModule,
  OrganizationModule,
  MetricModule,
  EventModule,
  CustomersModule,
} from "./services";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "mysql",
        host: configService.get("DB_HOST"),
        port: +configService.get("DB_PORT"),
        username: configService.get("DB_USERNAME"),
        password: configService.get("DB_PASSWORD"),
        database: configService.get("DB_DATABASE"),
        entities: [User, Organization, UserOrganization, Metric, Customer],
        synchronize: true,
        autoLoadEntities: true,
        // ssl: {
        //   rejectUnauthorized: true,
        // },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    MetricModule,
    EventModule,
    OrganizationModule,
    CustomersModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
