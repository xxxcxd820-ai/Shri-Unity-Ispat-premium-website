"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { site, telHref, whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Arrow } from "@/components/ui/Arrow";

/**
 * Desktop: vertical "Request Quote" tab on the right edge.
 * Mobile: compact floating dock with Call / WhatsApp / Quote.
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

      {/* Mobile: compact floating dock */}
      <nav
        aria-label="Quick contact"
        className={cn(
          "fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 flex h-12 items-stretch overflow-hidden bg-navy/95 text-white shadow-[0_18px_40px_-12px_rgb(15_29_49/0.55)] ring-1 ring-white/10 backdrop-blur transition-all duration-500 lg:hidden",
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[calc(100%+1rem)] opacity-0",
        )}
      >
        <a
          href={telHref(site.phones[0].e164)}
          className="flex w-12 items-center justify-center border-r border-white/10 transition-colors active:bg-white/10"
          aria-label="Call Shri Unity Ispat"
        >
          <Phone className="size-[1.05rem]" aria-hidden="true" />
        </a>
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-12 items-center justify-center border-r border-white/10 transition-colors active:bg-white/10"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="size-[1.05rem]" aria-hidden="true" />
        </a>
        <Link
          href="/quote"
          className="flex flex-1 items-center justify-between gap-3 px-4 text-[0.66rem] font-semibold tracking-[0.18em] whitespace-nowrap uppercase transition-colors active:bg-white/10"
        >
          Request a quote
          <span className="flex size-7 items-center justify-center bg-gold-soft text-navy" aria-hidden="true">
            <Arrow className="size-3.5" />
          </span>
        </Link>
      </nav>
    </>
  );
}
