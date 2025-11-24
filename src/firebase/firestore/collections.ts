/**
 * Firestore collection names
 * Centralized to avoid typos and enable easy renaming
 */
export const COLLECTIONS = {
  USERS: "users",
  SESSIONS: "sessions",
  PROFILES: "profiles",
  SUBSCRIPTIONS: "subscriptions",
  AUDIT_LOGS: "audit_logs",
} as const;

export type CollectionName = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];

/**
 * Firestore subcollection paths
 */
export const SUBCOLLECTIONS = {
  USER_SETTINGS: "settings",
  USER_NOTIFICATIONS: "notifications",
} as const;

export type SubcollectionName =
  (typeof SUBCOLLECTIONS)[keyof typeof SUBCOLLECTIONS];
