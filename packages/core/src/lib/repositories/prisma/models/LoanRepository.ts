import PrismaRepository, { BatchPayload } from '../PrismaRepository';
import type { PrismaClient, Loan } from '@prisma/client';
import { LoanManagerType, prisma } from '..';

type LoanCreateType = Omit<Loan, 'id'>;
type LoanUpdateType = Omit<Loan, 'id'>;

export default class LoanRepository
  implements
    PrismaRepository<Loan, LoanManagerType, LoanCreateType, LoanUpdateType>
{
  readonly prisma: PrismaClient;
  readonly manager: LoanManagerType;

  constructor(manager: LoanManagerType) {
    this.manager = manager;
    this.prisma = prisma;
  }

  create_record(data: LoanCreateType): Promise<Loan> {
    return this.manager.create({
      data: data,
    });
  }

  create_records(data_list: LoanCreateType[]): Promise<Loan[]> {
    const items = data_list.map((item) =>
      this.manager.create({
        data: item,
      })
    );
    return this.prisma.$transaction(items);
  }

  find_unique_record_by_id(id: Pick<Loan, 'id'>): Promise<Loan> {
    return this.manager.findUniqueOrThrow({
      where: {
        id: id.id,
      },
    });
  }

  find_first_record_where(where: Partial<Loan>): Promise<Loan> {
    return this.manager.findFirstOrThrow({
      where: where,
    });
  }

  find_many_records_where(where: Partial<Loan>): Promise<Loan[]> {
    return this.manager.findMany({ where: where });
  }

  delete_unique_record_by_id(id: Pick<Loan, 'id'>): Promise<Loan> {
    return this.manager.delete({
      where: {
        id: id.id,
      },
    });
  }

  delete_many_records_where(where: Partial<Loan>): Promise<BatchPayload> {
    return this.manager.deleteMany({
      where: where,
    });
  }

  update_unique_record_by_id(
    id: Pick<Loan, 'id'>,
    data: Partial<LoanUpdateType>
  ): Promise<Loan> {
    return this.manager.update({
      where: {
        id: id.id,
      },
      data: data,
    });
  }

  update_many_records_where(
    where: Partial<Loan>,
    data: Partial<LoanUpdateType>
  ): Promise<BatchPayload> {
    return this.manager.updateMany({
      where: where,
      data: data,
    });
  }

  count_records_where(where: Partial<Loan>): Promise<number> {
    return this.manager.count({
      where: where,
    });
  }
}
