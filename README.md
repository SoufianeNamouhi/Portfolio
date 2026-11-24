# Soufiane Namouhi — Portfolio

Personal developer portfolio for **Soufiane Namouhi**, software developer based in Casablanca, Morocco.
Dark editorial design with a violet identity, built with Nuxt 4, Vue 3, TypeScript, Tailwind CSS v4 and Motion for Vue.

Production domain: `https://soufianenamouhi.dev` (configured via `NUXT_SITE_URL`, see Environment).

## Stack

- **Nuxt 4** (Vue 3, `<script setup lang="ts">`, SSR)
- **Tailwind CSS v4** via `@tailwindcss/vite` — design tokens in `app/assets/css/tokens.css`
- **Motion for Vue** (`motion-v`) — animations, scroll reveals, transitions
- **Lucide Vue Next** — icons
- **Nuxt Content** — Markdown articles (`content/writing/`)
- **Nuxt SEO** (`@nuxtjs/seo`) — sitemap, robots, schema.org, meta
- **Nuxt Fonts** — Space Grotesk (display), Inter (body), JetBrains Mono (technical)
- **Nuxt Image** — image optimization (used when real assets are added)

## Setup

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

```bash
npm run dev        # dev server
npm run build      # production build (.output/)
npm run preview    # serve the production build locally
npm run typecheck  # vue-tsc via nuxi typecheck
npm run lint       # eslint
```

## Configuration — personal information

All personal data lives in typed files under `app/data/`:

| File | Contents |
| --- | --- |
| `app/data/profile.ts` | Name, role, location, company, email, GitHub, LinkedIn, CV URL, portrait URL, availability flag |
| `app/data/projects.ts` | Project case studies (slug, stack, responsibilities, challenges, sections, draft flags) |
| `app/data/technologies.ts` | Technology keyboard content (4 groups, descriptions, usage, optional years) |
| `app/data/experience.ts` | Career timeline entries (dates are coarse and editable) |

### Placeholders awaiting real information

The following are intentionally `null` in `app/data/profile.ts`. The UI renders
configuration-safe states (nothing broken, nothing fabricated) until they are filled in:

- `email` — contact page shows "Configured soon" state; copy-email button is hidden
- `github`, `linkedin` — social links are hidden until set
- `cvUrl` — CV buttons appear only when a URL is provided (put the PDF in `public/documents/`)
- `portraitUrl` — the hero shows an intentional monogram composition instead of a photo
- `availability.show` — set `true` only if the availability badge should be displayed

### Adding a project

1. Add an entry to `projects` in `app/data/projects.ts` (types in `app/types/content.ts`).
2. Set `draft: true` until the content is reviewed; drafts render with a visible badge.
3. The route `/projects/<slug>` is generated automatically. The project visual is a clearly
   labelled conceptual SVG mockup until real, authorized screenshots replace it
   (`app/components/projects/ProjectVisual.vue`).

### Adding an article

1. Create `content/writing/<slug>.md` with frontmatter:
   `title`, `description`, `date`, `category`, `draft: false`.
2. The listing page `/writing` and the article page `/writing/<slug>` pick it up automatically
   (reading time, table of contents, syntax highlighting, SEO meta).
3. Articles with `draft: true` are not listed.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NUXT_SITE_URL` | Canonical site URL (default `https://soufianenamouhi.dev`) |
| `CONTACT_EMAIL` | Inbox that receives contact form messages. Without it the API returns 503 and the UI shows an honest "not configured" state — no fake success |
| `CONTACT_PROVIDER` | `resend` to enable delivery |
| `RESEND_API_KEY` | Resend API key (server-side only) |
| `CONTACT_FROM` | Verified sender address, e.g. `Portfolio <contact@soufianenamouhi.dev>` |

Secrets stay server-side (`server/api/contact.post.ts`); nothing is exposed to the client.

## Contact form

`server/api/contact.post.ts` implements:

- Honeypot spam field (silent accept, no mail sent)
- In-memory rate limit: 5 messages / 10 minutes / IP
- Server-side validation (name, email, message length)
- `503` with an honest UI state when no email provider is configured

## Deployment (Vercel + Spaceship domain)

1. Push the repository to GitHub and import it in Vercel — the Nuxt preset is auto-detected,
   no config file is required (`npm run build` → `.output/`).
2. Set the environment variables above in the Vercel project settings.
3. Buy `soufianenamouhi.dev` on Spaceship, then in Vercel → Domains → add the domain.
   Point Spaceship DNS to Vercel (`A` record `76.76.21.21` and `CNAME` `cname.vercel-dns.com`
   for `www`, or use Vercel nameservers). HTTPS is issued automatically.

## Design notes

- Dark theme by default with a fully designed light theme (`html.light`), persisted in
  `localStorage` (`sn-theme`).
- Reduced-motion is respected everywhere: intro, marquee, reveals, sticky process section.
- The intro plays once per browser session (`sessionStorage` key `sn-intro-seen`).
- All project visuals are original conceptual SVG mockups, labelled as such — no fabricated
  screenshots, metrics, testimonials or repository links.
