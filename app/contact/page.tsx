import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Mail, Navigation, Phone } from "lucide-react";
import { LocationSection } from "@/components/sections/LocationSection";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Arrow } from "@/components/ui/Arrow";
import { buildMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { directionsHref, site, telHref } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact — Steel Supplier on Akhari Bypass, Varanasi",
  description: `Contact Shri Unity Ispat at ${site.address.full}. Call ${site.phones.map((p) => p.display).join(" / ")} or email ${site.email}.`,
  path: "/contact",
  image: "stockRacksMono",
});

export default function ContactPage() {
  const actions = [
    { Icon: Phone, title: "Call us", detail: site.phones.map((p) => p.display).join(" · "), href: telHref(site.phones[0].e164) },
    { Icon: Mail, title: "Email us", detail: site.email, href: `mailto:${site.email}` },
    { Icon: Navigation, title: "Get directions", detail: site.address.full, href: directionsHref, external: true },
    { Icon: FileText, title: "Request quote", detail: "Grade, size & quantity", href: "/quote", internal: true },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-paper pt-[calc(var(--header-h)+4rem)] pb-16 md:pb-24">
        <div className="bg-blueprint pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" aria-hidden="true" />
        <div className="container-x relative">
          <p className="eyebrow flex items-center gap-3 text-gold">
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
            Contact
          </p>
          <SplitHeading as="h1" immediate className="mt-6 font-display text-[length:var(--text-mega)] leading-[0.85] text-navy uppercase">
            Shri Unity Ispat
          </SplitHeading>
          <p className="mt-6 font-display text-[clamp(1.4rem,2.6vw,2.4rem)] text-steel-dark uppercase">
            Iron and steel — <span className="text-gold">the complete solution</span>
          </p>

          <ul className="mt-16 grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-4">
            {actions.map(({ Icon, title, detail, href, external, internal }) => {
              const cls = "group flex h-full min-h-52 flex-col justify-between border-r border-b border-line p-6 transition-colors duration-500 hover:bg-navy hover:text-white sm:p-8";
              const inner = (
                <>
                  <Icon className="size-6 text-gold" aria-hidden="true" />
                  <span>
                    <span className="flex items-center justify-between font-display text-3xl uppercase">
                      {title} <Arrow direction={external ? "up-right" : "right"} />
                    </span>
                    <span className="mt-2 block text-sm break-all text-graphite/75 transition-colors group-hover:text-white/70">{detail}</span>
                  </span>
                </>
              );
              return (
                <li key={title}>
                  {internal ? (
                    <Link href={href} className={cls}>
                      {inner}
                    </Link>
                  ) : (
                    <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                      {inner}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <LocationSection index="01" />
      <QuoteSection index="02" />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
    </>
  );
}
