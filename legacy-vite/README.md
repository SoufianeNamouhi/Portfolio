# Soufiane NAMOUHI — Portfolio

Personal developer portfolio of **Soufiane NAMOUHI**, full-stack web developer based in Casablanca, Morocco.

Dark-editorial, motion-driven single-page application built with **Vue 3 + Vite + TypeScript**, styled with **Tailwind CSS v4** design tokens, animated with **GSAP + ScrollTrigger**, and internationalized (English / French) with **Vue I18n**.

## Getting started

```bash
npm install
npm run dev        # local dev server
npm run build      # typecheck (vue-tsc) + production build → dist/
npm run preview    # serve the production build locally
npm test           # Vitest unit/integration tests
npm run lint       # ESLint with autofix
npm run typecheck  # vue-tsc --noEmit
```

Node.js ≥ 20 recommended.

## Configuration

### Contact & identity — `src/config/site.ts`

The single source of truth for identity and contact channels. **No contact details are invented:**
`email`, `github`, `linkedin` and `resumeUrl` are `null` by default. The UI renders an intentional
"channel not configured" state for each `null` value. Fill them in with real, verified details before
publishing. `availableForWork` stays `false` unless availability should be signaled.

### Canonical URL

Set `VITE_SITE_URL` (see `.env.example`) to the production origin. It drives `sitemap.xml` generation
(at build time) and `og:url`/canonical meta tags. No domain is invented when unset.

## Adding or editing content

Everything content-driven lives in typed files under `src/content/`:

- `projects.ts` — case studies (bilingual `en`/`fr` fields). Every entry is marked `draft: true` by
  default; verified projects can set `draft: false` and fill `year`.
- `experience.ts` — journey timeline entries
- `expertise.ts` — the three expertise areas
- `process.ts` — the four process steps
- `stack.ts` — technology explorer categories

Localized UI strings live in `src/i18n/locales/{en,fr}.json` (key sets must stay identical — a test
enforces this). Adding a language = add a locale file + register it in `src/i18n/index.ts`.

**To add a project:** append an entry to `projects.ts` following the `Project` type, and add its slug
to the sitemap list in `vite.config.ts`. The route, listing, SEO and navigation are derived automatically.

## Architecture

```
src/
  app/ (reserved)        assets/ (reserved)
  components/  ui/ · layout/ · motion/ · sections/ · projects/
  composables/ useSeo · useMagnetic
  config/      site.ts
  content/     projects · experience · expertise · process · stack
  i18n/        index + locales
  lib/         gsap (registered plugin, shared import)
  router/      routes (lazy views, per-route meta)
  stores/      theme (Pinia)
  styles/      main.css (tokens, themes, base, utilities)
  types/       content model
  views/       Home · Projects · ProjectDetail · About · Contact · 404
```

Design decisions worth knowing:

- **Themes** are CSS custom properties switched via `data-theme` on `<html>`; Tailwind semantic
  utilities (`bg-bg`, `text-muted`, `border-line`, `text-accent`…) map to them in `@theme inline`.
  Dark is default; an inline script in `index.html` applies the saved theme before first paint.
- **Motion** uses one shared GSAP import (`@/lib/gsap`). All triggers/tweens are created inside
  `gsap.context()` and reverted on unmount. `prefers-reduced-motion` disables animation and leaves
  content fully visible (initial states are set in JS, never in CSS classes).
- **The hero visual** is a dependency-free 2D canvas (dot field + wireframe gyroscope), pointer-reactive,
  paused offscreen, single static frame under reduced motion.
- **Project visuals** are original generative SVG compositions, explicitly labelled "Conceptual visual"
  — they are not screenshots and never claim to be.

## Deployment

`npm run build` produces a static `dist/` (SPA). Deploy to any static host (Netlify, Vercel, GitHub
Pages, nginx…). SPA fallback is required for deep links like `/projects/metaphore` — e.g. Netlify
_redirects `/* /index.html 200`, or `try_files $uri /index.html` on nginx.

## Testing & quality

- 23 Vitest tests: content integrity (bilingual coverage, draft/confidentiality invariants, no invented
  metrics), routing, theme/locale stores, and component interactions (copy, language switch, theme toggle).
- TypeScript strict mode; ESLint (flat config) + Prettier.

Performance goals (Lighthouse: 90+/95+/95+/95+, LCP < 2.5s, CLS < 0.1, INP < 200ms) are targets to
validate on the deployed site — they are not claimed results.
