import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import "@gridpower/ui/styles.css";
import { AuthProvider } from "~/lib/auth";
import { ThemeProvider } from "~/lib/theme";

// SSR sets data-theme="dark" by default on <html>. The ThemeProvider
// hydrates from localStorage on mount and reconciles. This avoids a
// flash on first paint for the most common (dark) case.
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
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
      <ThemeProvider defaultTheme="dark">
        <Outlet />
      </ThemeProvider>
    </AuthProvider>
  );
}
