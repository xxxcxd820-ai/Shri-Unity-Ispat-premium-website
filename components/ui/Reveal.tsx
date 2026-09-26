import type { CSSProperties, ReactNode } from "react";

/**
 * Scroll reveals are plain server-rendered markup: a single IntersectionObserver
 * (RevealObserver, mounted once in the root layout) adds `.is-in` when the element
 * enters the viewport and CSS runs the transition. No per-element JavaScript.
 */

type Props = { children: ReactNode; delay?: number; y?: number; className?: string };

/** Fade-and-rise on first entry into the viewport. */
export function Reveal({ children, delay = 0, y = 28, className }: Props) {
  return (
    <div data-reveal className={className} style={{ "--rd": `${delay}s`, "--ry": `${y}px` } as CSSProperties}>
      {children}
    </div>
  );
}

/** Image mask reveal — the frame opens from the bottom edge upward. */
export function MaskReveal({ children, className, delay = 0 }: Omit<Props, "y">) {
  return (
    <div data-mask className={className} style={{ "--rd": `${delay}s` } as CSSProperties}>
      {children}
    </div>
  );
}
