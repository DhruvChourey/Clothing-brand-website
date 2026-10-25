# Atelier Noir

A fictional luxury clothing label, built as a premium e-commerce front-end demo. Names, products, prices and copy are invented.

**Stack:** React 19 · TypeScript · Vite · Tailwind CSS v4 · Radix Dialog (shadcn-style primitives in `src/components/ui`) · GSAP + ScrollTrigger + SplitText + `@gsap/react` · Lenis · React Router · Lucide.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build
npm run lint       # oxlint
npm run typecheck
npm run format     # prettier
```

## Structure

```
src/
  components/      Header, Overlays (menu / search / bag / quick add), ProductCard, ProductGrid, Footer…
    home/          Hero, Collection, ShopSection, Campaign, Philosophy, JournalSection, NewsletterSection
    ui/            button, input, drawer (Radix Dialog + GSAP enter/exit)
  pages/           Home, Shop, Collections, ProductPage, Bag, SearchPage, Journal, JournalArticle, Care, Account
  data/            products, journal, images (Unsplash photo ids), nav
  lib/             motion (GSAP setup + reduced-motion hook), lenis, intro (loader coordination), catalog, search
  store/           Shop context: bag (persisted to localStorage), overlays, quick add
```

## Motion system

- GSAP is the only animation engine. `useMotion` (in `lib/motion.ts`) wraps `useGSAP` + `gsap.matchMedia`, so animations only run when `prefers-reduced-motion: no-preference`; otherwise content simply renders in its final state. Everything is reverted on unmount.
- Lenis is driven by `gsap.ticker` and synced to ScrollTrigger; it is disabled for reduced-motion users, paused while a drawer is open, and handles route-change scroll resets and `#anchor` links.
- Hero: once-per-session loader → masked image reveal → SplitText headline → copy/CTA → scroll cue, with light parallax. No scroll-jacking.

## Demo behaviour and integrations to enable

| Area         | Demo behaviour                                        | To go live                                                                  |
| ------------ | ----------------------------------------------------- | --------------------------------------------------------------------------- |
| Checkout     | Simulated; no payment fields, clearly labelled.       | Integrate Stripe Checkout / Shopify; never collect cards in the app itself. |
| Newsletter   | Validates, then shows an honest "not stored" message. | Set `VITE_NEWSLETTER_ENDPOINT` to a URL accepting `POST {"email": "…"}`.    |
| Contact form | Validates, not sent.                                  | Post to your email/helpdesk service.                                        |
| Accounts     | Not enabled (`/account` explains this).               | Add an identity provider.                                                   |
| Bag          | Stored in `localStorage` only.                        | Move to a server/cart API.                                                  |

## Imagery

Photography is hot-linked from the Unsplash CDN (see `src/data/images.ts`), used under the Unsplash licence. For production, download and self-host the originals (and credit photographers if desired), then change `photoUrl`/`photoSrcSet`.
