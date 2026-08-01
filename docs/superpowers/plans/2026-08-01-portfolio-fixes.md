# Portfolio Site Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix six issues on the `evandrodev.com.br` portfolio SPA: Hero title overflow on narrow screens, a missing (built-but-unwired) Projects section, percentage-bar Skills replaced with proficiency badges, `prefers-reduced-motion` support plus snappier scroll animations, English-localized Experience dates, and SEO/OG/JSON-LD metadata.

**Architecture:** No structural rewrite — targeted edits to existing React components (`src/components/*`), one new small data file (`src/data/projects.ts`), a global `MotionConfig` wrapper in the real app entry point (`src/main.tsx`), and static `<head>` changes in `index.html` (the file that actually ships — see Global Constraints).

**Tech Stack:** React 18 + TypeScript, Vite (real build/dev tool — NOT Next.js, see below), Tailwind CSS, framer-motion.

## Global Constraints

- **This project ships via Vite, not Next.js**, despite `src/app/layout.tsx` / `src/app/page.tsx` / `next.config.js` existing in the repo. `npm run dev` / `npm run build` both run Vite (`vite` / `vite build`). `src/main.tsx` is the real entry point; it renders `src/app/page.tsx` as a plain component into `index.html`. **`src/app/layout.tsx` is dead code — never edit it for these tasks; its `metadata` export is not part of the deployed output.** Real `<head>` content lives in `index.html`.
- No test framework is installed (no jest/vitest in `package.json`, no `*.test.*` files anywhere). Do not add one for this work. Each task's verification step is `npx tsc --noEmit` (fast type-check — confirmed clean on the current codebase) instead of a unit test run. The final task does a full `npm run build` plus manual visual verification, matching the spec's own acceptance criteria (visual check at 3 breakpoints), not unit tests.
- i18n: `useLanguage()` from `src/contexts/LanguageContext.tsx` returns `{ language: 'pt' | 'en', setLanguage, t }`. Translation keys are added as matching entries in both the `pt` and `en` blocks of the `translations` object in that file.
- Existing section anchor IDs (do not rename): `#hero`, `#sobre`, `#experiencia`, `#skills`, `#educacao`, `#contato`. New Projects section reuses the anchor `#projetos` already present (unused) in `Projects.tsx`.
- Animation timing trims (Tasks 3, 4, 5, 6) all follow the same two rules, applied per component:
  - Flat `duration`: `0.8` → `0.4`, `0.6` → `0.3`, `0.5` → `0.3`, `1` → `0.4`.
  - Flat numeric `delay` (not an index multiplier): halve and round to the nearest `0.05` (`0.2`→`0.1`, `0.3`→`0.15`, `0.4`→`0.2`, `0.5`→`0.25`, `0.6`→`0.3`).
  - Indexed stagger delay (`index * X`): keep the pattern but wrap in `Math.min(index * X/2, cap)` where `cap` is `0.3` for delays that could run over ~5 items, `0.15`-`0.25` for longer lists (6+ items) — exact caps are given per occurrence below.

---

### Task 1: Fix Hero title responsive overflow

**Files:**
- Modify: `src/components/Hero.tsx:29`

**Interfaces:** None (isolated className change, no new exports/props).

- [ ] **Step 1: Replace the fixed breakpoint font-size classes with a fluid clamp**

In `src/components/Hero.tsx`, find:

```tsx
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 leading-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
```

Replace with:

```tsx
            <motion.h1 
              className="text-[clamp(2.25rem,6vw+1rem,6rem)] font-bold text-gray-900 leading-tight break-words"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
```

(Only the `className` value changes — `initial`/`animate`/`transition` here are handled by Task 6, leave untouched in this step.)

- [ ] **Step 2: Verify with a type-check**

Run: `npx tsc --noEmit`
Expected: no output (no errors).

- [ ] **Step 3: Manually confirm in the browser**

Run `npm run dev`, open the printed local URL, open browser dev tools, set viewport width to 390px, and confirm "Evandro Nascimento" no longer overflows or gets clipped horizontally. Leave the dev server running or stop it — either is fine, later tasks each start their own check.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "fix: make Hero title font-size fluid to prevent overflow on narrow screens"
```

---

### Task 2: Add global prefers-reduced-motion support

**Files:**
- Modify: `src/main.tsx`

**Interfaces:** None (wraps existing `<App />` tree, no prop/API changes).

- [ ] **Step 1: Wrap the app root in framer-motion's MotionConfig**

In `src/main.tsx`, find:

```tsx
import './shims/next-compat.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/page';
import './app/globals.css';
import ErrorBoundary from './components/ErrorBoundary';
import { LanguageProvider } from './contexts/LanguageContext';

// Next.js compatibility is now handled by the imported next-compat.js

// Log startup information to help with debugging
console.log('[Vite App] Starting application with Next.js compatibility layer');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
```

Replace with:

```tsx
import './shims/next-compat.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { MotionConfig } from 'framer-motion';
import App from './app/page';
import './app/globals.css';
import ErrorBoundary from './components/ErrorBoundary';
import { LanguageProvider } from './contexts/LanguageContext';

// Next.js compatibility is now handled by the imported next-compat.js

