import { z } from "zod";

/**
 * Environment variable schema
 *
 * This provides type-safe access to environment variables
 * and validates them at build/runtime
 */
const envSchema = z.object({
  // Node environment
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  // App
  PUBLIC_APP_URL: z.string().url().optional(),

  // Firebase Client (public)
  PUBLIC_FIREBASE_API_KEY: z.string().default(""),
  PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().default(""),
  PUBLIC_FIREBASE_PROJECT_ID: z.string().default(""),
  PUBLIC_FIREBASE_STORAGE_BUCKET: z.string().default(""),
  PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string().default(""),
  PUBLIC_FIREBASE_APP_ID: z.string().default(""),
  PUBLIC_FIREBASE_MEASUREMENT_ID: z.string().default(""),

  // Firebase Admin (server-only)
  FIREBASE_PROJECT_ID: z.string().default(""),
  FIREBASE_CLIENT_EMAIL: z.string().default(""),
  FIREBASE_PRIVATE_KEY: z.string().default(""),

  // Firebase Emulator
  FIREBASE_EMULATOR: z.string().optional(),
});

type Env = z.infer<typeof envSchema>;

/**
 * Parse and validate environment variables
 */
function parseEnv(): Env {
  const parsed = envSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    PUBLIC_APP_URL: process.env["PUBLIC_APP_URL"],
    PUBLIC_FIREBASE_API_KEY: process.env["PUBLIC_FIREBASE_API_KEY"],
    PUBLIC_FIREBASE_AUTH_DOMAIN: process.env["PUBLIC_FIREBASE_AUTH_DOMAIN"],
    PUBLIC_FIREBASE_PROJECT_ID: process.env["PUBLIC_FIREBASE_PROJECT_ID"],
    PUBLIC_FIREBASE_STORAGE_BUCKET: process.env["PUBLIC_FIREBASE_STORAGE_BUCKET"],
    PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
      process.env["PUBLIC_FIREBASE_MESSAGING_SENDER_ID"],
    PUBLIC_FIREBASE_APP_ID: process.env["PUBLIC_FIREBASE_APP_ID"],
    PUBLIC_FIREBASE_MEASUREMENT_ID:
      process.env["PUBLIC_FIREBASE_MEASUREMENT_ID"],
    FIREBASE_PROJECT_ID: process.env["FIREBASE_PROJECT_ID"],
    FIREBASE_CLIENT_EMAIL: process.env["FIREBASE_CLIENT_EMAIL"],
    FIREBASE_PRIVATE_KEY: process.env["FIREBASE_PRIVATE_KEY"],
    FIREBASE_EMULATOR: process.env["FIREBASE_EMULATOR"],
  });

  if (!parsed.success) {
    console.error(
      "Invalid environment variables:",
      JSON.stringify(parsed.error.format(), null, 2)
    );
    throw new Error("Invalid environment variables");
  }

  return parsed.data;
}

export const env = parseEnv();

/**
 * Type-safe environment checks
 */
export const isDevelopment = env.NODE_ENV === "development";
export const isProduction = env.NODE_ENV === "production";
export const isTest = env.NODE_ENV === "test";

export type { Env };
