# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

This skill is based on https://github.com/multica-ai/andrej-karpathy-skills.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

------

## Project

Angular 22 portfolio site for the artist Juanma Moreno Sánchez, **prerendered to static files and served from GitHub Pages** (`master` is the working branch; `gh-pages` is the deployed branch). Every route is written out as html at build time, in English and Spanish — 388 pages — so the site is readable without JavaScript. A separate Cloud Run backend supplies the catalogue, the essays about each artwork and cached thumbnails, but the app itself ships static.

## Commands

- **Dev server:** `npm start` → http://127.0.0.1:4201 (note: 4201, not the Angular default 4200)
- **Build:** `npm run build` (production) · `npm run watch` (dev, rebuild on change)
- **Unit tests:** `npm test` (single run) · `npm run test:watch`
- **Run one spec file:** `npx ng test --no-watch --include="src/app/domain/artwork/artwork.spec.ts"`
- **Filter by test name:** add `--filter="<name substring>"`
- **Lint:** `npm run lint` · **Format:** `npm run pretty` (Prettier)
- **E2E:** `npm run test:e2e` (node's test runner driving the installed Chrome through playwright-core, against a running `npm start`). Suites live in `e2e/`; they skip with a reason rather than fail when there is no Chrome. `E2E_BASE_URL` points them elsewhere.
- **Deploy:** a push to `master` deploys via `.github/workflows/deploy.yml`. `npm run deploy` does the same locally, for when CI is unavailable.

Note: the test runner is **Vitest** (via `@angular/build:unit-test`), not Karma. `ng test` sometimes fails on the first invocation with a "Timeout waiting for worker to respond" / "Failed to start forks worker" error; this is an environment flake, **just re-run it**.

## Architecture

**DDD layering, enforced by convention + tsconfig path aliases** (`@domain/*`, `@features/*`, `@shared/*`, `@environments/*`, `@mocks/*`, `@translations/*`):

- **`@domain`** — pure business logic and data, **no Angular / no external runtime deps**. The `Artwork` base class (`domain/artwork/artwork.ts`) holds all artwork logic (trait extraction, sorting, frontal-view/version selection, URL collection). Keep this layer dependency-free; the DI token and rxjs-typed port are the only tolerated boundary artifacts here.
- **`@features`** — "impure" code: components, HTTP, state, per feature.
- **`@shared`** — cross-cutting components/services/store/guards.

**Port/adapter (hexagonal) for artwork data.** `ArtworkPort` (a domain interface that `extends` the `Artwork` logic class) is provided through the `ARTWORK_PORT` `InjectionToken` and implemented by `ArtworkInfraService extends Artwork implements ArtworkPort` in the features layer, wired with `useClass` in `appConfig.ts`. **Consumers inject `ARTWORK_PORT`, never the concrete service** — this is the main indirection to preserve when touching artwork data flow.

**Runtime model:** standalone components bootstrapped via `bootstrapApplication` (`main.ts` + `appConfig.ts`), **zoneless** (`provideZonelessChangeDetection`), signals-first. There is no `NgModule` and no zone.js — code and tests must not rely on Zone.

**State:** Akita (`@datorama/akita`). `SessionStore` / `SessionQuery` in `shared/store` hold the artwork session, persisted to localStorage via `persistState` in `main.ts`. Persistence nuance: **fallback artworks (those lacking `lastArtPiecesUpdate`) are kept in memory only and never written to localStorage** — server data always carries the timestamp and overwrites.

**i18n:** ngx-translate v18 via `provideTranslateService({ fallbackLang: English })`. Dictionaries are `src/assets/translations/{en,es}.json`; English is the fallback. Add keys to both files.

**The language is part of the address.** Every route exists twice, at `/about` and `/es/about`, as one route table mounted under both an English and a Spanish parent whose guards set the language before anything renders (`shared/guards/language.guard.ts`). Build links with `LanguageUrlService.link()` rather than writing `/about` — an absolute link drops a Spanish reader back into English. Watch two traps: the router reads `/es/` as the segments `["es", ""]` and matches nothing, and a breadcrumb label is looked up as a translation key, so a root key of that name must be a string and not an object.

**The build verifies itself.** `npm run build` prerenders, writes the sitemap, then runs `scripts/verify-render.mjs` over every page: own canonical, own title, the hreflang triple, real content, in-language navigation, no `[object Object]`, no unresolved translation keys. It fails the build, so it also fails CI. Point it at a directory to test it: `node scripts/verify-render.mjs some/fixture`.

## Conventions

- **Signals** for component state; **`ng-content` projection** and lazy-loaded routes are used throughout (`loadComponent`).
- **Strict TypeScript**, including `noPropertyAccessFromIndexSignature` and `useDefineForClassFields: false`.
- **Tests use Vitest globals** (`describe`/`it`/`expect` are ambient — no imports needed). `src/test-providers.ts` applies `provideZonelessChangeDetection()` to every `TestBed`. Config lives in `vitest-base.config.ts` and `tsconfig.spec.json`.
- The `domain/generative/*` files are entirely commented-out dead code (old p5.js experiments) — ignore them.

## Versioning and releases

Both halves of the site carry a version and are released together. The site is
at **1.0.0** and the backend at **1.0.0** as of the first tagged release.

- **Bump `package.json` on every feature**, in whichever repo changed: patch for
  a fix, minor for a feature, major for a break. Do it as part of the change,
  not afterwards — the number is how a page tells you which build it is.
- **The site's version is generated, never typed.** `scripts/write-version.mjs`
  copies it from `package.json` into `src/version.ts` before every build, so
  `src/version.ts` is not edited by hand.
- **The backend serves its own** at `GET /version`, read from its
  `package.json` at startup.
- **Both are printed at the foot of the home page** (`v1.0.0 · api v1.0.0`), so
  a mismatched pair is visible without opening anything.
- **Pushing deploys.** A push to `master` here, or to `main` on the backend,
  runs the checks and publishes (`.github/workflows/deploy.yml`). The site's
  build verifies its own prerendered output first, so a broken page fails the
  workflow instead of reaching juanmamoreno.com.

## Requirements and changelog

Two files in each repo, kept current as part of the change that affects them,
not afterwards.

- **`REQUIREMENTS.md`** — one entry per behaviour someone asked for, and what
  proves it still works. It exists so features are not quietly lost in a
  refactor: an agent should be able to read it and check each one still holds.
  Add or amend an entry in the same commit as the behaviour.
- **`CHANGELOG.md`** — one line per push, newest first: `feat` for a new
  behaviour, `fix` for a broken one, `chore` for anything that changes none.
  The line and the version bump say the same thing (minor for a feat, patch for
  a fix or chore).
