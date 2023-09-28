export type Where<Model> = Partial<Model>;

/**
 * success: true if the operation did not fail (error = undefined).
 * count: the number of records successfully affected by the operations (default/error = 0, single row operation = 1, ...).
 * data: the data returned by the operation (error != undefined -> data = undefined).
 */
export type Payload<Model> = {
  success: boolean;
  error: string | undefined;
  count: number;
  data: Model | Model[] | undefined;
};

export type ResponsePayload<Model> = Promise<Payload<Model>>;

/**
 * Model: model handled by this service implementation (with unique id of string or integer) as the primary key.
 * CreateModelType: The model creation object used to created models.
 * UpdateModelType: The model update object used to update models.
 */
export default interface Service<
  Model extends { id: string | number | bigint },
  CreateModelType,
  UpdateModelType
> {
  /**
   * Create a model using a data object. ID is genereted automatically.
   *
   * @param data Model data for the creation of the model in the DB.
   * @returns payload with the newly created Model in data member.
   */
  createOne(data: CreateModelType): ResponsePayload<Model>;

  /**
   * Create many models using a list of data objects.
   *
   * @param data_list list of models for the creation of the model in the DB.
   * @returns payload with data = undefined and count = number of created records.
   */
  createMany(data_list: CreateModelType[]): ResponsePayload<Model>;

  /**
   * Find the first model matching the 'where' attributes.
   *
   * @returns payload with the model as the data; undefined if no model found.
   */
  findFirst(where: Where<Model>): ResponsePayload<Model>;

  /**
   * Find the unique model matching the 'where' attributes.
   *
   * @returns payload with the model as the data; undefined if no model found or if not unique.
   */
  findUnique(id: Pick<Model, 'id'>): ResponsePayload<Model>;

  /**
   * Find all the models matching 'where'.
   *
   * @returns payload with the Model list as the data; count = number of items in the list.
   */
  findMany(where: Where<Model>): ResponsePayload<Model>;

  /**
   * Update a unique model matching the 'id'.
   *
   * @returns payload with the updated Model as the data/undefined; count=1/0; error = string if many records matching 'where'.
   */
  updateUnique(
    id: Pick<Model, 'id'>,
    data: Partial<UpdateModelType>
  ): ResponsePayload<Model>;

  /**
   * Update many models matching the 'where'.
   *
   * @returns payload with the updated number of records as count (can be 0 without failure); data always undefined.
   */
  updateMany(
    where: Where<Model>,
    data: Partial<UpdateModelType>
  ): ResponsePayload<Model>;

  /**
   * Delete a single model, unique by its 'where' attributes.
   *
   * @returns payload with model deleted as the data if successfull. If model not unique, it fails.
   */
  deleteUnique(id: Pick<Model, 'id'>): ResponsePayload<Model>;

  /**
   * Delete many models where all 'where' conditions are met.
   *
   * @returns payload with the count of models deleted in the payload; data always undefined.
   */
  deleteMany(where: Where<Model>): ResponsePayload<Model>;

  /**
   * Count the number of models that fits the 'where' conditions
   *
   * @returns payload with the count of models that fits 'where'; data = undefined.
   */
  count(where: Where<Model>): ResponsePayload<Model>;
}
