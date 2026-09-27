import Link from "next/link";
import { industries } from "@/data/industries";
import { Img } from "@/components/ui/Img";
import { Arrow } from "@/components/ui/Arrow";
import { SectionHead } from "@/components/ui/SectionHead";
import { ScrollRail } from "@/components/ui/ScrollRail";

/** Industries served, as a swipeable rail of photo cards. */
export function Industries({ index = "07" }: { index?: string }) {
  return (
    <section aria-labelledby="industries-title" className="relative overflow-hidden bg-navy py-14 text-white md:py-20">
      <div className="bg-blueprint-dark pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-x relative">
        <SectionHead
          tone="dark"
          index={index}
          label="Industries we serve"
          title={<span id="industries-title">From foundation to framework.</span>}
          intro={
            <>
              The same steel shows up in a village shed and a metro viaduct. We supply across the sectors that build
              and run the region.
              <Link href="/industries" className="group mt-5 flex w-fit items-center gap-3 text-[0.7rem] font-semibold tracking-[0.2em] text-white uppercase">
                All industries <Arrow />
              </Link>
            </>
          }
        />
        <ScrollRail label="Industries" tone="dark" className="mt-10">
          {industries.map((ind, i) => (
            <article key={ind.slug} className="group relative w-[78%] shrink-0 snap-start overflow-hidden sm:w-[46%] lg:w-[calc((100%-2rem)/3)]">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Img
                  k={ind.image}
                  fill
                  sizes="(min-width:1024px) 30vw, (min-width:640px) 46vw, 78vw"
                  className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
              </div>
              <div className="absolute inset-0 flex flex-col justify-between p-6">
                <span className="label text-white/70">
                  {String(i + 1).padStart(2, "0")} / {String(industries.length).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-[1.9rem] leading-[1] uppercase">{ind.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/75">{ind.line}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {ind.materials.map((m) => (
                      <li key={m} className="border border-white/25 px-2 py-0.5 text-[0.68rem] text-white/85">
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </ScrollRail>
      </div>
    </section>
  );
}