// Log startup information to help with debugging
console.log('[Vite App] Starting application with Next.js compatibility layer');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <LanguageProvider>
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
      </LanguageProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
```

- [ ] **Step 2: Verify with a type-check**

Run: `npx tsc --noEmit`
Expected: no output (no errors).

- [ ] **Step 3: Manually confirm reduced motion is honored**

Run `npm run dev`. In Chrome DevTools, open the Rendering tab (Cmd+Shift+P → "Show Rendering"), set "Emulate CSS media feature prefers-reduced-motion" to "reduce", reload the page, and scroll — transform-based entrance animations (slide/scale) should no longer play; content should still appear (opacity fade only). Turn the emulation back to "No emulation" afterward.

- [ ] **Step 4: Commit**

```bash
git add src/main.tsx
git commit -m "feat: honor prefers-reduced-motion globally via framer-motion MotionConfig"
```

---

### Task 3: Replace Skills percentage bars with proficiency badges

**Files:**
- Modify: `src/contexts/LanguageContext.tsx` (add `skills.level.*` keys)
- Modify: `src/components/Skills.tsx` (data + rendering + timing trim)

**Interfaces:**
- Produces: i18n keys `skills.level.advanced`, `skills.level.intermediate`, `skills.level.basic` (consumed by `Skills.tsx` in this same task).

- [ ] **Step 1: Add proficiency-level translation keys**

In `src/contexts/LanguageContext.tsx`, in the `pt` block, find:

```ts
    'skills.projects': 'Projetos',
    'skills.companies': 'Empresas',
```

Replace with:

```ts
    'skills.projects': 'Projetos',
    'skills.companies': 'Empresas',
    'skills.level.advanced': 'Avançado',
    'skills.level.intermediate': 'Intermediário',
    'skills.level.basic': 'Básico',
```

In the `en` block, find:

```ts
    'skills.projects': 'Projects',
    'skills.companies': 'Companies',
```

Replace with:

```ts
    'skills.projects': 'Projects',
    'skills.companies': 'Companies',
    'skills.level.advanced': 'Advanced',
    'skills.level.intermediate': 'Intermediate',
    'skills.level.basic': 'Basic',
```

- [ ] **Step 2: Verify with a type-check**

Run: `npx tsc --noEmit`
Expected: no output (no errors).

- [ ] **Step 3: Replace the `level: number` skill data with `level: 'advanced' | 'intermediate' | 'basic'`**

In `src/components/Skills.tsx`, replace the entire `skillCategories` array (from `const skillCategories = [` through the closing `];` before the `return` statement) with:

```tsx
  const skillCategories: {
    title: string;
    icon: string;
    gradient: string;
    skills: { name: string; level: 'advanced' | 'intermediate' | 'basic' }[];
  }[] = [
    {
      title: t('skills.languages'),
      icon: "💻",
      gradient: "from-blue-500 to-blue-600",
      skills: [
        { name: "Java", level: "advanced" },
        { name: "Kotlin", level: "advanced" },
        { name: "C#", level: "intermediate" },
        { name: "JavaScript", level: "intermediate" },
        { name: "TypeScript", level: "intermediate" },
        { name: "Python", level: "basic" }
      ]
    },
    {
      title: t('skills.backendFrameworks'),
      icon: "⚙️",
      gradient: "from-purple-500 to-purple-600",
      skills: [
        { name: "Spring Boot", level: "advanced" },
        { name: "Spring WebFlux", level: "intermediate" },
        { name: "Dotnet Core", level: "advanced" },
        { name: "Entity Framework", level: "intermediate" },
        { name: "Spring Security", level: "intermediate" },
        { name: "Dapper", level: "intermediate" }
      ]
    },
    {
      title: t('skills.frontend'),
      icon: "🎨",
      gradient: "from-green-500 to-green-600",
      skills: [
        { name: "Angular", level: "advanced" },
        { name: "React", level: "intermediate" },
        { name: "Next.js", level: "intermediate" },
        { name: "TypeScript", level: "intermediate" },
        { name: "HTML5", level: "advanced" },
        { name: "CSS3", level: "intermediate" }
      ]
    },
    {
      title: t('skills.databases'),
      icon: "🗄️",
      gradient: "from-orange-500 to-orange-600",
      skills: [
        { name: "MongoDB", level: "intermediate" },
        { name: "PostgreSQL", level: "advanced" },
        { name: "Oracle", level: "intermediate" },
        { name: "DB2", level: "intermediate" },
        { name: "SQL Server", level: "intermediate" },
        { name: "H2", level: "basic" }
      ]
    },
    {
      title: t('skills.devopsCloud'),
      icon: "☁️",
      gradient: "from-indigo-500 to-indigo-600",
      skills: [
        { name: "Docker", level: "advanced" },
        { name: "AWS", level: "intermediate" },
        { name: "PCF", level: "intermediate" },
        { name: "CI/CD", level: "intermediate" },
        { name: "GitLab", level: "intermediate" },
        { name: "New Relic", level: "basic" }
      ]
    },
    {
      title: t('skills.methodologies'),
      icon: "📋",
      gradient: "from-pink-500 to-pink-600",
      skills: [
        { name: "Agile", level: "advanced" },
        { name: "TDD/BDD", level: "intermediate" },
        { name: "SonarQube", level: "intermediate" },
        { name: "Checkmarx", level: "intermediate" },
        { name: "Unit Testing", level: "advanced" },
        { name: "Code Quality", level: "advanced" }
      ]
    }
  ];

  const levelBadgeStyles: Record<'advanced' | 'intermediate' | 'basic', string> = {
    advanced: 'bg-blue-100 text-blue-700',
    intermediate: 'bg-purple-100 text-purple-700',
    basic: 'bg-gray-100 text-gray-600'
  };
