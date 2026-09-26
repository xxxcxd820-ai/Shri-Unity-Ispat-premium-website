/**
 * Confirmed business information for Shri Unity Ispat.
 * Only facts supplied by the client live here — do not add history,
 * statistics, certifications or social accounts unless they are verified.
 */

export const site = {
  name: "Shri Unity Ispat",
  legalName: "Shri Unity Ispat",
  tagline: "Iron and Steel – The Complete Solution",
  shortTagline: "Iron & Steel — The Complete Solution",
  description:
    "Shri Unity Ispat is an iron and steel supplier, distributor and stockist in Varanasi, Uttar Pradesh — supplying TMT bars, pipes, structural steel, plates, sheets, coils, roofing and more for construction, fabrication and infrastructure.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.shriunityispat.com",
  locale: "en_IN",

  address: {
    line1: "Akhari Bypass Amra",
    city: "Varanasi",
    region: "Uttar Pradesh",
    postalCode: "221011",
    country: "IN",
    full: "Akhari Bypass Amra, Varanasi – 221011",
  },

  email: "shriunityispat.vns@gmail.com",

  phones: [
    { display: "78000 12313", e164: "+917800012313" },
    { display: "75458 68788", e164: "+917545868788" },
  ],

  /** WhatsApp uses the primary business number. */
  whatsapp: {
    number: "917800012313",
    message: "Hello Shri Unity Ispat, I would like to enquire about your steel products.",
  },

  /** Map query — kept as a text query so it resolves to the address on Google Maps. */
  mapQuery: "Akhari Bypass Amra, Varanasi, Uttar Pradesh 221011",

  /** Social profiles: intentionally empty until real URLs are provided. */
  social: [] as { label: string; href: string }[],
} as const;

export const whatsappHref = (message: string = site.whatsapp.message) =>
  `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;

export const telHref = (e164: string) => `tel:${e164}`;

export const mailHref = (subject?: string, body?: string) => {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const q = params.toString().replace(/\+/g, "%20");
  return `mailto:${site.email}${q ? `?${q}` : ""}`;
};

export const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  site.mapQuery,
)}`;

export const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  site.mapQuery,
)}&z=15&output=embed`;

export const nav = [
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/industries" },
  { label: "Brands", href: "/brands" },
  { label: "Stockyard", href: "/stockyard" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
