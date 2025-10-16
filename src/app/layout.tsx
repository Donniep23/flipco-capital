import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flipco Capital - Transparent Real Estate Investment Partnerships",
  description: "Partner with Flipco Capital for complete transparency in fix-and-flip investments. Every project is co-owned with live tracking, real-time cost breakdowns, and guaranteed returns.",
  keywords: "real estate investment, fix and flip, property investment, transparent investing, co-ownership, live tracking",
  manifest: "/manifest.json",
  themeColor: "#2563eb",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Flipco Capital"
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Flipco Capital",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#2563eb",
    "msapplication-config": "/browserconfig.xml"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClientBody className={inter.className}>{children}</ClientBody>
    </html>
  );
}
