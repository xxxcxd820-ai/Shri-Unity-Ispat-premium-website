import type { ImageKey } from "@/lib/images";

export type Industry = {
  slug: string;
  name: string;
  line: string;
  image: ImageKey;
  materials: string[];
};

export const industries: Industry[] = [
  {
    slug: "construction",
    name: "Construction",
    line: "Reinforcement, sections and pipes for buildings of every scale.",
    image: "constructionIndiaTowers",
    materials: ["TMT bars", "Binding wire", "MS pipes", "Angles & channels"],
  },
  {
    slug: "infrastructure",
    name: "Infrastructure",
    line: "Steel for bridges, metro corridors, highways and public works.",
    image: "bridgeArchIndia",
    materials: ["Fe 500D / 550D TMT", "Structural plates", "ISMB / ISWB"],
  },
  {
    slug: "industrial-manufacturing",
    name: "Industrial Manufacturing",
    line: "Coils, sheets and bars that feed production lines.",
    image: "sheetProcessingLine",
    materials: ["HR / CR coils", "CR sheets", "Round bars"],
  },
  {
    slug: "fabrication",
    name: "Fabrication",
    line: "Hollow sections, flats and plates for fabricators and workshops.",
    image: "weldingSparks",
    materials: ["SHS / RHS", "Flats", "MS plates", "Angles"],
  },
  {
    slug: "engineering",
    name: "Engineering",
    line: "Engineering and alloy grades for machined components.",
    image: "roundBarsFactory",
    materials: ["EN-series bars", "Alloy steel", "Tool steel"],
  },
  {
    slug: "warehousing",
    name: "Warehousing & Logistics",
    line: "Frames, sections and roofing for storage and logistics buildings.",
    image: "warehouseModern",
    materials: ["Beams & columns", "Z sections", "Roofing & cladding"],
  },
  {
    slug: "commercial",
    name: "Commercial Development",
    line: "Structural steel and decking for offices, malls and complexes.",
    image: "steelFrameCranes",
    materials: ["ISMB / ISWB", "Roof decking", "TMT bars"],
  },
  {
    slug: "residential",
    name: "Residential Construction",
    line: "Dependable reinforcement and fabrication steel for homes and towers.",
    image: "constructionIndiaHighrise",
    materials: ["TMT bars", "Binding wire", "Square pipes"],
  },
  {
    slug: "agriculture",
    name: "Agriculture & Rural",
    line: "Sheds, wire and water lines for farms and rural projects.",
    image: "farmShed",
    materials: ["GI roofing", "GI wire", "GI pipes"],
  },
];

/**
 * Imagery for application tags shown on category and product pages.
 * Any application without an entry falls back to its category image.
 */
export const applicationImages: Record<string, ImageKey> = {
  "Residential construction": "constructionIndiaHighrise",
  "Commercial buildings": "steelFrameCranes",
  Infrastructure: "metroViaductIndia",
  Bridges: "bridgeTrussIndia",
  "Industrial structures": "blastFurnace",
  Fabrication: "weldingBlue",
  Construction: "constructionIndiaScaffold",
  "Water systems": "giPipesBundles",
  "Industrial applications": "factoryLine",
  "Scaffolding & frames": "steelFrameCranes",
  Warehouses: "warehouseModern",
  "Industrial buildings": "pebFrame",
  "Machining & engineering": "roundBarsFactory",
  "Gates, grills & railings": "fabricationCutting",
  "Structural brackets": "stockRacksFlats",
  "Heavy fabrication": "weldingSparks",
  "Industrial equipment": "sheetProcessingLine",
  "Structural applications": "ibeamsYard",
  "Flooring & platforms": "chequeredPlate",
  "Pipe & tube making": "tubesStainlessLine",
  "Roll forming": "coilsWarehouse",
  "Automotive & OEM": "factoryLine",
  "Appliances & panels": "stainlessBrushed",
  "Roofing & cladding": "roofColourCoated",
  Ducting: "corrugatedSheet",
  "Fencing & outdoor structures": "pipesGalvanized",
  "Industrial sheds": "corrugatedShed",
  Roofing: "roofStandingSeam",
  Cladding: "corrugatedShed",
  "Fencing & boundaries": "wireCoilsGi",
  Agriculture: "farmShed",
  Manufacturing: "wireCoilsGi",
  "Food & pharma equipment": "stainlessBrushed",
  "Architecture & railings": "tubesStainlessLine",
  "Process industry": "factoryLine",
  "Kitchen & hospitality": "stainlessBrushed",
  Factories: "factoryLine",
  "Logistics parks": "warehouseModern",
  "Commercial sheds": "corrugatedShed",
  "Machine components": "roundBarsFactory",
  "Tooling & dies": "rodsRust",
  Automotive: "factoryLine",
  "Mining & earthmoving": "chequeredPlate2",
  "Railways & sidings": "railTrack",
  "Cranes & gantries": "ibeamsYard",
  "Power transmission": "trussBlue",
  "Re-rolling & forging": "steelPlantLadle",
  "Sheds & trusses": "steelRoofGrid",
  "Solar structures": "steelGridSky",
  Architecture: "steelGridSky",
  "Shafts & pins": "roundBarsFactory",
  "Vehicle bodies": "chequeredPlate2",
  "Furniture & enclosures": "sheetProcessingLine",
};
