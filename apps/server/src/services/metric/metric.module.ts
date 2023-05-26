import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Metric, UserOrganization } from "src/entities";
import { MetricController } from "./metric.controller";
import { MetricService } from "./metric.service";

@Module({
  imports: [TypeOrmModule.forFeature([Metric, UserOrganization])],
  controllers: [MetricController],
  providers: [MetricService],
  exports: [MetricService],
})
export class MetricModule {}
