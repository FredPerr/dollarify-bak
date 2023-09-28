import { Loan } from '@prisma/client';
import Service, { ResponsePayload } from '../Service';
import LoanRepository from '../../repositories/prisma/models/LoanRepository';
import { createErrorPayload, createSuccessPayload } from '../Payload';

type CreateModelType = Omit<Loan, 'id'>;
type UpdateModelType = Omit<Loan, 'id' | 'accountId'>;

class LoanService implements Service<Loan, CreateModelType, UpdateModelType> {
  constructor(private repo: LoanRepository) {}

  async findUnique(id: Pick<Loan, 'id'>): ResponsePayload<Loan> {
    try {
      const item = await this.repo.find_unique_record_by_id(id);
      if (item == null) throw new Error('The model found (findUnique is null');
      return createSuccessPayload<Loan>(item);
    } catch (error) {
      return createErrorPayload<Loan>(error);
    }
  }

  async findFirst(where: Partial<Loan>) {
    try {
      const item = await this.repo.find_first_record_where(where);
      if (item == null) throw new Error('The model found (findFirst) is null');
      return createSuccessPayload<Loan>(item);
    } catch (error) {
      return createErrorPayload<Loan>(error);
    }
  }

  async findMany(where: Partial<Loan>): ResponsePayload<Loan> {
    try {
      const items = await this.repo.find_many_records_where(where);
      return createSuccessPayload<Loan>(items);
    } catch (error) {
      return createErrorPayload<Loan>(error);
    }
  }

  async createOne(data: CreateModelType): ResponsePayload<Loan> {
    try {
      const item = await this.repo.create_record(data);
      if (item == null)
        throw new Error('Could not create model; item is null.');
      return createSuccessPayload<Loan>(item);
    } catch (error) {
      return createErrorPayload<Loan>(error);
    }
  }

  async createMany(data_list: CreateModelType[]): ResponsePayload<Loan> {
    try {
      if (data_list.length == 0)
        throw new Error('No model were provided to the create many function');

      const records = await this.repo.create_records(data_list);
      if (records.length == 0)
        throw new Error(
          'Could not create any record with the create many function'
        );

      return createSuccessPayload<Loan>(records);
    } catch (error) {
      return createErrorPayload<Loan>(error);
    }
  }

  async updateMany(
    where: Partial<Loan>,
    data: Partial<UpdateModelType>
  ): ResponsePayload<Loan> {
    try {
      const { count } = await this.repo.update_many_records_where(where, data);
      return {
        success: true,
        data: undefined,
        error: undefined,
        count: count,
      };
    } catch (error) {
      return createErrorPayload<Loan>(error);
    }
  }

  async updateUnique(
    id: Pick<Loan, 'id'>,
    data: Partial<UpdateModelType>
  ): ResponsePayload<Loan> {
    try {
      const item = await this.repo.update_unique_record_by_id(id, data);
      return createSuccessPayload<Loan>(item);
    } catch (error) {
      return createErrorPayload<Loan>(error);
    }
  }

  async deleteUnique(id: Pick<Loan, 'id'>): ResponsePayload<Loan> {
    try {
      const item = await this.repo.delete_unique_record_by_id(id);
      return createSuccessPayload<Loan>(item);
    } catch (error) {
      return createErrorPayload<Loan>(error);
    }
  }

  async deleteMany(where: Partial<Loan>): ResponsePayload<Loan> {
    try {
      const { count } = await this.repo.delete_many_records_where(where);
      return {
        success: true,
        data: undefined,
        error: undefined,
        count: count,
      };
    } catch (error) {
      return createErrorPayload<Loan>(error);
    }
  }

  async count(where: Partial<Loan>): ResponsePayload<Loan> {
    try {
      const count = await this.repo.count_records_where(where);
      return {
        success: true,
        count: count,
        error: undefined,
        data: undefined,
      };
    } catch (error) {
      return createErrorPayload<Loan>(error);
    }
  }
}

export default LoanService;
