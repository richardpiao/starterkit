/**
 * Server-side exports
 *
 * This module exports all server-side functions that can be used in:
 * - API routes
 * - Server Components
 * - Server Actions
 *
 * IMPORTANT: This code should never be imported in client components
 */

// Auth
export { login } from "./auth/login";
export { logout } from "./auth/logout";
export { getSessionUser, getOptionalSessionUser } from "./auth/getSessionUser";

// User
export { getUser, getUserByEmail } from "./user/getUser";
export { updateUser } from "./user/updateUser";

// Billing
export { createCheckoutSession } from "./billing/checkout";

// Utils
export {
  AppError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  isAppError,
  isOperationalError,
} from "./utils/errors";

export {
  generateToken,
  hashString,
  secureCompare,
  generateSessionId,
  hashToken,
} from "./utils/hash";

export {
  validate,
  safeValidate,
  schemas,
  emailSchema,
  passwordSchema,
  uuidSchema,
} from "./utils/validate";

// Types
export type { LoginInput, ILoginResult } from "./auth/login";
export type { ILogoutResult } from "./auth/logout";
export type { UpdateUserInput } from "./user/updateUser";
export type { CheckoutInput, ICheckoutSession } from "./billing/checkout";
