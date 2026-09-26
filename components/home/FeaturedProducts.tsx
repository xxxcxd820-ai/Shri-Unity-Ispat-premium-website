"use client";

import { useRef } from "react";
import { featuredProducts } from "@/data/products";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { ProductCard } from "@/components/catalogue/ProductCard";
import { SectionHead } from "@/components/ui/SectionHead";

/**
 * Featured products. Desktop: the track is pinned and scrolls horizontally with
 * the page. Mobile/tablet: a native swipeable scroll-snap rail.
 */
export function FeaturedProducts() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const items = featuredProducts();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.desktopMotion, () => {
        const el = track.current;
        if (!el) return;
        const section = root.current!;
        const distance = () => el.scrollWidth - el.clientWidth;
        // Pin centred when the section fits the viewport, otherwise by its bottom edge.
        const start = () => (section.offsetHeight <= window.innerHeight ? "center center" : "bottom bottom");
        gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start,
            end: () => `+=${distance()}`,
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        gsap.to("[data-progress]", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start, end: () => `+=${distance()}`, scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="featured-title" className="overflow-hidden bg-ivory py-24 md:py-32 lg:py-24">
      <div className="container-x">
        <SectionHead
          index="05"
          label="Featured steel products"
          title={<span id="featured-title">The core range.</span>}
          intro="Key products from our regular range — each with its own specification page."
          titleClassName="lg:text-[clamp(2rem,3.6vw,3.4rem)]"
        />
        <div className="mt-10 hidden h-px bg-line lg:block">
          <div data-progress className="h-px origin-left scale-x-0 bg-navy" />
        </div>
      </div>

      <div
        ref={track}
        className="no-scrollbar container-x mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 lg:mt-8 lg:overflow-visible lg:pb-0"
      >
        {items.map((p, i) => (
          <div key={p.slug} className="w-[82%] shrink-0 snap-start sm:w-[45%] lg:w-[22rem] xl:w-[24rem]">
            <ProductCard product={p} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
