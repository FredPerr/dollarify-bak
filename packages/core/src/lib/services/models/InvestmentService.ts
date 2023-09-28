import { Investment } from '@prisma/client';
import Service, { ResponsePayload } from '../Service';
import InvestmentRepository from '../../repositories/prisma/models/InvestmentRepository';
import { createErrorPayload, createSuccessPayload } from '../Payload';

type CreateModelType = Omit<Investment, 'id'>;
type UpdateModelType = Omit<Investment, 'id' | 'accountId'>;

class InvestmentService
  implements Service<Investment, CreateModelType, UpdateModelType>
{
  constructor(private repo: InvestmentRepository) {}

  async findUnique(id: Pick<Investment, 'id'>): ResponsePayload<Investment> {
    try {
      const item = await this.repo.find_unique_record_by_id(id);
      if (item == null) throw new Error('The model found (findUnique is null');
      return createSuccessPayload<Investment>(item);
    } catch (error) {
      return createErrorPayload<Investment>(error);
    }
  }

  async findFirst(where: Partial<Investment>) {
    try {
      const item = await this.repo.find_first_record_where(where);
      if (item == null) throw new Error('The model found (findFirst) is null');
      return createSuccessPayload<Investment>(item);
    } catch (error) {
      return createErrorPayload<Investment>(error);
    }
  }

  async findMany(where: Partial<Investment>): ResponsePayload<Investment> {
    try {
      const items = await this.repo.find_many_records_where(where);
      return createSuccessPayload<Investment>(items);
    } catch (error) {
      return createErrorPayload<Investment>(error);
    }
  }

  async createOne(data: CreateModelType): ResponsePayload<Investment> {
    try {
      const item = await this.repo.create_record(data);
      if (item == null)
        throw new Error('Could not create model; item is null.');
      return createSuccessPayload<Investment>(item);
    } catch (error) {
      return createErrorPayload<Investment>(error);
    }
  }

  async createMany(data_list: CreateModelType[]): ResponsePayload<Investment> {
    try {
      if (data_list.length == 0)
        throw new Error('No model were provided to the create many function');

      const records = await this.repo.create_records(data_list);
      if (records.length == 0)
        throw new Error(
          'Could not create any record with the create many function'
        );

      return createSuccessPayload<Investment>(records);
    } catch (error) {
      return createErrorPayload<Investment>(error);
    }
  }

  async updateMany(
    where: Partial<Investment>,
    data: Partial<UpdateModelType>
  ): ResponsePayload<Investment> {
    try {
      const { count } = await this.repo.update_many_records_where(where, data);
      return {
        success: true,
        data: undefined,
        error: undefined,
        count: count,
      };
    } catch (error) {
      return createErrorPayload<Investment>(error);
    }
  }

  async updateUnique(
    id: Pick<Investment, 'id'>,
    data: Partial<UpdateModelType>
  ): ResponsePayload<Investment> {
    try {
      const item = await this.repo.update_unique_record_by_id(id, data);
      return createSuccessPayload<Investment>(item);
    } catch (error) {
      return createErrorPayload<Investment>(error);
    }
  }

  async deleteUnique(id: Pick<Investment, 'id'>): ResponsePayload<Investment> {
    try {
      const item = await this.repo.delete_unique_record_by_id(id);
      return createSuccessPayload<Investment>(item);
    } catch (error) {
      return createErrorPayload<Investment>(error);
    }
  }

  async deleteMany(where: Partial<Investment>): ResponsePayload<Investment> {
    try {
      const { count } = await this.repo.delete_many_records_where(where);
      return {
        success: true,
        data: undefined,
        error: undefined,
        count: count,
      };
    } catch (error) {
      return createErrorPayload<Investment>(error);
    }
  }

  async count(where: Partial<Investment>): ResponsePayload<Investment> {
    try {
      const count = await this.repo.count_records_where(where);
      return {
        success: true,
        count: count,
        error: undefined,
        data: undefined,
      };
    } catch (error) {
      return createErrorPayload<Investment>(error);
    }
  }
}

export default InvestmentService;
