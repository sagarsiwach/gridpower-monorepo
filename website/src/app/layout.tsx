import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GridPower | The Open Energy Platform",
  description:
    "EV charging stations and energy storage systems built on open technology. No vendor lock-in. Home to grid-scale solutions for India.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
