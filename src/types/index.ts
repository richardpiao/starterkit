// User types
export type {
  User,
  IUserProfile,
  IUserSettings,
  UserRole,
  IUserWithRole,
  ICreateUserInput,
  IUpdateUserInput,
} from "./user";

// Auth types
export type {
  ILoginCredentials,
  IRegisterData,
  ISession,
  IAuthResult,
  IPasswordResetRequest,
  IPasswordResetConfirm,
  AuthProvider,
  IOAuthState,
} from "./auth";

/**
 * Generic API response
 */
export interface IApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Paginated response
 */
export interface IPaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

/**
 * Pagination params
 */
export interface IPaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

/**
 * Async state for data fetching
 */
export interface IAsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Make all properties optional recursively
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Make specific properties required
 */
export type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Extract keys of a certain type
 */
export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];
