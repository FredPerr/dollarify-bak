import { Debt } from '@prisma/client';
import Service, { ResponsePayload } from '../Service';
import DebtRepository from '../../repositories/prisma/models/DebtRepository';
import { createErrorPayload, createSuccessPayload } from '../Payload';

type CreateModelType = Omit<Debt, 'id'>;
type UpdateModelType = Omit<Debt, 'id' | 'accountId'>;

class DebtService implements Service<Debt, CreateModelType, UpdateModelType> {
  constructor(private repo: DebtRepository) {}

  async findUnique(id: Pick<Debt, 'id'>): ResponsePayload<Debt> {
    try {
      const item = await this.repo.find_unique_record_by_id(id);
      if (item == null) throw new Error('The model found (findUnique is null');
      return createSuccessPayload<Debt>(item);
    } catch (error) {
      return createErrorPayload<Debt>(error);
    }
  }

  async findFirst(where: Partial<Debt>) {
    try {
      const item = await this.repo.find_first_record_where(where);
      if (item == null) throw new Error('The model found (findFirst) is null');
      return createSuccessPayload<Debt>(item);
    } catch (error) {
      return createErrorPayload<Debt>(error);
    }
  }

  async findMany(where: Partial<Debt>): ResponsePayload<Debt> {
    try {
      const items = await this.repo.find_many_records_where(where);
      return createSuccessPayload<Debt>(items);
    } catch (error) {
      return createErrorPayload<Debt>(error);
    }
  }

  async createOne(data: CreateModelType): ResponsePayload<Debt> {
    try {
      const item = await this.repo.create_record(data);
      if (item == null)
        throw new Error('Could not create model; item is null.');
      return createSuccessPayload<Debt>(item);
    } catch (error) {
      return createErrorPayload<Debt>(error);
    }
  }

  async createMany(data_list: CreateModelType[]): ResponsePayload<Debt> {
    try {
      if (data_list.length == 0)
        throw new Error('No model were provided to the create many function');

      const records = await this.repo.create_records(data_list);
      if (records.length == 0)
        throw new Error(
          'Could not create any record with the create many function'
        );

      return createSuccessPayload<Debt>(records);
    } catch (error) {
      return createErrorPayload<Debt>(error);
    }
  }

  async updateMany(
    where: Partial<Debt>,
    data: Partial<UpdateModelType>
  ): ResponsePayload<Debt> {
    try {
      const { count } = await this.repo.update_many_records_where(where, data);
      return {
        success: true,
        data: undefined,
        error: undefined,
        count: count,
      };
    } catch (error) {
      return createErrorPayload<Debt>(error);
    }
  }

  async updateUnique(
    id: Pick<Debt, 'id'>,
    data: Partial<UpdateModelType>
  ): ResponsePayload<Debt> {
    try {
      const item = await this.repo.update_unique_record_by_id(id, data);
      return createSuccessPayload<Debt>(item);
    } catch (error) {
      return createErrorPayload<Debt>(error);
    }
  }

  async deleteUnique(id: Pick<Debt, 'id'>): ResponsePayload<Debt> {
    try {
      const item = await this.repo.delete_unique_record_by_id(id);
      return createSuccessPayload<Debt>(item);
    } catch (error) {
      return createErrorPayload<Debt>(error);
    }
  }

  async deleteMany(where: Partial<Debt>): ResponsePayload<Debt> {
    try {
      const { count } = await this.repo.delete_many_records_where(where);
      return {
        success: true,
        data: undefined,
        error: undefined,
        count: count,
      };
    } catch (error) {
      return createErrorPayload<Debt>(error);
    }
  }

  async count(where: Partial<Debt>): ResponsePayload<Debt> {
    try {
      const count = await this.repo.count_records_where(where);
      return {
        success: true,
        count: count,
        error: undefined,
        data: undefined,
      };
    } catch (error) {
      return createErrorPayload<Debt>(error);
    }
  }
}

export default DebtService;
