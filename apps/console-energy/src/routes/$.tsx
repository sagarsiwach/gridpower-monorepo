import { Link } from "react-router";

export default function NotFound() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-background bg-grid-dots bg-[length:16px_16px] p-6"
      role="main"
    >
      <div className="space-y-4 text-center">
        <p
          className="font-mono text-[10px] uppercase tracking-[0.1em] text-primary"
          aria-label="GridEnergy Console"
        >
          GridEnergy Console
        </p>
        <h1 className="font-heading text-h2 text-foreground">404</h1>
        <p className="font-body text-body text-muted-foreground">
          This route does not exist.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex h-10 items-center rounded-btn bg-primary px-4 font-body text-body-sm font-medium text-primary-foreground transition-colors hover:bg-grid-red-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
