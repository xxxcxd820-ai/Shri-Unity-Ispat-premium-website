import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Intro } from "@/components/home/Intro";
import { WhyUs } from "@/components/home/WhyUs";
import { Philosophy } from "@/components/home/Philosophy";
import { Brands } from "@/components/home/Brands";
import { LocationSection } from "@/components/sections/LocationSection";
import { LinkButton } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About — Iron & Steel Supplier, Distributor and Stockist in Varanasi",
  description:
    "Shri Unity Ispat is an iron and steel supplier, distributor and stockist based on Akhari Bypass, Varanasi, serving construction, infrastructure, fabrication and industry.",
  path: "/about",
  image: "stockRacksMono",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About Shri Unity Ispat"
        title={
          <>
            Building tomorrow,
            <br />
            together.
          </>
        }
        subtitle="An iron and steel supplier, distributor and stockist from Varanasi — built around a wide product range, dependable supply and practical B2B support."
        image="stockRacksMono"
        crumbs={[{ name: "About", path: "/about" }]}
      >
        <LinkButton href="/products" variant="light">
          Explore products
        </LinkButton>
      </PageHero>
      <Intro index="01" />
      <WhyUs index="02" />
      <Philosophy index="03" />
      <Brands index="04" />
      <LocationSection index="05" />
    </>
  );
}
