import type { Metadata } from "next";
import { industries } from "@/data/industries";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { Img } from "@/components/ui/Img";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Industries We Serve — Construction, Infrastructure, Fabrication & More",
  description:
    "Steel for construction, infrastructure, industrial manufacturing, fabrication, engineering, warehousing, commercial and residential projects and agriculture — from Shri Unity Ispat, Varanasi.",
  path: "/industries",
  image: "metroViaductIndia",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        label="Industries we serve"
        title={
          <>
            From foundation
            <br />
            to framework.
          </>
        }
        subtitle="The sectors that build and run the region — and the steel each one depends on."
        image="metroIndiaCity"
        crumbs={[{ name: "Industries", path: "/industries" }]}
      />

      <section className="bg-paper py-14 md:py-20">
        <div className="container-x space-y-14 md:space-y-20">
          {industries.map((ind, i) => (
            <article key={ind.slug} id={ind.slug} className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-12">
              <div className={cn("relative aspect-[4/3] overflow-hidden bg-bone lg:col-span-7", i % 2 === 1 && "lg:order-2 lg:col-start-6")}>
                <Parallax amount={14}>
                  <Img k={ind.image} fill sizes="(min-width:1024px) 58vw, 100vw" className="object-cover" />
                </Parallax>
                <span className="label absolute top-5 left-5 bg-navy/80 px-3 py-2 text-white backdrop-blur">
                  {String(i + 1).padStart(2, "0")} / {String(industries.length).padStart(2, "0")}
                </span>
              </div>
              <div className={cn("lg:col-span-5", i % 2 ? "lg:order-1 lg:col-span-5 lg:col-start-1" : "lg:pl-6")}>
                <SplitHeading as="h2" className="font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.95] text-navy uppercase">
                  {ind.name}
                </SplitHeading>
                <Reveal delay={0.1}>
                  <p className="mt-6 max-w-md text-[1.02rem] leading-relaxed text-graphite/80">{ind.line}</p>
                  <p className="label mt-10 text-steel-dark">Typical materials</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {ind.materials.map((m) => (
                      <li key={m} className="border border-line px-3 py-1.5 text-sm text-navy">
                        {m}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </section>

      <QuoteSection index="—" />
    </>
  );
}
