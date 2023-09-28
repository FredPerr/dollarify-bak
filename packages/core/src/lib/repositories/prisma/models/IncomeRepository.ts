import PrismaRepository, { BatchPayload } from '../PrismaRepository';
import type { PrismaClient, Income } from '@prisma/client';
import { IncomeManagerType, prisma } from '..';

type IncomeCreateType = Omit<Income, 'id'>;
type IncomeUpdateType = Omit<Income, 'id'>;

export default class IncomeRepository
  implements
    PrismaRepository<
      Income,
      IncomeManagerType,
      IncomeCreateType,
      IncomeUpdateType
    >
{
  readonly prisma: PrismaClient;
  readonly manager: IncomeManagerType;

  constructor(manager: IncomeManagerType) {
    this.manager = manager;
    this.prisma = prisma;
  }

  create_record(data: IncomeCreateType): Promise<Income> {
    return this.manager.create({
      data: data,
    });
  }

  create_records(data_list: IncomeCreateType[]): Promise<Income[]> {
    const items = data_list.map((item) =>
      this.manager.create({
        data: item,
      })
    );
    return this.prisma.$transaction(items);
  }

  find_unique_record_by_id(id: Pick<Income, 'id'>): Promise<Income> {
    return this.manager.findUniqueOrThrow({
      where: {
        id: id.id,
      },
    });
  }

  find_first_record_where(where: Partial<Income>): Promise<Income> {
    return this.manager.findFirstOrThrow({
      where: where,
    });
  }

  find_many_records_where(where: Partial<Income>): Promise<Income[]> {
    return this.manager.findMany({ where: where });
  }

  delete_unique_record_by_id(id: Pick<Income, 'id'>): Promise<Income> {
    return this.manager.delete({
      where: {
        id: id.id,
      },
    });
  }

  delete_many_records_where(where: Partial<Income>): Promise<BatchPayload> {
    return this.manager.deleteMany({
      where: where,
    });
  }

  update_unique_record_by_id(
    id: Pick<Income, 'id'>,
    data: Partial<IncomeUpdateType>
  ): Promise<Income> {
    return this.manager.update({
      where: {
        id: id.id,
      },
      data: data,
    });
  }

  update_many_records_where(
    where: Partial<Income>,
    data: Partial<IncomeUpdateType>
  ): Promise<BatchPayload> {
    return this.manager.updateMany({
      where: where,
      data: data,
    });
  }

  count_records_where(where: Partial<Income>): Promise<number> {
    return this.manager.count({
      where: where,
    });
  }
}
