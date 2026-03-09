'use client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Api from "../lib/api";

interface AuthContextType {
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

interface LoginResponse {
  success?: boolean;
}

const ADMIN_SESSION_KEY = "isAdmin";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const readInitialAdminState = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    return sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
  } catch {
    return false;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(readInitialAdminState);

  useEffect(() => {
    try {
      sessionStorage.setItem(ADMIN_SESSION_KEY, String(isAdmin));
    } catch {
      // Ignore storage errors to avoid blocking auth flow in restricted browsers.
    }
  }, [isAdmin]);

  const login = useCallback(async (username: string, password: string) => {
    try {
      const { data } = await Api.post<LoginResponse>("/login", { username, password });
      const isAuthenticated = Boolean(data?.success);
      setIsAdmin(isAuthenticated);
      return isAuthenticated;
    } catch (error) {
      console.error("Login verification failed:", error);
      setIsAdmin(false);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setIsAdmin(false);
    try {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
    } catch {
      // Ignore storage errors to keep logout deterministic.
    }
  }, []);

  const contextValue = useMemo<AuthContextType>(
    () => ({ isAdmin, login, logout }),
    [isAdmin, login, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
