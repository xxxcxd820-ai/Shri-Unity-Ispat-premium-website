"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { brands } from "@/data/brands";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/** Small I-beam glyph used as the separator between brands. */
function Beam({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={cn("size-3.5 shrink-0 md:size-4", className)} aria-hidden="true">
      <path d="M3 3h14v3H11.5v8H17v3H3v-3h5.5V6H3z" fill="currentColor" />
    </svg>
  );
}

/**
 * Single-row brand marquee: large serif wordmarks with a short product line,
 * separated by gold I-beam marks. Glides continuously, eases to a stop on hover
 * or keyboard focus, and becomes a static scrollable strip for reduced motion.
 */
export function BrandMarquee({ tone = "light" }: { tone?: "light" | "dark" }) {
  const root = useRef<HTMLDivElement>(null);
  const dark = tone === "dark";

  useGSAP(
    () => {
      const track = root.current?.querySelector<HTMLElement>("[data-marquee-track]");
      if (!track) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tween = gsap.to(track, { xPercent: -50, duration: 50, ease: "none", repeat: -1 });
        const wrap = root.current!;
        const slow = () => gsap.to(tween, { timeScale: 0, duration: 0.7, ease: "power2.out" });
        const resume = () => gsap.to(tween, { timeScale: 1, duration: 0.9, ease: "power2.in" });
        wrap.addEventListener("pointerenter", slow);
        wrap.addEventListener("pointerleave", resume);
        wrap.addEventListener("focusin", slow);
        wrap.addEventListener("focusout", resume);
        return () => {
          wrap.removeEventListener("pointerenter", slow);
          wrap.removeEventListener("pointerleave", resume);
          wrap.removeEventListener("focusin", slow);
          wrap.removeEventListener("focusout", resume);
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const row = [...brands, ...brands];

  return (
    <div
      ref={root}
      className="no-scrollbar overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)] motion-reduce:overflow-x-auto"
    >
      <ul data-marquee-track className="flex w-max items-center py-7 md:py-9" aria-label="Brands we deal in">
        {row.map((b, i) => {
          const hidden = i >= brands.length;
          return (
            <li key={`${b.slug}-${i}`} className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
              <Link
                href={`/brands#brand-${b.slug}`}
                tabIndex={hidden ? -1 : undefined}
                className="group flex items-center gap-4 px-7 md:gap-5 md:px-10"
              >
                {b.logo ? (
                  <Image src={b.logo} alt={b.name} width={160} height={60} className="h-10 w-auto object-contain" />
                ) : (
                  <span
                    className={cn(
                      "font-display text-[1.9rem] leading-none font-semibold tracking-[0.02em] whitespace-nowrap uppercase transition-colors duration-300 md:text-[2.6rem]",
                      dark ? "text-white group-hover:text-gold-soft" : "text-navy group-hover:text-gold",
                    )}
                  >
                    {b.name}
                  </span>
                )}
                <span
                  className={cn(
                    "hidden max-w-[9.5rem] text-[0.75rem] leading-snug md:block",
                    dark ? "text-white/60" : "text-steel-dark",
                  )}
                >
                  {b.lines}
                </span>
              </Link>
              <Beam className={dark ? "text-gold-soft/80" : "text-gold/80"} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
