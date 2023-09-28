import PrismaRepository, { BatchPayload } from '../PrismaRepository';
import type { PrismaClient, Cash } from '@prisma/client';
import { CashManagerType, prisma } from '..';

type CashCreateType = Omit<Cash, 'id'>;
type CashUpdateType = Omit<Cash, 'id'>;

export default class CashRepository
  implements
    PrismaRepository<Cash, CashManagerType, CashCreateType, CashUpdateType>
{
  readonly prisma: PrismaClient;
  readonly manager: CashManagerType;

  constructor(manager: CashManagerType) {
    this.manager = manager;
    this.prisma = prisma;
  }

  create_record(data: CashCreateType): Promise<Cash> {
    return this.manager.create({
      data: data,
    });
  }

  create_records(data_list: CashCreateType[]): Promise<Cash[]> {
    const items = data_list.map((item) =>
      this.manager.create({
        data: item,
      })
    );
    return this.prisma.$transaction(items);
  }

  find_unique_record_by_id(id: Pick<Cash, 'id'>): Promise<Cash> {
    return this.manager.findUniqueOrThrow({
      where: {
        id: id.id,
      },
    });
  }

  find_first_record_where(where: Partial<Cash>): Promise<Cash> {
    return this.manager.findFirstOrThrow({
      where: where,
    });
  }

  find_many_records_where(where: Partial<Cash>): Promise<Cash[]> {
    return this.manager.findMany({ where: where });
  }

  delete_unique_record_by_id(id: Pick<Cash, 'id'>): Promise<Cash> {
    return this.manager.delete({
      where: {
        id: id.id,
      },
    });
  }

  delete_many_records_where(where: Partial<Cash>): Promise<BatchPayload> {
    return this.manager.deleteMany({
      where: where,
    });
  }

  update_unique_record_by_id(
    id: Pick<Cash, 'id'>,
    data: Partial<CashUpdateType>
  ): Promise<Cash> {
    return this.manager.update({
      where: {
        id: id.id,
      },
      data: data,
    });
  }

  update_many_records_where(
    where: Partial<Cash>,
    data: Partial<CashUpdateType>
  ): Promise<BatchPayload> {
    return this.manager.updateMany({
      where: where,
      data: data,
    });
  }

  count_records_where(where: Partial<Cash>): Promise<number> {
    return this.manager.count({
      where: where,
    });
  }
}
