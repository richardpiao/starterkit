/**
 * Firebase Emulator setup utilities
 *
 * Use these utilities when running the Firebase emulator suite
 */

import { emulatorConfig, isEmulatorMode } from "../config/firebase.config";

interface IEmulatorStatus {
  auth: boolean;
  firestore: boolean;
  storage: boolean;
  functions: boolean;
}

/**
 * Check if emulators are running
 */
export async function checkEmulatorStatus(): Promise<IEmulatorStatus> {
  if (!isEmulatorMode()) {
    return {
      auth: false,
      firestore: false,
      storage: false,
      functions: false,
    };
  }

  const status: IEmulatorStatus = {
    auth: false,
    firestore: false,
    storage: false,
    functions: false,
  };

  const checks = [
    {
      name: "auth" as const,
      url: `http://${emulatorConfig.auth.host}:${emulatorConfig.auth.port.toString()}`,
    },
    {
      name: "firestore" as const,
      url: `http://${emulatorConfig.firestore.host}:${emulatorConfig.firestore.port.toString()}`,
    },
    {
      name: "storage" as const,
      url: `http://${emulatorConfig.storage.host}:${emulatorConfig.storage.port.toString()}`,
    },
    {
      name: "functions" as const,
      url: `http://${emulatorConfig.functions.host}:${emulatorConfig.functions.port.toString()}`,
    },
  ];

  await Promise.all(
    checks.map(async ({ name, url }) => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
          controller.abort();
        }, 1000);

        await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        status[name] = true;
      } catch {
        status[name] = false;
      }
    })
  );

  return status;
}

/**
 * Log emulator connection status
 */
export function logEmulatorConfig(): void {
  if (!isEmulatorMode()) {
    return;
  }

   
  console.warn("Firebase Emulator Mode Enabled");
   
  console.warn("Auth:", `${emulatorConfig.auth.host}:${emulatorConfig.auth.port.toString()}`);
   
  console.warn(
    "Firestore:",
    `${emulatorConfig.firestore.host}:${emulatorConfig.firestore.port.toString()}`
  );
   
  console.warn(
    "Storage:",
    `${emulatorConfig.storage.host}:${emulatorConfig.storage.port.toString()}`
  );
}

export type { IEmulatorStatus };
