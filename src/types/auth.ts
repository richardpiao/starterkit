import type { User } from "./user";

/**
 * Authentication credentials
 */
export interface ILoginCredentials {
  email: string;
  password: string;
}

/**
 * Registration data
 */
export interface IRegisterData extends ILoginCredentials {
  name: string;
  confirmPassword: string;
}

/**
 * Authentication session
 */
export interface ISession {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

/**
 * Authentication result
 */
export interface IAuthResult {
  user: User;
  session: ISession;
}

/**
 * Password reset request
 */
export interface IPasswordResetRequest {
  email: string;
}

/**
 * Password reset confirmation
 */
export interface IPasswordResetConfirm {
  token: string;
  password: string;
  confirmPassword: string;
}

/**
 * Auth provider types
 */
export type AuthProvider = "email" | "google" | "github" | "apple";

/**
 * OAuth state
 */
export interface IOAuthState {
  provider: AuthProvider;
  redirectUrl: string;
  state: string;
}
