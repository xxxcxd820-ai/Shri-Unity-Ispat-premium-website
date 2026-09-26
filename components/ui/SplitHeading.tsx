"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP, MQ } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Animate on mount (e.g. heroes) instead of when scrolled into view. */
  immediate?: boolean;
  delay?: number;
  id?: string;
};

/** Heading whose lines rise from behind a mask as it enters view. */
export function SplitHeading({ children, as: Tag = "h2", className, immediate = false, delay = 0, id }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        let split: SplitText | undefined;
        let cancelled = false;
        document.fonts.ready.then(() => {
          if (cancelled || !el.isConnected) return;
          split = SplitText.create(el, { type: "lines", mask: "lines", autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 110,
                duration: 1.2,
                ease: "expo.out",
                stagger: 0.08,
                delay,
                scrollTrigger: immediate ? undefined : { trigger: el, start: "top 90%", once: true },
              }),
          });
        });
        return () => {
          cancelled = true;
          split?.revert();
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} id={id}>
      {children}
    </Tag>
  );
}
