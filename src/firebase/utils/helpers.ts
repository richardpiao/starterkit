import type { DocumentReference, DocumentSnapshot } from "firebase/firestore";

/**
 * Check if a document exists
 */
export function documentExists(snapshot: DocumentSnapshot): boolean {
  return snapshot.exists();
}

/**
 * Get document ID from reference
 */
export function getDocId(ref: DocumentReference): string {
  return ref.id;
}

/**
 * Generate a Firestore-safe ID from a string
 * Removes invalid characters and limits length
 */
export function sanitizeDocId(id: string): string {
  return id
    .replace(/[/\\#?[\]]/g, "_")
    .replace(/\.{2,}/g, "_")
    .slice(0, 1500);
}

/**
 * Create a batch of IDs for parallel fetching
 */
export function createIdBatches<T>(
  items: T[],
  batchSize = 10
): T[][] {
  const batches: T[][] = [];

  for (let i = 0; i < items.length; i += batchSize) {
    batches.push(items.slice(i, i + batchSize));
  }

  return batches;
}

/**
 * Firestore has a limit of 'in' queries to 30 items
 */
export const FIRESTORE_IN_LIMIT = 30;

/**
 * Maximum batch write size
 */
export const FIRESTORE_BATCH_LIMIT = 500;
