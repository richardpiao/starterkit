import type { User } from "@/types/user";

interface ILoginResponse {
  user: User;
  token: string;
}

interface IAuthService {
  login: (email: string, password: string) => Promise<ILoginResponse>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<User | null>;
}

const API_BASE = "/api/auth";

async function login(email: string, password: string): Promise<ILoginResponse> {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error: unknown = await response.json();
    const message =
      typeof error === "object" &&
      error !== null &&
      "error" in error &&
      typeof error.error === "string"
        ? error.error
        : "Login failed";
    throw new Error(message);
  }

  const data: unknown = await response.json();

  // Type guard for response
  if (
    typeof data !== "object" ||
    data === null ||
    !("user" in data) ||
    !("token" in data)
  ) {
    throw new Error("Invalid response format");
  }

  return data as ILoginResponse;
}

async function logout(): Promise<void> {
  const response = await fetch(API_BASE, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }
}

async function getCurrentUser(): Promise<User | null> {
  try {
    const response = await fetch(`${API_BASE}/me`, {
      method: "GET",
    });

    if (!response.ok) {
      return null;
    }

    const data: unknown = await response.json();

    if (typeof data !== "object" || data === null || !("user" in data)) {
      return null;
    }

    return data.user as User;
  } catch {
    return null;
  }
}

export const authService: IAuthService = {
  login,
  logout,
  getCurrentUser,
};

export type { ILoginResponse, IAuthService };
