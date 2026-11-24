# IMPLEMENTATION STATUS

_Last updated: 2026-11-13_

## State: feature-complete, verified locally

Production build passes, 23/23 tests pass, ESLint clean, `vue-tsc` clean.
Verified in a real browser (Kimi Code desktop browser, production preview build):
homepage (all sections + reveal animations), projects listing, project case study,
theme switch (dark ⇄ light), locale switch (EN ⇄ FR — FR was auto-detected from OS),
config-safe contact states, footer, preloader, hero canvas.

## Completed

- [x] Scaffold: Vue 3 + Vite 6 + TS strict + Tailwind v4 + ESLint flat + Prettier
- [x] Design tokens (dark + fully designed light), fluid type scale, themes with pre-paint script
- [x] i18n EN/FR (persisted, document lang, identical key sets, test-enforced)
- [x] Content model: 6 bilingual projects (all `draft: true`), experience, expertise, process, stack
- [x] Config: `src/config/site.ts` — email/GitHub/LinkedIn/résumé `null` → intentional hidden states
- [x] Routes: Home, Projects, ProjectDetail (per-slug, unknown → 404), About, Contact, 404
- [x] Preloader (SN monogram, once per tab session, reduced-motion safe, no fake percentages)
- [x] Nav: sticky blur, active link underline, mobile overlay (Escape, focus management, scroll lock)
- [x] Hero canvas (dot field + gyroscope rings, pointer-reactive, offscreen-paused, RM static frame)
- [x] Homepage sections: hero, status strip, selected work, about, expertise, journey (scrub progress
  line), process, stack explorer (tabs), contact (pointer-parallax glow), footer
- [x] Case study template: hero visual, draft notice, overview/context, challenges/responsibilities,
  approach, features, technologies, prev/next nav
- [x] Motion: Reveal wrapper (gsap.context, revert on unmount), magnetic buttons, page transitions,
  scroll progress bar, accent cursor follower (fine pointers only)
- [x] SEO: per-route title/description/OG/Twitter, canonical via `VITE_SITE_URL`, JSON-LD (Person +
  WebSite), `robots.txt`, build-time `sitemap.xml`, semantic headings
- [x] A11y: skip link, landmarks, focus-visible, aria on tabs/menu/dialog, reduced-motion everywhere
- [x] Tests: `tests/` (content, routing, stores, components, home smoke) — all jsdom API gaps stubbed

## Key fixes made during verification

1. `@theme inline` does not emit custom properties → fluid type vars moved to plain `:root`,
   exposed via `@utility text-hero/text-h2/text-h3` (also fixes Tailwind `text-[var()]` color-vs-size ambiguity).
2. Hero content must never depend on CSS `opacity-0` classes → initial states set via JS only,
   so content survives JS failure / reduced motion.
3. Lucide brand icons (`Github`, `Linkedin`) removed upstream → `GitBranch` / `Briefcase`.
4. `lucide-vue-next` deprecated → using `@lucide/vue`.
5. Theme store applies/persists synchronously in actions (watch flush was racy).

## Not done / next steps

- [ ] **Contact details**: fill `src/config/site.ts` (`email`, `github`, `linkedin`, `resumeUrl`) +
      set `VITE_SITE_URL`, then flip project drafts to `false` after verifying disclosure.
- [ ] **Mobile pass**: hero, mobile menu and 390px/360px viewports were implemented mobile-first but
      only desktop (1440) was screenshot-verified. Run `npm run dev` and check 360–768px + menu/keyboard.
- [ ] **og:image**: add a real `public/og.png` (1200×630) when a domain exists.
- [ ] Lighthouse run on the deployed URL (targets documented in README).
- [ ] Optional: Playwright e2e (deliberately skipped — heavy dep; unit tests cover interactions).
- [ ] Future features pre-structured but not built: blog, contact API, CMS, Arabic locale.

## Commands

`npm run dev` · `npm run build` · `npm test` · `npm run lint` · `npm run typecheck`
