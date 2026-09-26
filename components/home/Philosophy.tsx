"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { SectionHead } from "@/components/ui/SectionHead";

const steps = [
  {
    k: "Specify",
    text: "We start from your drawing or BOQ — grade, size, standard and quantity — so the quote matches the requirement exactly.",
  },
  {
    k: "Source",
    text: "Material is sourced from established mills and brands, with alternatives offered when a specific item is short.",
  },
  {
    k: "Stock",
    text: "Regular sections, pipes and flat steel are held at our Varanasi stockyard; other items are procured to order.",
  },
  {
    k: "Supply",
    text: "Orders are consolidated and dispatched to site, with a single point of contact from enquiry to delivery.",
  },
];

/** Four-step supply philosophy joined by a line that draws itself on scroll. */
export function Philosophy({ index = "11" }: { index?: string }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          "[data-line]",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-steps]", start: "top 80%", end: "bottom 60%", scrub: true },
          },
        );
        gsap.from("[data-step]", {
          y: 30,
          autoAlpha: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: { trigger: "[data-steps]", start: "top 80%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="quality" aria-labelledby="philosophy-title" className="relative bg-ivory py-24 md:py-36">
      <div className="container-x">
        <SectionHead
          index={index}
          label="Quality & supply philosophy"
          title={<span id="philosophy-title">Specification first. Always.</span>}
          intro="Steel is only as good as its match to the job. Our process is built around getting the specification right before anything moves."
        />

        <div data-steps className="relative mt-16 md:mt-24">
          <div className="absolute top-[1.1rem] right-0 left-0 hidden h-px bg-line md:block" aria-hidden="true">
            <div data-line className="h-px origin-left bg-gold" />
          </div>
          <ol className="grid gap-12 md:grid-cols-4 md:gap-8">
            {steps.map((s, i) => (
              <li key={s.k} data-step className="relative">
                <span className="relative z-10 flex size-9 items-center justify-center border border-navy bg-ivory font-mono text-xs text-navy">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-8 font-display text-4xl text-navy uppercase">{s.k}</h3>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-graphite/80">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
