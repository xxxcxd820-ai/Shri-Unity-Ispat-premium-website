export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const pad2 = (n: number) => String(n).padStart(2, "0");

export const productHref = (category: string, slug: string) => `/products/${category}/${slug}`;
export const categoryHref = (category: string) => `/products/${category}`;
