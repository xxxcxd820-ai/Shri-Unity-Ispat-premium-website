"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, MQ } from "@/lib/gsap";
import { Img } from "@/components/ui/Img";
import { LinkButton } from "@/components/ui/Button";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.fromTo("[data-hero-media]", { scale: 1.18 }, { scale: 1, duration: 2.6, ease: "power3.out" }, 0)
          .from("[data-hero-rule]", { scaleX: 0, transformOrigin: "left", duration: 1.4 }, 0.3)
          .from("[data-hero-fade]", { autoAlpha: 0, y: 18, duration: 1.2, stagger: 0.08 }, 0.9);

        let split: SplitText | undefined;
        document.fonts.ready.then(() => {
          const h = root.current?.querySelector("[data-hero-title]");
          if (!h) return;
          split = SplitText.create(h, { type: "lines", mask: "lines" });
          gsap.from(split.lines, { yPercent: 115, duration: 1.5, ease: "expo.out", stagger: 0.1, delay: 0.35 });
        });

        // Scroll choreography — background drifts slower than content, STEEL slides sideways.
        gsap.to("[data-hero-media]", {
          yPercent: 14,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-hero-content]", {
          yPercent: -18,
          autoAlpha: 0.1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.fromTo(
          "[data-hero-steel]",
          { xPercent: 4 },
          {
            xPercent: -22,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
          },
        );

        return () => split?.revert();
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
      className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy text-white"
    >
      {/* Media */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div data-hero-media className="absolute -inset-y-[8%] inset-x-0 will-change-transform">
          <Img k="heroSteelPlantSunrise" fill priority sizes="100vw" className="object-cover object-[60%_center]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/25 to-navy/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/30 to-transparent" />
      </div>

      {/* Giant outlined word */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-[16%] left-0 -z-[5] overflow-hidden select-none sm:bottom-[10%]"
      >
        <p
          data-hero-steel
          className="font-display text-[34vw] leading-none font-semibold tracking-[-0.03em] whitespace-nowrap text-transparent uppercase [-webkit-text-stroke:1px_rgb(255_255_255/0.16)] lg:text-[24vw]"
        >
          Steel · Steel
        </p>
      </div>

      <div data-hero-content className="container-x relative flex flex-1 flex-col pt-[calc(var(--header-h)+2.5rem)] pb-10 sm:pb-14">
        {/* Identity strip */}
        <div data-hero-fade className="flex flex-wrap items-center justify-between gap-4 text-white/70">
          <p className="label">Shri Unity Ispat · Varanasi</p>
          <p className="label hidden sm:block">25.31° N &nbsp;/&nbsp; 82.97° E</p>
        </div>
        <div data-hero-rule className="mt-5 h-px bg-white/25" aria-hidden="true" />

        <div className="mt-auto grid gap-10 pt-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p data-hero-fade className="eyebrow mb-7 flex items-center gap-3 text-gold-soft">
              <span className="h-px w-8 bg-gold-soft" aria-hidden="true" />
              Iron &amp; Steel — The Complete Solution
            </p>
            <h1
              id="hero-title"
              data-hero-title
              className="font-display text-[clamp(2.9rem,8.4vw,8.25rem)] leading-[0.9] font-medium tracking-[-0.015em] uppercase"
            >
              The material
              <br />
              behind every
              <br />
              <em className="text-gold-metal not-italic">stronger</em> tomorrow.
            </h1>
          </div>

          <div className="lg:col-span-4 lg:pb-3">
            <p data-hero-fade className="max-w-md text-[0.98rem] leading-relaxed text-white/80">
              From reinforcement steel to structural sections, pipes, plates and industrial steel products — Shri
              Unity Ispat supplies quality materials for construction, fabrication and infrastructure across India.
            </p>
            <div data-hero-fade className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/products" variant="light" magnetic>
                Explore Products
              </LinkButton>
              <LinkButton href="/quote" variant="outline-light" magnetic>
                Request a Quote
              </LinkButton>
            </div>
          </div>
        </div>

        <div data-hero-fade className="mt-12 flex items-center justify-between border-t border-white/15 pt-5 text-white/60">
          <span className="label">TMT · Pipes · Structurals · Plates · Coils · Roofing</span>
          <span className="label hidden items-center gap-3 md:flex">
            Scroll
            <span className="relative block h-8 w-px overflow-hidden bg-white/20">
              <span className="absolute inset-x-0 top-0 h-3 animate-[scrollcue_2.2s_ease-in-out_infinite] bg-gold-soft" />
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
