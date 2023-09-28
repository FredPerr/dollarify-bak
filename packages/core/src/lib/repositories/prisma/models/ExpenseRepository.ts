import PrismaRepository, { BatchPayload } from '../PrismaRepository';
import type { PrismaClient, Expense } from '@prisma/client';
import { ExpenseManagerType, prisma } from '..';

type ExpenseCreateType = Omit<Expense, 'id'>;
type ExpenseUpdateType = Omit<Expense, 'id'>;

export default class ExpenseRepository
  implements
    PrismaRepository<
      Expense,
      ExpenseManagerType,
      ExpenseCreateType,
      ExpenseUpdateType
    >
{
  readonly prisma: PrismaClient;
  readonly manager: ExpenseManagerType;

  constructor(manager: ExpenseManagerType) {
    this.manager = manager;
    this.prisma = prisma;
  }

  create_record(data: ExpenseCreateType): Promise<Expense> {
    return this.manager.create({
      data: data,
    });
  }

  create_records(data_list: ExpenseCreateType[]): Promise<Expense[]> {
    const items = data_list.map((item) =>
      this.manager.create({
        data: item,
      })
    );
    return this.prisma.$transaction(items);
  }

  find_unique_record_by_id(id: Pick<Expense, 'id'>): Promise<Expense> {
    return this.manager.findUniqueOrThrow({
      where: {
        id: id.id,
      },
    });
  }

  find_first_record_where(where: Partial<Expense>): Promise<Expense> {
    return this.manager.findFirstOrThrow({
      where: where,
    });
  }

  find_many_records_where(where: Partial<Expense>): Promise<Expense[]> {
    return this.manager.findMany({ where: where });
  }

  delete_unique_record_by_id(id: Pick<Expense, 'id'>): Promise<Expense> {
    return this.manager.delete({
      where: {
        id: id.id,
      },
    });
  }

  delete_many_records_where(where: Partial<Expense>): Promise<BatchPayload> {
    return this.manager.deleteMany({
      where: where,
    });
  }

  update_unique_record_by_id(
    id: Pick<Expense, 'id'>,
    data: Partial<ExpenseUpdateType>
  ): Promise<Expense> {
    return this.manager.update({
      where: {
        id: id.id,
      },
      data: data,
    });
  }

  update_many_records_where(
    where: Partial<Expense>,
    data: Partial<ExpenseUpdateType>
  ): Promise<BatchPayload> {
    return this.manager.updateMany({
      where: where,
      data: data,
    });
  }

  count_records_where(where: Partial<Expense>): Promise<number> {
    return this.manager.count({
      where: where,
    });
  }
}
