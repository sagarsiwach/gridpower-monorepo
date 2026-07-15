import * as React from "react";

export type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "gridenergy-theme";

function applyTheme(_theme: Theme) {
  if (typeof document === "undefined") return;
  // Light-only: never set data-theme="dark". Remove any existing attribute.
  document.documentElement.removeAttribute("data-theme");
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
}: {
  children: React.ReactNode;
  defaultTheme?: Theme;
}) {
  // Always light — ignore stored preference.
  const [theme] = React.useState<Theme>("light");

  React.useEffect(() => {
    applyTheme("light");
    // Clear any previously stored dark preference so refreshes stay light.
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const setTheme = React.useCallback((_next: Theme) => {
    // No-op: light only.
  }, []);

  const toggleTheme = React.useCallback(() => {
    // No-op: light only.
  }, []);

  const value = React.useMemo<ThemeContextValue>(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
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
