"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { markIntroDone } from "@/lib/intro";

const KEY = "sui-intro";

/**
 * First-visit intro. Server-rendered so it covers the page from the first paint;
 * an inline script in <head> adds `intro-skip` on repeat visits in the same session
 * (and CSS hides it for reduced-motion users), so it never flashes needlessly.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const skip =
      document.documentElement.classList.contains("intro-skip") ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || skip) {
      if (el) el.style.display = "none";
      markIntroDone();
      return;
    }
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}

    const counter = el.querySelector<HTMLElement>("[data-count]")!;
    const state = { v: 0 };
    const tl = gsap.timeline();
    tl.to("[data-mark-path]", { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut", stagger: 0.12 }, 0)
      .to("[data-mark-fill]", { opacity: 1, duration: 0.35 }, 0.75)
      .from("[data-pl-word]", { yPercent: 110, duration: 0.9, ease: "expo.out", stagger: 0.06 }, 0.2)
      .to(state, {
        v: 100,
        duration: 1.2,
        ease: "power2.inOut",
        onUpdate: () => {
          counter.textContent = String(Math.round(state.v)).padStart(3, "0");
        },
      }, 0)
      .to("[data-pl-bar]", { scaleX: 1, duration: 1.2, ease: "power2.inOut" }, 0)
      .to("[data-pl-inner]", { yPercent: -30, autoAlpha: 0, duration: 0.45, ease: "power3.in" }, 1.25)
      .to(el, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.8,
        ease: "power4.inOut",
        onStart: () => {
          window.setTimeout(markIntroDone, 250);
        },
        onComplete: () => void (el.style.display = "none"),
      }, 1.35);
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={root}
      id="preloader"
      aria-hidden="true"
      className="fixed inset-0 z-[95] flex items-center justify-center bg-navy text-white"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <div className="bg-blueprint-dark pointer-events-none absolute inset-0" />
      <div data-pl-inner className="relative flex flex-col items-center px-6 text-center">
        <svg viewBox="0 0 40 40" className="size-16" fill="none">
          <rect data-mark-path x="0.75" y="0.75" width="38.5" height="38.5" stroke="currentColor" strokeWidth="1" strokeDasharray="160" strokeDashoffset="160" />
          <path data-mark-path d="M10 10h20v4.2h-7.6v11.6H30V30H10v-4.2h7.6V14.2H10z" stroke="currentColor" strokeWidth="0.8" strokeDasharray="120" strokeDashoffset="120" />
          <path data-mark-fill d="M10 10h20v4.2h-7.6v11.6H30V30H10v-4.2h7.6V14.2H10z" fill="currentColor" opacity="0" />
          <path data-mark-path d="M10 33.5h20" stroke="#d8b86a" strokeWidth="1.6" strokeDasharray="20" strokeDashoffset="20" />
        </svg>
        <p className="mt-8 flex flex-wrap justify-center gap-x-3 overflow-hidden font-display text-[clamp(1.8rem,5vw,3.4rem)] leading-none tracking-[0.08em] uppercase">
          {["Shri", "Unity", "Ispat"].map((w) => (
            <span key={w} className="inline-block overflow-hidden">
              <span data-pl-word className="inline-block">
                {w}
              </span>
            </span>
          ))}
        </p>
        <p className="label mt-4 text-gold-soft">Iron &amp; Steel — The Complete Solution</p>
      </div>
      <div className="absolute inset-x-4 bottom-8 flex items-center gap-4 sm:inset-x-10">
        <span data-count className="font-mono text-xs text-white/60">
          000
        </span>
        <span className="h-px flex-1 bg-white/15">
          <span data-pl-bar className="block h-px origin-left scale-x-0 bg-gold-soft" />
        </span>
        <span className="label text-white/60">Varanasi</span>
      </div>
    </div>
  );
}
