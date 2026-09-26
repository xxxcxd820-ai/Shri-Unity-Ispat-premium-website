"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { categories } from "@/data/categories";
import { gsap, useGSAP } from "@/lib/gsap";
import { Img } from "@/components/ui/Img";
import { Arrow } from "@/components/ui/Arrow";
import { SectionHead } from "@/components/ui/SectionHead";
import { cn } from "@/lib/utils";

/**
 * "What we supply" — a typographic index of every category. On desktop a
 * framed photograph follows the pointer and swaps as rows are hovered.
 */
export function ProductUniverse() {
  const root = useRef<HTMLElement>(null);
  const floater = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useGSAP(
    () => {
      const el = floater.current;
      const list = root.current?.querySelector("[data-universe-list]") as HTMLElement | null;
      if (!el || !list) return;
      const mm = gsap.matchMedia();
      mm.add("(pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set(el, { xPercent: -50, yPercent: -50 });
        const xTo = gsap.quickTo(el, "x", { duration: 0.7, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.7, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = list.getBoundingClientRect();
          xTo(e.clientX - r.left);
          yTo(e.clientY - r.top);
        };
        list.addEventListener("pointermove", move);
        return () => list.removeEventListener("pointermove", move);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="universe-title" className="bg-ivory py-20 md:py-36">
      <div className="container-x">
        <SectionHead
          index="03"
          label="Product universe"
          title={
            <span id="universe-title">
              What we
              <br />
              supply.
            </span>
          }
          intro="Twelve product families spanning reinforcement, tubulars, structurals, flat steel, coils, roofing, wire, stainless, specialty and industrial steel. Core items are regularly available; the rest are procured on request."
        />

        <div data-universe-list className="relative mt-16 md:mt-24" onPointerLeave={() => setActive(null)}>
          {/* Floating preview (desktop) */}
          <div
            ref={floater}
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute top-0 left-0 z-10 hidden aspect-[4/3] w-[22rem] overflow-hidden transition-[opacity,scale] duration-500 lg:block",
              active === null ? "scale-90 opacity-0" : "scale-100 opacity-100",
            )}
          >
            {categories.map((c, i) => (
              <div key={c.slug} className={cn("absolute inset-0 transition-opacity duration-500", active === i ? "opacity-100" : "opacity-0")}>
                <Img k={c.image} fill sizes="352px" className="object-cover" />
              </div>
            ))}
          </div>

          <ul className="border-t border-ink/15">
            {categories.map((c, i) => (
              <li key={c.slug} className="border-b border-ink/15" onPointerEnter={() => setActive(i)}>
                <Link
                  href={`/products/${c.slug}`}
                  className="group relative grid grid-cols-[3rem_1fr_auto] items-center gap-4 py-5 md:grid-cols-[5rem_1fr_1fr_auto] md:py-7"
                >
                  <span className="label text-steel transition-colors group-hover:text-gold">{c.index}</span>
                  <span className="font-display text-[clamp(1.7rem,4.2vw,3.6rem)] leading-none text-navy uppercase transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3">
                    {c.short === "Structural" ? "Structurals" : c.name}
                  </span>
                  <span className="hidden text-sm text-graphite/70 md:block">{c.families.slice(0, 4).join(" · ")}</span>
                  <span className="flex size-10 items-center justify-center rounded-full border border-ink/15 text-navy transition-colors duration-300 group-hover:border-navy group-hover:bg-navy group-hover:text-white md:size-12">
                    <Arrow />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
