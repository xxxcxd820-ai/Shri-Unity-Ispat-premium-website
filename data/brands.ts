/**
 * Brands shown in the client's supplied reference material.
 * These are presented as "Brands we deal in" — never as authorised
 * dealerships or distributorships unless that is verified.
 *
 * `logo` is optional: add an official logo file under /public/brands and set
 * its path here once the client confirms usage is permitted. Until then the
 * UI renders a clean typographic wordmark.
 */

export type Brand = {
  slug: string;
  name: string;
  /** Short line describing the product lines we typically source under this brand. */
  lines: string;
  categories: string[];
  logo?: string;
};

export const brands: Brand[] = [
  {
    slug: "tata-tiscon",
    name: "Tata Tiscon",
    lines: "TMT reinforcement bars",
    categories: ["tmt-reinforcement"],
  },
  {
    slug: "tata-structura",
    name: "Tata Structura",
    lines: "Structural hollow sections",
    categories: ["pipes-tubes"],
  },
  {
    slug: "sail",
    name: "SAIL",
    lines: "TMT, structurals, plates, coils & rails",
    categories: [
      "tmt-reinforcement",
      "structural-steel",
      "plates-sheets",
      "hr-cr-coils",
      "industrial-steel",
    ],
  },
  {
    slug: "jsw",
    name: "JSW",
    lines: "TMT, coils, galvanised & colour coated",
    categories: ["tmt-reinforcement", "hr-cr-coils", "gi-galvanized", "color-coated-roofing"],
  },
  {
    slug: "shyam-steel",
    name: "Shyam Steel",
    lines: "TMT bars & structural steel",
    categories: ["tmt-reinforcement", "structural-steel"],
  },
  {
    slug: "apl-apollo",
    name: "APL Apollo",
    lines: "Pipes, hollow sections & roofing",
    categories: ["pipes-tubes", "gi-galvanized", "color-coated-roofing"],
  },
  {
    slug: "kamdhenu",
    name: "Kamdhenu Steel",
    lines: "TMT reinforcement bars",
    categories: ["tmt-reinforcement"],
  },
  {
    slug: "srmb",
    name: "SRMB Real Edge",
    lines: "TMT reinforcement bars",
    categories: ["tmt-reinforcement"],
  },
  {
    slug: "sul",
    name: "SUL",
    lines: "Steel products",
    categories: [],
  },
];

export const brandBySlug = (slug: string) => brands.find((b) => b.slug === slug);
