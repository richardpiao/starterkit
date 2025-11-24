import {
  cert,
  getApp,
  getApps,
  initializeApp,
  type ServiceAccount,
} from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

import { firebaseAdminConfig } from "../config/firebase.config";

/**
 * Initialize Firebase Admin SDK
 * Uses singleton pattern to prevent multiple initializations
 *
 * IMPORTANT: This should only be imported in server-side code
 */
function initializeFirebaseAdmin(): ReturnType<typeof initializeApp> {
  if (getApps().length > 0) {
    return getApp();
  }

  const { projectId, clientEmail, privateKey } = firebaseAdminConfig;

  // Skip initialization if credentials are not configured
  if (projectId.length === 0 || clientEmail.length === 0 || privateKey.length === 0) {
    throw new Error(
      "Firebase Admin credentials not configured. Please set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY environment variables."
    );
  }

  const serviceAccount: ServiceAccount = {
    projectId,
    clientEmail,
    privateKey: privateKey.replace(/\\n/g, "\n"),
  };

  return initializeApp({
    credential: cert(serviceAccount),
  });
}

// Initialize the admin app
const adminApp = initializeFirebaseAdmin();

// Export initialized admin services
export const adminAuth = getAuth(adminApp);
export const adminDb = getFirestore(adminApp);
export const adminStorage = getStorage(adminApp);
export { adminApp };