```

- [ ] **Step 4: Replace the percentage bar rendering with badges**

Still in `src/components/Skills.tsx`, find the skills list block:

```tsx
                {/* Skills List */}
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: skillIndex * 0.05 }}
                      viewport={{ once: true }}
                      className="group/skill"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 font-medium">{skill.name}</span>
                        <span className="text-sm text-gray-500">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className={`h-2 bg-gradient-to-r ${category.gradient} rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: skillIndex * 0.1 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
```

Replace with:

```tsx
                {/* Skills List */}
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: Math.min(skillIndex * 0.03, 0.15) }}
                      viewport={{ once: true }}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-700 font-medium">{skill.name}</span>
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${levelBadgeStyles[skill.level]}`}>
                        {t(`skills.level.${skill.level}`)}
                      </span>
                    </motion.div>
                  ))}
                </div>
```

- [ ] **Step 5: Trim remaining animation timing in this file**

In the same file, apply these replacements:

`transition={{ duration: 0.8 }}` (section wrapper) → `transition={{ duration: 0.4 }}`

`transition={{ duration: 0.6 }}` (heading) → `transition={{ duration: 0.3 }}`

`transition={{ duration: 0.6, delay: 0.2 }}` (description paragraph) → `transition={{ duration: 0.3, delay: 0.1 }}`

`transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}` (category card) → `transition={{ duration: 0.3, delay: Math.min(categoryIndex * 0.05, 0.25) }}`

`transition={{ duration: 0.8, delay: 0.5 }}` (bottom stats) → `transition={{ duration: 0.4, delay: 0.25 }}`

- [ ] **Step 6: Verify with a type-check**

Run: `npx tsc --noEmit`
Expected: no output (no errors).

- [ ] **Step 7: Manually confirm in the browser**

Run `npm run dev`, scroll to the Skills section, confirm each skill shows a name + colored level badge (no bars, no percentages), and toggle the language selector to confirm badge labels switch between Avançado/Intermediário/Básico and Advanced/Intermediate/Basic.

- [ ] **Step 8: Commit**

```bash
git add src/contexts/LanguageContext.tsx src/components/Skills.tsx
git commit -m "feat: replace Skills percentage bars with proficiency-level badges"
```

---

### Task 4: Localize Experience dates by active language

**Files:**
- Modify: `src/components/Experience.tsx`

**Interfaces:** None (internal helper, no new exports).

- [ ] **Step 1: Replace hardcoded period strings with structured dates and a formatting helper**

In `src/components/Experience.tsx`, find:

```tsx
'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Experience() {
  const { t } = useLanguage();
  
  const experiences = [
    {
      title: "Developer Specialist",
      company: "Grupo Boticário",
      period: `Abril 2024 - ${t('experience.present')}`,
      description: t('exp.boticario.desc')
    },
    {
      title: "Tech Lead",
      company: "Cesar",
      period: "Agosto 2022 - Fevereiro 2024",
      description: t('exp.cesar1.desc')
    },
    {
      title: "Software Engineer",
      company: "Itaú Unibanco",
      period: "Março 2022 - Agosto 2022",
      description: t('exp.itau.desc')
    },
    {
      title: "Tech Lead / Software Engineer",
      company: "Cesar",
      period: "Junho 2020 - Março 2022",
      description: t('exp.cesar2.desc')
    },
    {
      title: "Systems Analyst",
      company: "Cast Group",
      period: "Fevereiro 2019 - Junho 2020",
      description: t('exp.cast.desc')
    }
  ];
```

Replace with:

```tsx
'use client';

import { motion } from 'framer-motion';
import { useLanguage, Language } from '@/contexts/LanguageContext';

interface MonthYear {
  year: number;
  month: number; // 1-12
}

function formatMonthYear(date: MonthYear, language: Language): string {
  const locale = language === 'en' ? 'en-US' : 'pt-BR';
  const month = new Intl.DateTimeFormat(locale, { month: 'long' }).format(
    new Date(date.year, date.month - 1, 1)
  );
  return `${month.charAt(0).toUpperCase()}${month.slice(1)} ${date.year}`;
}

function formatPeriod(
  start: MonthYear,
  end: MonthYear | undefined,
  language: Language,
  presentLabel: string
): string {
  const startLabel = formatMonthYear(start, language);
  const endLabel = end ? formatMonthYear(end, language) : presentLabel;
  return `${startLabel} - ${endLabel}`;
}

