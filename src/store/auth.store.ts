import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { User } from "@/types/user";

interface IAuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface IAuthActions {
  setUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
  logout: () => void;
  reset: () => void;
}

type AuthStore = IAuthState & IAuthActions;

const initialState: IAuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,

      setUser: (user: User | null) => {
        set({
          user,
          isAuthenticated: user !== null,
          isLoading: false,
        });
      },

      setLoading: (isLoading: boolean) => {
        set({ isLoading });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      reset: () => {
        set(initialState);
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

/**
 * Selector hooks for better performance
 */
export const useUser = (): User | null => useAuthStore((state) => state.user);

export const useIsAuthenticated = (): boolean =>
  useAuthStore((state) => state.isAuthenticated);

export const useIsAuthLoading = (): boolean =>
  useAuthStore((state) => state.isLoading);

export type { IAuthState, IAuthActions, AuthStore };
