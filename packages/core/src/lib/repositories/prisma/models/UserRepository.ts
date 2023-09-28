import PrismaRepository, { BatchPayload } from '../PrismaRepository';
import type { PrismaClient, User } from '@prisma/client';
import { UserManagerType, prisma } from '..';

type UserCreateType = Omit<User, 'id'>;
type UserUpdateType = Omit<User, 'id'>;

export default class UserRepository
  implements
    PrismaRepository<User, UserManagerType, UserCreateType, UserUpdateType>
{
  readonly prisma: PrismaClient;
  readonly manager: UserManagerType;

  constructor(manager: UserManagerType) {
    this.manager = manager;
    this.prisma = prisma;
  }

  create_record(data: UserCreateType): Promise<User> {
    return this.manager.create({
      data: data,
    });
  }

  create_records(data_list: UserCreateType[]): Promise<User[]> {
    const items = data_list.map((item) =>
      this.manager.create({
        data: item,
      })
    );
    return this.prisma.$transaction(items);
  }

  find_unique_record_by_id(id: Pick<User, 'id'>): Promise<User> {
    return this.manager.findUniqueOrThrow({
      where: {
        id: id.id,
      },
    });
  }

  find_first_record_where(where: Partial<User>): Promise<User> {
    return this.manager.findFirstOrThrow({
      where: where,
    });
  }

  find_many_records_where(where: Partial<User>): Promise<User[]> {
    return this.manager.findMany({ where: where });
  }

  delete_unique_record_by_id(id: Pick<User, 'id'>): Promise<User> {
    return this.manager.delete({
      where: {
        id: id.id,
      },
    });
  }

  delete_many_records_where(where: Partial<User>): Promise<BatchPayload> {
    return this.manager.deleteMany({
      where: where,
    });
  }

  update_unique_record_by_id(
    id: Pick<User, 'id'>,
    data: Partial<UserUpdateType>
  ): Promise<User> {
    return this.manager.update({
      where: {
        id: id.id,
      },
      data: data,
    });
  }

  update_many_records_where(
    where: Partial<User>,
    data: Partial<UserUpdateType>
  ): Promise<BatchPayload> {
    return this.manager.updateMany({
      where: where,
      data: data,
    });
  }

  count_records_where(where: Partial<User>): Promise<number> {
    return this.manager.count({
      where: where,
    });
  }
}
