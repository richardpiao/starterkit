import { z } from "zod";

import type { User } from "@/types/user";

import { NotFoundError } from "../utils/errors";
import { validate, schemas } from "../utils/validate";

const updateUserSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  email: schemas.email.optional(),
});

type UpdateUserInput = z.infer<typeof updateUserSchema>;

/**
 * Update a user's profile
 */
export async function updateUser(
  userId: string,
  input: unknown
): Promise<User> {
  const validatedId = validate(schemas.uuid, userId);
  const data = validate(updateUserSchema, input);

  // Check if user exists
  const existingUser = findUserById(validatedId);

  if (existingUser === null) {
    throw new NotFoundError("User not found", "user");
  }

  // Update user
  const updatedUser = await Promise.resolve(updateUserInDb(validatedId, data));

  if (updatedUser === null) {
    throw new NotFoundError("Failed to update user", "user");
  }

  return updatedUser;
}

// Placeholder functions - implement with your database
function findUserById(userId: string): User | null {
  // TODO: Implement database query
  void userId;
  return null;
}

function updateUserInDb(userId: string, data: UpdateUserInput): User | null {
  // TODO: Implement database update
  void userId;
  void data;
  return null;
}

export type { UpdateUserInput };
