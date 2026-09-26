import { Img } from "@/components/ui/Img";
import { MaskReveal, Reveal } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Parallax } from "@/components/ui/Parallax";
import { DimensionLine } from "@/components/ui/DimensionLine";
import { LinkButton } from "@/components/ui/Button";

const pillars = [
  { n: "01", title: "Quality-focused sourcing", text: "Material from established Indian mills and brands, specified to the relevant IS standard." },
  { n: "02", title: "Wide product portfolio", text: "Reinforcement, tubulars, structurals, flat steel, roofing and wire — under one roof." },
  { n: "03", title: "Reliable supply", text: "Stock held in Varanasi, with procurement for items outside the regular range." },
  { n: "04", title: "B2B steel solutions", text: "Consolidated quotes for contractors, fabricators, builders and industry." },
];

export function Intro({ index = "02" }: { index?: string }) {
  return (
    <section aria-labelledby="intro-title" className="relative overflow-hidden bg-paper py-20 md:py-36">
      <div className="bg-blueprint pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" aria-hidden="true" />
      <div className="container-x relative">
        <div className="mb-14 flex items-center gap-4 text-steel-dark">
          <span className="label text-gold">{index}</span>
          <span className="h-px w-10 bg-ink/20" aria-hidden="true" />
          <span className="label">The company</span>
        </div>

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <SplitHeading
              as="h2"
              id="intro-title"
              className="font-display text-[clamp(2.5rem,5.6vw,5.6rem)] leading-[0.95] text-navy uppercase"
            >
              We don&rsquo;t just supply steel. We supply the <em className="text-gold not-italic">foundation</em> of
              progress.
            </SplitHeading>

            <Reveal delay={0.1} className="mt-12 grid gap-6 text-[1.02rem] leading-relaxed text-graphite/85 md:grid-cols-2 md:gap-10">
              <p>
                Shri Unity Ispat is an iron and steel supplier, distributor and stockist serving construction,
                infrastructure, fabrication, engineering and industrial requirements from its base on Akhari Bypass,
                Varanasi.
              </p>
              <p>
                We bring together a wide product range across multiple leading brands — with stock availability,
                timely delivery and hands-on B2B support — so project teams can source reinforcement, sections,
                pipes, sheets and more through a single, dependable partner.
              </p>
            </Reveal>

            <Reveal delay={0.2} className="mt-10">
              <LinkButton href="/about" variant="outline">
                About Shri Unity Ispat
              </LinkButton>
            </Reveal>
          </div>

          <div className="relative lg:col-span-5">
            <MaskReveal className="relative aspect-[4/5] overflow-hidden bg-bone">
              <Parallax amount={16}>
                <Img k="structuralSectionsWarehouse" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
              </Parallax>
            </MaskReveal>
            <div className="absolute -bottom-6 left-6 bg-navy px-5 py-4 text-white sm:-left-8">
              <p className="label text-gold-soft">Base</p>
              <p className="mt-1 font-display text-2xl">Varanasi, U.P.</p>
            </div>
            <DimensionLine label="Stockyard · Akhari Bypass" className="mt-14" />
          </div>
        </div>

        <ol className="mt-24 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <li key={p.n} className="group border-b border-line py-8 sm:odd:pr-8 lg:border-r lg:border-b-0 lg:px-8 lg:first:pl-0 lg:last:border-r-0">
              <Reveal delay={i * 0.08}>
                <p className="font-display text-5xl text-steel/60 transition-colors duration-500 group-hover:text-gold">{p.n}</p>
                <h3 className="mt-6 text-sm font-bold tracking-[0.14em] text-navy uppercase">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-graphite/75">{p.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
