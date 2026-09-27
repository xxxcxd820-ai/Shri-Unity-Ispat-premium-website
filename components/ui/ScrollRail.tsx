"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Native horizontal scroll-snap rail with previous/next buttons and a thin
 * progress line. Swipes on touch; arrows and trackpad on desktop. No pinning.
 */
export function ScrollRail({
  children,
  label,
  tone = "light",
  className,
}: {
  children: ReactNode;
  label: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ progress: 0, atStart: true, atEnd: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setState({ progress: max > 0 ? el.scrollLeft / max : 1, atStart: el.scrollLeft <= 4, atEnd: el.scrollLeft >= max - 4 });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(":scope > *");
    const amount = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  const dark = tone === "dark";
  const btn = cn(
    "flex size-11 items-center justify-center border transition-colors disabled:opacity-30",
    dark ? "border-white/25 text-white hover:bg-white hover:text-navy" : "border-line-strong text-navy hover:border-navy hover:bg-navy hover:text-white",
  );

  return (
    <div className={className}>
      <div
        ref={track}
        role="region"
        aria-label={label}
        tabIndex={0}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 focus-visible:outline-offset-4 sm:-mx-7 sm:scroll-px-7 sm:px-7 lg:mx-0 lg:scroll-px-0 lg:px-0"
      >
        {children}
      </div>
      <div className="mt-8 flex items-center gap-6">
        <div className={cn("h-px flex-1", dark ? "bg-white/15" : "bg-line")}>
          <div
            className={cn("h-px origin-left transition-transform duration-300", dark ? "bg-gold-soft" : "bg-navy")}
            style={{ transform: `scaleX(${Math.max(0.08, state.progress)})` }}
          />
        </div>
        <div className="flex gap-2">
          <button type="button" className={btn} onClick={() => step(-1)} disabled={state.atStart} aria-label="Previous">
            <ChevronLeft className="size-4" />
          </button>
          <button type="button" className={btn} onClick={() => step(1)} disabled={state.atEnd} aria-label="Next">
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
