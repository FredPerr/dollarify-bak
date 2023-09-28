import PrismaRepository, { BatchPayload } from '../PrismaRepository';
import type { PrismaClient, Scenario } from '@prisma/client';
import { ScenarioManagerType, prisma } from '..';

type ScenarioCreateType = Omit<Scenario, 'id'>;
type ScenarioUpdateType = Omit<Scenario, 'id'>;

export default class ScenarioRepository
  implements
    PrismaRepository<
      Scenario,
      ScenarioManagerType,
      ScenarioCreateType,
      ScenarioUpdateType
    >
{
  readonly prisma: PrismaClient;
  readonly manager: ScenarioManagerType;

  constructor(manager: ScenarioManagerType) {
    this.manager = manager;
    this.prisma = prisma;
  }

  create_record(data: ScenarioCreateType): Promise<Scenario> {
    return this.manager.create({
      data: data,
    });
  }

  create_records(data_list: ScenarioCreateType[]): Promise<Scenario[]> {
    const items = data_list.map((item) =>
      this.manager.create({
        data: item,
      })
    );
    return this.prisma.$transaction(items);
  }

  find_unique_record_by_id(id: Pick<Scenario, 'id'>): Promise<Scenario> {
    return this.manager.findUniqueOrThrow({
      where: {
        id: id.id,
      },
    });
  }

  find_first_record_where(where: Partial<Scenario>): Promise<Scenario> {
    return this.manager.findFirstOrThrow({
      where: where,
    });
  }

  find_many_records_where(where: Partial<Scenario>): Promise<Scenario[]> {
    return this.manager.findMany({ where: where });
  }

  delete_unique_record_by_id(id: Pick<Scenario, 'id'>): Promise<Scenario> {
    return this.manager.delete({
      where: {
        id: id.id,
      },
    });
  }

  delete_many_records_where(where: Partial<Scenario>): Promise<BatchPayload> {
    return this.manager.deleteMany({
      where: where,
    });
  }

  update_unique_record_by_id(
    id: Pick<Scenario, 'id'>,
    data: Partial<ScenarioUpdateType>
  ): Promise<Scenario> {
    return this.manager.update({
      where: {
        id: id.id,
      },
      data: data,
    });
  }

  update_many_records_where(
    where: Partial<Scenario>,
    data: Partial<ScenarioUpdateType>
  ): Promise<BatchPayload> {
    return this.manager.updateMany({
      where: where,
      data: data,
    });
  }

  count_records_where(where: Partial<Scenario>): Promise<number> {
    return this.manager.count({
      where: where,
    });
  }
}
