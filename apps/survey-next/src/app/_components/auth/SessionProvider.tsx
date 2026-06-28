"use client";

import { createContext, useCallback, useEffect, useState } from "react";
import { authFetch, AUTH_PATHS } from "./client";
import { SessionSchema, type User } from "./schema";

interface SessionContextValue {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  /** Re-fetch the session — call after login / logout / signup. */
  refresh: () => Promise<void>;
}

export const SessionContext = createContext<SessionContextValue>({
  user: null,
  isAuthenticated: false,
  loading: true,
  refresh: async () => {},
});

/**
 * Provides the current allauth session to the app.
 *
 * Fetches `GET /auth/session` on mount; anonymous responds 401, which is the
 * expected "not logged in" state rather than an error.
 */
export function SessionProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const result = await authFetch(AUTH_PATHS.session);
    const parsed = SessionSchema.safeParse(result.data);
    setUser(result.ok && parsed.success ? (parsed.data.user ?? null) : null);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <SessionContext.Provider
      value={{ user, isAuthenticated: !!user, loading, refresh }}
    >
      {children}
    </SessionContext.Provider>
  );
}
