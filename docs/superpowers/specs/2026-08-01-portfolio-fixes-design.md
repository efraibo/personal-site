# Portfolio Site Fixes & Improvements — Design

Date: 2026-08-01
Status: Approved

## Context

The site is a portfolio SPA. Despite the presence of `src/app/layout.tsx` and
`src/app/page.tsx` (Next.js App Router files) and `next.config.js`, the app is
**actually built and deployed with Vite** (`vite build` → `dist/`, deployed to
GitHub Pages via `.github/workflows/deploy.yml`, custom domain
`evandrodev.com.br` per `public/CNAME`). `src/main.tsx` mounts
`src/app/page.tsx` as the root component inside `index.html`. The Next.js
`layout.tsx` metadata export is dead code — it is never rendered. Any SEO/head
work must target `index.html`, not `layout.tsx`.

i18n is a hand-rolled `LanguageContext` (`pt`/`en`) with a flat
`translations.pt` / `translations.en` dictionary and a `t(key)` lookup,
persisted to `localStorage`, defaulting from `navigator.language`.

## 1. Hero title overflow

`src/components/Hero.tsx`: the `<h1>` uses fixed Tailwind breakpoint sizes
(`text-5xl md:text-7xl lg:text-8xl`, i.e. 48px/72px/96px bold). At narrow
mobile widths (~390px) 48px bold is too large for "Nascimento" (10 chars) and
overflows/clips because the section wraps in `overflow-hidden`.

Fix: replace the breakpoint classes with a fluid clamp:

```
className="text-[clamp(2.25rem,6vw+1rem,6rem)] font-bold text-gray-900 leading-tight break-words"
```

This scales continuously from ~36px (well under the fixed 48px minimum that
currently overflows) at narrow widths up to 96px at desktop (same ceiling as
today's `lg:text-8xl`), so it's a strict shrink at the low end and unchanged
at the high end. No other headings are in scope for this fix.

## 2. Projects section

`src/components/Projects.tsx` already exists (6 real projects, PT only) but is
**not imported in `src/app/page.tsx`** — this is the actual cause of the
"static 50+ Projects number, no listed projects" bug.

Changes:

- New `src/data/projects.ts`:

  ```ts
  export interface Project {
    id: string;
    title: { pt: string; en: string };
    description: { pt: string; en: string };
    category: { pt: string; en: string };
    technologies: string[];
    links?: { repo?: string; demo?: string };
  }
  export const projects: Project[] = [ /* the existing 6, translated to EN,
    links omitted (undefined) since no real repo/demo URLs exist yet */ ];
  ```

- `Projects.tsx` reads `language` from `useLanguage()`, indexes
  `title[language]` etc., and renders a "Repo" / "Demo" link only when
  `links?.repo` / `links?.demo` is set. Section heading text switches from
  hardcoded strings to the existing (currently unused) `projects.title` /
  `projects.titleHighlight` / `projects.description` i18n keys.
- `src/app/page.tsx`: import and render `<Projects />` between `<Experience />`
  and `<Skills />`.
- `src/components/Header.tsx`: add a nav item (`nav.projects` key, new,
  `href="#projetos"`, matching the existing section `id="projetos"`) to both
  the desktop `navItems` array and mobile menu (same array, no duplication
  needed).
- `src/components/Footer.tsx`: add the same link to quick links, if that list
  mirrors nav items (verify at implementation time).
- New i18n keys (pt/en): `nav.projects`.

## 3. Skills: replace percentage bars with level badges

`src/components/Skills.tsx`: each skill currently has `level: number` (0-100)
rendered as an animated bar + "N%" text.

Fix: replace with a textual proficiency badge. One-time mapping from current
numbers (no runtime threshold logic — bake the label into the data):

- `>= 90` → Advanced / Avançado
- `80-89` → Intermediate / Intermediário
- `< 80` → Basic / Básico

Data shape becomes `{ name: string; level: 'advanced' | 'intermediate' |
'basic' }`. Render each skill as `name` + a small colored pill showing the
translated label (new keys `skills.level.advanced/intermediate/basic`). Drop
the progress-bar markup and its width animation entirely. Category grouping
and card layout are unchanged.

## 4. Reduced motion & animation timing

Two independent changes:

- **`prefers-reduced-motion` support**: wrap the app root in `src/main.tsx`
  with framer-motion's `<MotionConfig reducedMotion="user">`. This disables
  transform-based animation (x/y/scale/rotate) globally whenever the OS-level
  `prefers-reduced-motion: reduce` is active, with no per-component changes
  needed. Opacity fades still play (minimal, not disorienting).
- **Trim timing budget everywhere** (independent of the OS setting, affects
  all users): audited files —
  `About.tsx`, `Contact.tsx`, `Education.tsx`, `Experience.tsx`, `Footer.tsx`,
  `Header.tsx`, `Hero.tsx`, `LanguageSelector.tsx`, `Skills.tsx`,
  `Projects.tsx`. Apply consistently:
  - Base `duration` values of `0.8`/`0.6` → `0.4`; `0.5` → `0.3`.
  - Uncapped per-index stagger delays (`index * 0.1`, `skillIndex * 0.1`, etc.)
    → capped, e.g. `Math.min(index * 0.05, 0.3)`, so a long list (e.g. 6 skills
    per category, nested inside a staggered category grid) can't compound
    into >1s before the last item appears.

## 5. Experience dates follow active language

`src/components/Experience.tsx`: `period` is currently a hardcoded
Portuguese string per entry (e.g. `"Abril 2024 - Presente"`,
`"Agosto 2022 - Fevereiro 2024"`).

Fix: restructure each entry to structured dates:

```ts
{ startYear: 2024, startMonth: 4, endYear: undefined, endMonth: undefined }
```

and add a `formatPeriod(start, end, language)` helper using
`Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'pt-BR', { month: 'long', year: 'numeric' })`
per date, joined with `" - "`, substituting the existing
`t('experience.present')` when `end` is undefined. This localizes month names
without adding new i18n keys for months.

## 6. SEO metadata (in `index.html`, not `layout.tsx`)

`index.html` already has basic `og:*`/`twitter:*` tags (PT only, no image).
Add, in `index.html`:

- `og:image`, `og:image:width`, `og:image:height`, `twitter:image`,
  `twitter:card` upgraded to `summary_large_image`.
- `<link rel="canonical" href="https://evandrodev.com.br/">`.
- `<meta name="robots" content="index, follow">`.
- A `Person` JSON-LD block:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Evandro Nascimento",
    "jobTitle": "Software Developer & Tech Lead",
    "url": "https://evandrodev.com.br/",
    "email": "mailto:efraibo@gmail.com",
    "sameAs": ["https://www.linkedin.com/in/evandronascimento"]
  }
  ```

**OG image**: no photo/logo exists in `public/`. Generate a 1200×630 SVG
(name, title, gradient consistent with `globals.css` theme) and rasterize it
to `public/og-image.png` via a one-off Node script
(`scripts/generate-og-image.mjs`) using `sharp` as a devDependency (build-time
only, not part of the shipped app bundle). Reference
`https://evandrodev.com.br/og-image.png` as the absolute `og:image`/
`twitter:image` URL.

`layout.tsx` (Next.js metadata) is left untouched — it's dead code not part
of the deployed build, and touching it doesn't affect the live site.

## Testing

After implementation: run `npm run dev` (Vite), use the `run` skill to drive
a real browser, and visually verify at 390px, 768px, and 1280px viewport
widths — in particular confirming the Hero title never overflows, animations
still look reasonable, and the new Projects section renders correctly in both
languages.
