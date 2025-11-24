/**
 * Custom application error class
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Validation error
 */
export class ValidationError extends AppError {
  public readonly field: string | undefined;

  constructor(message: string, field?: string) {
    super(message, 400);
    this.field = field;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

/**
 * Authentication error
 */
export class AuthenticationError extends AppError {
  constructor(message = "Authentication required") {
    super(message, 401);
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

/**
 * Authorization error
 */
export class AuthorizationError extends AppError {
  constructor(message = "Access denied") {
    super(message, 403);
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }
}

/**
 * Not found error
 */
export class NotFoundError extends AppError {
  public readonly resource: string | undefined;

  constructor(message = "Resource not found", resource?: string) {
    super(message, 404);
    this.resource = resource;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

/**
 * Conflict error (e.g., duplicate resource)
 */
export class ConflictError extends AppError {
  constructor(message = "Resource already exists") {
    super(message, 409);
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

/**
 * Rate limit error
 */
export class RateLimitError extends AppError {
  public readonly retryAfter: number | undefined;

  constructor(message = "Too many requests", retryAfter?: number) {
    super(message, 429);
    this.retryAfter = retryAfter;
    Object.setPrototypeOf(this, RateLimitError.prototype);
  }
}

/**
 * Type guard to check if error is an AppError
 */
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

/**
 * Type guard to check if error is operational (expected)
 */
export function isOperationalError(error: unknown): boolean {
  if (isAppError(error)) {
    return error.isOperational;
  }
  return false;
}
