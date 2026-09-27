"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { Img } from "@/components/ui/Img";
import { LinkButton } from "@/components/ui/Button";

type Fact = { value: string; label: string };

/**
 * Calm, editorial hero: one photograph, one clear message, two actions and a
 * quiet facts bar. Motion is limited to a soft entrance and a slow image drift.
 */
export function Hero({ facts }: { facts: Fact[] }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .fromTo("[data-hero-media]", { scale: 1.08 }, { scale: 1, duration: 2.4, ease: "power2.out" }, 0)
          .from("[data-hero-in]", { autoAlpha: 0, y: 22, duration: 1.1, stagger: 0.08 }, 0.15);
      });
      mm.add(MQ.desktopMotion, () => {
        gsap.to("[data-hero-media]", {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      data-hero="dark"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy text-white"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div data-hero-media className="absolute -inset-y-[4%] inset-x-0 will-change-transform">
          <Img k="heroSteelPlantSunrise" fill priority sizes="100vw" className="object-cover object-[65%_center]" />
        </div>
        {/* Even, readable scrim: dark on the text side, image breathes on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-navy/20 max-lg:via-navy/70 max-lg:to-navy/40" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy to-transparent" />
      </div>

      <div className="container-x flex flex-1 flex-col justify-center pt-[calc(var(--header-h)+3rem)] pb-10">
        <div className="max-w-[46rem]">
          <p data-hero-in className="eyebrow flex items-center gap-3 text-[0.64rem] text-gold-soft sm:text-[0.7rem]">
            <span className="h-px w-8 bg-gold-soft" aria-hidden="true" />
            Iron &amp; Steel — The Complete Solution
          </p>
          <h1
            id="hero-title"
            data-hero-in
            className="mt-6 font-display text-[clamp(2.5rem,5.4vw,5.25rem)] leading-[1] tracking-[-0.01em] uppercase"
          >
            The material behind every <span className="text-gold-soft">stronger tomorrow.</span>
          </h1>
          <p data-hero-in className="mt-6 max-w-xl text-[1rem] leading-relaxed text-white/75 sm:text-[1.05rem]">
            TMT bars, structural sections, pipes, plates, sheets and roofing — supplied from our Varanasi stockyard
            for construction, fabrication and infrastructure.
          </p>
          <div data-hero-in className="mt-9 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/products" variant="light">
              Explore products
            </LinkButton>
            <LinkButton href="/quote" variant="outline-light">
              Request a quote
            </LinkButton>
          </div>
        </div>
      </div>

      {/* Facts bar */}
      <div data-hero-in className="border-t border-white/10 bg-navy/40 backdrop-blur-sm">
        <dl className="container-x grid grid-cols-2 gap-y-4 py-5 sm:py-6 lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="flex items-baseline gap-3 lg:border-l lg:border-white/10 lg:pl-6 lg:first:border-l-0 lg:first:pl-0">
              <dt className="sr-only">{f.label}</dt>
              <dd className="font-display text-2xl leading-none text-white sm:text-3xl">{f.value}</dd>
              <span className="text-[0.7rem] leading-tight tracking-wide text-white/60 sm:text-xs" aria-hidden="true">
                {f.label}
              </span>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
