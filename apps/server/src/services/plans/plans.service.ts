import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { Plan, PlanCharges } from "src/entities";
import { EntityManager, Repository } from "typeorm";
import { PlanDTO } from "src/dtos";
import { createID } from "src/utils";

@Injectable()
export class PlansService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
    @InjectRepository(PlanCharges)
    private readonly planChargesRepository: Repository<PlanCharges>,
  ) {}

  async findAll({ org_id: string }) {
    try {
      return await this.planRepository
        .createQueryBuilder("plan")
        .where("plan.org_id = :org_id", { org_id: string })
        .getMany();
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne({ org_id, id }: { org_id: string; id: string }) {
    try {
      return await this.planRepository.findOne({
        where: { organization_id: org_id, id },
      });
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create({ org_id, data }: { org_id: string; data: PlanDTO }) {
    try {
      const prv_plan = await this.planRepository.findOne({
        where: { organization_id: org_id, name: data.name },
      });

      if (prv_plan) {
        throw new HttpException(
          "Plan with this name already exists",
          HttpStatus.BAD_REQUEST,
        );
      }

      const returnData = await this.entityManager.transaction(
        async (manager) => {
          const plan = await manager.save(Plan, {
            id: createID("plan"),
            organization_id: org_id,
            name: data.name,
            description: data.description,
            currency: data.currency,
            external_plan_id: data.external_plan_id,
            payment_term: data.payment_term,
            min_charges: {
              ...data.min_charges,
            },
          });

          for (let i = 0; i < data.charges.length; i += 1) {
            await this.planChargesRepository.save({
              id: createID("plan_charges"),
              plan_id: plan.id,
              organization_id: org_id,
              metric_id: data.charges[i].metric_id,
              cadence: data.charges[i].cadence,
              active_min_charge: data.charges[i].active_min_charge,
              min_charge: data.charges[i].min_charge,
              pricing_model: data.charges[i].pricing_model,
              pricing_scheme: data.charges[i].pricing_scheme,
            });
          }

          return plan;
        },
      );

      return returnData;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  // async update({
  //   org_id,
  //   id,
  //   data,
  // }: {
  //   org_id: string;
  //   id: string;
  //   data: PlanDTO;
  // }) {
  //   try {
  //     const plan = await this.findOne({ org_id, id });
  //     if (!plan) {
  //       throw new HttpException("Plan not found", HttpStatus.BAD_REQUEST);
  //     }

  //     await this.planRepository.update(
  //       { organization_id: org_id, id },
  //       {
  //         name: data.name,
  //         description: data.description,
  //         currency: data.currency,
  //         external_plan_id: data.external_plan_id,
  //         payment_term: data.payment_term,
  //         min_charges: {
  //           ...data.min_charges,
  //         },
  //       },
  //     );

  //     await this.planChargesRepository.delete({
  //       organization_id: org_id,
  //       plan_id: id,
  //     });

  //     for (let i = 0; i < data.charges.length; i += 1) {
  //       await this.planChargesRepository.save({
  //         id: createID("plan_charges"),
  //         plan_id: id,
  //         organization_id: org_id,
  //         metric_id: data.charges[i].metric_id,
  //         cadence: data.charges[i].cadence,
  //         active_min_charge: data.charges[i].active_min_charge,
  //         min_charge: data.charges[i].min_charge,
  //         pricing_model: data.charges[i].pricing_model,
  //         pricing_scheme: data.charges[i].pricing_scheme,
  //       });
  //     }
  //   } catch (err) {
  //     throw new HttpException(
  //       err.message,
  //       err.status || HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }
}
