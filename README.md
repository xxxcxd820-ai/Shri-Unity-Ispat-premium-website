# Shri Unity Ispat — Website

Premium B2B catalogue website for **Shri Unity Ispat** (Iron & Steel — The Complete Solution), Akhari Bypass Amra, Varanasi.

Built with Next.js 16 (App Router, Turbopack), TypeScript, Tailwind CSS 4, GSAP (ScrollTrigger, SplitText), Framer Motion and Lucide icons.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Copy `.env.example` to `.env.local` and configure a quote-form provider (Resend or Formspree).

## Where things live

| Path | Purpose |
| --- | --- |
| `lib/site.ts` | Confirmed business details (address, phones, email, WhatsApp, map). Single source of truth. |
| `lib/images.ts` | Central image registry — every photo, its alt text and source/licence. `stockyardGallery` controls the stockyard gallery. |
| `data/categories.ts` | 12 product families (copy, imagery, applications). |
| `data/products.ts` | Every product: specs, grades, standards, brands, availability. Pages are generated from this. |
| `data/brands.ts` | Brands we deal in. Add `logo` once official logo usage is approved. |
| `data/industries.ts` | Industries + application → image mapping. |
| `app/api/quote/route.ts` | Quote endpoint (Resend → Formspree → WhatsApp/email fallback). |

### Availability

Each product has `availability`: `"in-stock"`, `"available"` or `"on-request"`. Nothing is marked **In Stock** until the client confirms current stock — change the value in `data/products.ts`.

### Replacing photography with the client's own

1. Put files in `public/images/stockyard/`.
2. Register each in `lib/images.ts` (`src`, `width`, `height`, `alt`, `source`).
3. Reference the key in `stockyardGallery` (or anywhere an `ImageKey` is used).

Current photography comes from Unsplash and Wikimedia Commons — see `/credits`.

## Motion & performance

- **Preloader** (`components/layout/Preloader.tsx`) plays once per browser session; repeat visits and reduced-motion users skip it.
- **Page transitions** (`components/layout/PageTransition.tsx`) — a navy curtain between routes. Add `data-no-transition` to any link that should navigate instantly.
- **Scroll reveals** are CSS-driven: wrap content in `<Reveal>` / `<MaskReveal>`; one shared `IntersectionObserver` (`RevealObserver`) triggers them.
- Heavy effects (line-split headings, parallax, pinned horizontal scroll, film grain) run on desktop only; phones get light fades.
- Photos are WebP (`public/images/*.webp`) with blur-up placeholders; Next.js serves AVIF/WebP at the right size.
- Framer Motion loads via `LazyMotion` (`domAnimation`); use `m.*` elements, not `motion.*`.

## Notes

- No login, cart or checkout — conversion is Request a Quote, Call, WhatsApp, Email and Directions.
- Brand names are shown as "Brands we deal in"; no authorised-dealer claims.
- Motion respects `prefers-reduced-motion`; heavy scroll effects (pinning, horizontal travel) run on desktop only.
