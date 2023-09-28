import { Cash } from '@prisma/client';
import Service, { ResponsePayload } from '../Service';
import CashRepository from '../../repositories/prisma/models/CashRepository';
import { createErrorPayload, createSuccessPayload } from '../Payload';

type CreateModelType = Omit<Cash, 'id'>;
type UpdateModelType = Omit<Cash, 'id' | 'accountId'>;

class CashService implements Service<Cash, CreateModelType, UpdateModelType> {
  constructor(private repo: CashRepository) {}

  async findUnique(id: Pick<Cash, 'id'>): ResponsePayload<Cash> {
    try {
      const item = await this.repo.find_unique_record_by_id(id);
      if (item == null) throw new Error('The model found (findUnique is null');
      return createSuccessPayload<Cash>(item);
    } catch (error) {
      return createErrorPayload<Cash>(error);
    }
  }

  async findFirst(where: Partial<Cash>) {
    try {
      const item = await this.repo.find_first_record_where(where);
      if (item == null) throw new Error('The model found (findFirst) is null');
      return createSuccessPayload<Cash>(item);
    } catch (error) {
      return createErrorPayload<Cash>(error);
    }
  }

  async findMany(where: Partial<Cash>): ResponsePayload<Cash> {
    try {
      const items = await this.repo.find_many_records_where(where);
      return createSuccessPayload<Cash>(items);
    } catch (error) {
      return createErrorPayload<Cash>(error);
    }
  }

  async createOne(data: CreateModelType): ResponsePayload<Cash> {
    try {
      const item = await this.repo.create_record(data);
      if (item == null)
        throw new Error('Could not create model; item is null.');
      return createSuccessPayload<Cash>(item);
    } catch (error) {
      return createErrorPayload<Cash>(error);
    }
  }

  async createMany(data_list: CreateModelType[]): ResponsePayload<Cash> {
    try {
      if (data_list.length == 0)
        throw new Error('No model were provided to the create many function');

      const records = await this.repo.create_records(data_list);
      if (records.length == 0)
        throw new Error(
          'Could not create any record with the create many function'
        );

      return createSuccessPayload<Cash>(records);
    } catch (error) {
      return createErrorPayload<Cash>(error);
    }
  }

  async updateMany(
    where: Partial<Cash>,
    data: Partial<UpdateModelType>
  ): ResponsePayload<Cash> {
    try {
      const { count } = await this.repo.update_many_records_where(where, data);
      return {
        success: true,
        data: undefined,
        error: undefined,
        count: count,
      };
    } catch (error) {
      return createErrorPayload<Cash>(error);
    }
  }

  async updateUnique(
    id: Pick<Cash, 'id'>,
    data: Partial<UpdateModelType>
  ): ResponsePayload<Cash> {
    try {
      const item = await this.repo.update_unique_record_by_id(id, data);
      return createSuccessPayload<Cash>(item);
    } catch (error) {
      return createErrorPayload<Cash>(error);
    }
  }

  async deleteUnique(id: Pick<Cash, 'id'>): ResponsePayload<Cash> {
    try {
      const item = await this.repo.delete_unique_record_by_id(id);
      return createSuccessPayload<Cash>(item);
    } catch (error) {
      return createErrorPayload<Cash>(error);
    }
  }

  async deleteMany(where: Partial<Cash>): ResponsePayload<Cash> {
    try {
      const { count } = await this.repo.delete_many_records_where(where);
      return {
        success: true,
        data: undefined,
        error: undefined,
        count: count,
      };
    } catch (error) {
      return createErrorPayload<Cash>(error);
    }
  }

  async count(where: Partial<Cash>): ResponsePayload<Cash> {
    try {
      const count = await this.repo.count_records_where(where);
      return {
        success: true,
        count: count,
        error: undefined,
        data: undefined,
      };
    } catch (error) {
      return createErrorPayload<Cash>(error);
    }
  }
}

export default CashService;
