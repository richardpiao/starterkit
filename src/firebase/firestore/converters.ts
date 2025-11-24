import type { User } from "@/types/user";

import type {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  Timestamp,
} from "firebase/firestore";


/**
 * Helper to convert Firestore Timestamp to Date
 */
function timestampToDate(timestamp: Timestamp | Date): Date {
  if (timestamp instanceof Date) {
    return timestamp;
  }
  return timestamp.toDate();
}

/**
 * User document converter
 */
export const userConverter: FirestoreDataConverter<User> = {
  toFirestore(user: User): DocumentData {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  },

  fromFirestore(snapshot: QueryDocumentSnapshot): User {
    const data = snapshot.data();

    return {
      id: snapshot.id,
      email: data["email"] as string,
      name: data["name"] as string,
      createdAt: timestampToDate(data["createdAt"] as Timestamp),
      updatedAt: timestampToDate(data["updatedAt"] as Timestamp),
    };
  },
};

/**
 * Generic converter factory for simple documents
 */
export function createConverter<T extends { id: string }>(): FirestoreDataConverter<T> {
  return {
    toFirestore(data: T): DocumentData {
      const { id: _id, ...rest } = data;
      return rest;
    },

    fromFirestore(snapshot: QueryDocumentSnapshot): T {
      const data = snapshot.data();
      return {
        id: snapshot.id,
        ...data,
      } as T;
    },
  };
}
