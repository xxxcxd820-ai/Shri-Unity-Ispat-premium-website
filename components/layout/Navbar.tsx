"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Phone, X } from "lucide-react";
import { nav, site, telHref } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { Arrow } from "@/components/ui/Arrow";

/**
 * Sticky header. Transparent with light text while it sits over a page's dark
 * hero (any element marked data-hero="dark"); becomes a light glass bar once
 * the page scrolls.
 */
export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const id = requestAnimationFrame(() => setOverDark(Boolean(document.querySelector('[data-hero="dark"]'))));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const light = overDark && !scrolled && !open;
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,color,backdrop-filter] duration-500",
          light
            ? "border-b border-white/10 bg-transparent text-white"
            : "border-b border-line/80 bg-paper/95 text-navy lg:bg-paper/80 lg:backdrop-blur-md",
        )}
      >
        <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href="/" aria-label={`${site.name} — home`} className="relative z-10">
            <Logo className="hidden sm:flex" />
            <Logo compact className="sm:hidden" />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "relative py-2 text-[0.72rem] font-semibold tracking-[0.2em] uppercase transition-opacity hover:opacity-100",
                      isActive(item.href) ? "opacity-100" : "opacity-75",
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        "absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-500",
                        isActive(item.href) ? "w-full" : "w-0",
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={telHref(site.phones[0].e164)}
              className="hidden items-center gap-2 text-[0.72rem] font-semibold tracking-[0.12em] xl:flex"
            >
              <Phone className="size-3.5" aria-hidden="true" />
              {site.phones[0].display}
            </a>
            <Link
              href="/quote"
              className={cn(
                "group hidden h-11 items-center gap-3 px-5 text-[0.68rem] font-semibold tracking-[0.2em] uppercase transition-colors md:inline-flex",
                light ? "bg-white text-navy hover:bg-gold hover:text-white" : "bg-navy text-paper hover:bg-gold",
              )}
            >
              Request a Quote
              <Arrow />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative z-10 flex size-11 items-center justify-center lg:hidden"
            >
              <AnimatePresence initial={false} mode="wait">
                {open ? (
                  <m.span key="x" initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ opacity: 0 }}>
                    <X className="size-6" />
                  </m.span>
                ) : (
                  <m.span key="m" className="flex flex-col gap-[7px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <span className="block h-px w-7 bg-current" />
                    <span className="block h-px w-5 self-end bg-current" />
                  </m.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
