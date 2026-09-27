/** Pretty label for a route, used by the page-transition curtain. */
const ACRONYMS = new Set(["ms", "gi", "gp", "tmt", "ss", "hr", "cr", "erw", "shs", "rhs", "chs", "ismb", "ismc", "islc", "iswb", "ppgi", "ppgl", "en"]);
const TOP: Record<string, string> = {
  "": "Home",
  products: "Products",
  industries: "Industries",
  brands: "Brands",
  stockyard: "Stockyard",
  about: "About",
  contact: "Contact",
  quote: "Request a Quote",
  credits: "Credits",
};

export function routeLabel(pathname: string) {
  const parts = pathname.split("?")[0].split("/").filter(Boolean);
  if (parts.length <= 1) return TOP[parts[0] ?? ""] ?? "Shri Unity Ispat";
  return parts[parts.length - 1]
    .split("-")
    .map((w) => (ACRONYMS.has(w) ? w.toUpperCase() : /^fe$/.test(w) ? "Fe" : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ")
    .replace(/(\d+)d\b/i, "$1D");
}
