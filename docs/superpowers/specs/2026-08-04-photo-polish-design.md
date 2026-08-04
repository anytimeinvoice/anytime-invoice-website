# Photo polish (Unsplash) — design

**Date:** 2026-08-04
**Repo:** anytime-invoice-website (static marketing site, no build step)

## Purpose

The site currently has no photography anywhere except `assets/og-image.png` —
every section relies on inline SVG icons and the logo mark. This adds real,
candid photography across all 4 pages to make the site feel less like a
placeholder and more like a real product's marketing site, sourced via the
Unsplash MCP tool.

## Scope

5 photos total, one per placement below. No hero background images — all
photos are inline, sitting in existing or new content sections, styled as
rounded cards consistent with the current `.card` component
(`border-radius: var(--radius-xl)`, `border: 1px solid var(--slate-200)`).

## Placements

| Page | Slot | Occupation | Subject |
|---|---|---|---|
| `index.html` | New band between hero and "Everything you need" 3-card section | Trade | Tradie on a ladder — echoes the hero headline ("a bloke on a ladder") |
| `index.html` | Existing "quote to paid" `grid-2` section — replaces the centered `logo-icon.svg` placeholder | Freelancer | Non-trade freelancer/consultant checking phone or tablet with a client — shows the quote→invoice flow isn't trade-exclusive |
| `features.html` | New band between the "Get paid" and "Track & chase" icon-card groups | Trade | Hands-on trade work (tools, receipt in hand) — ties to the receipt-scanning copy in the section below |
| `pricing.html` | New band between the hero and the two price cards | Trade | Job-site moment — humanizes the page before the numbers |
| `about.html` | New band under the mission copy, above the CTA band | Freelancer | Portrait-oriented — pairs with "sole traders, tradespeople, builders and freelancers" in the copy directly above |

Split: 3 trade / 2 freelancer, so neither audience dominates the page (the
product copy explicitly names both).

## Style

Candid documentary — real-feeling job sites and work moments, natural light,
Australian context. Not posed corporate/editorial stock. Color (no duotone
or brand-color overlay) — photos stay true-to-life; brand consistency comes
from the card treatment (rounded corners, border, spacing tokens), not a
color filter.

## Sourcing workflow

1. Per slot, search Unsplash via `mcp__unsplash__search_photos` with a
   targeted query (e.g. "tradesman ladder job site", "freelancer checking
   phone client", "builder receipt tools").
2. Present 2–3 thumbnail candidates per slot for approval before download —
   don't commit to the first result.
3. Once approved, download the chosen photo's full-resolution version.

## Technical implementation

- **Storage:** downloaded originals converted to WebP, saved to
  `assets/photos/` (new directory), single reasonable width (~1200px,
  q80) — no build step, so re-encoding happens once at fetch time, not
  per-request.
- **Markup:** `<img>` tags with `loading="lazy"` and descriptive `alt` text
  (accessibility — separate from attribution).
- **Attribution:** not legally required under the [Unsplash License](https://unsplash.com/license)
  (confirmed against Unsplash's own crediting guidance), but a cheap
  courtesy to the photographers, so we keep it. The Unsplash MCP
  `search_photos` tool returns only `id`/`urls`/`dimensions`/`description` —
  no photographer name — so fetch each chosen photo's Unsplash page
  (`unsplash.com/photos/{id}`) separately via WebFetch to get the
  photographer's name and profile link before finalizing credits.
- **Credit line placement:** one consolidated, optional-but-nice line added
  to the existing `<footer>` on all 4 pages, e.g. *"Photos: Jane Smith, John
  Doe / Unsplash"* — each name links to the photographer's Unsplash
  profile, plus a link to unsplash.com. No per-photo captions.
- No CSS/layout framework changes beyond reusing existing card/grid/spacing
  tokens already defined in `assets/styles.css`.

## Out of scope

- Hero background images / full-bleed photo treatments
- Photos beyond the 5 placements listed above
- Per-photo attribution captions (footer block only)
- Any change to `og-image.png` or SEO/social meta images