export default function Experience() {
  const { t, language } = useLanguage();

  const experiences = [
    {
      title: "Developer Specialist",
      company: "Grupo Boticário",
      period: formatPeriod({ year: 2024, month: 4 }, undefined, language, t('experience.present')),
      description: t('exp.boticario.desc')
    },
    {
      title: "Tech Lead",
      company: "Cesar",
      period: formatPeriod({ year: 2022, month: 8 }, { year: 2024, month: 2 }, language, t('experience.present')),
      description: t('exp.cesar1.desc')
    },
    {
      title: "Software Engineer",
      company: "Itaú Unibanco",
      period: formatPeriod({ year: 2022, month: 3 }, { year: 2022, month: 8 }, language, t('experience.present')),
      description: t('exp.itau.desc')
    },
    {
      title: "Tech Lead / Software Engineer",
      company: "Cesar",
      period: formatPeriod({ year: 2020, month: 6 }, { year: 2022, month: 3 }, language, t('experience.present')),
      description: t('exp.cesar2.desc')
    },
    {
      title: "Systems Analyst",
      company: "Cast Group",
      period: formatPeriod({ year: 2019, month: 2 }, { year: 2020, month: 6 }, language, t('experience.present')),
      description: t('exp.cast.desc')
    }
  ];
```

- [ ] **Step 2: Trim animation timing in this file**

In the same file, apply:

`transition={{ duration: 0.5 }}` (section wrapper, line ~48 in the original) → `transition={{ duration: 0.3 }}`

`transition={{ duration: 0.5 }}` (each experience card, line ~62 in the original) → `transition={{ duration: 0.3 }}`

- [ ] **Step 3: Verify with a type-check**

Run: `npx tsc --noEmit`
Expected: no output (no errors).

- [ ] **Step 4: Manually confirm in the browser**

Run `npm run dev`, scroll to Experience, confirm dates read e.g. "Abril 2024 - Presente" in Portuguese. Switch language to English via the language selector and confirm the same entry now reads "April 2024 - Present" (not "Abril 2024 - Present").

- [ ] **Step 5: Commit**

```bash
git add src/components/Experience.tsx
git commit -m "fix: format Experience dates using Intl.DateTimeFormat per active language"
```

---

### Task 5: Wire up the Projects section with bilingual data

**Files:**
- Create: `src/data/projects.ts`
- Modify: `src/components/Projects.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/components/Header.tsx`
- Modify: `src/components/Footer.tsx`
- Modify: `src/contexts/LanguageContext.tsx` (add `nav.projects`, `projects.viewRepo`, `projects.viewDemo`)

**Interfaces:**
- Produces (from `src/data/projects.ts`): `interface Project { id: string; title: { pt: string; en: string }; description: { pt: string; en: string }; category: { pt: string; en: string }; technologies: string[]; links?: { repo?: string; demo?: string } }` and `export const projects: Project[]`.
- Consumed by: `src/components/Projects.tsx`.

- [ ] **Step 1: Add the new i18n keys**

In `src/contexts/LanguageContext.tsx`, `pt` block, find:

```ts
    'nav.contact': 'Contato',
    'nav.portfolio': 'Portfolio',
```

Replace with:

```ts
    'nav.contact': 'Contato',
    'nav.projects': 'Projetos',
    'nav.portfolio': 'Portfolio',
```

Then find (still in the `pt` block):

```ts
    // Projects Section
    'projects.title': 'Projetos',
    'projects.titleHighlight': 'Destacados',
    'projects.description': 'Alguns dos principais projetos desenvolvidos ao longo da minha carreira',
```

Replace with:

```ts
    // Projects Section
    'projects.title': 'Projetos',
    'projects.titleHighlight': 'Destacados',
    'projects.description': 'Alguns dos principais projetos desenvolvidos ao longo da minha carreira',
    'projects.viewRepo': 'Ver Repositório',
    'projects.viewDemo': 'Ver Demo',
```

In the `en` block, find:

```ts
    'nav.contact': 'Contact',
    'nav.portfolio': 'Portfolio',
```

Replace with:

```ts
    'nav.contact': 'Contact',
    'nav.projects': 'Projects',
    'nav.portfolio': 'Portfolio',
```

Then find (still in the `en` block):

```ts
    // Projects Section
    'projects.title': 'Featured',
    'projects.titleHighlight': 'Projects',
    'projects.description': 'Some of the main projects developed throughout my career',
```

Replace with:

```ts
    // Projects Section
    'projects.title': 'Featured',
    'projects.titleHighlight': 'Projects',
    'projects.description': 'Some of the main projects developed throughout my career',
    'projects.viewRepo': 'View Repository',
    'projects.viewDemo': 'View Demo',
```

- [ ] **Step 2: Verify with a type-check**

Run: `npx tsc --noEmit`
Expected: no output (no errors).

- [ ] **Step 3: Create the bilingual projects data file**

Create `src/data/projects.ts`:

```ts
export interface Project {
  id: string;
  title: { pt: string; en: string };
  description: { pt: string; en: string };
  category: { pt: string; en: string };
  technologies: string[];
  links?: { repo?: string; demo?: string };
}

export const projects: Project[] = [
  {
    id: 'itau-investimentos',
    title: { pt: 'Sistema de Investimentos', en: 'Investment System' },
    description: {
      pt: 'Plataforma de investimentos desenvolvida durante minha passagem pelo Itaú Unibanco, utilizando arquitetura de microsserviços e integração com AWS.',
      en: 'Investment platform built during my time at Itaú Unibanco, using a microservices architecture and AWS integration.'
    },
    category: { pt: 'Backend/Cloud', en: 'Backend/Cloud' },
    technologies: ['C#', 'Dotnet Core', 'AWS', 'Docker', 'DynamoDB']
  },
  {
    id: 'bacen-cast',
    title: { pt: 'Sistema BACEN', en: 'BACEN System' },
    description: {
      pt: 'Sistema para o Banco Central do Recife desenvolvido na Cast Group, com foco em segurança e alta disponibilidade.',
      en: 'System for the Central Bank of Recife built at Cast Group, focused on security and high availability.'
    },
    category: { pt: 'Full Stack', en: 'Full Stack' },
    technologies: ['Java 8', 'Spring Boot', 'Angular', 'DB2', 'Docker']
  },
  {
    id: 'boticario-microservices',
    title: { pt: 'Aplicações Microserviços', en: 'Microservices Applications' },
    description: {
      pt: 'Desenvolvimento de aplicações reativas e microsserviços no Grupo Boticário, focando em alta performance e escalabilidade.',
      en: 'Development of reactive applications and microservices at Grupo Boticário, focused on high performance and scalability.'
    },
    category: { pt: 'Microsserviços', en: 'Microservices' },
    technologies: ['Kotlin', 'Java', 'Spring WebFlux', 'MongoDB', 'PostgreSQL']
  },
  {
    id: 'cesar-corporativo',
    title: { pt: 'Sistemas Corporativos', en: 'Corporate Systems' },
    description: {
      pt: 'Liderança no desenvolvimento de sistemas corporativos na Cesar, aplicando melhores práticas de arquitetura e DevOps.',
      en: 'Led development of corporate systems at Cesar, applying architecture and DevOps best practices.'
    },
    category: { pt: 'Liderança Técnica', en: 'Technical Leadership' },
    technologies: ['C#', 'Angular', 'Entity Framework', 'PCF', 'GitLab CI/CD']
  },
  {
    id: 'safaz-nfe',
    title: { pt: 'Nota Fiscal Eletrônica', en: 'Electronic Invoice' },
    description: {
      pt: 'Sistema de NFA (Nota Fiscal Eletrônica) para SEFAZ - Secretaria da Fazenda de Pernambuco, garantindo conformidade fiscal.',
      en: 'Electronic invoice (NFA) system for SEFAZ - Pernambuco State Treasury Department, ensuring tax compliance.'
    },
    category: { pt: 'Governo', en: 'Government' },
    technologies: ['Java EE', 'JSP', 'WebSphere', 'JavaScript', 'DB2']
  },
  {
    id: 'mobile-unity',
    title: { pt: 'Aplicações Mobile', en: 'Mobile Applications' },
    description: {
      pt: 'Desenvolvimento de aplicações Android e jogos utilizando Unity3D durante período como estagiário.',
      en: 'Development of Android applications and games using Unity3D during my internship.'
    },
    category: { pt: 'Mobile/Games', en: 'Mobile/Games' },
    technologies: ['Android', 'Unity3D', 'C#', 'Java', 'Git']
  }
];
```

(All `links` fields are intentionally omitted — no real repo/demo URLs exist yet. Populate `links: { repo: '...', demo: '...' }` per project later; `Projects.tsx` only renders the buttons that are present.)

- [ ] **Step 4: Verify with a type-check**

Run: `npx tsc --noEmit`
Expected: no output (no errors).

- [ ] **Step 5: Rewrite Projects.tsx to consume the data file and active language**

Replace the entire contents of `src/components/Projects.tsx` with:

```tsx
'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { projects } from '@/data/projects';

const Projects = () => {
  const { t, language } = useLanguage();

  return (
    <section id="projetos" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            {t('projects.title')} <span className="gradient-text">{t('projects.titleHighlight')}</span>
          </h2>
          <p className="text-lg text-gray-600 mb-12 text-center">
            {t('projects.description')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
                viewport={{ once: true }}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="h-32 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <span className="text-white text-sm font-medium px-3 py-1 bg-black bg-opacity-20 rounded-full">
                    {project.category[language]}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title[language]}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed flex-1">{project.description[language]}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {(project.links?.repo || project.links?.demo) && (
                    <div className="flex gap-4 mt-auto pt-2">
                      {project.links?.repo && (
                        <a
                          href={project.links.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-blue-600 hover:text-blue-700"
                        >
                          {t('projects.viewRepo')}
                        </a>
                      )}
                      {project.links?.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-purple-600 hover:text-purple-700"
                        >
                          {t('projects.viewDemo')}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
```

- [ ] **Step 6: Import and render Projects between Experience and Skills**

In `src/app/page.tsx`, find:

```tsx
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

Replace with:

```tsx
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 7: Add a Projects nav item and trim Header.tsx timing**

In `src/components/Header.tsx`, find:

```tsx
  const navItems = [
    { href: "#sobre", label: t('nav.about') },
    { href: "#experiencia", label: t('nav.experience') },
    { href: "#skills", label: t('nav.skills') },
    { href: "#educacao", label: t('nav.education') },
    { href: "#contato", label: t('nav.contact') }
  ];
```

Replace with:

```tsx
  const navItems = [
    { href: "#sobre", label: t('nav.about') },
    { href: "#experiencia", label: t('nav.experience') },
    { href: "#projetos", label: t('nav.projects') },
    { href: "#skills", label: t('nav.skills') },
    { href: "#educacao", label: t('nav.education') },
    { href: "#contato", label: t('nav.contact') }
  ];
```

Then, in the same file, apply these timing trims:

`transition={{ duration: 0.6 }}` (header slide-down, on `motion.header`) → `transition={{ duration: 0.3 }}`

`transition={{ duration: 0.6, delay: index * 0.1 }}` (desktop nav items) → `transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.25) }}`

`transition={{ duration: 0.6, delay: 0.5 }}` (language selector, desktop) → `transition={{ duration: 0.3, delay: 0.25 }}`

`transition={{ duration: 0.3 }}` (mobile menu open/close) — leave unchanged, already fast.

`transition={{ duration: 0.3, delay: index * 0.1 }}` (mobile nav items) → `transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.25) }}`

- [ ] **Step 8: Add a Projects quick link and trim Footer.tsx timing**

In `src/components/Footer.tsx`, find:

```tsx
  const quickLinks = [
    { name: t('nav.about'), href: '#sobre' },
    { name: t('nav.experience'), href: '#experiencia' },
    { name: t('nav.skills'), href: '#skills' },
    { name: t('nav.education'), href: '#educacao' },
    { name: t('nav.contact'), href: '#contato' }
  ];
