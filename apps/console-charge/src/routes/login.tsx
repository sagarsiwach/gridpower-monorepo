import * as React from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff, Moon, Sun } from "lucide-react";
import { Button, GridMark, Input } from "@gridpower/ui";
import { useAuth } from "~/lib/auth";
import { useTheme } from "~/lib/theme";

// ─── Login screen — public route, NOT wrapped in ConsoleShell ─────────────────

export default function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [email, setEmail] = React.useState("sagar@gridpower.co.in");
  const [password, setPassword] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const isDark = theme === "dark";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Mock auth: simulate a brief network delay then redirect
    setTimeout(() => {
      signIn();
      navigate("/dashboard", { replace: true });
    }, 800);
  }

  return (
    <div
      className={[
        "relative min-h-screen flex flex-col items-center justify-center",
        isDark ? "bg-dark-1" : "bg-sand-1",
      ].join(" ")}
      style={{
        backgroundImage: isDark
          ? "radial-gradient(circle, var(--dark-5) 1px, transparent 1px)"
          : "radial-gradient(circle, var(--sand-4) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }}
    >
      {/* Theme toggle — top-right */}
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className={[
          "absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1.5 rounded-btn border text-[12px] font-body",
          "cursor-pointer transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary",
          isDark
            ? "border-dark-6 bg-transparent text-dark-9 hover:bg-dark-3"
            : "border-sand-6 bg-transparent text-sand-9 hover:bg-sand-3",
        ].join(" ")}
      >
        {isDark ? <Sun size={13} /> : <Moon size={13} />}
        <span>{isDark ? "Light mode" : "Dark mode"}</span>
      </button>

      {/* Login card */}
      <div
        className={[
          "w-full max-w-[400px] rounded-modal border p-10",
          isDark
            ? "bg-dark-2 border-dark-6"
            : "bg-white border-sand-6 shadow-lg",
        ].join(" ")}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-8">
          <GridMark size={28} />
          <div>
            <div
              className={[
                "font-display text-[15px] font-semibold tracking-tight",
                isDark ? "text-dark-12" : "text-sand-12",
              ].join(" ")}
            >
              GridCharge Console
            </div>
            <div className="font-mono text-[9px] tracking-[0.1em] uppercase text-grid-red">
              DeltaEV Mobility Pvt Ltd
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1
          className={[
            "font-display text-h3 font-semibold mb-1.5",
            isDark ? "text-dark-12" : "text-sand-12",
          ].join(" ")}
        >
          Sign in to Console
        </h1>
        <p
          className={[
            "text-body-sm mb-7",
            isDark ? "text-dark-9" : "text-sand-9",
          ].join(" ")}
        >
          Manage your charging network.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className={[
                "text-[12px] font-medium",
                isDark ? "text-dark-9" : "text-sand-9",
              ].join(" ")}
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
              className={
                isDark
                  ? "bg-dark-3 border-dark-6 text-dark-12 placeholder:text-dark-8"
                  : ""
              }
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className={[
                  "text-[12px] font-medium",
                  isDark ? "text-dark-9" : "text-sand-9",
                ].join(" ")}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={[
                  "pr-10",
                  isDark
                    ? "bg-dark-3 border-dark-6 text-dark-12 placeholder:text-dark-8"
                    : "",
                ].join(" ")}
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                aria-label={showPass ? "Hide password" : "Show password"}
                className={[
                  "absolute right-3 top-1/2 -translate-y-1/2 flex items-center",
                  "bg-transparent border-none cursor-pointer p-0",
                  isDark ? "text-dark-8" : "text-sand-8",
                ].join(" ")}
              >
                {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={loading}
            className="w-full mt-1 cursor-pointer"
          >
            {loading ? (
              <>
                <span
                  className="inline-block h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin"
                  aria-hidden="true"
                />
                Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className={isDark ? "flex-1 h-px bg-dark-6" : "flex-1 h-px bg-sand-6"} />
          <span
            className={[
              "font-mono text-[11px]",
              isDark ? "text-dark-9" : "text-sand-9",
            ].join(" ")}
          >
            OR
          </span>
          <div className={isDark ? "flex-1 h-px bg-dark-6" : "flex-1 h-px bg-sand-6"} />
        </div>

        {/* Google SSO */}
        <button
          type="button"
          className={[
            "w-full flex items-center justify-center gap-2 rounded-btn border px-4 py-2.5",
            "font-body text-[13px] font-medium cursor-pointer transition-colors",
            isDark
              ? "border-dark-6 bg-transparent text-dark-12 hover:bg-dark-3"
              : "border-sand-6 bg-transparent text-sand-12 hover:bg-sand-3",
          ].join(" ")}
        >
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
        <p
          className={[
            "text-center mt-5 text-[12px]",
            isDark ? "text-dark-9" : "text-sand-9",
          ].join(" ")}
        >
          {"Don't have access? "}
          <a href="#" className="text-grid-red no-underline hover:underline">
            Request one →
          </a>
        </p>
      </div>

      {/* Page footer */}
      <div
        className={[
          "absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.06em] whitespace-nowrap",
          isDark ? "text-dark-8" : "text-sand-8",
        ].join(" ")}
      >
        GridPower · DeltaEV Mobility Pvt Ltd · v1.0.4
      </div>
    </div>
  );
}
