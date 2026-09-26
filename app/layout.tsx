import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, IBM_Plex_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { JsonLd, organizationJsonLd } from "@/lib/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingCta } from "@/components/layout/FloatingCta";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Cursor } from "@/components/layout/Cursor";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Shri Unity Ispat — Iron & Steel Supplier in Varanasi | The Complete Solution",
    template: "%s | Shri Unity Ispat",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "steel supplier Varanasi",
    "TMT bars Varanasi",
    "MS pipes supplier",
    "structural steel Varanasi",
    "iron and steel dealer Uttar Pradesh",
    "MS angle channel beam",
    "GI sheets",
    "Shri Unity Ispat",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: "Shri Unity Ispat — Iron & Steel, The Complete Solution",
    description: site.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shri Unity Ispat — Iron & Steel, The Complete Solution",
    description: site.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#fbfaf7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="fixed top-3 left-3 z-[100] -translate-y-24 bg-navy px-4 py-3 text-sm text-paper focus:translate-y-0"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <FloatingCta />
        <Cursor />
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
