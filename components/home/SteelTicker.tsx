"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const DEFAULT = ["TMT bars", "MS pipes", "Angles", "Channels", "Beams", "Plates", "Coils", "Roofing", "Hollow sections", "Flats", "Stainless", "Wire"];

/**
 * Oversized typographic band that drifts continuously and speeds up with scroll
 * velocity. Direction flips with scroll direction for a tactile feel.
 */
export function SteelTicker({
  words = DEFAULT,
  tone = "light",
  className,
}: {
  words?: string[];
  tone?: "light" | "dark";
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = root.current?.querySelector<HTMLElement>("[data-ticker]");
      if (!track) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const loop = gsap.to(track, { xPercent: -50, duration: 40, ease: "none", repeat: -1 });
        const st = ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 350, 6);
            gsap.to(loop, {
              timeScale: boost,
              duration: 0.2,
              overwrite: true,
              onComplete: () => void gsap.to(loop, { timeScale: 1, duration: 1.2, ease: "power2.out" }),
            });
          },
          onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
        });
        return () => st.kill();
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const dark = tone === "dark";
  const row = [...words, ...words];

  return (
    <div
      ref={root}
      aria-hidden="true"
      className={cn("overflow-hidden border-y py-6 select-none md:py-9", dark ? "border-white/10 bg-navy" : "border-line bg-paper", className)}
    >
      <div data-ticker className="flex w-max items-center will-change-transform">
        {row.map((w, i) => (
          <span key={i} className="flex items-center">
            <span
              className={cn(
                "px-6 font-display text-[clamp(2.6rem,7vw,6.5rem)] leading-none whitespace-nowrap uppercase md:px-10",
                i % 2
                  ? "text-transparent [-webkit-text-stroke:1px_var(--color-steel)]"
                  : dark
                    ? "text-white"
                    : "text-navy",
              )}
            >
              {w}
            </span>
            <svg viewBox="0 0 20 20" className="size-5 shrink-0 text-gold md:size-7" aria-hidden="true">
              <path d="M3 3h14v3H11.5v8H17v3H3v-3h5.5V6H3z" fill="currentColor" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
