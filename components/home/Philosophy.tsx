"use client";

import { useRef } from "react";
import { ClipboardCheck, Factory, Truck, Warehouse, type LucideIcon } from "lucide-react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { SectionHead } from "@/components/ui/SectionHead";
import { Img } from "@/components/ui/Img";

const steps: { k: string; Icon: LucideIcon; text: string; tag: string }[] = [
  {
    k: "Specify",
    Icon: ClipboardCheck,
    text: "We start from your drawing or BOQ — grade, size, standard and quantity — so the quote matches the requirement exactly.",
    tag: "Grade · size · standard confirmed",
  },
  {
    k: "Source",
    Icon: Factory,
    text: "Material is sourced from established mills and brands, with alternatives offered when a specific item is short.",
    tag: "Leading Indian brands",
  },
  {
    k: "Stock",
    Icon: Warehouse,
    text: "Regular sections, pipes and flat steel are held at our Varanasi stockyard; other items are procured to order.",
    tag: "Akhari Bypass stockyard",
  },
  {
    k: "Supply",
    Icon: Truck,
    text: "Orders are consolidated and dispatched to site, with a single point of contact from enquiry to delivery.",
    tag: "One contact, one dispatch",
  },
];

/**
 * Supply philosophy: heading and photograph on the left, a vertical four-step
 * timeline on the right whose gold spine fills as the reader scrolls.
 */
export function Philosophy({ index = "11" }: { index?: string }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          "[data-spine]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-steps]", start: "top 75%", end: "bottom 60%", scrub: true },
          },
        );
        gsap.utils.toArray<HTMLElement>("[data-step]").forEach((el) => {
          gsap.from(el, {
            x: 24,
            autoAlpha: 0,
            duration: 0.9,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="quality" aria-labelledby="philosophy-title" className="relative bg-ivory py-14 md:py-20">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left: statement + image */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <SectionHead
              align="stack"
              index={index}
              label="Quality & supply philosophy"
              title={<span id="philosophy-title">Specification first. Always.</span>}
              intro="Steel is only as good as its match to the job. Our process is built around getting the specification right before anything moves."
            />
            <figure className="relative mt-8 hidden aspect-[4/3] overflow-hidden bg-bone lg:block">
              <Img k="ibeamsYard" fill sizes="36vw" className="object-cover" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/85 to-transparent p-5 pt-12">
                <span className="font-display text-xl leading-snug text-white">
                  &ldquo;The right grade, the right size, the right standard — before a single bar moves.&rdquo;
                </span>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Right: timeline */}
        <div data-steps className="relative lg:col-span-7">
          <div className="absolute top-6 bottom-6 left-[1.4rem] w-px bg-line md:left-[1.65rem]" aria-hidden="true">
            <div data-spine className="h-full w-px origin-top bg-gold" />
          </div>
          <ol className="space-y-4">
            {steps.map(({ k, Icon, text, tag }, i) => (
              <li key={k} data-step className="relative grid grid-cols-[2.8rem_1fr] gap-4 md:grid-cols-[3.3rem_1fr] md:gap-6">
                <span className="relative z-10 flex size-11 items-center justify-center border border-navy bg-navy text-gold-soft md:size-[3.3rem]">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div className="group border border-line bg-paper p-5 transition-colors duration-500 hover:border-navy hover:bg-navy sm:p-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-[1.9rem] leading-none text-navy uppercase transition-colors duration-500 group-hover:text-white md:text-[2.2rem]">
                      {k}
                    </h3>
                    <span className="font-mono text-xs text-steel transition-colors group-hover:text-gold-soft">
                      Step {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-3 max-w-lg text-[0.95rem] leading-relaxed text-graphite/85 transition-colors duration-500 group-hover:text-white/75">
                    {text}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-2 border-t border-line pt-3 text-[0.78rem] font-medium text-gold transition-colors duration-500 group-hover:border-white/15 group-hover:text-gold-soft">
                    <span className="size-1.5 bg-current" aria-hidden="true" />
                    {tag}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
