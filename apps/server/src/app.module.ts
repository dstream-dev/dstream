import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import {
  Customer,
  CustomerPlan,
  Metric,
  Organization,
  Plan,
  PlanCharges,
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
  PlansModule,
} from "./services";
import { BullModule } from "@nestjs/bullmq";
import { BullBoardController } from "./bullBoard.controller";

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
        entities: [
          Plan,
          User,
          Metric,
          Customer,
          PlanCharges,
          CustomerPlan,
          Organization,
          UserOrganization,
        ],
        synchronize: true,
        autoLoadEntities: true,
        // ssl: {
        //   rejectUnauthorized: true,
        // },
      }),
      inject: [ConfigService],
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get("REDIS_HOST"),
          port: +configService.get("REDIS_PORT"),
        },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    MetricModule,
    EventModule,
    OrganizationModule,
    CustomersModule,
    PlansModule,
  ],
  controllers: [AppController, BullBoardController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
