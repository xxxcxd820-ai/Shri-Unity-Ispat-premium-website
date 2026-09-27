import { Mail, MapPin, Navigation, Phone } from "lucide-react";
import { directionsHref, mapEmbedSrc, site, telHref } from "@/lib/site";
import { LinkButton } from "@/components/ui/Button";
import { SplitHeading } from "@/components/ui/SplitHeading";

/** Contact details on the left, a large integrated map on the right. */
export function LocationSection({ index = "13", headingLevel = "h2" }: { index?: string; headingLevel?: "h1" | "h2" }) {
  return (
    <section aria-labelledby="location-title" className="bg-navy text-white">
      <div className="grid lg:grid-cols-12">
        <div className="relative px-4 py-14 sm:px-7 md:py-20 lg:col-span-5 lg:px-[clamp(2.5rem,5vw,5rem)]">
          <div className="bg-blueprint-dark pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative">
            <div className="mb-6 flex items-center gap-4 text-white/60">
              <span className="label text-gold-soft">{index}</span>
              <span className="h-px w-10 bg-white/30" aria-hidden="true" />
              <span className="label">Location & contact</span>
            </div>
            <SplitHeading as={headingLevel} id="location-title" className="font-display text-[length:var(--text-title)] leading-[0.95] uppercase">
              Shri Unity Ispat
            </SplitHeading>
            <p className="mt-3 label text-gold-soft">Iron and steel — the complete solution</p>

            <dl className="mt-12 space-y-8">
              <div className="grid grid-cols-[2rem_1fr] gap-3">
                <dt>
                  <MapPin className="size-5 text-gold-soft" aria-label="Address" />
                </dt>
                <dd>
                  <address className="font-display text-2xl leading-snug not-italic">
                    {site.address.line1},
                    <br />
                    {site.address.city} – {site.address.postalCode}
                  </address>
                  <p className="mt-1 text-sm text-white/55">{site.address.region}, India</p>
                </dd>
              </div>
              <div className="grid grid-cols-[2rem_1fr] gap-3">
                <dt>
                  <Phone className="size-5 text-gold-soft" aria-label="Phone" />
                </dt>
                <dd className="space-y-1">
                  {site.phones.map((p) => (
                    <a key={p.e164} href={telHref(p.e164)} className="link-underline block w-fit font-display text-2xl">
                      {p.display}
                    </a>
                  ))}
                </dd>
              </div>
              <div className="grid grid-cols-[2rem_1fr] gap-3">
                <dt>
                  <Mail className="size-5 text-gold-soft" aria-label="Email" />
                </dt>
                <dd>
                  <a href={`mailto:${site.email}`} className="link-underline break-all text-lg">
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-12 flex flex-wrap gap-3">
              <LinkButton href={directionsHref} variant="gold" arrow={false}>
                <span className="flex items-center gap-2">
                  <Navigation className="size-4" aria-hidden="true" /> Get directions
                </span>
              </LinkButton>
              <LinkButton href="/quote" variant="outline-light">
                Request a quote
              </LinkButton>
            </div>
          </div>
        </div>

        <div className="relative min-h-[26rem] lg:col-span-7 lg:min-h-[44rem]">
          <iframe
            title="Map showing Shri Unity Ispat, Akhari Bypass Amra, Varanasi"
            src={mapEmbedSrc}
            className="absolute inset-0 h-full w-full border-0 grayscale-[0.85] contrast-[1.05] transition-[filter] duration-700 hover:grayscale-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)]" aria-hidden="true" />
          <div className="pointer-events-none absolute top-5 left-5 bg-navy/90 px-4 py-3 backdrop-blur">
            <p className="label text-gold-soft">Stockyard</p>
            <p className="mt-1 text-sm">Akhari Bypass, Amra · Varanasi</p>
          </div>
        </div>
      </div>
    </section>
  );
}
