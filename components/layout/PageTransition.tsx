"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { routeLabel } from "@/lib/route-label";
import { LogoMark } from "./Logo";

/**
 * Curtain transition between routes.
 * Internal link clicks are intercepted: a navy curtain rises over the page,
 * the route changes underneath, then the curtain lifts away to reveal it.
 * Browser back/forward and reduced-motion users get instant navigation.
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const curtain = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const pending = useRef<{ to: string; timer?: number } | null>(null);
  const busy = useRef(false);

  const reveal = useCallback(() => {
    const el = curtain.current;
    if (!el || !pending.current) return;
    window.clearTimeout(pending.current.timer);
    pending.current = null;
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        gsap.to(el, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.75,
          ease: "power3.inOut",
          delay: 0.1,
          onComplete: () => {
            gsap.set(el, { display: "none" });
            busy.current = false;
          },
        });
      }),
    );
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download") || a.dataset.noTransition !== undefined) return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#") || /^(mailto:|tel:|https?:)/.test(href) && new URL(a.href).origin !== location.origin) return;
      const url = new URL(a.href);
      if (url.origin !== location.origin) return;
      const samePath = url.pathname === location.pathname;
      if (samePath && (url.hash || url.search === location.search)) return; // in-page anchors / no-op
      if (reduce.matches || busy.current) return;

      e.preventDefault();
      busy.current = true;
      const to = url.pathname + url.search + url.hash;
      setLabel(routeLabel(url.pathname));
      const el = curtain.current!;
      gsap.killTweensOf(el);
      gsap.set(el, { display: "flex", clipPath: "inset(100% 0% 0% 0%)" });
      gsap.fromTo(el.querySelectorAll("[data-t-in]"), { yPercent: 120 }, { yPercent: 0, duration: 0.6, ease: "expo.out", delay: 0.2, stagger: 0.05 });
      gsap.to(el, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.55,
        ease: "power3.inOut",
        onComplete: () => {
          pending.current = { to };
          router.push(to);
          // Fallback reveal if the pathname does not change (e.g. only the query did).
          pending.current.timer = window.setTimeout(reveal, samePath ? 150 : 2500);
        },
      });
    };

    // Capture phase: runs before next/link, which then sees defaultPrevented and stands down.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router, reveal]);

  useEffect(() => {
    if (pending.current) reveal();
  }, [pathname, reveal]);

  return (
    <div
      ref={curtain}
      aria-hidden="true"
      className="fixed inset-0 z-[90] hidden flex-col items-center justify-center bg-navy text-white"
      style={{ clipPath: "inset(100% 0% 0% 0%)" }}
    >
      <div className="bg-blueprint-dark pointer-events-none absolute inset-0" />
      <div className="relative flex flex-col items-center gap-6">
        <div className="overflow-hidden">
          <div data-t-in>
            <LogoMark className="size-12 text-white" />
          </div>
        </div>
        <div className="overflow-hidden">
          <p data-t-in className="font-display text-[clamp(2rem,6vw,4.5rem)] leading-none uppercase">
            {label}
          </p>
        </div>
        <div className="overflow-hidden">
          <p data-t-in className="label text-gold-soft">
            Shri Unity Ispat
          </p>
        </div>
      </div>
      <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left animate-[tload_1.1s_ease-in-out_infinite] bg-gold" />
    </div>
  );
}
