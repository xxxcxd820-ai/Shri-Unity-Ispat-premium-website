import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, IBM_Plex_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingCta } from "@/components/layout/FloatingCta";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Cursor } from "@/components/layout/Cursor";
import { PageTransition } from "@/components/layout/PageTransition";
import { Preloader } from "@/components/layout/Preloader";
import { RevealObserver } from "@/components/layout/RevealObserver";
import { MotionProvider } from "@/components/layout/MotionProvider";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
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
  weight: ["400"],
  variable: "--font-plex-mono",
  display: "swap",
  preload: false,
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
    "iron and steel dealer Varanasi",
    "TMT bars Varanasi",
    "TMT bar dealer Uttar Pradesh",
    "MS pipes supplier Varanasi",
    "structural steel Varanasi",
    "MS angle channel beam supplier",
    "GI sheets Varanasi",
    "roofing sheets Varanasi",
    "steel stockist Varanasi",
    "Shri Unity Ispat",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  category: "Iron and steel supplier",
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
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0f1d31",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/** Runs before paint: skip the intro on repeat visits within a session. */
const introScript = `document.documentElement.classList.add("js");try{if(sessionStorage.getItem("sui-intro"))document.documentElement.classList.add("intro-skip")}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: browser extensions inject attributes on <html>/<body>
    <html
      lang="en-IN"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body className="min-h-dvh antialiased" suppressHydrationWarning>
        <a
          href="#main"
          className="fixed top-3 left-3 z-[100] -translate-y-24 bg-navy px-4 py-3 text-sm text-paper focus:translate-y-0"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Preloader />
          <ScrollProgress />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <FloatingCta />
          <Cursor />
          <PageTransition />
          <RevealObserver />
        </MotionProvider>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
      </body>
    </html>
  );
}
