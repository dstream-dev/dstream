import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  CreateCustomerDTO,
  CustomerAddressDTO,
  CustomerBalanceDTO,
  UpdateCustomerDTO,
} from "src/dtos";
import { Customer } from "src/entities";
import { createID } from "src/utils";
import { Repository } from "typeorm";

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customersRepository: Repository<Customer>,
  ) {}

  async findAll(org_id: string): Promise<Customer[]> {
    try {
      return await this.customersRepository.find({
        where: { organization_id: org_id },
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
      return await this.customersRepository.findOne({
        where: { id, organization_id: org_id },
      });
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
}
