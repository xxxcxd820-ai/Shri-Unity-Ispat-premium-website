"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SELECTOR = "[data-reveal]:not(.is-in), [data-mask]:not(.is-in), [data-split]:not(.is-in)";

/** One IntersectionObserver for every Reveal / MaskReveal on the page. */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    const scan = (root: ParentNode = document) => root.querySelectorAll(SELECTOR).forEach((el) => io.observe(el));
    scan();

    // Catch content rendered later (filters, steps, client-only sections).
    const mo = new MutationObserver((records) => {
      for (const r of records) r.addedNodes.forEach((n) => n instanceof Element && (n.matches(SELECTOR) ? io.observe(n) : scan(n)));
    });
    const main = document.getElementById("main");
    if (main) mo.observe(main, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
