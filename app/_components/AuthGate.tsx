"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { clearSession, readSession, type AuthSession } from "../_lib/auth";

type AuthContextValue = {
  session: AuthSession;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextValue | null>(null);

export function useAuth() {
  const value = React.useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be used within <AuthGate />");
  }
  return value;
}

export function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = React.useState<AuthSession | null>(null);

  React.useEffect(() => {
    const s = readSession();
    if (!s) {
      router.replace("/");
      return;
    }
    setSession(s);
  }, [router, pathname]);

  const logout = React.useCallback(() => {
    clearSession();
    router.replace("/");
  }, [router]);

  if (!session) {
    return (
      <div className="min-h-screen px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="ms-glass shadow-glow rounded-[28px] p-8">
            <div className="text-xs font-semibold tracking-[0.35em] text-slate-600 dark:text-slate-400">
              AUTH
            </div>
            <div className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Verifying session…
            </div>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-accent/15">
              <div className="h-full w-1/2 animate-pulse rounded-full bg-accent/45" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ session, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
