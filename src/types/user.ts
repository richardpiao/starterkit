/**
 * User entity
 */
export interface IUser {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Type alias for backward compatibility
 */
export type User = IUser;

/**
 * User profile (extended user data)
 */
export interface IUserProfile extends IUser {
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
}

/**
 * User settings
 */
export interface IUserSettings {
  userId: string;
  theme: "light" | "dark" | "system";
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
  privacy: {
    profileVisible: boolean;
    activityVisible: boolean;
  };
}

/**
 * User role
 */
export type UserRole = "user" | "admin" | "moderator";

/**
 * User with role
 */
export interface IUserWithRole extends IUser {
  role: UserRole;
}

/**
 * User creation input
 */
export interface ICreateUserInput {
  email: string;
  name: string;
  password: string;
}

/**
 * User update input
 */
export interface IUpdateUserInput {
  name?: string;
  email?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
}
