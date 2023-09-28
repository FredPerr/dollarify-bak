import { Income } from '@prisma/client';
import Service, { ResponsePayload } from '../Service';
import IncomeRepository from '../../repositories/prisma/models/IncomeRepository';
import { createErrorPayload, createSuccessPayload } from '../Payload';

type CreateModelType = Omit<Income, 'id'>;
type UpdateModelType = Omit<Income, 'id' | 'accountId'>;

class IncomeService
  implements Service<Income, CreateModelType, UpdateModelType>
{
  constructor(private repo: IncomeRepository) {}

  async findUnique(id: Pick<Income, 'id'>): ResponsePayload<Income> {
    try {
      const item = await this.repo.find_unique_record_by_id(id);
      if (item == null) throw new Error('The model found (findUnique is null');
      return createSuccessPayload<Income>(item);
    } catch (error) {
      return createErrorPayload<Income>(error);
    }
  }

  async findFirst(where: Partial<Income>) {
    try {
      const item = await this.repo.find_first_record_where(where);
      if (item == null) throw new Error('The model found (findFirst) is null');
      return createSuccessPayload<Income>(item);
    } catch (error) {
      return createErrorPayload<Income>(error);
    }
  }

  async findMany(where: Partial<Income>): ResponsePayload<Income> {
    try {
      const items = await this.repo.find_many_records_where(where);
      return createSuccessPayload<Income>(items);
    } catch (error) {
      return createErrorPayload<Income>(error);
    }
  }

  async createOne(data: CreateModelType): ResponsePayload<Income> {
    try {
      const item = await this.repo.create_record(data);
      if (item == null)
        throw new Error('Could not create model; item is null.');
      return createSuccessPayload<Income>(item);
    } catch (error) {
      return createErrorPayload<Income>(error);
    }
  }

  async createMany(data_list: CreateModelType[]): ResponsePayload<Income> {
    try {
      if (data_list.length == 0)
        throw new Error('No model were provided to the create many function');

      const records = await this.repo.create_records(data_list);
      if (records.length == 0)
        throw new Error(
          'Could not create any record with the create many function'
        );

      return createSuccessPayload<Income>(records);
    } catch (error) {
      return createErrorPayload<Income>(error);
    }
  }

  async updateMany(
    where: Partial<Income>,
    data: Partial<UpdateModelType>
  ): ResponsePayload<Income> {
    try {
      const { count } = await this.repo.update_many_records_where(where, data);
      return {
        success: true,
        data: undefined,
        error: undefined,
        count: count,
      };
    } catch (error) {
      return createErrorPayload<Income>(error);
    }
  }

  async updateUnique(
    id: Pick<Income, 'id'>,
    data: Partial<UpdateModelType>
  ): ResponsePayload<Income> {
    try {
      const item = await this.repo.update_unique_record_by_id(id, data);
      return createSuccessPayload<Income>(item);
    } catch (error) {
      return createErrorPayload<Income>(error);
    }
  }

  async deleteUnique(id: Pick<Income, 'id'>): ResponsePayload<Income> {
    try {
      const item = await this.repo.delete_unique_record_by_id(id);
      return createSuccessPayload<Income>(item);
    } catch (error) {
      return createErrorPayload<Income>(error);
    }
  }

  async deleteMany(where: Partial<Income>): ResponsePayload<Income> {
    try {
      const { count } = await this.repo.delete_many_records_where(where);
      return {
        success: true,
        data: undefined,
        error: undefined,
        count: count,
      };
    } catch (error) {
      return createErrorPayload<Income>(error);
    }
  }

  async count(where: Partial<Income>): ResponsePayload<Income> {
    try {
      const count = await this.repo.count_records_where(where);
      return {
        success: true,
        count: count,
        error: undefined,
        data: undefined,
      };
    } catch (error) {
      return createErrorPayload<Income>(error);
    }
  }
}

export default IncomeService;
