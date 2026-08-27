"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { LoginCredentials, SessionPayload, UserRole } from "@/types/user";
import { hasPermission } from "@/config/roles";
import {
  clearSession,
  getSession,
  saveSession,
} from "@/lib/auth/session";
import { authService } from "@/services/auth.service";

type AuthContextValue = {
  user: SessionPayload | null;
  role: UserRole | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  can: (permission: string) => boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUser(getSession());
    setIsLoading(false);
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    const result = await authService.login(credentials);
    if (result.success && result.data) {
      saveSession(result.data);
      setUser(result.data);
      return { success: true };
    }
    return { success: false, message: result.message ?? "Login failed" };
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const can = useCallback(
    (permission: string) => {
      if (!user) return false;
      return hasPermission(user.role, permission);
    },
    [user]
  );

  const value = useMemo(
    () => ({
      user,
      role: user?.role ?? null,
      isLoading,
      isAuthenticated: !!user,
      login,
      logout,
      can,
    }),
    [user, isLoading, login, logout, can]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
