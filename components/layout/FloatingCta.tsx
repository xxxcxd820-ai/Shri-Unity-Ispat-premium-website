"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { site, telHref, whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Desktop: vertical "Request Quote" tab on the right edge.
 * Mobile: sticky bottom bar with Call / WhatsApp / Quote.
 */
export function FloatingCta() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nearEnd = window.scrollY + window.innerHeight > document.documentElement.scrollHeight - 1100;
      setVisible(window.scrollY > 480 && !nearEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/quote") return null;

  return (
    <>
      <Link
        href="/quote"
        className={cn(
          "fixed top-1/2 right-0 z-40 hidden origin-bottom-right -translate-y-1/2 items-center gap-3 bg-navy px-2.5 py-5 text-paper shadow-[0_10px_40px_-10px_rgb(15_29_49/0.5)] transition-all duration-500 hover:bg-gold lg:flex",
          visible ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-full opacity-0",
        )}
        style={{ writingMode: "vertical-rl" }}
        aria-label="Request a quote"
      >
        <span className="rotate-180 text-[0.66rem] font-semibold tracking-[0.3em] uppercase">Request Quote</span>
        <span className="block h-6 w-px bg-gold-soft" aria-hidden="true" />
      </Link>

      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 grid grid-cols-[auto_auto_1fr] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-lg transition-transform duration-500 lg:hidden",
          visible ? "translate-y-0" : "translate-y-full",
        )}
      >
        <a href={telHref(site.phones[0].e164)} className="flex items-center gap-2 border-r border-line px-5 text-navy" aria-label="Call Shri Unity Ispat">
          <Phone className="size-4" aria-hidden="true" />
          <span className="label">Call</span>
        </a>
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 border-r border-line px-5 text-navy"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="size-4" aria-hidden="true" />
          <span className="label">WhatsApp</span>
        </a>
        <Link href="/quote" className="flex h-14 items-center justify-center bg-navy text-[0.68rem] font-semibold tracking-[0.2em] text-paper uppercase">
          Request Quote
        </Link>
      </div>
    </>
  );
}
