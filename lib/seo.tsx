import type { Metadata } from "next";
import { site } from "./site";
import { images, type ImageKey } from "./images";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  image?: ImageKey;
};

export const absoluteUrl = (path = "/") => new URL(path, site.url).toString();

/** Page metadata with canonical URL, Open Graph and Twitter card. */
export function buildMetadata({ title, description, path, image }: SeoInput): Metadata {
  const og = image ? [{ url: images[image].src, width: images[image].width, height: images[image].height, alt: images[image].alt }] : undefined;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      url: path,
      title,
      description,
      ...(og ? { images: og } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [images[image].src] } : {}),
    },
  };
}

export const organizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      email: site.email,
      telephone: site.phones.map((p) => p.e164),
      slogan: site.tagline,
      logo: absoluteUrl("/icon.svg"),
    },
    {
      "@type": "LocalBusiness",
      "@id": `${site.url}/#business`,
      name: site.name,
      description: site.description,
      url: site.url,
      email: site.email,
      telephone: site.phones[0].e164,
      image: absoluteUrl(images.heroSteelPlantSunrise.src),
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.line1,
        addressLocality: site.address.city,
        addressRegion: site.address.region,
        postalCode: site.address.postalCode,
        addressCountry: site.address.country,
      },
      areaServed: "IN",
      parentOrganization: { "@id": `${site.url}/#organization` },
    },
  ],
});

export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here; escape "<" to prevent breaking out of the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
