import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateMetricDto } from "src/dtos";
import { Metric } from "src/entities";
import { createID } from "src/utils";
import { Repository } from "typeorm";

@Injectable()
export class MetricService {
  constructor(
    @InjectRepository(Metric)
    private readonly metricRepository: Repository<Metric>,
  ) {}

  async findByID({
    id,
    organization_id,
  }: {
    id: string;
    organization_id: string;
  }): Promise<Metric> {
    try {
      return await this.metricRepository.findOne({
        where: { id, organization_id },
      });
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(organization_id: string): Promise<Metric[]> {
    try {
      return await this.metricRepository
        .createQueryBuilder()
        .where("organization_id = :organization_id", { organization_id })
        .getMany();
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create({
    organization_id,
    data,
  }: {
    organization_id: string;
    data: CreateMetricDto;
  }) {
    try {
      const metric = this.metricRepository.create({
        id: createID("metric"),
        ...data,
        organization_id,
      });
      await this.metricRepository.save(metric);
      return metric;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
