# Reference Analysis — ebisagetachew.me

Captured 2026-11-24 with the built-in browser at 1440×900 (desktop) and 390×844 (mobile, DPR 2).
This document is the visual benchmark for the Nuxt rebuild. We reproduce the **design language and
interactions**, with violet (`#7c3aed` family) replacing the green accent and Soufiane Namouhi's
identity replacing the reference developer's. Nothing is copied verbatim.

## 1. Global design language

- **Near-black background** (~`#0a0a0a`), surface cards slightly lighter with **1px muted borders**
  (`~#27272a`) and **large corner radius** on cards (~24px), smaller on pills/buttons (~12–16px).
- **One accent** (green there, violet here) used surgically: active states, key headline words,
  mono annotations (`// …`), progress indicators, primary buttons, timeline line/nodes.
- **Three type roles**:
  - Display/headings: bold geometric grotesque, tight tracking, very large (hero ~72px desktop).
  - Body paragraphs: neutral sans, gray (`~#a1a1aa`), comfortable line-height.
  - Technical layer: monospace everywhere structural — nav links, section labels (`// Selected work`),
    eyebrows, stats labels, dates, tech lists, footer meta. Uppercase for eyebrows, mixed case elsewhere.
- **Section header pattern** (repeated everywhere):
  `// Label` (mono, accent) → oversized heading where the **last line/phrase is accent-colored** →
  gray description, sometimes right-aligned in a second column.
- Generous vertical rhythm: sections separated by ~120–160px whitespace and thin divider lines.
- Content max-width ~1280px, symmetric page gutters (~64px desktop, ~20px mobile).

## 2. Navigation (desktop)

- Fixed top bar, full width, transparent → subtle blur/darken on scroll, thin bottom border appears.
- Left: name wordmark + small accent square block after it.
- Center: `01 Home  02 Projects  03 Stack  04 About  05 Writing` — mono, number in muted accent-gray,
  word in white; **active link underlined in accent** (underline animates). Stack/About are anchors
  to home sections (`/stack` and `/about` 404 as pages on the reference — we still build real pages).
- Right: green dot + `Open to work remotely` (mono), bordered pill `Get in touch`.
- Mobile: brand left, `Get in touch` pill + hamburger (bordered square) right.

## 3. Mobile menu overlay

- Full-screen solid background; header row keeps brand + bordered X close button (accent border).
- Links are **huge** (~40px), each row: small mono number, title, right arrow; hairline dividers.
- Active link in accent color.
- Bottom block: availability line (accent dot + mono text), then full-width `Get in touch` and
  `Preview CV` bordered buttons.

## 4. Hero (home)

- Two-column: left content, right portrait photo (desktop). Mobile stacks: photo first, then text.
- Faint **grid/blueprint background** visible in hero area.
- Mono eyebrow: `// AI/RAG-focused full-stack developer · Next.js, NestJS` (accent).
- H1 ~4 lines, final line accent-colored. Left-aligned, ragged right.
- Body copy gray, ~max 46ch.
- CTAs: primary = accent-filled rounded rect with a **dark arrow square** inside right edge
  (`View projects →`); secondary = bordered pill with download icon (`Download CV`).
- Stats row below, separated by hairline: big white number + mono gray label under
  (`3+ Years building & shipping`, `15+ Production apps shipped`, `99 Average Lighthouse score`).
- **Floating card bottom-right** (desktop): `SELECT PROJECT` eyebrow, `● Available for projects`,
  helper text, white arrow button. Fixed theme-toggle orb (accent) sits bottom-right corner viewport.
- We replace the portrait with a **typographic/monogram composition** (no fake photo).

## 5. Project marquee

- Full-width strip inside a hairline-bordered container; items = small icon in bordered square +
  project name (sans, white) + mono uppercase category (gray). Duplicated list for seamless loop.
- Sits directly under the hero stats, above Selected work.

## 6. Selected work

- Header: `// Selected work` → `Five systems, engineered end to end.` (accent tail) → description;
  right-aligned `06 All projects →` mono link.
- **Featured flagship card**: full-width bordered card, split layout — device mockup screenshot on
  light panel left; right side: mono accent eyebrow, `● FEATURED FLAGSHIP` pill, big title,
  description, bullet list with accent dot markers, mono tech list (`Next.js 15 / NestJS 12 / …`),
  then buttons: accent `Live preview ↗`, bordered `GitHub`, plain `Read case study →`.
- Below: **2-column grid** of project cards — screenshot panel on top (light gray stage), mono
  accent category eyebrow, title, truncated description, hairline, mono tech list, same button trio
  (`Case study →` right-aligned).

## 7. Engineering process ("How I build") — signature sticky section

- Header: `// How I build` → `Six steps from raw idea to shipped product.` + right-aligned description.
- **Sticky viewport**: while scrolling, header + 6 cards stay pinned; scroll progress drives the
  **active step**. Cards: bordered, padded; inactive = dimmed (~40% opacity); active = accent
  border + glow, full opacity, slightly raised.
- Card anatomy: number pill (`01`), mono `// CATEGORY`, bold title, gray description (clamped),
  bottom outcome pill (`↳ A one-sentence p…`).
- Bottom: horizontal progress track with 6 dots; passed dots small accent, **active dot large with
  ring**, remaining hollow gray; track fills with accent as steps advance.
