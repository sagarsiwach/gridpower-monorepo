import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import "@gridpower/ui/styles.css";
import { AuthProvider } from "~/lib/auth";
import { ThemeProvider } from "~/lib/theme";

// Light-only theme: no data-theme attribute. Semantic tokens resolve to
// light values automatically. ThemeProvider is forced to "light".
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#FA0016" />
        <title>GridCharge Console</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="light">
        <Outlet />
      </ThemeProvider>
    </AuthProvider>
  );
}
