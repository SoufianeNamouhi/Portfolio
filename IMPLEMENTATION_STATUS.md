# Implementation Status

Last updated: 2026-11-24 (Phase 7 complete)

## What this is

Nuxt 4 rebuild of Soufiane Namouhi's portfolio, reproducing the design language of
https://www.ebisagetachew.me/ (analysis in `REFERENCE_ANALYSIS.md`) with a violet identity.
The earlier Vite/Vue build is kept in `legacy-vite/` for reference only — the Nuxt app at the
repository root is authoritative. Delete `legacy-vite/` when it is no longer needed.

## Completed

- Phase 1 — Reference analysis → `REFERENCE_ANALYSIS.md`
- Phase 2 — Nuxt 4 scaffold: TS strict, Tailwind v4 tokens (dark default + full light theme),
  fonts (Space Grotesk / Inter / JetBrains Mono), motion-v, lucide-vue-next, Nuxt Content,
  Nuxt SEO, Nuxt Image, VueUse
- Phase 3 — Homepage: header, hero (monogram panel, pointer tilt, stats), project marquee,
  selected work (featured + grid)
- Phase 4 — Sticky scroll-driven engineering process (6 steps, vertical list on mobile /
  reduced motion), interactive technology keyboard (16 techs, 4 groups, detail panel),
  Git-style career timeline
- Phase 5 — Pages: `/projects`, `/projects/[slug]` (5 case studies), `/stack`, `/about`,
  `/writing` + `/writing/[slug]` (Nuxt Content), `/contact` + `server/api/contact.post.ts`
  (honeypot, rate limit, Resend provider, honest 503 when unconfigured), `error.vue` (404)
- Phase 6 — Browser QA at 360/390/768/1024/1440/1920; mobile menu (Escape, focus, scroll
  lock), theme toggle, contact form validation + unconfigured state, keyboard interaction
- Phase 7 — `vue-tsc` typecheck clean, ESLint clean, production build succeeds
  (~27 s), `nuxt preview` verified: all routes 200, unknown routes 404, sitemap.xml and
  robots.txt 200, `/api/contact` returns honest 503 without config

## Fixes applied during QA

- Mobile header: brand `whitespace-nowrap` + smaller size; "Get in touch" wrapped in
  `hidden sm:block` container because the unlayered `.btn-outline` class beat Tailwind's
  layered `hidden` utility.
- Technology keyboard: group label above keys on mobile, 2-column keycaps < 640 px.
- `figcaption` inside `div` → restructured (AboutSection) — was the dev-tools warning.
- Removed redundant viewport meta (nuxt-seo-utils hint).
- Type fixes: `nextProject` undefined case, keyboard `technologies[0]` index, `@types/node`
  for the server endpoint.

## Verification results (measured, not claimed)

- `npx vue-tsc --noEmit -p .nuxt/tsconfig.json` — 0 errors
- `npx eslint .` — 0 errors, 0 warnings
- `npm run build` — success; client 1.93 MB (751 kB gzip), Nitro output built
- `npx nuxt preview` — `/`, `/projects`, `/projects/metaphore`, `/stack`, `/about`,
  `/writing`, `/contact` → 200; `/nonexistent` → 404; `/sitemap.xml`, `/robots.txt` → 200;
  `POST /api/contact` → 503 "Email delivery is not configured yet"
- No Lighthouse run yet — scores must be measured on the deployed site, not invented.

## Placeholders awaiting the user (config-safe, nothing fabricated)

In `app/data/profile.ts`: `email`, `github`, `linkedin`, `cvUrl`, `portraitUrl`
(all `null` → UI hides or shows honest "configured soon" states), `availability.show`
(`false`).

Other expected inputs:

- Real project screenshots/assets (currently clearly-labelled conceptual SVG mockups in
  `app/components/projects/ProjectVisual.vue`)
- Reviewed project descriptions — entries flagged `draft: true` in `app/data/projects.ts`
  render with a visible draft badge (deliverypro, metaphore-postgresql, metaphore-sdtm)
- Exact employment dates — timeline entries in `app/data/experience.ts` use coarse,
  editable dates; Git-style refs are decorative, not real commit hashes
- Real articles — `content/writing/` is intentionally empty; the listing shows an
  "In preparation" empty state
- Email delivery: set `CONTACT_EMAIL`, `CONTACT_PROVIDER=resend`, `RESEND_API_KEY`,
  `CONTACT_FROM` to activate the form

## Known limitations / next steps

- OG images disabled: no renderer installed. Run `npx nuxt-og-image enable takumi` and set
  `NUXT_APP_SECRET` in production to enable generated social cards.
- Intro loader verified by code path (once per session via `sn-intro-seen`); the embedded
  test browser shares sessionStorage across tabs, so it could not be re-triggered visually.
- Contact form success path untested (requires Resend credentials); error/unconfigured
  paths verified.
- `nuxi typecheck` prints tsc help instead of running in this environment; use the direct
  command above (wired into `package.json`? — check before relying on `npm run typecheck`).
- `legacy-vite/` still present; remove when convenient.
- No git commit created yet.

## How to continue

```bash
npm install
npm run dev        # http://localhost:3000
npx vue-tsc --noEmit -p .nuxt/tsconfig.json   # typecheck
npx eslint .                                  # lint
npm run build && npx nuxt preview             # production check
```

Content lives in `app/data/*.ts` and `content/writing/*.md` — see `README.md` for
configuration, adding projects/articles, environment variables and Vercel deployment.
