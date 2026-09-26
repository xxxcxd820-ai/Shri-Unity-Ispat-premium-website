import { StockyardGallery } from "@/components/sections/StockyardGallery";
import { SectionHead } from "@/components/ui/SectionHead";
import { LinkButton } from "@/components/ui/Button";

const held = ["Pipes", "Angles", "Channels", "Flats", "Structural sections", "Sheets", "Bars"];

export function Stockyard() {
  return (
    <section aria-labelledby="stockyard-title" className="bg-paper py-20 md:py-36">
      <div className="container-x">
        <SectionHead
          index="07"
          label="Stockyard"
          title={<span id="stockyard-title">The material behind the promise.</span>}
          intro="Our Varanasi stockyard carries the everyday sections, tubulars and flat steel that keep fabrication shops and sites moving."
        />

        <ul className="mt-12 flex flex-wrap gap-2 md:mt-16">
          {held.map((h) => (
            <li key={h} className="border border-line px-4 py-2 text-xs font-semibold tracking-[0.14em] text-graphite uppercase">
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <StockyardGallery limit={6} />
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-line pt-8 sm:flex-row sm:items-center">
          <p className="max-w-lg text-xs leading-relaxed text-steel-dark">
            Photography shows the product families we handle. Visit the stockyard page for the full gallery.
          </p>
          <LinkButton href="/stockyard" variant="outline">
            View stockyard
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
