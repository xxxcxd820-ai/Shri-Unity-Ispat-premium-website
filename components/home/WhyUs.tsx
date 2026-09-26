"use client";

import { useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Img } from "@/components/ui/Img";
import { SectionHead } from "@/components/ui/SectionHead";
import type { ImageKey } from "@/lib/images";
import { cn } from "@/lib/utils";

const points: { title: string; text: string; image: ImageKey }[] = [
  {
    title: "Quality sourcing",
    text: "Material from established mills and brands, matched to the grade and IS standard your drawings call for.",
    image: "blastFurnace",
  },
  {
    title: "Wide product range",
    text: "Reinforcement, pipes, structurals, bars, plates, coils, roofing, wire and stainless — one supplier for the full bill of materials.",
    image: "structuralSectionsWarehouse",
  },
  {
    title: "Multi-brand availability",
    text: "Leading Indian steel brands under one roof, so you can compare and choose rather than wait on a single mill.",
    image: "tmtBarsStack",
  },
  {
    title: "Stockyard access",
    text: "Material held at our stockyard on Akhari Bypass, Varanasi — close to the projects we serve.",
    image: "stockRacksMono",
  },
  {
    title: "Reliable, timely supply",
    text: "Straight answers on quantity and dispatch, with procurement support for items outside the regular range.",
    image: "pipesRustyStack",
  },
  {
    title: "B2B support",
    text: "Consolidated quotations, mixed-size orders and a single point of contact for contractors, fabricators and industry.",
    image: "weldingSparks",
  },
];

/** Editorial list with a sticky photograph that changes as each point is hovered or focused. */
export function WhyUs({ index = "06" }: { index?: string }) {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);

  return (
    <section aria-labelledby="why-title" className="relative bg-navy py-24 text-white md:py-36">
      <div className="bg-blueprint-dark pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-x relative">
        <SectionHead
          tone="dark"
          index={index}
          label="Why Shri Unity Ispat"
          title={<span id="why-title">Steel, sourced with intent.</span>}
          intro="What a steel supplier should be: dependable on specification, clear on availability and easy to work with."
        />

        <div className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-12">
          <div className="relative hidden lg:col-span-5 lg:block">
            <div className="sticky top-[calc(var(--header-h)+2rem)] aspect-[4/5] overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <m.div
                  key={active}
                  className="absolute inset-0"
                  initial={{ clipPath: "inset(0 0 0 100%)" }}
                  animate={{ clipPath: "inset(0 0 0 0%)" }}
                  exit={{ opacity: 0.6 }}
                  transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
                >
                  <Img k={points[active].image} fill sizes="40vw" className="object-cover" />
                </m.div>
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-navy/80 to-transparent p-6">
                <span className="label text-white/70">{String(active + 1).padStart(2, "0")} / {String(points.length).padStart(2, "0")}</span>
                <span className="label text-gold-soft">{points[active].title}</span>
              </div>
            </div>
          </div>

          <ol ref={listRef} className="border-t border-white/15 lg:col-span-7">
            {points.map((p, i) => (
              <li key={p.title} className="border-b border-white/15">
                <button
                  type="button"
                  onPointerEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  className="group grid w-full grid-cols-[3.5rem_1fr] gap-4 py-8 text-left md:grid-cols-[5rem_1fr] md:py-10"
                >
                  <span className={cn("label pt-2 transition-colors duration-500", active === i ? "text-gold-soft" : "text-white/40")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span
                      className={cn(
                        "block font-display text-[clamp(1.8rem,3.4vw,3rem)] leading-none uppercase transition-[color,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        active === i ? "translate-x-2 text-white" : "text-white/55 group-hover:text-white/80",
                      )}
                    >
                      {p.title}
                    </span>
                    <span className="mt-4 block max-w-xl text-[0.95rem] leading-relaxed text-white/65">{p.text}</span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "mt-6 block h-px origin-left bg-gold-soft transition-transform duration-700",
                        active === i ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
