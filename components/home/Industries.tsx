"use client";

import Link from "next/link";
import { useRef } from "react";
import { industries } from "@/data/industries";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { Img } from "@/components/ui/Img";
import { Arrow } from "@/components/ui/Arrow";

/**
 * Horizontal storytelling. On desktop the section pins and the panels travel
 * sideways while each photograph counter-drifts for depth. On smaller screens
 * the panels become a swipeable rail.
 */
export function Industries() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.desktopMotion, () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;
        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.7,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        gsap.utils.toArray<HTMLElement>("[data-industry-img]").forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: 8 },
            {
              xPercent: -8,
              ease: "none",
              scrollTrigger: {
                trigger: img.closest("[data-industry]"),
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="industries-title" className="relative overflow-hidden bg-navy text-white lg:h-svh">
      <div
        ref={track}
        className="no-scrollbar flex h-full snap-x snap-mandatory items-stretch gap-3 overflow-x-auto px-4 py-24 sm:px-7 lg:snap-none lg:gap-4 lg:overflow-visible lg:py-0 lg:pr-[10vw] lg:pl-0"
      >
        {/* Intro panel */}
        <div className="flex w-[85vw] shrink-0 snap-start flex-col justify-center sm:w-[60vw] lg:w-[46vw] lg:px-[clamp(2.5rem,5vw,5rem)]">
          <div className="mb-6 flex items-center gap-4 text-white/60">
            <span className="label text-gold-soft">09</span>
            <span className="h-px w-10 bg-white/30" aria-hidden="true" />
            <span className="label">Industries we serve</span>
          </div>
          <h2 id="industries-title" className="font-display text-[clamp(2.8rem,6.2vw,6.4rem)] leading-[0.92] uppercase">
            From foundation
            <br />
            <span className="text-gold-metal">to framework.</span>
          </h2>
          <p className="mt-8 max-w-md text-[0.98rem] leading-relaxed text-white/65">
            The same steel shows up in a village shed and a metro viaduct. We supply across the sectors that build and
            run the region.
          </p>
          <Link href="/industries" className="group mt-10 inline-flex items-center gap-3 text-[0.7rem] font-semibold tracking-[0.2em] text-white uppercase">
            All industries <Arrow />
          </Link>
          <p className="label mt-16 hidden text-white/40 lg:block">Scroll to travel →</p>
        </div>

        {industries.map((ind, i) => (
          <article
            key={ind.slug}
            data-industry
            className="group relative w-[80vw] shrink-0 snap-start overflow-hidden sm:w-[55vw] lg:my-[12vh] lg:w-[34vw]"
          >
            <div className="relative h-[62vh] overflow-hidden lg:h-full">
              <div data-industry-img className="absolute -inset-x-[10%] inset-y-0">
                <Img k={ind.image} fill sizes="(min-width:1024px) 40vw, 80vw" className="object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/35 to-navy/10" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
              <span className="label text-white/70">
                {String(i + 1).padStart(2, "0")} / {String(industries.length).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-[clamp(2rem,3vw,3rem)] leading-[0.95] uppercase">{ind.name}</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">{ind.line}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {ind.materials.map((m) => (
                    <li key={m} className="border border-white/25 px-2.5 py-1 text-[0.68rem] tracking-wide text-white/85">
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
