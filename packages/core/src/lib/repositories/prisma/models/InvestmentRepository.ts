import PrismaRepository, { BatchPayload } from '../PrismaRepository';
import type { PrismaClient, Investment } from '@prisma/client';
import { InvestmentManagerType, prisma } from '..';

type InvestmentCreateType = Omit<Investment, 'id'>;
type InvestmentUpdateType = Omit<Investment, 'id'>;

export default class InvestmentRepository
  implements
    PrismaRepository<
      Investment,
      InvestmentManagerType,
      InvestmentCreateType,
      InvestmentUpdateType
    >
{
  readonly prisma: PrismaClient;
  readonly manager: InvestmentManagerType;

  constructor(manager: InvestmentManagerType) {
    this.manager = manager;
    this.prisma = prisma;
  }

  create_record(data: InvestmentCreateType): Promise<Investment> {
    return this.manager.create({
      data: data,
    });
  }

  create_records(data_list: InvestmentCreateType[]): Promise<Investment[]> {
    const items = data_list.map((item) =>
      this.manager.create({
        data: item,
      })
    );
    return this.prisma.$transaction(items);
  }

  find_unique_record_by_id(id: Pick<Investment, 'id'>): Promise<Investment> {
    return this.manager.findUniqueOrThrow({
      where: {
        id: id.id,
      },
    });
  }

  find_first_record_where(where: Partial<Investment>): Promise<Investment> {
    return this.manager.findFirstOrThrow({
      where: where,
    });
  }

  find_many_records_where(where: Partial<Investment>): Promise<Investment[]> {
    return this.manager.findMany({ where: where });
  }

  delete_unique_record_by_id(id: Pick<Investment, 'id'>): Promise<Investment> {
    return this.manager.delete({
      where: {
        id: id.id,
      },
    });
  }

  delete_many_records_where(where: Partial<Investment>): Promise<BatchPayload> {
    return this.manager.deleteMany({
      where: where,
    });
  }

  update_unique_record_by_id(
    id: Pick<Investment, 'id'>,
    data: Partial<InvestmentUpdateType>
  ): Promise<Investment> {
    return this.manager.update({
      where: {
        id: id.id,
      },
      data: data,
    });
  }

  update_many_records_where(
    where: Partial<Investment>,
    data: Partial<InvestmentUpdateType>
  ): Promise<BatchPayload> {
    return this.manager.updateMany({
      where: where,
      data: data,
    });
  }

  count_records_where(where: Partial<Investment>): Promise<number> {
    return this.manager.count({
      where: where,
    });
  }
}
