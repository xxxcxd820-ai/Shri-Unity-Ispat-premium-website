import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { StockyardGallery } from "@/components/sections/StockyardGallery";
import { LocationSection } from "@/components/sections/LocationSection";
import { SectionHead } from "@/components/ui/SectionHead";
import { LinkButton } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";
import { directionsHref } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Stockyard — Pipes, Sections, Flats, Sheets & Bars in Varanasi",
  description:
    "Shri Unity Ispat's stockyard on Akhari Bypass, Varanasi carries pipes, angles, channels, flats, structural sections, sheets and bars.",
  path: "/stockyard",
  image: "stockRacksBars",
});

const families = ["Pipes", "Angles", "Channels", "Flats", "Structural sections", "Sheets", "Bars", "TMT"];

export default function StockyardPage() {
  return (
    <>
      <PageHero
        label="Stockyard"
        title={
          <>
            The material
            <br />
            behind the promise.
          </>
        }
        subtitle="Everyday sections, tubulars and flat steel held on Akhari Bypass, Varanasi."
        image="stockRacksBars"
        crumbs={[{ name: "Stockyard", path: "/stockyard" }]}
      >
        <LinkButton href={directionsHref} variant="light">
          Get directions
        </LinkButton>
      </PageHero>

      <section aria-labelledby="gallery-title" className="bg-paper py-14 md:py-20">
        <div className="container-x">
          <SectionHead
            label="Gallery"
            title={<span id="gallery-title">What we handle.</span>}
            intro="Select any photograph to view it full screen. Use the arrow keys to move between photos."
          />
          <ul className="mt-10 flex flex-wrap gap-2">
            {families.map((f) => (
              <li key={f} className="border border-line px-4 py-2 text-xs font-semibold tracking-[0.14em] text-graphite uppercase">
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <StockyardGallery />
          </div>
        </div>
      </section>

      <LocationSection index="—" />
    </>
  );
}
