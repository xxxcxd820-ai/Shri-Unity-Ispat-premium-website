"use client";

import Image from "next/image";
import { useRef } from "react";
import { brands } from "@/data/brands";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Slow, continuous brand marquee that eases to a stop on hover/focus.
 * Brands render as typographic wordmarks unless an approved logo file is set.
 */
export function BrandMarquee({ tone = "light" }: { tone?: "light" | "dark" }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const el = track.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tween = gsap.to(el, { xPercent: -50, duration: 55, ease: "none", repeat: -1 });
        const slow = () => gsap.to(tween, { timeScale: 0, duration: 0.8, ease: "power2.out" });
        const resume = () => gsap.to(tween, { timeScale: 1, duration: 0.8, ease: "power2.in" });
        const wrap = root.current!;
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

  const dark = tone === "dark";
  const row = [...brands, ...brands];

  return (
    <div
      ref={root}
      className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
    >
      <ul ref={track} className="flex w-max items-center" aria-label="Brands we deal in">
        {row.map((b, i) => (
          <li
            key={`${b.slug}-${i}`}
            aria-hidden={i >= brands.length ? true : undefined}
            className={`group flex h-28 shrink-0 items-center gap-6 border-r px-10 md:h-36 md:px-16 ${dark ? "border-white/10" : "border-line"}`}
          >
            {b.logo ? (
              <Image src={b.logo} alt={b.name} width={160} height={60} className="h-10 w-auto object-contain grayscale transition group-hover:grayscale-0" />
            ) : (
              <span
                className={`font-display text-[clamp(1.6rem,2.6vw,2.4rem)] font-semibold tracking-[0.04em] whitespace-nowrap uppercase transition-colors duration-500 ${
                  dark ? "text-white/45 group-hover:text-white" : "text-steel group-hover:text-navy"
                }`}
              >
                {b.name}
              </span>
            )}
            <span className={`label hidden max-w-[9rem] leading-snug xl:block ${dark ? "text-white/35" : "text-steel/80"}`}>{b.lines}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
