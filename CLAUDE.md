# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Angular 22 portfolio site for the artist Juanma Moreno Sánchez, deployed as a **static site to GitHub Pages** (`master` is the working branch; `gh-pages` is the deployed branch). A separate Cloud Run backend supplies artwork descriptions and cached thumbnails, but the app itself ships static.

## Commands

- **Dev server:** `npm start` → http://127.0.0.1:4201 (note: 4201, not the Angular default 4200)
- **Build:** `npm run build` (production) · `npm run watch` (dev, rebuild on change)
- **Unit tests:** `npm test` (single run) · `npm run test:watch`
- **Run one spec file:** `npx ng test --no-watch --include="src/app/domain/artwork/artwork.spec.ts"`
- **Filter by test name:** add `--filter="<name substring>"`
- **Lint:** `npm run lint` · **Format:** `npm run pretty` (Prettier)
- **E2E:** `npm run test:e2e` (Cypress, opens the runner)
- **Deploy:** `npm run deploy` (builds + pushes `dist/juanmamoreno/browser` to `gh-pages`, CNAME juanmamoreno.com)

Note: the test runner is **Vitest** (via `@angular/build:unit-test`), not Karma — the README is stale on this. `ng test` sometimes fails on the first invocation with a "Timeout waiting for worker to respond" / "Failed to start forks worker" error; this is an environment flake, **just re-run it**.

## Architecture

**DDD layering, enforced by convention + tsconfig path aliases** (`@domain/*`, `@features/*`, `@shared/*`, `@environments/*`, `@mocks/*`, `@translations/*`):

- **`@domain`** — pure business logic and data, **no Angular / no external runtime deps**. The `Artwork` base class (`domain/artwork/artwork.ts`) holds all artwork logic (trait extraction, sorting, frontal-view/version selection, URL collection). Keep this layer dependency-free; the DI token and rxjs-typed port are the only tolerated boundary artifacts here.
- **`@features`** — "impure" code: components, HTTP, state, per feature.
- **`@shared`** — cross-cutting components/services/store/guards.

**Port/adapter (hexagonal) for artwork data.** `ArtworkPort` (a domain interface that `extends` the `Artwork` logic class) is provided through the `ARTWORK_PORT` `InjectionToken` and implemented by `ArtworkInfraService extends Artwork implements ArtworkPort` in the features layer, wired with `useClass` in `appConfig.ts`. **Consumers inject `ARTWORK_PORT`, never the concrete service** — this is the main indirection to preserve when touching artwork data flow.

**Runtime model:** standalone components bootstrapped via `bootstrapApplication` (`main.ts` + `appConfig.ts`), **zoneless** (`provideZonelessChangeDetection`), signals-first. There is no `NgModule` and no zone.js — code and tests must not rely on Zone.

**State:** Akita (`@datorama/akita`). `SessionStore` / `SessionQuery` in `shared/store` hold the artwork session, persisted to localStorage via `persistState` in `main.ts`. Persistence nuance: **fallback artworks (those lacking `lastArtPiecesUpdate`) are kept in memory only and never written to localStorage** — server data always carries the timestamp and overwrites.

**i18n:** ngx-translate v18 via `provideTranslateService({ fallbackLang: English })`. Dictionaries are `src/assets/translations/{en,es}.json`; English is the fallback. Add keys to both files.

## Conventions

- **Signals** for component state; **`ng-content` projection** and lazy-loaded routes are used throughout (`loadComponent`).
- **Strict TypeScript**, including `noPropertyAccessFromIndexSignature` and `useDefineForClassFields: false`.
- **Tests use Vitest globals** (`describe`/`it`/`expect` are ambient — no imports needed). `src/test-providers.ts` applies `provideZonelessChangeDetection()` to every `TestBed`. Config lives in `vitest-base.config.ts` and `tsconfig.spec.json`.
- The `domain/generative/*` files are entirely commented-out dead code (old p5.js experiments) — ignore them.
