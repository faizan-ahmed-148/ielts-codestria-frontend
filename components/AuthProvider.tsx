"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { ApiError, api, type User } from "@/lib/api";
import { track } from "@/lib/analytics";

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (u: User | null) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthState>({ user: null, loading: true, setUser: () => {}, logout: async () => {} });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    api<User>("/auth/me")
      .then((u) => {
        setUser(u);
        try {
          localStorage.setItem("ielts_current_user", JSON.stringify(u));
        } catch {}
      })
      .catch((err) => {
        // A 401/403 means the session is really gone (expired, or the account
        // was deleted). Never resurrect it from the local cache.
        if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
          try {
            localStorage.removeItem("ielts_current_user");
          } catch {}
          setUser(null);
          return;
        }
        // Offline/network failure only: keep the last known user.
        try {
          const stored = localStorage.getItem("ielts_current_user");
          if (stored) {
            setUser(JSON.parse(stored));
            return;
          }
        } catch {}
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const logout = useCallback(async () => {
    try {
      await api("/auth/logout", { method: "POST" });
    } catch {
      // offline fallback
    }
    track("logout");
    try {
      localStorage.removeItem("ielts_current_user");
    } catch {}
    setUser(null);
    router.push("/");
  }, [router]);

  return <AuthContext.Provider value={{ user, loading, setUser, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

/** Redirects to /login when there is no session. */
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (!loading && !user) router.replace(`/login?next=${encodeURIComponent(pathname)}`);
  }, [loading, user, router, pathname]);
  if (loading || !user) return <PageSpinner />;
  return <>{children}</>;
}

export function PageSpinner() {
  return (
    <div className="flex min-h-[60vh] flex-1 items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-100 border-t-brand-600" />
    </div>
  );
}
