import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { randomUUID } from 'node:crypto';
import type { ZodType } from 'zod';
import { AppError, ERROR_CODES, validationError } from './errors.js';
import type { ApiErrorBody } from './types/http.js';

export const attachRequestId: RequestHandler = (_req, res, next) => {
  const requestId = randomUUID();
  res.locals.requestId = requestId;
  res.setHeader('X-Request-Id', requestId);
  next();
};

export function validateBody<T>(schema: ZodType<T>): RequestHandler {
  return (req, _res, next) => {
    const parsed = schema.safeParse(req.body as unknown);
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? 'Invalid request body.';
      next(validationError(message));
      return;
    }
    req.body = parsed.data;
    next();
  };
}

export function readBody<T>(req: Request, schema: ZodType<T>): T {
  const parsed = schema.safeParse(req.body as unknown);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? 'Invalid request body.';
    throw validationError(message);
  }
  return parsed.data;
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response<ApiErrorBody>,
  _next: NextFunction,
): void {
  const requestId = res.locals.requestId || randomUUID();

  if (err instanceof AppError) {
    res.status(err.status).json({
      error: { code: err.code, message: err.message, requestId },
    });
    return;
  }

  if (err instanceof SyntaxError) {
    res.status(400).json({
      error: {
        code: ERROR_CODES.VALIDATION_ERROR,
        message: 'Request body must be valid JSON.',
        requestId,
      },
    });
    return;
  }

  console.error(`[${requestId}]`, err);
  res.status(500).json({
    error: {
      code: ERROR_CODES.INTERNAL_ERROR,
      message: 'Something went wrong.',
      requestId,
    },
  });
}
