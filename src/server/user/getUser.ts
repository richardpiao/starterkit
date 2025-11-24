import type { User } from "@/types/user";

import { NotFoundError } from "../utils/errors";
import { validate, schemas } from "../utils/validate";

/**
 * Get a user by their ID
 */
export async function getUser(userId: string): Promise<User> {
  const validatedId = validate(schemas.uuid, userId);

  const user = await Promise.resolve(findUserById(validatedId));

  if (user === null) {
    throw new NotFoundError("User not found", "user");
  }

  return user;
}

/**
 * Get a user by email
 */
export async function getUserByEmail(email: string): Promise<User> {
  const validatedEmail = validate(schemas.email, email);

  const user = await Promise.resolve(findUserByEmail(validatedEmail));

  if (user === null) {
    throw new NotFoundError("User not found", "user");
  }

  return user;
}

// Placeholder functions - implement with your database
function findUserById(userId: string): User | null {
  // TODO: Implement database query
  void userId;
  return null;
}

function findUserByEmail(email: string): User | null {
  // TODO: Implement database query
  void email;
  return null;
}
