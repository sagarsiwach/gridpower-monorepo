import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import "./styles/globals.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="day">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#FA0016" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
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

// Global app shell. The two-tier GridEnergy header (top bar + mega menu) will
// live here so it wraps every route. Kept bare for the framework migration —
// header lands in the next slice.
export default function App() {
  return <Outlet />;
}
