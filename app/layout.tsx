import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SYNORA — Synchronized Intelligence & Orchestration",
  description:
    "SYNORA is a multi-agent AI system where a central Manager Orchestrator coordinates specialized agents across Sales, Finance, Inventory, Customer Support, and HR to produce a unified business analysis.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth w-full max-w-full overflow-x-hidden">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#07080B] text-slate-100 antialiased font-sans selection:bg-indigo-500/30 selection:text-indigo-200 w-full max-w-full overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
