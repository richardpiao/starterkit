import { env } from "@/lib/env";

/**
 * Firebase configuration for client-side SDK
 */
export const firebaseConfig = {
  apiKey: env.PUBLIC_FIREBASE_API_KEY,
  authDomain: env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.PUBLIC_FIREBASE_APP_ID,
  measurementId: env.PUBLIC_FIREBASE_MEASUREMENT_ID,
} as const;

/**
 * Firebase Admin configuration (server-side only)
 */
export const firebaseAdminConfig = {
  projectId: env.FIREBASE_PROJECT_ID,
  clientEmail: env.FIREBASE_CLIENT_EMAIL,
  privateKey: env.FIREBASE_PRIVATE_KEY,
} as const;

/**
 * Check if running in emulator mode
 */
export function isEmulatorMode(): boolean {
  return env.FIREBASE_EMULATOR === "true";
}

/**
 * Emulator configuration
 */
export const emulatorConfig = {
  auth: {
    host: "localhost",
    port: 9099,
  },
  firestore: {
    host: "localhost",
    port: 8080,
  },
  storage: {
    host: "localhost",
    port: 9199,
  },
  functions: {
    host: "localhost",
    port: 5001,
  },
} as const;
