import { createHash, randomBytes, timingSafeEqual } from "crypto";

/**
 * Generate a random token
 */
export function generateToken(length = 32): string {
  return randomBytes(length).toString("hex");
}

/**
 * Hash a string using SHA-256
 */
export function hashString(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

/**
 * Securely compare two strings (timing-safe)
 */
export function secureCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);

  return timingSafeEqual(bufferA, bufferB);
}

/**
 * Generate a session ID
 */
export function generateSessionId(): string {
  return generateToken(48);
}

/**
 * Hash a token for storage (e.g., session tokens)
 */
export function hashToken(token: string): string {
  return hashString(token);
}
