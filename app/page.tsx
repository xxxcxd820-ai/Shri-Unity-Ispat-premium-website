import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { CategoryExplorer } from "@/components/home/CategoryExplorer";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhyUs } from "@/components/home/WhyUs";
import { Stockyard } from "@/components/home/Stockyard";
import { Brands } from "@/components/home/Brands";
import { Industries } from "@/components/home/Industries";
import { Philosophy } from "@/components/home/Philosophy";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { buildMetadata } from "@/lib/seo";
import { categories } from "@/data/categories";
import { products, featuredProducts } from "@/data/products";
import { brands } from "@/data/brands";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Shri Unity Ispat — Iron & Steel Supplier in Varanasi | The Complete Solution",
    description:
      "Shri Unity Ispat, Varanasi supplies TMT bars, MS & ERW pipes, structural steel (angles, channels, beams), plates, sheets, coils, GI and roofing sheets. Multi-brand stock and B2B quotations.",
    path: "/",
    image: "heroSteelPlantSunrise",
  }),
  title: { absolute: "Shri Unity Ispat — Iron & Steel Supplier in Varanasi | The Complete Solution" },
};

export default function HomePage() {
  // Facts come straight from the catalogue data — no invented business statistics.
  const facts = [
    { value: String(categories.length), label: "Product families" },
    { value: String(products.length), label: "Catalogued products" },
    { value: String(brands.length), label: "Brands we deal in" },
    { value: "Varanasi", label: "Stockyard, Akhari Bypass" },
  ];
  return (
    <>
      <Hero facts={facts} />
      <Intro index="01" />
      <CategoryExplorer limit={7} index="02" />
      <FeaturedProducts items={featuredProducts()} index="03" />
      <WhyUs index="04" />
      <Stockyard index="05" />
      <Brands index="06" />
      <Industries index="07" />
      <Philosophy index="08" />
      <QuoteSection index="09" />
      <LocationSection index="10" />
    </>
  );
}
