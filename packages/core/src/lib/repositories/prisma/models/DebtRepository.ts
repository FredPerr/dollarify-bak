import PrismaRepository, { BatchPayload } from '../PrismaRepository';
import type { PrismaClient, Debt } from '@prisma/client';
import { DebtManagerType, prisma } from '..';

type DebtCreateType = Omit<Debt, 'id'>;
type DebtUpdateType = Omit<Debt, 'id'>;

export default class DebtRepository
  implements
    PrismaRepository<Debt, DebtManagerType, DebtCreateType, DebtUpdateType>
{
  readonly prisma: PrismaClient;
  readonly manager: DebtManagerType;

  constructor(manager: DebtManagerType) {
    this.manager = manager;
    this.prisma = prisma;
  }

  create_record(data: DebtCreateType): Promise<Debt> {
    return this.manager.create({
      data: data,
    });
  }

  create_records(data_list: DebtCreateType[]): Promise<Debt[]> {
    const items = data_list.map((item) =>
      this.manager.create({
        data: item,
      })
    );
    return this.prisma.$transaction(items);
  }

  find_unique_record_by_id(id: Pick<Debt, 'id'>): Promise<Debt> {
    return this.manager.findUniqueOrThrow({
      where: {
        id: id.id,
      },
    });
  }

  find_first_record_where(where: Partial<Debt>): Promise<Debt> {
    return this.manager.findFirstOrThrow({
      where: where,
    });
  }

  find_many_records_where(where: Partial<Debt>): Promise<Debt[]> {
    return this.manager.findMany({ where: where });
  }

  delete_unique_record_by_id(id: Pick<Debt, 'id'>): Promise<Debt> {
    return this.manager.delete({
      where: {
        id: id.id,
      },
    });
  }

  delete_many_records_where(where: Partial<Debt>): Promise<BatchPayload> {
    return this.manager.deleteMany({
      where: where,
    });
  }

  update_unique_record_by_id(
    id: Pick<Debt, 'id'>,
    data: Partial<DebtUpdateType>
  ): Promise<Debt> {
    return this.manager.update({
      where: {
        id: id.id,
      },
      data: data,
    });
  }

  update_many_records_where(
    where: Partial<Debt>,
    data: Partial<DebtUpdateType>
  ): Promise<BatchPayload> {
    return this.manager.updateMany({
      where: where,
      data: data,
    });
  }

  count_records_where(where: Partial<Debt>): Promise<number> {
    return this.manager.count({
      where: where,
    });
  }
}
