import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://buildingos.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BuildingOS — Building & Flat Management Platform",
    template: "%s | BuildingOS",
  },
  description:
    "The modern operating system for buildings and flats. Manage buildings, residents, complaints, billing, parking, and security operations in one platform.",
  keywords: [
    "building management",
    "flat management",
    "property management",
    "society management",
    "residential tower",
    "apartment management",
    "maintenance tracking",
    "billing system",
    "parking management",
  ],
  authors: [{ name: "BuildingOS" }],
  creator: "BuildingOS",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "BuildingOS",
    title: "BuildingOS — Building & Flat Management Platform",
    description:
      "The modern operating system for buildings and flats. Manage everything from one platform.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BuildingOS — Building & Flat Management Platform",
    description:
      "The modern operating system for buildings and flats. Manage everything from one platform.",
    creator: "@buildingos",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {/* Skip-to-content link for keyboard & screen reader accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:bg-zinc-900 focus:text-white dark:focus:bg-zinc-50 dark:focus:text-zinc-900 focus:outline-none focus:shadow-lg"
        >
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>{children}</TooltipProvider>
          {/* Global toast provider — do NOT add <Toaster /> to individual pages */}
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
