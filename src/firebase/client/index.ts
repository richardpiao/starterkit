import { getApp, getApps, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";

import {
  emulatorConfig,
  firebaseConfig,
  isEmulatorMode,
} from "../config/firebase.config";

/**
 * Initialize Firebase client app
 * Uses singleton pattern to prevent multiple initializations
 */
function initializeFirebaseClient(): ReturnType<typeof initializeApp> {
  if (getApps().length > 0) {
    return getApp();
  }

  // Skip initialization if credentials are not configured
  if (firebaseConfig.apiKey.length === 0) {
    throw new Error(
      "Firebase client credentials not configured. Please set PUBLIC_FIREBASE_API_KEY environment variable."
    );
  }

  const app = initializeApp(firebaseConfig);

  // Connect to emulators in development
  if (isEmulatorMode()) {
    connectToEmulators();
  }

  return app;
}

/**
 * Connect to Firebase emulators
 */
function connectToEmulators(): void {
  const auth = getAuth();
  const firestore = getFirestore();
  const storage = getStorage();

  connectAuthEmulator(
    auth,
    `http://${emulatorConfig.auth.host}:${emulatorConfig.auth.port.toString()}`,
    { disableWarnings: true }
  );

  connectFirestoreEmulator(
    firestore,
    emulatorConfig.firestore.host,
    emulatorConfig.firestore.port
  );

  connectStorageEmulator(
    storage,
    emulatorConfig.storage.host,
    emulatorConfig.storage.port
  );
}

// Initialize the app
const app = initializeFirebaseClient();

// Export initialized services
export const firebaseApp = app;
export const firebaseAuth = getAuth(app);
export const firebaseDb = getFirestore(app);
export const firebaseStorage = getStorage(app);
