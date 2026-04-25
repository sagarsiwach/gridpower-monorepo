import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import "@gridpower/ui/styles.css";
import { AnnouncementBar } from "~/components/announcement-bar";
import { SiteHeader } from "~/components/site-header";
import { SiteFooter } from "~/components/site-footer";

export function Layout({ children }: { children: React.ReactNode }) {
  // NOTE: router hooks like useLocation are not available in Layout — it renders
  // ABOVE the Router context in React Router v7. Per-route canonical links should
  // be added via each route's `meta` export, not here.
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#FA0016" />
        <link rel="icon" type="image/svg+xml" href="/logos/logo-gridpower.svg" />
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
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
}
