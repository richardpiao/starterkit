import type { User } from "@/types/user";

import { AuthenticationError } from "../utils/errors";

/**
 * Get the currently authenticated user from a session token
 */
export async function getSessionUser(
  sessionToken: string | undefined
): Promise<User> {
  if (sessionToken === undefined || sessionToken.length === 0) {
    throw new AuthenticationError("No session token provided");
  }

  const session = await Promise.resolve(findSessionByToken(sessionToken));

  if (session === null) {
    throw new AuthenticationError("Invalid or expired session");
  }

  if (new Date() > session.expiresAt) {
    throw new AuthenticationError("Session has expired");
  }

  const user = findUserById(session.userId);

  if (user === null) {
    throw new AuthenticationError("User not found");
  }

  return user;
}

/**
 * Optionally get the current user (returns null if not authenticated)
 */
export async function getOptionalSessionUser(
  sessionToken: string | undefined
): Promise<User | null> {
  if (sessionToken === undefined || sessionToken.length === 0) {
    return null;
  }

  try {
    return await getSessionUser(sessionToken);
  } catch {
    return null;
  }
}

// Placeholder functions - implement with your database
function findSessionByToken(
  token: string
): { userId: string; expiresAt: Date } | null {
  // TODO: Implement session lookup
  void token;
  return null;
}

function findUserById(userId: string): User | null {
  // TODO: Implement user lookup
  void userId;
  return null;
}
