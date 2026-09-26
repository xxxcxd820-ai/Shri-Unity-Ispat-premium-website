"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * Catalogue facts derived from the site's own data (no invented business
 * statistics): families, products, brands and industries covered.
 */
export function Capabilities({ stats }: { stats: { value: number; label: string; note: string }[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        root.current!.querySelectorAll<HTMLElement>("[data-count-to]").forEach((el) => {
          const target = Number(el.dataset.countTo);
          const o = { v: 0 };
          gsap.to(o, {
            v: target,
            duration: 1.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            onUpdate: () => {
              el.textContent = String(Math.round(o.v)).padStart(2, "0");
            },
          });
        });
        gsap.from("[data-cap]", {
          y: 24,
          autoAlpha: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="grid grid-cols-2 border-t border-l border-white/10 lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} data-cap className="relative border-r border-b border-white/10 p-5 sm:p-8 lg:p-10">
          <span className="absolute top-3 right-3 size-2 border-t border-r border-gold-soft/60" aria-hidden="true" />
          <p className="font-display text-[clamp(3rem,7vw,6rem)] leading-none text-white">
            <span data-count-to={s.value}>{String(s.value).padStart(2, "0")}</span>
          </p>
          <p className="mt-4 text-[0.68rem] font-semibold tracking-[0.2em] text-gold-soft uppercase sm:text-xs">{s.label}</p>
          <p className="mt-2 text-xs leading-relaxed text-white/55 sm:text-sm">{s.note}</p>
        </div>
      ))}
    </div>
  );
}
