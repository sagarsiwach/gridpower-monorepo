import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import "@gridpower/ui/styles.css";
import { AnnouncementBar } from "~/components/announcement-bar";
import { SiteHeader } from "~/components/site-header";
import { SiteFooter } from "~/components/site-footer";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
