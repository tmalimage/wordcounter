# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start dev server at http://localhost:3000
- `npm run build` — production build (must pass before deploy)
- `npm run lint` — Next.js ESLint check
- `npm start` — run the built app
- No test runner is configured. The spec mentions Vitest as optional; if you add tests, install `vitest` and add a `test` script.

## Architecture

This is a **single-page, client-side-only** Next.js 15 (App Router) word counter. There is no backend, no database, no API routes. All calculations run in the browser; user text never leaves the device.

### Data flow (the big picture)

There is exactly one stateful component: `src/components/WordCounterApp.tsx`. Everything else is presentational.

```
WordCounterApp (state owner, "use client")
   ├── text, readingWpm, speakingWpm, ngramSize, removeStopWords,
   │   minWordLength, keywordMaxResults, goal, customLimits  ← persisted via useEffect → localStorage
   ├── stats         = useMemo(calculateTextStats(text, …))
   └── keywordDensity = useMemo(calculateKeywordDensity(text, …))
        └── passes both down to all panels (StatsGrid, ReadabilityPanel,
            KeywordDensityTable, PlatformLimits, WritingGoal, …)
```

Key conventions:

- **`localStorage` keys live in one place**: `STORAGE_KEYS` in `src/lib/constants.ts`. Always go through `getFromStorage` / `saveToStorage` in `src/lib/localStorage.ts` — they guard for SSR (`typeof window === 'undefined'`) and swallow JSON errors.
- **Hydration pattern**: `WordCounterApp` initializes state with empty defaults, then loads from localStorage in a single `useEffect` and flips a `hydrated` flag. Persistence `useEffect`s are gated on `hydrated` to avoid wiping storage on first render. Don't break this pattern.
- **All calculation logic is pure**: `src/lib/textStats.ts`, `readability.ts`, `keywordDensity.ts`, `textTools.ts`. They take strings/numbers and return data — no DOM, no React, no storage. Keep them that way so they're trivially memoizable and testable.
- **Tokenization is shared**: word matching uses `/[a-z0-9]+(?:['-][a-z0-9]+)*/gi` in both `textStats.ts` and `keywordDensity.ts`. If you change one, change both, or extract a helper.

### Site URL is load-bearing

`SITE_URL` in `src/lib/constants.ts` (`https://wordcounter-weld.vercel.app`) is consumed by:

- `src/app/layout.tsx` — `metadataBase`, canonical, OG, Twitter card, `alternates` hreflang
- `src/app/page.tsx` — every node in the JSON-LD `@graph` (WebSite, Organization, WebApplication, BreadcrumbList, HowTo, FAQPage)
- `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/manifest.ts`
- `src/app/opengraph-image.tsx` and `src/app/twitter-image.tsx` (edge-rendered OG/Twitter cards)

Changing the deploy domain means updating that one constant.

### SEO / structured data

SEO is layered across metadata, crawler files, auto-generated images, and JSON-LD. Treat these as a single coordinated surface — changes to one usually require checking the others.

- **Keywords**: `SEO_KEYWORDS` in `src/lib/constants.ts` is the single source of long-tail terms; consumed by `layout.tsx` `metadata.keywords`. Edit there, not inline.
- **Metadata** (`src/app/layout.tsx`): `metadataBase`, `alternates` (canonical + `en-US` / `x-default` hreflang), full OpenGraph, Twitter card, `robots.googleBot` (`max-image-preview: large`, `max-snippet: -1`), `icons`, `manifest`, `appleWebApp`, `verification` placeholders, `formatDetection`, `category`, `classification`.
- **Crawler files**:
  - `src/app/robots.ts` — explicit allow rules per major bot (Googlebot, Bingbot, DuckDuckBot, Slurp, Applebot, Twitterbot, facebookexternalhit, LinkedInBot)
  - `src/app/sitemap.ts` — homepage only (single-page app; hash anchors like `#features` are not valid sitemap entries and were rejected by Google)
  - `src/app/manifest.ts` — PWA manifest with categories and maskable icons
- **Auto-generated assets** (edge runtime, no `/public` binaries): `opengraph-image.tsx` (1200×630), `twitter-image.tsx`, `icon.tsx` (32×32), `apple-icon.tsx` (180×180). Don't replace with static files in `/public` — Next.js wires these up via the file-based metadata API.
- **Structured data** (`src/app/page.tsx`): one JSON-LD `<script>` containing a single `@graph` with six nodes — `WebSite` (with `SearchAction`), `Organization`, `WebApplication`+`SoftwareApplication` (dual `@type` with `featureList`, `offer`, `screenshot`), `BreadcrumbList`, `HowTo` (5 steps), `FAQPage`. Add new schemas to the same `@graph`, don't add separate scripts.
- **FAQ is the source of truth for itself**: `FAQ_ITEMS` in `src/components/FAQSection.tsx` drives both the rendered FAQ and the `FAQPage` JSON-LD. Edit the array; don't duplicate Q&As into `page.tsx`.
- **HowTo ↔ InfoSection coupling**: the 5 `HowTo` steps in `page.tsx` describe the same flow shown in `InfoSection.tsx`'s anchored subsections. If you reword one, mirror the other.

### Theme / dark mode

Tailwind is in `darkMode: "class"`. The toggle lives in `Header.tsx`, persists to `localStorage` under `STORAGE_KEYS.theme`, and an inline script in `src/app/layout.tsx` applies the class before paint to avoid a flash. Don't replace this with a third-party theme library without removing the inline script.

## Conventions

- `@/*` path alias maps to `src/*` (see `tsconfig.json`).
- Client components are explicit (`"use client"`). Server components are the default — keep `layout.tsx` and `page.tsx` server-rendered so metadata and JSON-LD are static.
- Tailwind component classes (`btn-primary`, `btn-secondary`, `select-input`) are defined in `src/app/globals.css`. Reuse them rather than copying button styles.
- The MVP intentionally has **no backend**. Don't add API routes, server actions, or external API calls for core counting features — privacy is a stated product principle.
