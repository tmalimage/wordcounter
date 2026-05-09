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

`SITE_URL` in `src/lib/constants.ts` (`https://wordcounter-sandy-pi.vercel.app`) is consumed by:

- `src/app/layout.tsx` — `metadataBase`, canonical, OG, Twitter card
- `src/app/page.tsx` — `WebApplication` JSON-LD
- `src/app/robots.ts` and `src/app/sitemap.ts`

Changing the deploy domain means updating that one constant.

### SEO / structured data

`src/app/page.tsx` injects two JSON-LD scripts (`WebApplication` + `FAQPage`). The FAQ JSON-LD is generated from the same `FAQ_ITEMS` array exported by `src/components/FAQSection.tsx` — so adding/editing a FAQ entry automatically updates structured data. Don't duplicate the FAQ content.

### Theme / dark mode

Tailwind is in `darkMode: "class"`. The toggle lives in `Header.tsx`, persists to `localStorage` under `STORAGE_KEYS.theme`, and an inline script in `src/app/layout.tsx` applies the class before paint to avoid a flash. Don't replace this with a third-party theme library without removing the inline script.

## Conventions

- `@/*` path alias maps to `src/*` (see `tsconfig.json`).
- Client components are explicit (`"use client"`). Server components are the default — keep `layout.tsx` and `page.tsx` server-rendered so metadata and JSON-LD are static.
- Tailwind component classes (`btn-primary`, `btn-secondary`, `select-input`) are defined in `src/app/globals.css`. Reuse them rather than copying button styles.
- The MVP intentionally has **no backend**. Don't add API routes, server actions, or external API calls for core counting features — privacy is a stated product principle.
