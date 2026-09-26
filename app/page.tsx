import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { SteelTicker } from "@/components/home/SteelTicker";
import { Intro } from "@/components/home/Intro";
import { CapabilitiesSection } from "@/components/home/CapabilitiesSection";
import { ProductUniverse } from "@/components/home/ProductUniverse";
import { CategoryExplorer } from "@/components/home/CategoryExplorer";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhyUs } from "@/components/home/WhyUs";
import { Stockyard } from "@/components/home/Stockyard";
import { Brands } from "@/components/home/Brands";
import { Industries } from "@/components/home/Industries";
import { Infrastructure } from "@/components/home/Infrastructure";
import { Philosophy } from "@/components/home/Philosophy";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { buildMetadata } from "@/lib/seo";
import { featuredProducts } from "@/data/products";

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
  return (
    <>
      <Hero />
      <SteelTicker />
      <Intro />
      <CapabilitiesSection />
      <ProductUniverse />
      <CategoryExplorer limit={7} />
      <FeaturedProducts items={featuredProducts()} />
      <WhyUs />
      <Stockyard />
      <Brands />
      <Industries />
      <Infrastructure />
      <Philosophy />
      <QuoteSection />
      <LocationSection />
    </>
  );
}
