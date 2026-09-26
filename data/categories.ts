import type { ImageKey } from "@/lib/images";

export type Category = {
  slug: string;
  /** Two-digit catalogue index shown in the UI, e.g. "01". */
  index: string;
  name: string;
  /** Compact label for filters and chips. */
  short: string;
  headline: string;
  intro: string;
  image: ImageKey;
  /** Optional secondary image used on the category landing page. */
  detailImage?: ImageKey;
  applications: string[];
  /** Short family descriptors shown on hover in the catalogue grid. */
  families: string[];
};

export const categories: Category[] = [
  {
    slug: "tmt-reinforcement",
    index: "01",
    name: "TMT & Reinforcement",
    short: "TMT",
    headline: "Strength engineered into every bar.",
    intro:
      "Thermo-mechanically treated reinforcement bars and binding wire for RCC construction — sourced from leading Indian mills across the grades specified by IS 1786.",
    image: "tmtBarsStack",
    detailImage: "tmtCoils",
    applications: [
      "Residential construction",
      "Commercial buildings",
      "Infrastructure",
      "Bridges",
      "Industrial structures",
    ],
    families: ["TMT bars", "Rebars", "Fe 500 – Fe 550D", "Binding wire"],
  },
  {
    slug: "pipes-tubes",
    index: "02",
    name: "Pipes & Tubes",
    short: "Pipes",
    headline: "Reliable tubular steel for every line and frame.",
    intro:
      "MS and ERW round pipes, square and rectangular hollow sections, structural tubes and GI pipes for fabrication, construction, water lines and industrial use.",
    image: "pipesRustyStack",
    detailImage: "tubesStainlessLine",
    applications: ["Fabrication", "Construction", "Water systems", "Industrial applications", "Scaffolding & frames"],
    families: ["MS round", "ERW", "SHS / RHS", "CHS", "GI pipes"],
  },
  {
    slug: "structural-steel",
    index: "03",
    name: "Structural Steel",
    short: "Structural",
    headline: "Built for the frameworks that shape progress.",
    intro:
      "Angles, channels, beams, joists and Z sections to IS 808 profiles and IS 2062 grades — the load-bearing vocabulary of every industrial and infrastructure build.",
    image: "structuralSectionsWarehouse",
    detailImage: "ibeamsYard",
    applications: ["Warehouses", "Industrial buildings", "Infrastructure", "Fabrication"],
    families: ["Angles", "Channels", "ISMB / ISWB", "Joists", "Z sections"],
  },
  {
    slug: "bars-flats",
    index: "04",
    name: "Bars & Flats",
    short: "Bars",
    headline: "Solid sections, machined to purpose.",
    intro:
      "Round, square, flat and tee bars for fabrication, machining, gates, grills and general engineering.",
    image: "stockRacksBars",
    detailImage: "roundBarsFactory",
    applications: ["Fabrication", "Machining & engineering", "Gates, grills & railings", "Structural brackets"],
    families: ["Round bars", "Square bars", "Flat bars", "Tee bars"],
  },
  {
    slug: "plates-sheets",
    index: "05",
    name: "Plates & Sheets",
    short: "Plates",
    headline: "Flat steel with heavy-duty intent.",
    intro:
      "MS and HR plates, HR and CR sheets and chequered floor plates for heavy fabrication, equipment building and structural work.",
    image: "chequeredPlate",
    detailImage: "sheetProcessingLine",
    applications: ["Heavy fabrication", "Industrial equipment", "Structural applications", "Flooring & platforms"],
    families: ["MS plates", "HR plates", "HR / CR sheets", "Chequered plates", "Structural plates"],
  },
  {
    slug: "hr-cr-coils",
    index: "06",
    name: "HR / CR Coils",
    short: "Coils",
    headline: "Rolled for continuous production.",
    intro:
      "Hot rolled, cold rolled and galvanised coils for pipe mills, roll-formers, fabricators and OEM production lines.",
    image: "coilsWarehouse",
    detailImage: "coilsCloseup",
    applications: ["Pipe & tube making", "Roll forming", "Automotive & OEM", "Appliances & panels"],
    families: ["HR coils", "CR coils", "GI coils", "GP coils"],
  },
  {
    slug: "gi-galvanized",
    index: "07",
    name: "GI / Galvanised Steel",
    short: "GI",
    headline: "Zinc-armoured for long service.",
    intro:
      "Galvanised sheets, coils, pipes and hollow sections where corrosion resistance matters — from rooftops to water lines.",
    image: "giPipesBundles",
    detailImage: "giCoilsStack",
    applications: ["Roofing & cladding", "Water systems", "Ducting", "Fencing & outdoor structures"],
    families: ["GI sheets", "GP sheets", "GI coils", "GI pipes", "GI hollow sections"],
  },
  {
    slug: "color-coated-roofing",
    index: "08",
    name: "Colour Coated & Roofing",
    short: "Roofing",
    headline: "The envelope over everything we build.",
    intro:
      "GI, galvalume and colour coated roofing in corrugated and trapezoidal profiles, plus decking and wall cladding for sheds, warehouses and commercial buildings.",
    image: "roofColourCoated",
    detailImage: "corrugatedSheet",
    applications: ["Industrial sheds", "Warehouses", "Commercial buildings", "Roofing", "Cladding"],
    families: ["GI roofing", "PPGI / PPGL", "Galvalume", "Profile sheets", "Decking & cladding"],
  },
  {
    slug: "wire-products",
    index: "09",
    name: "Wire Products",
    short: "Wire",
    headline: "Drawn, woven and ready to bind.",
    intro:
      "GI and MS wire, binding wire, welded mesh and wire rods for construction and manufacturing.",
    image: "wireCoilsGi",
    detailImage: "wireCoilDark",
    applications: ["Construction", "Agriculture", "Manufacturing"],
    families: ["GI wire", "MS wire", "Binding wire", "Welded mesh", "Wire rods"],
  },
  {
    slug: "stainless-steel",
    index: "10",
    name: "Stainless Steel",
    short: "Stainless",
    headline: "Corrosion-resistant by composition.",
    intro:
      "Stainless sheets, plates, coils, pipes, tubes and sections across common austenitic and ferritic grades.",
    image: "stainlessBrushed",
    detailImage: "tubesStainlessLine",
    applications: ["Food & pharma equipment", "Architecture & railings", "Process industry", "Kitchen & hospitality"],
    families: ["SS sheets & plates", "SS coils", "SS pipes & tubes", "SS bars", "SS sections"],
  },
  {
    slug: "specialty-engineering-steel",
    index: "11",
    name: "Specialty & Engineering Steel",
    short: "Specialty",
    headline: "Chemistry chosen for the job.",
    intro:
      "Alloy, high carbon, spring, tool and wear-resistant steels sourced to specified grades for engineering and manufacturing requirements.",
    image: "roundBarsFactory",
    detailImage: "steelPlantLadle",
    applications: ["Machine components", "Tooling & dies", "Automotive", "Mining & earthmoving"],
    families: ["Alloy steel", "High carbon", "Spring steel", "Tool steel", "Wear resistant"],
  },
  {
    slug: "industrial-steel",
    index: "12",
    name: "Industrial Steel",
    short: "Industrial",
    headline: "Heavy steel for heavy duty.",
    intro:
      "Rails, crane rails, heavy and tower sections, and semi-finished steel such as billets, blooms and slabs — procured to requirement.",
    image: "railTrack",
    detailImage: "blastFurnace",
    applications: ["Railways & sidings", "Cranes & gantries", "Power transmission", "Re-rolling & forging"],
    families: ["Rails", "Crane rails", "Heavy sections", "Billets & blooms"],
  },
];

export const categoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);
