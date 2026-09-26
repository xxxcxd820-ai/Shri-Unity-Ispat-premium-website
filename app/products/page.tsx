import type { Metadata } from "next";
import { Suspense } from "react";
import { Catalogue } from "@/components/catalogue/Catalogue";
import { PageHero } from "@/components/sections/PageHero";
import { CategoryCard } from "@/components/catalogue/CategoryCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { categories } from "@/data/categories";
import { products, productsByCategory } from "@/data/products";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Steel Product Catalogue — TMT, Pipes, Structurals, Plates & More",
  description:
    "Browse Shri Unity Ispat's steel catalogue: TMT bars, MS & ERW pipes, hollow sections, angles, channels, beams, plates, sheets, coils, GI, roofing, wire, stainless and specialty steel. Search and filter by grade, brand and application.",
  path: "/products",
  image: "structuralSectionsWarehouse",
});

const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4", "lg:col-span-5", "lg:col-span-7"];

export default function ProductsPage() {
  return (
    <>
      <PageHero
        label="Product catalogue"
        title={
          <>
            The complete
            <br />
            steel catalogue.
          </>
        }
        subtitle={`${products.length} products across ${categories.length} families. Search by name, grade or standard — or filter by type, brand, finish and application.`}
        image="structuralSectionsWarehouse"
        crumbs={[{ name: "Products", path: "/products" }]}
      />

      <section aria-label="Search and filter products" className="bg-paper py-16 md:py-24">
        <div className="container-x">
          <Suspense fallback={<div className="h-40" />}>
            <Catalogue />
          </Suspense>
        </div>
      </section>

      <section aria-labelledby="families-title" className="bg-ivory py-24 md:py-32">
        <div className="container-x">
          <SectionHead
            label="Browse by family"
            title={<span id="families-title">Product families.</span>}
            intro="Each family has its own landing page with applications, brands and every product in the range."
          />
          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:gap-4">
            {categories.map((c, i) => {
              const span = spans[i % spans.length];
              const size = span.includes("7") ? "lg" : span.includes("5") ? "md" : "sm";
              return (
                <Reveal key={c.slug} delay={(i % 3) * 0.05} className={cn(span, size === "lg" && "sm:col-span-2 lg:col-span-7")}>
                  <CategoryCard category={c} size={size} count={productsByCategory(c.slug).length} />
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