```

Replace with:

```tsx
  const quickLinks = [
    { name: t('nav.about'), href: '#sobre' },
    { name: t('nav.experience'), href: '#experiencia' },
    { name: t('nav.projects'), href: '#projetos' },
    { name: t('nav.skills'), href: '#skills' },
    { name: t('nav.education'), href: '#educacao' },
    { name: t('nav.contact'), href: '#contato' }
  ];
```

Then, in the same file, apply these timing trims (all four `motion.div` transitions in the footer):

`transition={{ duration: 0.6 }}` (brand column) → `transition={{ duration: 0.3 }}`

`transition={{ duration: 0.6, delay: 0.2 }}` (quick links column) → `transition={{ duration: 0.3, delay: 0.1 }}`

`transition={{ duration: 0.6, delay: 0.4 }}` (contact info column) → `transition={{ duration: 0.3, delay: 0.2 }}`

`transition={{ duration: 0.6, delay: 0.6 }}` (bottom bar) → `transition={{ duration: 0.3, delay: 0.3 }}`

- [ ] **Step 9: Verify with a type-check**

Run: `npx tsc --noEmit`
Expected: no output (no errors).

- [ ] **Step 10: Manually confirm in the browser**

Run `npm run dev`. Confirm: a "Projects"/"Projetos" link appears in the desktop nav, mobile menu, and footer quick links, all scrolling to a new section with 6 project cards between Experience and Skills; switching language translates card titles/descriptions/category and nav/footer labels; no repo/demo links render (since none are set yet).

- [ ] **Step 11: Commit**

```bash
git add src/data/projects.ts src/components/Projects.tsx src/app/page.tsx src/components/Header.tsx src/components/Footer.tsx src/contexts/LanguageContext.tsx
git commit -m "feat: wire up bilingual Projects section with nav and footer links"
```

---

### Task 6: Trim animation timing in About, Contact, Education, and remaining Hero elements

**Files:**
- Modify: `src/components/About.tsx`
- Modify: `src/components/Contact.tsx`
- Modify: `src/components/Education.tsx`
- Modify: `src/components/Hero.tsx` (elements other than the `<h1>` handled in Task 1)

**Interfaces:** None (timing-only changes, no structural/prop changes).

- [ ] **Step 1: Trim About.tsx**

In `src/components/About.tsx`, apply:

`transition={{ duration: 0.8 }}` (section wrapper) → `transition={{ duration: 0.4 }}`

`transition={{ duration: 0.6 }}` (heading) → `transition={{ duration: 0.3 }}`

`transition={{ duration: 0.6, delay: 0.2 }}` (description) → `transition={{ duration: 0.3, delay: 0.1 }}`

`transition={{ duration: 0.8, delay: 0.3 }}` (stats grid wrapper) → `transition={{ duration: 0.4, delay: 0.15 }}`

`transition={{ duration: 0.5, delay: index * 0.1 }}` (individual stat cards) → `transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.2) }}`

`transition={{ duration: 0.8, delay: index * 0.2 }}` (specialty cards) → `transition={{ duration: 0.4, delay: Math.min(index * 0.1, 0.3) }}`

- [ ] **Step 2: Trim Contact.tsx**

In `src/components/Contact.tsx`, apply:

`transition={{ duration: 0.5 }}` (section wrapper) → `transition={{ duration: 0.3 }}`

`transition={{ duration: 0.5, delay: 0.2 }}` (email card) → `transition={{ duration: 0.3, delay: 0.1 }}`

`transition={{ duration: 0.5, delay: 0.3 }}` (LinkedIn card) → `transition={{ duration: 0.3, delay: 0.15 }}`

`transition={{ duration: 0.5, delay: 0.4 }}` (phone card) → `transition={{ duration: 0.3, delay: 0.2 }}`

`transition={{ duration: 0.5, delay: 0.5 }}` (WhatsApp card) → `transition={{ duration: 0.3, delay: 0.25 }}`

- [ ] **Step 3: Trim Education.tsx**

In `src/components/Education.tsx`, apply:

`transition={{ duration: 0.5 }}` (section wrapper) → `transition={{ duration: 0.3 }}`

`transition={{ duration: 0.5 }}` (each education entry card) → `transition={{ duration: 0.3 }}`

`transition={{ duration: 0.5 }}` (certifications card) → `transition={{ duration: 0.3 }}`

`transition={{ duration: 0.5, delay: 0.2 }}` (languages card) → `transition={{ duration: 0.3, delay: 0.1 }}`

- [ ] **Step 4: Trim the remaining Hero.tsx animations**

In `src/components/Hero.tsx`, apply (the `<h1>` block from Task 1 is already handled — do not touch its `transition` here, only the ones below):

`transition={{ duration: 0.8, ease: "easeOut" }}` (outer name/subtitle wrapper) → `transition={{ duration: 0.4, ease: "easeOut" }}`

`transition={{ duration: 1, ease: "easeOut" }}` (the `<h1>` itself — its `className` was already changed in Task 1, this step only changes its `transition`) → `transition={{ duration: 0.4, ease: "easeOut" }}`

`transition={{ duration: 0.8, delay: 0.2 }}` (subtitle h2) → `transition={{ duration: 0.4, delay: 0.1 }}`

`transition={{ duration: 0.8, delay: 0.4 }}` (tech badges row) → `transition={{ duration: 0.4, delay: 0.2 }}`

`transition={{ duration: 0.8, delay: 0.6 }}` (location line) → `transition={{ duration: 0.4, delay: 0.3 }}`

`transition={{ duration: 0.8, delay: 0.4 }}` (description paragraph — second occurrence of this exact value in the file, appears after the closing of the first `motion.div`) → `transition={{ duration: 0.4, delay: 0.2 }}`

`transition={{ duration: 0.8, delay: 0.6 }}` (CTA buttons row — second occurrence of this exact value in the file) → `transition={{ duration: 0.4, delay: 0.3 }}`

- [ ] **Step 5: Verify with a type-check**

Run: `npx tsc --noEmit`
Expected: no output (no errors).

- [ ] **Step 6: Manually confirm in the browser**

Run `npm run dev`, scroll through About, Contact, Education and reload Hero — content should appear noticeably faster than before while still feeling like a smooth fade/slide, with no section left blank for a long stretch during a fast scroll.

- [ ] **Step 7: Commit**

```bash
git add src/components/About.tsx src/components/Contact.tsx src/components/Education.tsx src/components/Hero.tsx
git commit -m "perf: shorten remaining scroll-in animation durations and stagger delays"
```

**Note:** `src/components/LanguageSelector.tsx` was audited per the spec but needs no timing change — its only animation is the click-triggered dropdown (`duration: 0.2`, `AnimatePresence`), not a scroll-linked entrance fade, so it isn't part of the "invisible while scrolling" problem and is already faster than the trimmed values used elsewhere.

---

### Task 7: Generate the Open Graph preview image

**Files:**
- Create: `scripts/generate-og-image.mjs`
- Create (generated, not hand-written): `public/og-image.png`
- Modify: `package.json` (add `sharp` devDependency)

**Interfaces:**
- Produces: `public/og-image.png`, a 1200×630 PNG, consumed by `index.html` in Task 8.

- [ ] **Step 1: Install sharp as a devDependency**

Run: `npm install --save-dev sharp`
Expected: `package.json` `devDependencies` gains a `sharp` entry; `package-lock.json` updates.

- [ ] **Step 2: Write the generation script**

Create `scripts/generate-og-image.mjs`:

```js
import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(__dirname, '../public/og-image.png');

