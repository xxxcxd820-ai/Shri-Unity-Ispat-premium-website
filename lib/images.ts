/**
 * Central image registry. Every photograph used on the site is declared here —
 * components reference images by key and never hard-code paths or URLs.
 *
 * Files are served from /public/images (downloaded and optimised from their
 * public sources so the site never depends on third-party hotlinks).
 * `source` records where each photo came from for attribution (see /credits).
 *
 * To use the client's own stockyard photography, add the files to
 * /public/images/stockyard, register them here and list them in
 * `stockyardGallery` at the bottom of this file.
 */

export type SiteImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  source: { name: string; url: string; author?: string; license: string };
};

const unsplash = (id: string) => ({
  name: "Unsplash",
  url: `https://images.unsplash.com/photo-${id}`,
  license: "Unsplash License",
});

export const images = {
  heroSteelPlantSunrise: {
    src: "/images/hero-steel-plant-sunrise.jpg",
    width: 2000,
    height: 1333,
    alt: "Steel plant silhouetted against a golden sunrise",
    source: unsplash("1765810542186-c6becc0687b1"),
  },
  bridgeArchIndia: {
    src: "/images/bridge-arch-india.jpg",
    width: 2000,
    height: 1125,
    alt: "Steel arch railway bridge spanning a wide river in India",
    source: unsplash("1705575468304-de4fb558a575"),
  },
  bridgeTrussCloseup: {
    src: "/images/bridge-truss-closeup.jpg",
    width: 2000,
    height: 1333,
    alt: "Close view of riveted steel truss members on a bridge",
    source: unsplash("1747057072654-fe8b363e58ab"),
  },
  bridgeHowrah: {
    src: "/images/bridge-howrah.jpg",
    width: 2000,
    height: 1333,
    alt: "Howrah Bridge cantilever steel truss over the Hooghly river in mist",
    source: unsplash("1770020726940-6fd69bf40aaa"),
  },
  bridgeRailTruss: {
    src: "/images/bridge-rail-truss.jpg",
    width: 2000,
    height: 1330,
    alt: "Train crossing a steel truss bridge over water",
    source: unsplash("1785768275074-d6e34781c6f1"),
  },
  pipesRustyStack: {
    src: "/images/pipes-rusty-stack.jpg",
    width: 2000,
    height: 1500,
    alt: "Stack of mild steel round pipes viewed from the ends",
    source: unsplash("1721622045835-51a5447f281c"),
  },
  pipesBlackStack: {
    src: "/images/pipes-black-stack.jpg",
    width: 2000,
    height: 2667,
    alt: "Bundle of black steel pipes stacked end-on",
    source: unsplash("1647105604066-86ea4247e217"),
  },
  pipesBlackEnds: {
    src: "/images/pipes-black-ends.jpg",
    width: 2000,
    height: 2667,
    alt: "Close-up of black steel pipe ends in a stack",
    source: unsplash("1721622045796-d7dd41ef5788"),
  },
  tubesStainlessLine: {
    src: "/images/tubes-stainless-line.jpg",
    width: 2000,
    height: 1333,
    alt: "Bright steel tubes bundled on a production line",
    source: unsplash("1764835746713-34a671e73569"),
  },
  pipesGalvanized: {
    src: "/images/pipes-galvanized.jpg",
    width: 2000,
    height: 3000,
    alt: "Galvanised steel pipes stacked on a rack",
    source: unsplash("1520697517317-6767553cc51a"),
  },
  tmtBarsStack: {
    src: "/images/tmt-bars-stack.jpg",
    width: 2000,
    height: 1333,
    alt: "Ribbed TMT reinforcement bars stacked horizontally",
    source: unsplash("1745909247906-123b53b70e06"),
  },
  tmtCoils: {
    src: "/images/tmt-coils.jpg",
    width: 2000,
    height: 1333,
    alt: "Coiled ribbed reinforcement bars bundled for delivery",
    source: unsplash("1763771420746-c75fefab51b5"),
  },
  tmtCoils2: {
    src: "/images/tmt-coils-2.jpg",
    width: 2000,
    height: 1292,
    alt: "Bundled coils of ribbed reinforcement steel",
    source: unsplash("1763771420303-0f11ccf613d1"),
  },
  tmtBundleField: {
    src: "/images/tmt-bundle-field.jpg",
    width: 2000,
    height: 1372,
    alt: "Bundles of reinforcement bars stored on site",
    source: unsplash("1755289832483-c633ada42a8c"),
  },
  roundBarsFactory: {
    src: "/images/round-bars-factory.jpg",
    width: 2000,
    height: 1333,
    alt: "Bundles of solid steel round bars in a factory",
    source: unsplash("1671404910386-8c2a9ae40efd"),
  },
  rodsRust: {
    src: "/images/rods-rust.jpg",
    width: 2000,
    height: 1333,
    alt: "Steel rods arranged in a dense bundle",
    source: unsplash("1623428454598-1bfe414bac03"),
  },
  structuralSectionsWarehouse: {
    src: "/images/structural-sections-warehouse.jpg",
    width: 2000,
    height: 1333,
    alt: "Structural steel sections, channels and tubes stacked in a warehouse",
    source: unsplash("1671022442106-c787685d9fed"),
  },
  beamsRoofFrame: {
    src: "/images/beams-roof-frame.jpg",
    width: 2000,
    height: 2122,
    alt: "Steel beams forming a modern roof frame",
    source: unsplash("1745162391671-244e8d3ccd5f"),
  },
  trussBlue: {
    src: "/images/truss-blue.jpg",
    width: 2000,
    height: 3000,
    alt: "Painted steel truss framework seen from below",
    source: unsplash("1507486076008-3c60cfcce36f"),
  },
  steelGridSky: {
    src: "/images/steel-grid-sky.jpg",
    width: 2000,
    height: 1125,
    alt: "Steel structural grid against a pale sky",
    source: unsplash("1509024368907-57294758cfc5"),
  },
  steelRoofGrid: {
    src: "/images/steel-roof-grid.jpg",
    width: 2000,
    height: 1428,
    alt: "Steel roof grid with bracing seen from below",
    source: unsplash("1724814884431-5f931c9620ae"),
  },
  steelFrameCranes: {
    src: "/images/steel-frame-cranes.jpg",
    width: 2000,
    height: 3000,
    alt: "Steel building frame under construction with tower cranes",
    source: unsplash("1527335988388-b40ee248d80c"),
  },
  coilsWarehouse: {
    src: "/images/coils-warehouse.jpg",
    width: 2000,
    height: 1333,
    alt: "Rows of steel coils in a warehouse",
    source: unsplash("1697698532634-ea59b636ccea"),
  },
  coilsCloseup: {
    src: "/images/coils-closeup.jpg",
    width: 2000,
    height: 1333,
    alt: "Close-up of rolled steel coils",
    source: unsplash("1697698532602-ccf880036281"),
  },
  sheetsCoatedStack: {
    src: "/images/sheets-coated-stack.jpg",
    width: 2000,
    height: 1125,
    alt: "Stack of coated steel sheets",
    source: unsplash("1761434558206-2deda18ef237"),
  },
  stainlessBrushed: {
    src: "/images/stainless-brushed.jpg",
    width: 2000,
    height: 2000,
    alt: "Brushed stainless steel surface with light reflection",
    source: unsplash("1667892702884-faa077e80d7b"),
  },
  chequeredPlate: {
    src: "/images/chequered-plate.jpg",
    width: 2000,
    height: 1123,
    alt: "Chequered steel plate with raised pattern",
    source: unsplash("1501166222995-ff31c7e93cef"),
  },
  chequeredPlate2: {
    src: "/images/chequered-plate-2.jpg",
    width: 2000,
    height: 1132,
    alt: "Diamond pattern steel floor plate",
    source: unsplash("1775204450608-3afe112ae5f8"),
  },
  corrugatedSheet: {
    src: "/images/corrugated-sheet.jpg",
    width: 2000,
    height: 1333,
    alt: "Corrugated galvanised steel sheet",
    source: unsplash("1533069174012-17e2fefc8e2a"),
  },
  corrugatedShed: {
    src: "/images/corrugated-shed.jpg",
    width: 2000,
    height: 1333,
    alt: "Industrial shed clad in corrugated metal sheets",
    source: unsplash("1450851100967-1a8368a583c4"),
  },
  roofColourCoated: {
    src: "/images/roof-colour-coated.jpg",
    width: 2000,
    height: 1333,
    alt: "Colour coated metal roof of an industrial building",
    source: unsplash("1776653244534-69d59028af6c"),
  },
  roofStandingSeam: {
    src: "/images/roof-standing-seam.jpg",
    width: 2000,
    height: 1335,
    alt: "Dark profiled metal roofing on a modern building",
    source: unsplash("1602193230480-7840a38eb0c3"),
  },
  stockRacksBars: {
    src: "/images/stock-racks-bars.jpg",
    width: 2000,
    height: 1144,
    alt: "Steel bars and flats stored on stockyard racks",
    source: unsplash("1763926025477-423847028860"),
  },
  stockRacksBarsTall: {
    src: "/images/stock-racks-bars-tall.jpg",
    width: 2000,
    height: 3000,
    alt: "Tall steel racks loaded with bars in a stockyard",
    source: unsplash("1763926025678-95d196d0ab28"),
  },
  stockRacksFlats: {
    src: "/images/stock-racks-flats.jpg",
    width: 2000,
    height: 2653,
    alt: "Stockyard racks holding steel flats and bars",
    source: unsplash("1763926025680-7966e45e48f5"),
  },
  stockRacksMono: {
    src: "/images/stock-racks-mono.jpg",
    width: 2000,
    height: 1333,
    alt: "Steel bars and sections neatly stacked on warehouse racks",
    source: unsplash("1763926062529-1edf8664c366"),
  },
  warehouseModern: {
    src: "/images/warehouse-modern.jpg",
    width: 2000,
    height: 1334,
    alt: "Large modern industrial warehouse interior",
    source: unsplash("1772305336606-989a457ffbae"),
  },
  sheetProcessingLine: {
    src: "/images/sheet-processing-line.jpg",
    width: 2000,
    height: 1333,
    alt: "Steel sheet processing line inside a factory",
    source: unsplash("1764835994645-3faa2c40f708"),
  },
  factoryLine: {
    src: "/images/factory-line.jpg",
    width: 2000,
    height: 1334,
    alt: "Industrial machinery inside a large factory",
    source: unsplash("1717386255773-1e3037c81788"),
  },
  blastFurnace: {
    src: "/images/blast-furnace.jpg",
    width: 2000,
    height: 1125,
    alt: "Blast furnace structures of a steel plant",
    source: unsplash("1787285724892-38c3cb5fbbdb"),
  },
  weldingSparks: {
    src: "/images/welding-sparks.jpg",
    width: 2000,
    height: 1333,
    alt: "Welder working on steel with sparks",
    source: unsplash("1504328345606-18bbc8c9d7d1"),
  },
  weldingBlue: {
    src: "/images/welding-blue.jpg",
    width: 2000,
    height: 1333,
    alt: "Welder fabricating steel under blue arc light",
    source: unsplash("1455165814004-1126a7199f9b"),
  },
  fabricationCutting: {
    src: "/images/fabrication-cutting.jpg",
    width: 2000,
    height: 1333,
    alt: "Fabricator cutting square steel tubes with sparks",
    source: unsplash("1714504904786-b6732390b206"),
  },
  wireCoilDark: {
    src: "/images/wire-coil-dark.jpg",
    width: 2000,
    height: 1333,
    alt: "Coil of steel wire on a floor",
    source: unsplash("1673201159819-f842efcfdf13"),
  },
  wireCoilsGi: {
    src: "/images/wire-coils-gi.jpg",
    width: 2000,
    height: 1600,
    alt: "Coils of galvanised steel wire",
    source: unsplash("1518994255497-c5f17690567f"),
  },
  railTrackIndia: {
    src: "/images/rail-track-india.jpg",
    width: 2000,
    height: 2687,
    alt: "Railway tracks with overhead electrification in India",
    source: unsplash("1610611342266-bcc131ecc78c"),
  },
  railTrack: {
    src: "/images/rail-track.jpg",
    width: 2000,
    height: 1335,
    alt: "Steel railway rails stretching into the distance",
    source: unsplash("1622504789958-449b1f7a12c0"),
  },
  cranesSunset: {
    src: "/images/cranes-sunset.jpg",
    width: 2000,
    height: 1328,
    alt: "Tower cranes silhouetted against a dusk sky",
    source: unsplash("1575230167650-dce335edc7f4"),
  },
  constructionIndiaTowers: {
    src: "/images/construction-india-towers.jpg",
    width: 2000,
    height: 1996,
    alt: "Residential towers under construction in an Indian city",
    source: unsplash("1630061712710-2539eb457c55"),
  },
  constructionIndiaScaffold: {
    src: "/images/construction-india-scaffold.jpg",
    width: 2000,
    height: 1125,
    alt: "Building under construction with scaffolding",
    source: unsplash("1747192904662-e03e8da1e0ab"),
  },
  constructionIndiaHighrise: {
    src: "/images/construction-india-highrise.jpg",
    width: 2000,
    height: 2653,
    alt: "High-rise building under construction with scaffolding",
    source: unsplash("1632398461363-741a64493ab6"),
  },
  farmShed: {
    src: "/images/farm-shed.jpg",
    width: 2000,
    height: 1335,
    alt: "Steel-clad agricultural shed beside a field",
    source: unsplash("1587563497254-d04841987d8e"),
  },
  metroViaductIndia: {
    src: "/images/metro-viaduct-india.jpg",
    width: 2000,
    height: 2667,
    alt: "Elevated metro viaduct in an Indian city",
    source: unsplash("1594383274581-86711b1c4265"),
  },
  metroIndiaCity: {
    src: "/images/metro-india-city.jpg",
    width: 2000,
    height: 1669,
    alt: "Elevated metro line crossing an Indian cityscape",
    source: unsplash("1648455288365-ee27a61c95bd"),
  },
  cranesBuilding: {
    src: "/images/cranes-building.jpg",
    width: 2000,
    height: 1333,
    alt: "Tower crane beside a building under construction",
    source: unsplash("1599707254554-027aeb4deacd"),
  },
  siteAerialRebar: {
    src: "/images/site-aerial-rebar.jpg",
    width: 2000,
    height: 1333,
    alt: "Aerial view of engineers on a reinforced concrete site",
    source: unsplash("1541888946425-d81bb19240f5"),
  },
  giPipesBundles: {
    src: "/images/gi-pipes-bundles.jpg",
    width: 2000,
    height: 1537,
    alt: "Bundles of galvanised steel pipes",
    source: { name: "Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:Steel_pipe.jpg", author: "Sắt Thép Biên Hòa", license: "CC BY-SA 4.0" },
  },
  ibeamsYard: {
    src: "/images/ibeams-yard.jpg",
    width: 2000,
    height: 1125,
    alt: "Steel I-beams stored in a fabrication yard",
    source: { name: "Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:I-beam_raw_material_at_WP_Welding_3.jpg", author: "W.carter", license: "CC0" },
  },
  giCoilsStack: {
    src: "/images/gi-coils-stack.jpg",
    width: 2000,
    height: 1500,
    alt: "Stacked galvanised steel coils in a stockyard",
    source: { name: "Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:Leeco_Steel_Trading_-_GI_coils.jpg", author: "Arosset", license: "CC BY-SA 4.0" },
  },
  pebFrame: {
    src: "/images/peb-frame.jpg",
    width: 1920,
    height: 910,
    alt: "Pre-engineered steel building frame under construction",
    source: { name: "Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:Q345B_Steel_Frame.jpg", author: "Syibeehive", license: "CC BY-SA 4.0" },
  },
  bridgeTrussIndia: {
    src: "/images/bridge-truss-india.jpg",
    width: 2000,
    height: 1344,
    alt: "Vivekananda Setu steel truss bridge, Kolkata",
    source: { name: "Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:Vivekananda_Setu_(Bali_Bridge).jpg", author: "Biswajit Das", license: "CC BY 2.0" },
  },
  steelPlantLadle: {
    src: "/images/steel-plant-ladle.jpg",
    width: 1600,
    height: 1069,
    alt: "Molten steel being poured at an Indian steel plant",
    source: { name: "Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:Furnace_of_IISCO_Steel_Plant-2.jpg", author: "IISCO Steel Plant", license: "GODL-India" },
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;

export const img = (key: ImageKey): SiteImage => images[key];

/**
 * Stockyard gallery. Currently uses representative photography of the product
 * families held in stock. Replace or prepend with the client's own stockyard
 * photographs (register them in `images` above) for maximum authenticity.
 */
export const stockyardGallery: { key: ImageKey; label: string }[] = [
  { key: "structuralSectionsWarehouse", label: "Structural sections" },
  { key: "pipesRustyStack", label: "MS pipes" },
  { key: "stockRacksBars", label: "Bars & flats" },
  { key: "coilsWarehouse", label: "Coils" },
  { key: "tmtBarsStack", label: "TMT bars" },
  { key: "ibeamsYard", label: "Beams" },
  { key: "giPipesBundles", label: "GI pipes" },
  { key: "stockRacksFlats", label: "Flats" },
  { key: "sheetsCoatedStack", label: "Sheets" },
  { key: "tmtCoils", label: "Reinforcement coils" },
];