- Steps: 01 DISCOVERY Idea & Problem · 02 SCOPE Plan & Scope · 03 ARCHITECTURE Interface & Flow ·
  04 STACK Architect Stack · 05 BUILD Full-Stack Build · 06 RELEASE Ship & Refine.
  (Ours per spec: Discovery/Planning/Interface & Architecture/Development/Testing/Deployment.)
- Mobile: falls back to a natural vertical list — **no sticky hijack**.

## 8. Technology keyboard ("The stack")

- Header: `// The stack` → `The stack I trust in production.` + description + right annotation
  `16 tools · 4 groups`.
- Layout: left = keyboard board in a bordered panel; right = detail panel.
- Board rows have left-side row labels (mono, gray): Languages / Primary Platforms / Backend & Data /
  DevOps & Systems. Keys = dark keycaps (rounded ~10px, subtle bottom shadow for depth), small mono
  duration top-left (`2y`), name centered.
- **Active key**: accent fill, dark text, raised. Hover or keyboard focus activates a key.
- Detail panel: `key 04 of 16` mono + category pill top row, big key name, oversized duration number
  + `years on the board`, accent progress bar with `Used` / `Daily` labels, gray description.
- Ours: 4 groups per spec (Frontend / Backend & Data / Mobile / Tools & Infrastructure), violet
  active illumination, durations only where verified (so: show only when confirmed — config flag).

## 9. Git career timeline

- Header: `// Git log --journey` → `Three years, every line committed.` + right column with
  description + `Download CV` button.
- Entries: left meta column (mono date range + short hash), vertical accent line with glowing nodes;
  entry mono header (`HEAD → main · Name · Status` or `# initial commit · 2023`), bold title, gray
  description, right-aligned tech tag pills.
- Line fills accent through completed entries; latest node glows.

## 10. About section (home)

- `// About` → giant editorial statement paragraph where most words are dimmed gray and key phrases
  are white/accent (`…the best code is the code the next person can read.` with `read.` in accent).
- Right: photo card with caption `— Name · City`.

## 11. Contact section (home)

- `// Contact` → `Let's engineer your next system.` + description.
- Left: form card — Name, Email, Message fields (dark inputs, hairline borders, mono labels).
- Right: availability card with decorative accent-wave background, `Available for remote work ●`,
  contact rows: icon in bordered circle + mono label + value (Email / Phone / Location / Response time).

## 12. Footer

- Top: brand + short description (left), `// Pages` and `// Social` link columns (right), hairline.
- Bottom row: `● Local time, Adama 18:18 EAT` (mono, accent dot) left; `© 2026 …` right.
- **Giant name** at very bottom with metallic/photo gradient text fill, clipped at viewport edge.
- Ours: `Designed with intention. Engineered in Morocco.` + Casablanca local time + giant
  "Soufiane Namouhi" gradient treatment.

## 13. Interior pages

- **/projects**: `← Back to home`, `// PROJECTS`, `Complete systems, built for production.`,
  stats row (5 projects & case studies / 15+ / 99), filter pills with counts (`All 5`, `React 5`…),
  `05 projects` annotation, 2-col card grid (same card design as home).
- **/projects/[slug]**: back link, mono eyebrow + tag pill, huge title, long description, CTA row
  (accent Live preview, bordered GitHub), hairline, 4-col meta grid (ROLE / TIMELINE / CORE STACK /
  HIGHLIGHT — highlight values in accent), hero screenshot, then numbered editorial sections:
  sticky-ish left column with `01 // THE PROBLEM` + big title, right column content; challenges as
  numbered 3-col blocks (accent mono titles); architecture as 2-col cards (title, accent mono tech
  line, description); next-project navigation at bottom.
- **/writing**: `// Writing`, `Notes on building systems that scale.`, small stats, category pills,
  article rows: mono date left, bold title + gray description center, category pill + read time +
  arrow button right, hairline separators.
- **404**: centered `// 404`, `Page not found`, description, accent `Return home` pill.

## 14. Motion language

- Content **lazy-reveals on scroll** (fade + slight rise, staggered); sections render only when near
  viewport.
- Marquee: constant linear translate, seamless; pauses on hover.
- Process: scroll-driven step activation (sticky), progress fill tweened to scroll.
- Keyboard: springy press on hover/focus; detail panel cross-fades between keys.
- Counters animate up when stats enter viewport.
- Buttons: subtle scale/brightness on hover; arrow icons nudge right.
- Nav underline animates between items; mobile menu items stagger in.
- All respect reduced motion (assumed; we implement it regardless).

## 15. Adaptation decisions for our build

- Accent: green → **violet** (`#7c3aed` primary, `#8b5cf6` hover, `#a78bfa` accent, `#c4b5fd`
  highlight, glow `rgba(124,58,237,.15)`), on `#09090b` background, surfaces `#111113`/`#18181b`,
  border `#27272a`, text `#fafafa`/`#a1a1aa`/`#71717a`.
- Fonts: Space Grotesk (display) + Inter (body) + JetBrains Mono (technical layer).
- No portrait photo → typographic "SN" monogram composition in the hero visual area.
- No fabricated metrics: stats limited to `3+ years`, `5 professional projects`, `Morocco`.
- Private enterprise projects get a `Private enterprise project` label instead of repo links.
- Pages: real `/stack` and `/about` pages (reference uses anchors), plus `/contact` page.
- Loading intro plays once per session; short, monogram + progress + mono init lines.