const width = 1200;
const height = 630;

const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#667eea" />
      <stop offset="100%" stop-color="#764ba2" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)" />
  <text x="80" y="280" font-family="Arial, Helvetica, sans-serif" font-size="76" font-weight="700" fill="#ffffff">Evandro Nascimento</text>
  <text x="80" y="350" font-family="Arial, Helvetica, sans-serif" font-size="38" font-weight="500" fill="#e5e0ff">Software Developer &#8226; Tech Lead</text>
  <text x="80" y="420" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#c9c2f0">Java &#8226; Kotlin &#8226; C# &#8226; Spring &#8226; Dotnet</text>
</svg>
`;

const buffer = await sharp(Buffer.from(svg)).png().toBuffer();
writeFileSync(outputPath, buffer);
console.log(`Wrote ${outputPath}`);
```

- [ ] **Step 3: Run the script to generate the image**

Run: `node scripts/generate-og-image.mjs`
Expected: prints `Wrote .../public/og-image.png`, and `public/og-image.png` exists.

- [ ] **Step 4: Verify the image dimensions**

Run: `node -e "import('sharp').then(({default: sharp}) => sharp('public/og-image.png').metadata().then(m => console.log(m.width, m.height)))"`
Expected output: `1200 630`

- [ ] **Step 5: Visually spot-check the image**

