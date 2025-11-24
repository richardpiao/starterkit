import { z } from "zod";

import { ValidationError } from "./errors";

/**
 * Email validation schema
 */
export const emailSchema = z
  .string()
  .email("Invalid email address")
  .min(5, "Email must be at least 5 characters")
  .max(255, "Email must be less than 255 characters")
  .toLowerCase()
  .trim();

/**
 * Password validation schema
 */
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must be less than 128 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character"
  );

/**
 * UUID validation schema
 */
export const uuidSchema = z.string().uuid("Invalid UUID format");

/**
 * Validate data against a schema
 */
export function validate<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    const [firstError] = result.error.errors;
    const field = firstError?.path.join(".");
    const message = firstError?.message ?? "Validation failed";

    throw new ValidationError(message, field);
  }

  return result.data;
}

/**
 * Safe validation (returns result object instead of throwing)
 */
export function safeValidate<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: z.ZodError } {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  return { success: false, error: result.error };
}

/**
 * Common validation schemas
 */
export const schemas = {
  email: emailSchema,
  password: passwordSchema,
  uuid: uuidSchema,
  nonEmptyString: z.string().min(1, "This field is required"),
  positiveNumber: z.number().positive("Must be a positive number"),
  pagination: z.object({
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(20),
  }),
} as const;
