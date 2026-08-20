export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  UPSTREAM_TIMEOUT: 'UPSTREAM_TIMEOUT',
  UPSTREAM_UNAVAILABLE: 'UPSTREAM_UNAVAILABLE',
  UPSTREAM_INVALID_RESPONSE: 'UPSTREAM_INVALID_RESPONSE',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

export class AppError extends Error {
  readonly status: number;
  readonly code: ErrorCode;

  constructor(code: ErrorCode, status: number, message: string) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.status = status;
  }
}

export function validationError(message: string): AppError {
  return new AppError(ERROR_CODES.VALIDATION_ERROR, 400, message);
}

export function upstreamTimeout(): AppError {
  return new AppError(
    ERROR_CODES.UPSTREAM_TIMEOUT,
    504,
    'The writing service took too long to respond.',
  );
}

export function upstreamUnavailable(message?: string): AppError {
  return new AppError(
    ERROR_CODES.UPSTREAM_UNAVAILABLE,
    502,
    message ?? 'The writing service is temporarily unavailable.',
  );
}

export function upstreamInvalidResponse(): AppError {
  return new AppError(
    ERROR_CODES.UPSTREAM_INVALID_RESPONSE,
    502,
    'The writing service returned an unreadable result.',
  );
}
