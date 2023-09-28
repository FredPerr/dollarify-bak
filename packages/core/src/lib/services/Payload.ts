import { get_error_message } from '../utils/ErrorHandling';

export type Payload<T> = {
  success: boolean;
  error: string | undefined;
  count: number;
  data: T | T[] | undefined;
};

export function createErrorPayload<T>(error: Error | string): Payload<T> {
  return {
    success: false,
    error: get_error_message(error),
    count: 0,
    data: undefined,
  };
}

export function createSuccessPayload<T>(data: T | T[] | undefined): Payload<T> {
  const payload: Payload<T> = {
    success: true,
    error: undefined,
    count: 1,
    data: data,
  };

  try {
    if (
      typeof data === 'undefined' ||
      Object.prototype.toString.call(data) != '[object Array]'
    )
      return payload;

    payload.count = (data as T[]).length;

    return payload;
  } catch (error) {
    console.error('Failure when checking payload count for array');
    return payload;
  }
}
