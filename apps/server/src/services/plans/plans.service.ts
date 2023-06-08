import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { CustomerPlan, Plan, PlanCharges } from "src/entities";
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
        .leftJoinAndMapMany(
          "plan.subscriptions",
          CustomerPlan,
          "customer_plan",
          "customer_plan.plan_id = plan.id",
        )
        .where("plan.organization_id = :org_id", { org_id: string })
        .orderBy("plan.created_at", "DESC")
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
      return await this.planRepository
        .createQueryBuilder("plan")
        .innerJoinAndMapMany(
          "plan.charges",
          PlanCharges,
          "plan_charges",
          "plan_charges.plan_id = plan.id",
        )
        .where("plan.organization_id = :org_id", { org_id })
        .andWhere("plan.id = :id", { id })
        .getOne();
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
            min_charges_amount: data.min_charges_amount,
            min_charges_name: data.min_charges_name,
          });

          for (let i = 0; i < data.charges.length; i += 1) {
            await manager.save(PlanCharges, {
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

  async update({
    org_id,
    id,
    data,
  }: {
    org_id: string;
    id: string;
    data: PlanDTO;
  }) {
    try {
      const plan = await this.findOne({ org_id, id });
      if (!plan) {
        throw new HttpException("Plan not found", HttpStatus.BAD_REQUEST);
      }

      await this.entityManager.transaction(async (manager) => {
        await manager.update(
          Plan,
          { organization_id: org_id, id },
          {
            name: data.name,
            description: data.description,
            currency: data.currency,
            external_plan_id: data.external_plan_id,
            payment_term: data.payment_term,
            min_charges_amount: data.min_charges_amount,
            min_charges_name: data.min_charges_name,
          },
        );

        await manager.delete(PlanCharges, {
          organization_id: org_id,
          plan_id: id,
        });

        for (let i = 0; i < data.charges.length; i += 1) {
          await manager.save(PlanCharges, {
            id: createID("plan_charges"),
            plan_id: id,
            organization_id: org_id,
            metric_id: data.charges[i].metric_id,
            cadence: data.charges[i].cadence,
            active_min_charge: data.charges[i].active_min_charge,
            min_charge: data.charges[i].min_charge,
            pricing_model: data.charges[i].pricing_model,
            pricing_scheme: data.charges[i].pricing_scheme,
          });
        }
      });

      return {
        status: HttpStatus.OK,
        message: "Plan updated successfully",
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete({ org_id, id }: { org_id: string; id: string }) {
    try {
      const plan = await this.findOne({ org_id, id });
      if (!plan) {
        throw new HttpException("Plan not found", HttpStatus.BAD_REQUEST);
      }

      await this.entityManager.transaction(async (manager) => {
        await manager.delete(Plan, { organization_id: org_id, id });
        await manager.delete(PlanCharges, {
          organization_id: org_id,
          plan_id: id,
        });
      });

      return {
        status: HttpStatus.OK,
        message: "Plan deleted successfully",
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
