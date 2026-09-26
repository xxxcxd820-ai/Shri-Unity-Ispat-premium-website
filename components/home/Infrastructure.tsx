import Link from "next/link";
import { Img } from "@/components/ui/Img";
import { Parallax } from "@/components/ui/Parallax";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Reveal } from "@/components/ui/Reveal";
import { categories } from "@/data/categories";

/** Full-bleed statement over infrastructure photography, followed by application tiles. */
export function Infrastructure() {
  const apps = [
    { title: "Bridges & flyovers", image: "bridgeTrussIndia" as const, cat: "structural-steel" },
    { title: "Metro & transit", image: "metroIndiaCity" as const, cat: "tmt-reinforcement" },
    { title: "High-rise & housing", image: "constructionIndiaHighrise" as const, cat: "tmt-reinforcement" },
    { title: "Sheds & warehouses", image: "roofColourCoated" as const, cat: "color-coated-roofing" },
  ];
  return (
    <section aria-labelledby="infra-title" className="bg-paper">
      <div className="grain relative isolate flex min-h-[90svh] items-end overflow-hidden text-white">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <Parallax amount={18}>
            <Img k="bridgeArchIndia" fill sizes="100vw" className="object-cover" />
          </Parallax>
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-navy/10" />
        </div>
        <div className="container-x pb-16 md:pb-24">
          <div className="mb-6 flex items-center gap-4 text-white/70">
            <span className="label text-gold-soft">10</span>
            <span className="h-px w-10 bg-white/40" aria-hidden="true" />
            <span className="label">Steel applications</span>
          </div>
          <SplitHeading id="infra-title" className="font-display text-[length:var(--text-display)] leading-[0.92] uppercase">
            Steel builds
            <br />
            nations.
          </SplitHeading>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl text-[1rem] leading-relaxed text-white/75">
              Bridges, corridors, towers and the sheds that house industry — modern India is framed, reinforced and
              roofed in steel. Our role is to get the right material to the people building it.
            </p>
          </Reveal>
        </div>
      </div>

      <ul className="grid grid-cols-2 lg:grid-cols-4">
        {apps.map((a) => {
          const c = categories.find((x) => x.slug === a.cat)!;
          return (
            <li key={a.title} className="border-r border-b border-line last:border-r-0">
              <Link href={`/products/${a.cat}`} className="group relative block aspect-[4/5] overflow-hidden sm:aspect-[4/3]">
                <Img k={a.image} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover grayscale-[35%] transition-all duration-[1.2s] group-hover:scale-105 group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/85 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-6">
                  <p className="label text-gold-soft">{c.short}</p>
                  <p className="mt-2 font-display text-xl leading-tight uppercase sm:text-2xl">{a.title}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
