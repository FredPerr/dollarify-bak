type ErrorWithMessage = {
  message: string;
};

export function is_error_with_message(
  error: unknown
): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}

export function to_error_with_message(maybeError: unknown): ErrorWithMessage {
  if (is_error_with_message(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError));
  }
}

export function get_error_message(error: unknown) {
  return to_error_with_message(error).message;
}

export function handle_error(error: unknown) {
  console.error(get_error_message(error));
}
