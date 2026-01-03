import React, { createContext, useContext, useMemo, useState } from "react";

type LoginResult =
  | { success: true; user: AuthUser }
  | { success: false; message: string };

export interface AuthUser {
  name: string;
  email: string;
  major: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = async (email: string, password: string): Promise<LoginResult> => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Simple demo auth check. Swap with real API call when available.
    const isValidEmail = trimmedEmail === "user@mahasiswa.xyz.ac.id";
    const isValidPassword = trimmedPassword === "password123";

    if (isValidEmail && isValidPassword) {
      const authenticatedUser: AuthUser = {
        name: "Ismail Mail",
        email: trimmedEmail,
        major: "FTSL/Teknik Kelautan",
      };
      setUser(authenticatedUser);
      return { success: true, user: authenticatedUser };
    }

    return { success: false, message: "Email atau password salah. Coba lagi." };
  };

  const logout = () => setUser(null);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};
