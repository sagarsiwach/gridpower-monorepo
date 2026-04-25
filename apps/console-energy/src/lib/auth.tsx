import * as React from "react";

/**
 * Mock auth context. Real auth wiring is deferred to a later sub-issue.
 * For CON.1 the user is always authenticated by default. The login page
 * exists as a placeholder; CON.2 fills in the real flow.
 */

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: string;
}

interface AuthContextValue {
  isAuthenticated: boolean;
  user: AuthUser | null;
  signIn: (user?: Partial<AuthUser>) => void;
  signOut: () => void;
}

const DEFAULT_USER: AuthUser = {
  id: "mock-user-1",
  name: "Sagar Siwach",
  email: "sagar@gridpower.co.in",
  initials: "SS",
  role: "Admin",
};

const AuthContext = React.createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Default authed so SSR renders protected routes directly without a
  // client-side bounce through /login (which triggers a lazy-route discovery
  // fetch that intermittently fails on Workers with HTTP/2 protocol errors).
  // Real auth wiring (loader-based redirect from a session cookie) lands later.
  const [user, setUser] = React.useState<AuthUser | null>(DEFAULT_USER);

  const signIn = React.useCallback((override?: Partial<AuthUser>) => {
    setUser({ ...DEFAULT_USER, ...override });
  }, []);

  const signOut = React.useCallback(() => {
    setUser(null);
  }, []);

  const value = React.useMemo<AuthContextValue>(
    () => ({
      isAuthenticated: user !== null,
      user,
      signIn,
      signOut,
    }),
    [user, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = React.useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
