"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, SplitText, useGSAP, MQ } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";
import type { ImageKey } from "@/lib/images";
import { Img } from "@/components/ui/Img";
import { LinkButton } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const scenes: { k: ImageKey; label: string; pos: string }[] = [
  { k: "heroSteelPlantSunrise", label: "Steel at source", pos: "object-[62%_center]" },
  { k: "bridgeTrussIndia", label: "Infrastructure", pos: "object-center" },
  { k: "structuralSectionsWarehouse", label: "Stockyard", pos: "object-center" },
];
const SCENE_MS = 6500;

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const [scene, setScene] = useState(0);
  const [started, setStarted] = useState(false);

  // Advance the slideshow once the intro has played.
  useEffect(() => {
    if (!started) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => setScene((s) => (s + 1) % scenes.length), SCENE_MS);
    return () => window.clearInterval(id);
  }, [started]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        let split: SplitText | undefined;
        gsap.set("[data-hero-fade]", { autoAlpha: 0, y: 18 });
        gsap.set("[data-hero-title]", { autoAlpha: 0 });

        const off = onIntroDone(() => {
          setStarted(true);
          document.fonts.ready.then(() => {
            const h = root.current?.querySelector("[data-hero-title]");
            if (!h) return;
            const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
            if (window.matchMedia(MQ.desktopMotion).matches) {
              split = SplitText.create(h, { type: "lines", mask: "lines" });
              gsap.set(h, { autoAlpha: 1 });
              tl.from(split.lines, { yPercent: 115, duration: 1.4, stagger: 0.09 }, 0);
            } else {
              // Phones: a single transform/opacity tween — no line measuring.
              tl.fromTo(h, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1.1 }, 0);
            }
            tl
              .from("[data-hero-rule]", { scaleX: 0, transformOrigin: "left", duration: 1.4 }, 0)
              .to("[data-hero-fade]", { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.07 }, 0.45);
          });
        });

        return () => {
          off();
          split?.revert();
        };
      });

      // Scroll choreography is desktop-only: on phones the hero simply scrolls away.
      mm.add(MQ.desktopMotion, () => {
        const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to("[data-hero-media]", { yPercent: 12, ease: "none", scrollTrigger: st });
        gsap.to("[data-hero-content]", { yPercent: -14, autoAlpha: 0.2, ease: "none", scrollTrigger: st });
        gsap.fromTo("[data-hero-steel]", { xPercent: 4 }, { xPercent: -22, ease: "none", scrollTrigger: st });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => setStarted(true));

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
      {/* Media — cross-fading scenes with a slow Ken Burns drift */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div data-hero-media className="absolute -inset-y-[6%] inset-x-0 will-change-transform">
          {scenes.map((s, i) => (
            <div
              key={s.k}
              className={cn(
                "absolute inset-0 transition-opacity duration-[1600ms] ease-out",
                i === scene ? "opacity-100" : "opacity-0",
              )}
              aria-hidden={i !== scene}
            >
              <div
                key={i === scene ? `on-${scene}` : "off"}
                className={cn("absolute inset-0", i === scene && started && "animate-[kenburns_9s_ease-out_forwards]")}
              >
                <Img
                  k={s.k}
                  fill
                  priority={i === 0}
                  loading={i === 0 ? undefined : "lazy"}
                  sizes="100vw"
                  quality={72}
                  className={cn("object-cover", s.pos)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/75 via-navy/35 to-navy/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/35 to-transparent" />
      </div>

      {/* Giant outlined word (desktop) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-[12%] left-0 -z-[5] hidden overflow-hidden select-none md:block"
      >
        <p
          data-hero-steel
          className="font-display text-[24vw] leading-none font-semibold tracking-[-0.03em] whitespace-nowrap text-transparent uppercase [-webkit-text-stroke:1px_rgb(255_255_255/0.14)]"
        >
          Steel · Steel
        </p>
      </div>

      <div
        data-hero-content
        className="container-x relative flex flex-1 flex-col pt-[calc(var(--header-h)+1.25rem)] pb-8 sm:pt-[calc(var(--header-h)+2.5rem)] sm:pb-12"
      >
        {/* Identity strip */}
        <div data-hero-fade className="flex items-center justify-between gap-4 text-white/70">
          <p className="label">Varanasi · Uttar Pradesh</p>
          <p className="label hidden sm:block">25.31° N &nbsp;/&nbsp; 82.97° E</p>
        </div>
        <div data-hero-rule className="mt-4 h-px bg-white/25 sm:mt-5" aria-hidden="true" />

        <div className="mt-auto grid gap-8 pt-12 sm:gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p data-hero-fade className="eyebrow mb-5 flex items-center gap-3 text-[0.62rem] text-gold-soft sm:mb-7 sm:text-[0.72rem]">
              <span className="h-px w-6 shrink-0 bg-gold-soft sm:w-8" aria-hidden="true" />
              Iron &amp; Steel — The Complete Solution
            </p>
            <h1
              id="hero-title"
              data-hero-title
              className="font-display text-[clamp(2.55rem,11.5vw,8.25rem)] leading-[0.92] font-medium tracking-[-0.015em] uppercase sm:text-[clamp(3rem,8.4vw,8.25rem)]"
            >
              The material
              <br />
              behind every
              <br />
              <span className="text-gold-metal">stronger</span> tomorrow.
            </h1>
          </div>

          <div className="lg:col-span-4 lg:pb-3">
            <p data-hero-fade className="max-w-md text-[0.95rem] leading-relaxed text-white/80 sm:text-[0.98rem]">
              Reinforcement steel, structural sections, pipes, plates and industrial steel — supplied for
              construction, fabrication and infrastructure across India.
            </p>
            <div data-hero-fade className="mt-7 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:mt-8 sm:flex sm:flex-wrap">
              <LinkButton href="/products" variant="light" magnetic className="w-full sm:w-auto">
                Explore Products
              </LinkButton>
              <LinkButton href="/quote" variant="outline-light" magnetic className="w-full sm:w-auto">
                Request a Quote
              </LinkButton>
            </div>
          </div>
        </div>

        {/* Scene indicator */}
        <div data-hero-fade className="mt-10 grid grid-cols-3 gap-3 border-t border-white/15 pt-4 sm:mt-12 sm:gap-6">
          {scenes.map((s, i) => (
            <button
              key={s.k}
              type="button"
              onClick={() => setScene(i)}
              aria-pressed={i === scene}
              className="group text-left"
            >
              <span className="block h-px w-full overflow-hidden bg-white/20">
                <span
                  key={i === scene ? `bar-${scene}` : "idle"}
                  className={cn(
                    "block h-px origin-left bg-gold-soft",
                    i === scene && started ? "animate-[heroBar_6.5s_linear_forwards]" : i < scene ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </span>
              <span className={cn("label mt-3 flex gap-2 transition-colors", i === scene ? "text-white" : "text-white/45 group-hover:text-white/70")}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <span className="sr-only sm:not-sr-only">{s.label}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
