import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { brands } from "@/data/brands";
import type { ImageKey } from "./images";

/**
 * Minimal data the quote form needs, built on the server and passed as props so
 * the full product catalogue is never shipped to the browser just for the form.
 */
export type QuoteOptions = {
  categories: { slug: string; name: string; image: ImageKey }[];
  products: Record<string, { slug: string; name: string; grades: string[] }[]>;
  brands: Record<string, string[]>;
};

export function getQuoteOptions(): QuoteOptions {
  return {
    categories: categories.map((c) => ({ slug: c.slug, name: c.name, image: c.image })),
    products: Object.fromEntries(
      categories.map((c) => [
        c.slug,
        products
          .filter((p) => p.category === c.slug)
          .map((p) => ({
            slug: p.slug,
            name: p.name,
            grades: p.grades.filter((g) => g !== "On request" && g !== "As per design").slice(0, 5),
          })),
      ]),
    ),
    brands: Object.fromEntries(
      categories.map((c) => [c.slug, brands.filter((b) => b.categories.includes(c.slug)).map((b) => b.name)]),
    ),
  };
}
