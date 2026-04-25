import { Navigate, useLocation } from "react-router";
import { useAuth } from "~/lib/auth";

/**
 * Wrap protected routes. Redirects to /login when unauthenticated.
 * Mock auth always returns true for now (CON.1). Real wiring lands later.
 */
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}
