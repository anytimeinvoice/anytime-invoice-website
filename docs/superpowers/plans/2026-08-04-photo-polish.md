# Photo Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 5 self-hosted, candid-documentary photos across the 4 marketing pages, sourced via the Unsplash MCP tool, with a footer photo-credit line.

**Architecture:** Static HTML/CSS site, no build step. Photos are downloaded once, converted to WebP, and committed to `assets/photos/`. A new `.photo-card` CSS component (added to `assets/styles.css`) wraps every photo so it reads as part of the existing card system. No JS, no framework.

**Tech Stack:** Plain HTML/CSS, `mcp__unsplash__search_photos` for sourcing, `curl`/`magick` (ImageMagick, confirmed installed at `/opt/homebrew/bin/magick`) for download + WebP conversion.

## Global Constraints

- Spec of record: `docs/superpowers/specs/2026-08-04-photo-polish-design.md`
- 5 photos total, one per placement — no more, no fewer (see spec's Placements table)
- Style: candid documentary, natural color, no duotone/brand-color overlay
- Split: 3 trade-occupation photos, 2 freelancer-occupation photos (spec §Placements)
- Self-hosted only: download + convert to WebP into `assets/photos/`, never hotlink `images.unsplash.com`
- `loading="lazy"` + descriptive `alt` text on every photo `<img>`
- Attribution is a courtesy, not a requirement (Unsplash License) — one consolidated footer line per page, not per-photo captions
- Branch: all work happens on `dev` (already checked out)
- No CSS/layout framework changes beyond the new `.photo-card` component reusing existing spacing/radius tokens

---

## Task 0: Add the `.photo-card` CSS component

**Files:**
- Modify: `assets/styles.css` (append after the `.card` rule, ~line 131, before the `.icon` rule)

**Interfaces:**
- Produces: `.photo-card` class (bleed-to-edge rounded image container, matches `.card`'s border/radius) and `.photo-card img` (fills container, `object-fit: cover`). Every later task's `<img>` sits inside a `.photo-card` div with an explicit `aspect-ratio` set inline per placement (wide bands vs. the portrait About slot vs. the square-ish grid-2 slot).

- [ ] **Step 1: Add the CSS rule**

Insert immediately after the closing `}` of the existing `.card { ... }` rule in `assets/styles.css`:

```css
.photo-card { border-radius: var(--radius-xl); overflow: hidden; border: 1px solid var(--slate-200); }
.photo-card img { width: 100%; height: 100%; display: block; object-fit: cover; }
```

- [ ] **Step 2: Verify**

Run: `grep -A2 "\.photo-card {" assets/styles.css`
Expected: the two rules above, present verbatim.

- [ ] **Step 3: Commit**

```bash
git add assets/styles.css
git commit -m "Add .photo-card component for marketing site photography"
```

---

## Task 1: Home hero band — tradie on a ladder (trade)

**Files:**
- Modify: `index.html:66-68` (insert new `<section>` between `</header>` and the existing `<section>` that opens "Everything you need, nothing you don't")
- Create: `assets/photos/hero-ladder.webp`

**Interfaces:**
- Consumes: `.photo-card` from Task 0
- Produces: nothing consumed by later tasks — each placement is independent

- [ ] **Step 1: Search Unsplash**

Call `mcp__unsplash__search_photos` with `query: "tradesman ladder job site"`, `orientation: "landscape"`, `per_page: 6`. Also try `query: "electrician ladder work"` if the first query's top results are weak (the earlier exploratory search for this exact query returned some irrelevant hits — screen results before presenting).

- [ ] **Step 2: Present 2-3 candidates, get approval**

Show thumbnail URLs (the `thumb` field) for the 2-3 best-matching results to the user. Do not proceed to download until one is explicitly chosen.

- [ ] **Step 3: Download and convert**

```bash
curl -sL "<chosen photo's `regular` or `full` url>" -o /tmp/hero-ladder-src.jpg
magick /tmp/hero-ladder-src.jpg -resize 1200x -quality 80 assets/photos/hero-ladder.webp
```

- [ ] **Step 4: Insert the markup**

Replace `index.html:66-68`:

```html
  </header>

  <section>
```

with:

```html
  </header>

  <section style="padding-top: 0;">
    <div class="wrap">
      <div class="photo-card" style="aspect-ratio: 21/9;">
        <img src="assets/photos/hero-ladder.webp" alt="A tradesperson working from a ladder on site" loading="lazy">
      </div>
    </div>
  </section>

  <section>
```

- [ ] **Step 5: Verify**

Run: `grep -n "hero-ladder" index.html assets/photos/hero-ladder.webp 2>&1; file assets/photos/hero-ladder.webp`
Expected: the `<img>` line found in `index.html`, and `file` reports a valid WebP image.

Open `index.html` directly in a browser (`open index.html` on macOS) and confirm the photo renders below the hero, above the 3-card grid, at a sensible wide-band size.

- [ ] **Step 6: Commit**

```bash
git add index.html assets/photos/hero-ladder.webp
git commit -m "Add hero photo band to home page"
```

---

## Task 2: Home "quote to paid" slot — freelancer with phone (freelancer)

**Files:**
- Modify: `index.html:102-104` (replace the existing placeholder card)

**Interfaces:**
- Consumes: `.photo-card` from Task 0

- [ ] **Step 1: Search Unsplash**

Call `mcp__unsplash__search_photos` with `query: "freelancer checking phone client meeting"`, `orientation: "squarish"`, `per_page: 6`.

- [ ] **Step 2: Present 2-3 candidates, get approval**

Same as Task 1, Step 2.

- [ ] **Step 3: Download and convert**

```bash
curl -sL "<chosen url>" -o /tmp/quote-to-paid-src.jpg
magick /tmp/quote-to-paid-src.jpg -resize 900x -quality 80 assets/photos/quote-to-paid.webp
```

- [ ] **Step 4: Insert the markup**

Replace `index.html:102-104`:

```html
      <div class="card" style="text-align:center; padding: var(--space-16);">
        <img src="assets/logo-icon.svg" alt="" style="width: 5rem; height: 5rem; margin: 0 auto;">
      </div>
```

with:

```html
      <div class="photo-card" style="aspect-ratio: 4/5;">
        <img src="assets/photos/quote-to-paid.webp" alt="A freelancer reviewing an invoice on their phone with a client" loading="lazy">
      </div>
```

- [ ] **Step 5: Verify**

Run: `grep -n "quote-to-paid" index.html; file assets/photos/quote-to-paid.webp`
Expected: `<img>` line found, valid WebP reported.

`open index.html` and confirm the "Quote to paid" two-column section now shows a photo instead of the small centered icon, filling the right column.

- [ ] **Step 6: Commit**

```bash
git add index.html assets/photos/quote-to-paid.webp
git commit -m "Replace quote-to-paid placeholder icon with freelancer photo"
```

---

## Task 3: Features page band — hands-on trade work (trade)

**Files:**
- Modify: `features.html:96-98` (insert new `<section>` between the "Get paid" group's closing `</section>` and the "Track & chase" group's opening `<section>`)

**Interfaces:**
- Consumes: `.photo-card` from Task 0

- [ ] **Step 1: Search Unsplash**

Call `mcp__unsplash__search_photos` with `query: "tradesman hands tools receipt"`, `orientation: "landscape"`, `per_page: 6`. If weak, try `query: "builder hands on tools closeup"`.

- [ ] **Step 2: Present 2-3 candidates, get approval**

Same pattern as Task 1.

- [ ] **Step 3: Download and convert**

```bash
curl -sL "<chosen url>" -o /tmp/hands-on-work-src.jpg
magick /tmp/hands-on-work-src.jpg -resize 1200x -quality 80 assets/photos/hands-on-work.webp
```

- [ ] **Step 4: Insert the markup**

Replace `features.html:96-98`:

```html
      </div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <div class="section-head">
        <p class="section-eyebrow">Track &amp; chase</p>
```

with:

```html
      </div>
    </div>
  </section>

  <section style="padding-top: 0; padding-bottom: 0;">
    <div class="wrap">
      <div class="photo-card" style="aspect-ratio: 21/9;">
        <img src="assets/photos/hands-on-work.webp" alt="Close-up of a tradesperson's hands working with tools on site" loading="lazy">
      </div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <div class="section-head">
        <p class="section-eyebrow">Track &amp; chase</p>
```

- [ ] **Step 5: Verify**

Run: `grep -n "hands-on-work" features.html; file assets/photos/hands-on-work.webp`
Expected: `<img>` line found, valid WebP reported.

`open features.html` and confirm the photo band sits between the "Get paid" and "Track & chase" card groups.

- [ ] **Step 6: Commit**

```bash
git add features.html assets/photos/hands-on-work.webp
git commit -m "Add hands-on-work photo band to features page"
```

---

## Task 4: Pricing page band — job-site moment (trade)

**Files:**
- Modify: `pricing.html:45-47` (insert new `<section>` between `</header>` and the pricing-grid `<section>`)

**Interfaces:**
- Consumes: `.photo-card` from Task 0

- [ ] **Step 1: Search Unsplash**

Call `mcp__unsplash__search_photos` with `query: "tradesperson job site work moment"`, `orientation: "landscape"`, `per_page: 6`.

- [ ] **Step 2: Present 2-3 candidates, get approval**

Same pattern as Task 1.

- [ ] **Step 3: Download and convert**

```bash
curl -sL "<chosen url>" -o /tmp/pricing-band-src.jpg
magick /tmp/pricing-band-src.jpg -resize 1200x -quality 80 assets/photos/pricing-band.webp
```

- [ ] **Step 4: Insert the markup**

Replace `pricing.html:45-47`:

```html
  </header>

  <section>
    <div class="wrap">
      <div class="pricing-grid">
```

with:

```html
  </header>

  <section style="padding-bottom: 0;">
    <div class="wrap">
      <div class="photo-card" style="aspect-ratio: 21/9;">
        <img src="assets/photos/pricing-band.webp" alt="A tradesperson at work on a job site" loading="lazy">
      </div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <div class="pricing-grid">
```

- [ ] **Step 5: Verify**

Run: `grep -n "pricing-band" pricing.html; file assets/photos/pricing-band.webp`
Expected: `<img>` line found, valid WebP reported.

`open pricing.html` and confirm the photo sits between the hero and the two price cards.

- [ ] **Step 6: Commit**

```bash
git add pricing.html assets/photos/pricing-band.webp
git commit -m "Add photo band to pricing page"
```

---

## Task 5: About page band — freelancer portrait (freelancer)

**Files:**
- Modify: `about.html:52-54` (insert new `<section>` between the mission-copy section's closing `</section>` and the CTA section's opening `<section style="background: var(--slate-50);">`)

**Interfaces:**
- Consumes: `.photo-card` from Task 0

- [ ] **Step 1: Search Unsplash**

Call `mcp__unsplash__search_photos` with `query: "freelancer portrait sole trader"`, `orientation: "portrait"`, `per_page: 6`. If weak, try `query: "small business owner portrait"`.

- [ ] **Step 2: Present 2-3 candidates, get approval**

Same pattern as Task 1.

- [ ] **Step 3: Download and convert**

```bash
curl -sL "<chosen url>" -o /tmp/about-portrait-src.jpg
magick /tmp/about-portrait-src.jpg -resize 800x -quality 80 assets/photos/about-portrait.webp
```

- [ ] **Step 4: Insert the markup**

Replace `about.html:52-54`:

```html
    </div>
  </section>

  <section style="background: var(--slate-50);">
```

with:

```html
    </div>
  </section>

  <section>
    <div class="wrap" style="max-width: 42rem;">
      <div class="photo-card" style="aspect-ratio: 3/4; max-width: 20rem; margin: 0 auto;">
        <img src="assets/photos/about-portrait.webp" alt="Portrait of a freelance sole trader" loading="lazy">
      </div>
    </div>
  </section>

  <section style="background: var(--slate-50);">
```

- [ ] **Step 5: Verify**

Run: `grep -n "about-portrait" about.html; file assets/photos/about-portrait.webp`
Expected: `<img>` line found, valid WebP reported.

`open about.html` and confirm the portrait sits centered, under the mission copy, above the CTA band.

- [ ] **Step 6: Commit**

```bash
git add about.html assets/photos/about-portrait.webp
git commit -m "Add portrait photo band to about page"
```

---

## Task 6: Footer photo credits (all 4 pages)

**Files:**
- Modify: `index.html`, `features.html`, `pricing.html`, `about.html` (each page's `<footer>`, immediately before `<p>&copy; 2026 Anytime Invoice</p>`)

**Interfaces:**
- Consumes: the 5 photographer names/profile URLs collected while approving photos in Tasks 1-5 (fetch each via WebFetch on `https://unsplash.com/photos/{id}` if not already captured — the Unsplash MCP `search_photos` tool doesn't return photographer name, only `id`/`urls`/`dimensions`/`description`)

- [ ] **Step 1: Collect photographer credits**

For each of the 5 downloaded photo IDs, WebFetch `https://unsplash.com/photos/{id}` and extract the photographer's display name and profile URL. Build one credit line, e.g.:

```html
<p style="font-size: var(--text-sm); color: var(--slate-500);">Photos: <a href="https://unsplash.com/@name1?utm_source=anytime_invoice&utm_medium=referral">Name One</a>, <a href="https://unsplash.com/@name2?utm_source=anytime_invoice&utm_medium=referral">Name Two</a>, ... / <a href="https://unsplash.com">Unsplash</a></p>
```

- [ ] **Step 2: Insert into all 4 footers**

In each of `index.html`, `features.html`, `pricing.html`, `about.html`, insert the credit line immediately before `<p>&copy; 2026 Anytime Invoice</p>` inside `<footer>`.

- [ ] **Step 3: Verify**

Run: `grep -c "Photos:" index.html features.html pricing.html about.html`
Expected: `1` for each of the 4 files.

- [ ] **Step 4: Commit**

```bash
git add index.html features.html pricing.html about.html
git commit -m "Add consolidated photo credits to footer on all pages"
```

---

## Task 7: Final full-site check

**Files:** none (verification only)

- [ ] **Step 1: Confirm all 5 photos exist and are valid WebP**

Run: `file assets/photos/*.webp`
Expected: 5 files, each reporting `RIFF ... Web/P image`.

- [ ] **Step 2: Confirm no leftover placeholder icons in replaced slots**

Run: `grep -n "logo-icon.svg" index.html`
Expected: only the footer's `<img src="assets/logo-icon.svg" ... class="foot-logo">` remains — the grid-2 placeholder from Task 2 should be gone.

- [ ] **Step 3: Open all 4 pages in the browser and visually confirm**

```bash
open index.html features.html pricing.html about.html
```

Confirm: each page shows its photo(s) at a sensible size, no broken images, no layout overflow, footer credit line present and readable on all 4.

- [ ] **Step 4: Push the branch**

```bash
git push origin dev
```

(Pushing to `dev` triggers `deploy-non-prod.yml` once `VERCEL_TOKEN` is configured — see the "Add VERCEL_TOKEN secret" task already tracked separately. Until then this just updates the branch; no live deploy happens.)