Open `public/og-image.png` in an image viewer (or the editor's image preview) and confirm it shows "Evandro Nascimento", the subtitle, and a purple/blue gradient background matching the site's `gradient-text`/`.accent-gradient` colors, with legible white text.

- [ ] **Step 6: Commit**

```bash
git add scripts/generate-og-image.mjs public/og-image.png package.json package-lock.json
git commit -m "feat: generate a placeholder Open Graph preview image"
```

---

### Task 8: Add SEO meta tags and JSON-LD to index.html

**Files:**
- Modify: `index.html`

**Interfaces:** None (static HTML head only).

- [ ] **Step 1: Add missing OG/Twitter image tags, canonical, robots, and JSON-LD**

In `index.html`, find:

```html
    <!-- Open Graph / Social Media -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Evandro Nascimento - Software Developer & Tech Lead" />
    <meta property="og:description" content="Software Developer & Tech Lead especializado em Java, Kotlin, C# e soluções inovadoras. 8+ anos de experiência." />
    <meta property="og:url" content="https://efraibo.github.io/personal-site/" />
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="Evandro Nascimento - Software Developer & Tech Lead" />
    <meta name="twitter:description" content="Software Developer & Tech Lead especializado em Java, Kotlin, C# e soluções inovadoras." />
    
    <!-- Favicon -->
```

Replace with:

```html
    <!-- Canonical & robots -->
    <link rel="canonical" href="https://evandrodev.com.br/" />
    <meta name="robots" content="index, follow" />

    <!-- Open Graph / Social Media -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Evandro Nascimento - Software Developer & Tech Lead" />
    <meta property="og:description" content="Software Developer & Tech Lead especializado em Java, Kotlin, C# e soluções inovadoras. 8+ anos de experiência." />
    <meta property="og:url" content="https://evandrodev.com.br/" />
    <meta property="og:image" content="https://evandrodev.com.br/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="pt_BR" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Evandro Nascimento - Software Developer & Tech Lead" />
    <meta name="twitter:description" content="Software Developer & Tech Lead especializado em Java, Kotlin, C# e soluções inovadoras." />
    <meta name="twitter:image" content="https://evandrodev.com.br/og-image.png" />

    <!-- Structured data -->
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Evandro Nascimento",
        "jobTitle": "Software Developer & Tech Lead",
        "url": "https://evandrodev.com.br/",
        "image": "https://evandrodev.com.br/og-image.png",
        "email": "mailto:efraibo@gmail.com",
        "sameAs": ["https://www.linkedin.com/in/evandronascimento"]
      }
    </script>

    <!-- Favicon -->
```

- [ ] **Step 2: Verify the JSON-LD is well-formed**

Run: `node -e "const fs=require('fs'); const html=fs.readFileSync('index.html','utf8'); const m=html.match(/<script type=\"application\/ld\+json\">([\s\S]*?)<\/script>/); JSON.parse(m[1]); console.log('valid JSON-LD')"`
Expected output: `valid JSON-LD`

- [ ] **Step 3: Manually confirm in the browser**

Run `npm run dev`, open the page, View Source (or Elements tab) and confirm the new `<meta>` tags and `<script type="application/ld+json">` are present in `<head>` with the values above.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add OG image, canonical/robots tags, and Person JSON-LD for SEO"
```

---

### Task 9: Full build and 3-breakpoint visual validation

**Files:** None modified — verification only.

- [ ] **Step 1: Run the production build**

Run: `npm run build`
Expected: build completes with no errors, `dist/` is produced.

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: no errors (warnings are acceptable if any pre-existed; do not introduce new errors).

- [ ] **Step 3: Start the app and drive it in a real browser using the `run` skill**

Use the project's `run` skill (or `npm run dev` + a browser tool) to load the site and check, at each of these three viewport widths, scrolling through every section (Hero, About, Experience, Projects, Skills, Education, Contact, Footer) in both languages:

- 390px (mobile): Hero title fits without overflow or clipping; Projects cards stack to 1 column; Skills badges wrap cleanly; nav collapses to the hamburger menu with "Projects"/"Projetos" present.
- 768px (tablet): Projects cards show 2 columns; layout has no horizontal scrollbar.
- 1280px (desktop): Projects cards show 3 columns; Hero title is large but stays within the container; desktop nav shows all items including Projects.

- [ ] **Step 4: Confirm no regressions in animation feel**

At each breakpoint, scroll at a normal pace and confirm sections fade/slide in promptly (no long blank gaps), and re-toggle `prefers-reduced-motion: reduce` in DevTools Rendering tab to confirm transform animations stop while content still appears.

- [ ] **Step 5: Report results**

Summarize pass/fail for each of the three breakpoints and both languages. If any check fails, fix the specific issue in the relevant component (repeat the relevant earlier task's verification loop), then re-run this task's steps 1-4 before considering the work done.
