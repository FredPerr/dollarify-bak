import { Account, User } from '@prisma/client';
import Service, { ResponsePayload } from '../Service';
import UserRepository from '../../repositories/prisma/models/UserRepository';
import { createErrorPayload, createSuccessPayload } from '../Payload';
import AccountRepository from '../../repositories/prisma/models/AccountRepository';

type CreateModelType = Omit<User, 'id'>;
type UpdateModelType = Omit<User, 'id' | 'created_on'>;

class UserService implements Service<User, CreateModelType, UpdateModelType> {
  constructor(
    private user_repo: UserRepository,
    private account_repo: AccountRepository
  ) {}

  async getAccountFromUser(
    user_id: Pick<User, 'id'>
  ): ResponsePayload<Account> {
    try {
      const item = await this.account_repo.find_first_record_where({
        userId: user_id.id,
      });
      return createSuccessPayload<Account>(item);
    } catch (error) {
      return createErrorPayload<Account>(error);
    }
  }

  async getAccountFromId(
    account_id: Pick<Account, 'id'>
  ): ResponsePayload<Account> {
    try {
      const item = await this.account_repo.find_unique_record_by_id(account_id);
      return createSuccessPayload<Account>(item);
    } catch (error) {
      return createErrorPayload<Account>(error);
    }
  }

  async getUserFromAccount(account: Account): ResponsePayload<User> {
    try {
      const item = await this.user_repo.find_unique_record_by_id({
        id: account.userId,
      });
      return createSuccessPayload<User>(item);
    } catch (error) {
      return createErrorPayload<User>(error);
    }
  }

  async findUnique(id: Pick<User, 'id'>): ResponsePayload<User> {
    try {
      const item = await this.user_repo.find_unique_record_by_id(id);
      if (item == null) throw new Error('The model found (findUnique is null');
      return createSuccessPayload<User>(item);
    } catch (error) {
      return createErrorPayload<User>(error);
    }
  }

  async findFirst(where: Partial<User>) {
    try {
      const item = await this.user_repo.find_first_record_where(where);
      if (item == null) throw new Error('The model found (findFirst) is null');
      return createSuccessPayload<User>(item);
    } catch (error) {
      return createErrorPayload<User>(error);
    }
  }

  async findMany(where: Partial<User>): ResponsePayload<User> {
    try {
      const items = await this.user_repo.find_many_records_where(where);
      return createSuccessPayload<User>(items);
    } catch (error) {
      return createErrorPayload<User>(error);
    }
  }

  async createOne(data: CreateModelType): ResponsePayload<User> {
    try {
      const user = await this.user_repo.create_record(data);
      if (user == null)
        throw new Error('Could not create the user; item is null.');
      const account = await this.account_repo.create_record({
        userId: user.id,
      });
      if (account == null)
        throw new Error('Could not create the account; item is null.');
      return createSuccessPayload<User>(user);
    } catch (error) {
      return createErrorPayload<User>(error);
    }
  }

  async createMany(data_list: CreateModelType[]): ResponsePayload<User> {
    try {
      if (data_list.length == 0)
        throw new Error('No model were provided to the create many function');

      const records = await this.user_repo.create_records(data_list);
      if (records.length == 0)
        throw new Error(
          'Could not create any record with the create many function'
        );

      return createSuccessPayload<User>(records);
    } catch (error) {
      return createErrorPayload<User>(error);
    }
  }

  async updateMany(
    where: Partial<User>,
    data: Partial<UpdateModelType>
  ): ResponsePayload<User> {
    try {
      const { count } = await this.user_repo.update_many_records_where(
        where,
        data
      );
      return {
        success: true,
        data: undefined,
        error: undefined,
        count: count,
      };
    } catch (error) {
      return createErrorPayload<User>(error);
    }
  }

  async updateUnique(
    id: Pick<User, 'id'>,
    data: Partial<UpdateModelType>
  ): ResponsePayload<User> {
    try {
      const item = await this.user_repo.update_unique_record_by_id(id, data);
      return createSuccessPayload<User>(item);
    } catch (error) {
      return createErrorPayload<User>(error);
    }
  }

  async deleteUnique(id: Pick<User, 'id'>): ResponsePayload<User> {
    try {
      const item = await this.user_repo.delete_unique_record_by_id(id);
      return createSuccessPayload<User>(item);
    } catch (error) {
      return createErrorPayload<User>(error);
    }
  }

  async deleteMany(where: Partial<User>): ResponsePayload<User> {
    try {
      const { count } = await this.user_repo.delete_many_records_where(where);
      return {
        success: true,
        data: undefined,
        error: undefined,
        count: count,
      };
    } catch (error) {
      return createErrorPayload<User>(error);
    }
  }

  async count(where: Partial<User>): ResponsePayload<User> {
    try {
      const count = await this.user_repo.count_records_where(where);
      return {
        success: true,
        count: count,
        error: undefined,
        data: undefined,
      };
    } catch (error) {
      return createErrorPayload<User>(error);
    }
  }
}

export default UserService;
