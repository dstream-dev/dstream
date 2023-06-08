import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  CreateCustomerDTO,
  CustomerAddressDTO,
  CustomerBalanceDTO,
  CustomerSubscriptionDTO,
  UpdateCustomerDTO,
} from "src/dtos";
import { Customer, CustomerPlan } from "src/entities";
import { createID } from "src/utils";
import { Repository } from "typeorm";
import { PlansService } from "../plans";

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customersRepository: Repository<Customer>,
    @InjectRepository(CustomerPlan)
    private readonly customerPlansRepository: Repository<CustomerPlan>,

    private readonly plansService: PlansService,
  ) {}

  async findAll(org_id: string): Promise<Customer[]> {
    try {
      return await this.customersRepository.find({
        where: { organization_id: org_id },
        order: { created_at: "DESC" },
      });
    } catch (e) {
      throw new HttpException(e.message, e.status || HttpStatus.BAD_REQUEST);
    }
  }

  async findOne({
    id,
    org_id,
  }: {
    id: string;
    org_id: string;
  }): Promise<Customer> {
    try {
      return await this.customersRepository
        .createQueryBuilder("customer")
        .leftJoinAndMapMany(
          "customer.subscriptions",
          CustomerPlan,
          "customer_plans",
          "customer_plans.customer_id = customer.id",
        )
        .where("customer.id = :id", { id })
        .andWhere("customer.organization_id = :org_id", { org_id })
        .getOne();
    } catch (e) {
      throw new HttpException(e.message, e.status || HttpStatus.BAD_REQUEST);
    }
  }

  async create({ org_id, data }: { org_id: string; data: CreateCustomerDTO }) {
    try {
      const customer = this.customersRepository.create({
        id: createID("customer"),
        ...data,
        organization_id: org_id,
      });
      return await this.customersRepository.save(customer);
    } catch (e) {
      throw new HttpException(e.message, e.status || HttpStatus.BAD_REQUEST);
    }
  }

  async update({
    id,
    org_id,
    data,
  }: {
    id: string;
    org_id: string;
    data: UpdateCustomerDTO;
  }) {
    try {
      const customer = await this.customersRepository.findOne({
        where: { id, organization_id: org_id },
      });
      if (!customer) {
        throw new HttpException("Customer not found", HttpStatus.NOT_FOUND);
      }
      await this.customersRepository.update({ id: customer.id }, data);

      return {
        status: HttpStatus.OK,
        message: "Customer updated successfully",
      };
    } catch (e) {
      throw new HttpException(e.message, e.status || HttpStatus.BAD_REQUEST);
    }
  }

  async addAddress({
    id,
    org_id,
    data,
  }: {
    id: string;
    org_id: string;
    data: CustomerAddressDTO;
  }) {
    try {
      const customer = await this.customersRepository.findOne({
        where: { id, organization_id: org_id },
      });
      if (!customer) {
        throw new HttpException("Customer not found", HttpStatus.NOT_FOUND);
      }

      await this.customersRepository.update({ id: customer.id }, { ...data });

      return {
        status: HttpStatus.OK,
        message: "Customer address added successfully",
      };
    } catch (e) {
      throw new HttpException(e.message, e.status || HttpStatus.BAD_REQUEST);
    }
  }

  async updateBalance({
    id,
    org_id,
    data,
  }: {
    id: string;
    org_id: string;
    data: CustomerBalanceDTO;
  }) {
    try {
      const customer = await this.customersRepository.findOne({
        where: { id, organization_id: org_id },
      });
      if (!customer) {
        throw new HttpException("Customer not found", HttpStatus.NOT_FOUND);
      }

      await this.customersRepository.update({ id: customer.id }, { ...data });

      return {
        status: HttpStatus.OK,
        message: "Customer balance updated successfully",
      };
    } catch (e) {
      throw new HttpException(e.message, e.status || HttpStatus.BAD_REQUEST);
    }
  }

  async addSubscription({
    id,
    org_id,
    data,
  }: {
    id: string;
    org_id: string;
    data: CustomerSubscriptionDTO;
  }) {
    try {
      const customer = await this.customersRepository.findOne({
        where: { id, organization_id: org_id },
      });
      if (!customer) {
        throw new HttpException("Customer not found", HttpStatus.NOT_FOUND);
      }

      const plan = await this.plansService.findOne({
        id: data.plan_id,
        org_id,
      });

      if (!plan) {
        throw new HttpException("Plan not found", HttpStatus.NOT_FOUND);
      }

      await this.customerPlansRepository.save({
        id: createID("customer_plan"),
        plan_id: plan.id,
        plan_name: plan.name,
        organization_id: org_id,
        customer_id: customer.id,
        status: true,
      });

      return {
        status: HttpStatus.OK,
        message: "Customer subscription added successfully",
      };
    } catch (e) {
      throw new HttpException(e.message, e.status || HttpStatus.BAD_REQUEST);
    }
  }

  async subscriptionStatus({
    sub_id,
    org_id,
    status,
  }: {
    sub_id: string;
    org_id: string;
    status: boolean;
  }) {
    try {
      const subscription = await this.customerPlansRepository.findOne({
        where: { id: sub_id, organization_id: org_id },
      });
      if (!subscription) {
        throw new HttpException("Subscription not found", HttpStatus.NOT_FOUND);
      }

      await this.customerPlansRepository.update(
        { id: subscription.id },
        { status: status },
      );

      return {
        status: HttpStatus.OK,
        message: "Customer subscription deactivated successfully",
      };
    } catch (e) {
      throw new HttpException(e.message, e.status || HttpStatus.BAD_REQUEST);
    }
  }
}
