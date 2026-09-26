"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Desktop-only cursor ring that trails the pointer and expands over links,
 * buttons and anything marked data-cursor="view".
 */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = ring.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.set(el, { xPercent: -50, yPercent: -50, autoAlpha: 0 });
      const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });
      let shown = false;

      const move = (e: PointerEvent) => {
        if (!shown) {
          gsap.to(el, { autoAlpha: 1, duration: 0.3 });
          shown = true;
        }
        xTo(e.clientX);
        yTo(e.clientY);
      };
      const over = (e: PointerEvent) => {
        const t = e.target as HTMLElement;
        const view = t.closest("[data-cursor='view']");
        const interactive = t.closest("a, button, [role='button'], input, select, textarea, label");
        if (view) {
          gsap.to(el, { width: 88, height: 88, backgroundColor: "rgba(15,29,49,0.9)", borderColor: "rgba(15,29,49,0)", duration: 0.35 });
          if (label.current) gsap.to(label.current, { autoAlpha: 1, duration: 0.2 });
        } else if (interactive) {
          gsap.to(el, { width: 46, height: 46, backgroundColor: "rgba(176,138,62,0.12)", borderColor: "rgba(176,138,62,0.8)", duration: 0.35 });
          if (label.current) gsap.to(label.current, { autoAlpha: 0, duration: 0.1 });
        } else {
          gsap.to(el, { width: 14, height: 14, backgroundColor: "rgba(176,138,62,0)", borderColor: "rgba(176,138,62,0.9)", duration: 0.35 });
          if (label.current) gsap.to(label.current, { autoAlpha: 0, duration: 0.1 });
        }
      };
      const leave = () => {
        gsap.to(el, { autoAlpha: 0, duration: 0.3 });
        shown = false;
      };

      window.addEventListener("pointermove", move);
      window.addEventListener("pointerover", over);
      document.documentElement.addEventListener("pointerleave", leave);
      return () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerover", over);
        document.documentElement.removeEventListener("pointerleave", leave);
      };
    });
    return () => mm.revert();
  });

  return (
    <div
      ref={ring}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[70] hidden size-3.5 items-center justify-center rounded-full border border-gold/90 mix-blend-normal lg:flex"
      style={{ visibility: "hidden" }}
    >
      <span ref={label} className="label text-[0.58rem] text-white opacity-0">
        View
      </span>
    </div>
  );
}
