# Anytime Invoice — Marketing Website (transition-period static site)

Plain static HTML/CSS site (no build step, no framework, no CMS) serving as
the interim public marketing site while the full headless-CMS build
(Strapi + Next.js) described in ADR-0020 is implemented.

- Brand tokens (colors, type, spacing) copied from the
  [Anytime Invoice Design System](https://claude.ai/design) — see
  `assets/styles.css` header comment.
- Logo/favicon assets copied from the same design system snapshot.
- Copy is grounded in shipped product features only (see the invoicing
  repo's `docs/PRD.md` Phase 1–4 tables) — nothing marketed here is
  unbuilt or unavailable to a signed-up user.

## Pages

- `index.html` — home
- `features.html` — feature tour
- `pricing.html` — Free vs Pro
- `about.html` — mission / audience

## Deploy

Static site, zero-config on Vercel. `vercel --prod` from this directory,
or connect the repo in the Vercel dashboard.

## Retiring this site

Per ADR-0020 (anytime-invoice repo) D2, this coexists with the invoicing
app's in-app landing page (F48) during a transition period. Once the full
CMS-based site (see `docs/grooming/2026-07-24-marketing-site.md` in the
anytime-invoice repo) ships, this repo should be retired/redirected.
