import PrismaRepository, { BatchPayload } from '../PrismaRepository';
import type { PrismaClient, Account } from '@prisma/client';
import { AccountManagerType, prisma } from '..';

type AccountCreateType = Omit<Account, 'id'>;
type AccountUpdateType = Omit<Account, 'id'>;

export default class AccountRepository
  implements
    PrismaRepository<
      Account,
      AccountManagerType,
      AccountCreateType,
      AccountUpdateType
    >
{
  readonly prisma: PrismaClient;
  readonly manager: AccountManagerType;

  constructor(manager: AccountManagerType) {
    this.manager = manager;
    this.prisma = prisma;
  }

  create_record(data: AccountCreateType): Promise<Account> {
    return this.manager.create({
      data: data,
    });
  }

  create_records(data_list: AccountCreateType[]): Promise<Account[]> {
    const items = data_list.map((item) =>
      this.manager.create({
        data: item,
      })
    );
    return this.prisma.$transaction(items);
  }

  find_unique_record_by_id(id: Pick<Account, 'id'>): Promise<Account> {
    return this.manager.findUniqueOrThrow({
      where: {
        id: id.id,
      },
    });
  }

  find_first_record_where(where: Partial<Account>): Promise<Account> {
    return this.manager.findFirstOrThrow({
      where: where,
    });
  }

  find_many_records_where(where: Partial<Account>): Promise<Account[]> {
    return this.manager.findMany({ where: where });
  }

  delete_unique_record_by_id(id: Pick<Account, 'id'>): Promise<Account> {
    return this.manager.delete({
      where: {
        id: id.id,
      },
    });
  }

  delete_many_records_where(where: Partial<Account>): Promise<BatchPayload> {
    return this.manager.deleteMany({
      where: where,
    });
  }

  update_unique_record_by_id(
    id: Pick<Account, 'id'>,
    data: Partial<AccountUpdateType>
  ): Promise<Account> {
    return this.manager.update({
      where: {
        id: id.id,
      },
      data: data,
    });
  }

  update_many_records_where(
    where: Partial<Account>,
    data: Partial<AccountUpdateType>
  ): Promise<BatchPayload> {
    return this.manager.updateMany({
      where: where,
      data: data,
    });
  }

  count_records_where(where: Partial<Account>): Promise<number> {
    return this.manager.count({
      where: where,
    });
  }
}
