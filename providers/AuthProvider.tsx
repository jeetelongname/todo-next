"use client";

import { useAuth } from "@/hooks/useAuth/useAuth";
import { useContext } from "react";
import { createContext } from "react";

export const AuthContext = createContext<
    ReturnType<typeof useAuth> | null
>(null);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthContext must be used within AuthProvider");
  return context;
}
