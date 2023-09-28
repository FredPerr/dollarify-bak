import type { ManagerType } from '.';

export type BatchPayload = {
  count: number;
};

/**
 * Prisma Repository where the ID field of the model is 'id' -> a string or a number.
 *
 * @param Model The model generated in PrismaClient from "@prisma/client".
 * @param ModelManager The model manager of the model (e.g.: typeof prisma.[model name])
 */
export default interface PrismaRepository<
  Model extends { id: string | number | bigint },
  ModelManager extends ManagerType,
  ModelCreate = 'id' extends keyof Model ? Omit<Model, 'id'> : Model,
  ModelUpdate = Omit<Model, 'id'>,
  ModelId = Pick<Model, 'id'>
> {
  /**
   * The model manager for the model
   */
  readonly manager: ModelManager;

  /**
   * Create a record.
   *
   *  id is optional, it will use prisma cuid() function to generate one if not provided (recommended).
   *
   *  @returns record created (promise).
   */
  create_record(data: ModelCreate): Promise<Model>;

  /**
   * Create many records.
   *
   *  id is optional, it will use prisma cuid() function to generate one if not provided (recommended).
   *
   *  If one of the item in the data list fails to create, all the other items will roll back and cancel creation.
   *  The order of the item in data list are important
   *
   *  @returns the users list created (promise).
   */
  create_records(data_list: ModelCreate[]): Promise<Model[]>;

  /**
   * Find an record by its id.
   *
   * @param id The string or number id of the model.
   *
   * @throws NotFoundError if the record can't be found using the provided id.
   * @returns record found (promise).
   */
  find_unique_record_by_id(id: ModelId): Promise<Model>;

  /**
   * @see PrismaRepository#find_unique_record_by_id
   */
  find_first_record_where(where: Partial<Model>): Promise<Model>;

  /**
   * @see PrismaRepository#find_first_record_where
   */
  find_many_records_where(where: Partial<Model>): Promise<Model[]>;

  /**
   * Update record by using its id.
   *
   * @returns the updated record object.
   * @throws RecordNotFound if the record can't be found using the provided id (promise).
   *
   */
  update_unique_record_by_id(
    id: ModelId,
    data: Partial<ModelUpdate>
  ): Promise<Model>;

  /**
   * Update many records where.
   *
   * @returns the BatchPayload (number of records updated).
   */
  update_many_records_where(
    where: Partial<Model>,
    data: Partial<ModelUpdate>
  ): Promise<BatchPayload>;

  /**
   * Delete a record using its id.
   *
   * @throws RecordNotFound if the record can't be found using the provided id.
   * @returns the record that was deleted (promise).
   */
  delete_unique_record_by_id(id: ModelId): Promise<Model>;

  /**
   * Delete many records where.
   *
   * @returns The number of items deleted: BatchPayload (promise). 0 if no items deleted or error if failure during the process.
   */
  delete_many_records_where(where: Partial<Model>): Promise<BatchPayload>;

  /**
   * Count the number of records that fits 'where'.
   *
   * @returns Batch payload of the number of records.
   */
  count_records_where(where: Partial<Model>): Promise<number>;
}
