import { ConsoleShell } from "~/components/ConsoleShell";
import { RequireAuth } from "~/components/RequireAuth";

// Shell-wrapped layout for protected routes.
// RequireAuth redirects to /login when not authenticated.
export default function ShellLayout() {
  return (
    <RequireAuth>
      <ConsoleShell />
    </RequireAuth>
  );
}
