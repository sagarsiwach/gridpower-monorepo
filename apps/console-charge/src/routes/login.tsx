import * as React from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff, Moon, Sun } from "lucide-react";
import { Button, GridMark, Input } from "@gridpower/ui";
import { useAuth } from "~/lib/auth";
import { useTheme } from "~/lib/theme";

// Login screen. Public route, NOT wrapped in ConsoleShell.
// Uses semantic tokens from @gridpower/tokens so light/dark flip happens
// automatically via [data-theme="dark"]. The dotted radial-gradient
// background uses var(--border) so it adapts to theme without conditionals.

export default function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [email, setEmail] = React.useState("sagar@gridpower.co.in");
  const [password, setPassword] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const isDark = theme === "dark";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setError(null);
    setLoading(true);
    // Mock auth: simulate a brief network delay then redirect.
    // Real auth failures will set `error` and clear loading here.
    setTimeout(() => {
      signIn();
      navigate("/dashboard", { replace: true });
    }, 800);
  }

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center bg-background"
      style={{
        backgroundImage:
          "radial-gradient(circle, var(--border) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }}
    >
      {/* Theme toggle, top-right */}
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        aria-pressed={isDark}
        className={[
          "absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-1.5 px-3 py-1.5 rounded-btn border border-border text-[12px] font-body",
          "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
          "cursor-pointer transition-[color,background-color,box-shadow] duration-150 ease-out outline-none focus-visible:ring-2 focus-visible:ring-primary",
        ].join(" ")}
      >
        <span className="inline-flex transition-transform duration-200 ease-out" style={{ transform: isDark ? "rotate(0deg)" : "rotate(-30deg)" }}>
          {isDark ? <Sun size={13} /> : <Moon size={13} />}
        </span>
        <span>{isDark ? "Light mode" : "Dark mode"}</span>
      </button>

      {/* Login card */}
      <div className="w-full max-w-[400px] mx-4 rounded-modal border border-border bg-card p-6 sm:p-8 md:p-10 shadow-lg">
        {/* Logo, doubles as the page h1 */}
        <h1 className="flex items-center gap-2.5 mb-8 m-0">
          <GridMark size={28} />
          <span className="flex flex-col">
            <span className="font-display text-[15px] font-semibold tracking-tight text-foreground">
              GridCharge Console
            </span>
            <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-grid-red">
              DeltaEV Mobility Pvt Ltd
            </span>
          </span>
        </h1>

        {/* Section heading */}
        <h2 className="font-display text-h3 font-semibold mb-1.5 text-foreground">
          Sign in to Console
        </h2>
        <p className="text-body-sm mb-7 text-muted-foreground">
          Manage your charging network.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-[12px] font-medium text-muted-foreground"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={error ? true : undefined}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-[12px] font-medium text-muted-foreground"
              >
                Password
              </label>
              <button
                type="button"
                className="text-[12px] text-grid-red font-body bg-transparent border-none cursor-pointer p-0 leading-none"
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPass ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={error ? true : undefined}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                aria-label={showPass ? "Hide password" : "Show password"}
                aria-pressed={showPass}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center bg-transparent border-none cursor-pointer p-0 text-muted-foreground hover:text-foreground"
              >
                {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {/* Inline error (placeholder for real auth failures) */}
          {error ? (
            <div
              role="alert"
              className="rounded-btn border border-error bg-error-bg px-3 py-2 text-[12px] text-error"
            >
              {error}
            </div>
          ) : null}

          {/* Submit */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={loading}
            aria-busy={loading}
            className={[
              "w-full mt-1 cursor-pointer transition-transform duration-200 ease-out",
              loading ? "scale-[0.98]" : "scale-100",
            ].join(" ")}
          >
            {loading ? (
              <>
                <span
                  className="inline-block h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin mr-2"
                  aria-hidden="true"
                />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-border" />
          <span className="font-mono text-[11px] text-muted-foreground">OR</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Google SSO */}
        <button
          type="button"
          className={[
            "w-full flex items-center justify-center gap-2 rounded-btn border border-border px-4 py-2.5",
            "font-body text-[13px] font-medium cursor-pointer transition-colors",
            "bg-transparent text-foreground hover:bg-muted",
          ].join(" ")}
        >
          {/* Google brand mark: official brand colors, kept inline. */}
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>

        {/* Footer note */}
        <p className="text-center mt-5 text-[12px] text-muted-foreground">
          {"Don't have access? "}
          <a href="#" className="text-grid-red no-underline hover:underline">
            Request one
          </a>
        </p>
      </div>

      {/* Page footer */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.06em] whitespace-nowrap text-muted-foreground">
        GridPower · DeltaEV Mobility Pvt Ltd · v1.0.4
      </div>
    </div>
  );
}
