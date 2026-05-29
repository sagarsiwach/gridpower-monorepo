import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation } from "react-router";

import "./styles/globals.css";
import { GlobalHeader } from "./components/site/GlobalHeader";

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

// Global app shell. The two-tier GridEnergy header (top bar + mega menu) wraps
// every public marketing route. Internal showcases (/preview, /system) keep
// their own chrome, so the global header is suppressed there.
export default function App() {
  const { pathname } = useLocation();
  const isInternal =
    pathname.startsWith("/preview") || pathname.startsWith("/system");

  return (
    <>
      {!isInternal && <GlobalHeader />}
      <Outlet />
    </>
  );
}
