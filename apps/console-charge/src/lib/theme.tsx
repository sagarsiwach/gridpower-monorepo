import * as React from "react";

// Light-only theme. Dark mode has been removed per user override.
// ThemeProvider always forces "light"; toggleTheme is a no-op.
// Semantic tokens (bg-background, text-foreground, etc.) resolve
// to light values when no data-theme attribute is set on <html>.

export type Theme = "light";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
  children,
  defaultTheme: _defaultTheme = "light",
}: {
  children: React.ReactNode;
  defaultTheme?: Theme;
}) {
  // Ensure no stale dark theme lingers in localStorage or on <html>.
  React.useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.removeAttribute("data-theme");
    }
    try {
      window.localStorage.removeItem("gridcharge-theme");
    } catch {
      // ignore
    }
  }, []);

  const setTheme = React.useCallback((_: Theme) => {
    // no-op: light only
  }, []);

  const toggleTheme = React.useCallback(() => {
    // no-op: light only
  }, []);

  const value = React.useMemo<ThemeContextValue>(
    () => ({ theme: "light", setTheme, toggleTheme }),
    [setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
