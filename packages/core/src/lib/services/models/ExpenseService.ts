import { Expense } from '@prisma/client';
import Service, { ResponsePayload } from '../Service';
import ExpenseRepository from '../../repositories/prisma/models/ExpenseRepository';
import { createErrorPayload, createSuccessPayload } from '../Payload';

type CreateModelType = Omit<Expense, 'id'>;
type UpdateModelType = Omit<Expense, 'id' | 'accountId'>;

class ExpenseService
  implements Service<Expense, CreateModelType, UpdateModelType>
{
  constructor(private repo: ExpenseRepository) {}

  async findUnique(id: Pick<Expense, 'id'>): ResponsePayload<Expense> {
    try {
      const item = await this.repo.find_unique_record_by_id(id);
      if (item == null) throw new Error('The model found (findUnique is null');
      return createSuccessPayload<Expense>(item);
    } catch (error) {
      return createErrorPayload<Expense>(error);
    }
  }

  async findFirst(where: Partial<Expense>) {
    try {
      const item = await this.repo.find_first_record_where(where);
      if (item == null) throw new Error('The model found (findFirst) is null');
      return createSuccessPayload<Expense>(item);
    } catch (error) {
      return createErrorPayload<Expense>(error);
    }
  }

  async findMany(where: Partial<Expense>): ResponsePayload<Expense> {
    try {
      const items = await this.repo.find_many_records_where(where);
      return createSuccessPayload<Expense>(items);
    } catch (error) {
      return createErrorPayload<Expense>(error);
    }
  }

  async createOne(data: CreateModelType): ResponsePayload<Expense> {
    try {
      const item = await this.repo.create_record(data);
      if (item == null)
        throw new Error('Could not create model; item is null.');
      return createSuccessPayload<Expense>(item);
    } catch (error) {
      return createErrorPayload<Expense>(error);
    }
  }

  async createMany(data_list: CreateModelType[]): ResponsePayload<Expense> {
    try {
      if (data_list.length == 0)
        throw new Error('No model were provided to the create many function');

      const records = await this.repo.create_records(data_list);
      if (records.length == 0)
        throw new Error(
          'Could not create any record with the create many function'
        );

      return createSuccessPayload<Expense>(records);
    } catch (error) {
      return createErrorPayload<Expense>(error);
    }
  }

  async updateMany(
    where: Partial<Expense>,
    data: Partial<UpdateModelType>
  ): ResponsePayload<Expense> {
    try {
      const { count } = await this.repo.update_many_records_where(where, data);
      return {
        success: true,
        data: undefined,
        error: undefined,
        count: count,
      };
    } catch (error) {
      return createErrorPayload<Expense>(error);
    }
  }

  async updateUnique(
    id: Pick<Expense, 'id'>,
    data: Partial<UpdateModelType>
  ): ResponsePayload<Expense> {
    try {
      const item = await this.repo.update_unique_record_by_id(id, data);
      return createSuccessPayload<Expense>(item);
    } catch (error) {
      return createErrorPayload<Expense>(error);
    }
  }

  async deleteUnique(id: Pick<Expense, 'id'>): ResponsePayload<Expense> {
    try {
      const item = await this.repo.delete_unique_record_by_id(id);
      return createSuccessPayload<Expense>(item);
    } catch (error) {
      return createErrorPayload<Expense>(error);
    }
  }

  async deleteMany(where: Partial<Expense>): ResponsePayload<Expense> {
    try {
      const { count } = await this.repo.delete_many_records_where(where);
      return {
        success: true,
        data: undefined,
        error: undefined,
        count: count,
      };
    } catch (error) {
      return createErrorPayload<Expense>(error);
    }
  }

  async count(where: Partial<Expense>): ResponsePayload<Expense> {
    try {
      const count = await this.repo.count_records_where(where);
      return {
        success: true,
        count: count,
        error: undefined,
        data: undefined,
      };
    } catch (error) {
      return createErrorPayload<Expense>(error);
    }
  }
}

export default ExpenseService;
