import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GridPower | The Open Energy Platform",
  description:
    "EV charging stations and energy storage systems built on open technology. No vendor lock-in. Home to grid-scale solutions for India.",
  openGraph: {
    title: "GridPower | The Open Energy Platform",
    description:
      "EV charging stations and energy storage systems built on open technology. No vendor lock-in. Home to grid-scale solutions for India.",
    images: [
      {
        url: "/site/Social Share.png",
        width: 1200,
        height: 630,
        alt: "GridPower - The Open Energy Platform",
      },
    ],
    type: "website",
    siteName: "GridPower",
  },
  twitter: {
    card: "summary_large_image",
    title: "GridPower | The Open Energy Platform",
    description:
      "EV charging stations and energy storage systems built on open technology. No vendor lock-in.",
    images: ["/site/Social Share.png"],
  },
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
