import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { brands } from "@/data/brands";
import { industries } from "@/data/industries";
import { Capabilities } from "./Capabilities";
import { SectionHead } from "@/components/ui/SectionHead";
import { Img } from "@/components/ui/Img";
import { Parallax } from "@/components/ui/Parallax";

/** Dark band of catalogue facts — counts come straight from the data files. */
export function CapabilitiesSection() {
  const stats = [
    { value: categories.length, label: "Product families", note: "From TMT and tubulars to stainless and industrial steel." },
    { value: products.length, label: "Catalogued products", note: "Each with its own specification page." },
    { value: brands.length, label: "Brands we deal in", note: "Leading Indian steel makers under one roof." },
    { value: industries.length, label: "Industries served", note: "Construction, infrastructure, fabrication and more." },
  ];
  return (
    <section aria-labelledby="cap-title" className="relative isolate overflow-hidden bg-navy py-20 text-white md:py-32">
      <div className="absolute inset-0 -z-10 opacity-25">
        <Parallax amount={18}>
          <Img k="coilsWarehouse" fill sizes="100vw" quality={60} className="object-cover" />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/70 to-navy" />
      </div>
      <div className="bg-blueprint-dark pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="container-x">
        <SectionHead
          tone="dark"
          label="At a glance"
          title={<span id="cap-title">One supplier. The complete range.</span>}
          intro="Everything a project needs in steel — specified, sourced and supplied from Varanasi."
        />
        <div className="mt-14 md:mt-20">
          <Capabilities stats={stats} />
        </div>
      </div>
    </section>
  );
}
