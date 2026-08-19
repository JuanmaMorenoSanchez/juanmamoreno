# Juanma Moreno Sánchez — artist portfolio

Angular 22 site at [juanmamoreno.com](https://juanmamoreno.com). Prerendered to
static files and served from GitHub Pages, in English and Spanish.

The catalogue, the writing about each painting and the cached images come from
a separate NestJS service on Cloud Run
([juanmamoreno-backend](https://github.com/JuanmaMorenoSanchez/juanmamoreno-backend)).

## Structure

DDD project structure. Look at the folders and/or the tsconfig `paths` aliases to see it clearly.

- **Domain** (`@domain`): business logic and data, isolated from any dependency including Angular.
- **Features** (`@features`): "impure" code that touches Angular, HTTP, and dependencies, organized by feature.
- **Shared** (`@shared`): logic shared across the app.

See [CLAUDE.md](./CLAUDE.md) for the architecture in more depth (port/adapter for artwork data, zoneless + signals, Akita state, i18n).

## Run

Run `npm start` for a dev server, then open http://127.0.0.1:4201/. The app reloads automatically on source changes.

`/api` is proxied to the backend (see `proxy.conf.json`), so the local site
talks to the real service.

## Build

`npm run build` produces `dist/juanmamoreno/browser`. It does more than compile:

1. **Writes the version** into `src/version.ts` from `package.json`.
2. **Prerenders every route**, in both languages — 388 pages, one HTML file
   each. Each artwork page carries its own title, canonical, description,
   `hreflang` pair, schema.org markup and, where one has been written, the full
   essay about the painting. The site is indexable without JavaScript.
3. **Generates `sitemap.xml`** from what was actually prerendered.
4. **Verifies the output** (`scripts/verify-render.mjs`): every page must have
   its own canonical, a title of its own, the `hreflang` triple, real content,
   navigation in its own language, no `[object Object]` and no unresolved
   translation keys. A page that fails this fails the build.

Prerendering asks the backend for each artwork's essay with `?generate=false`,
so a build never causes one to be written. Without that flag, every build would
commission an essay for each artwork that lacks one.

`npm run watch` gives a development build that rebuilds on change.

## Languages

Every page exists twice: `/about` and `/es/about`. The language is part of the
address and the route decides it, so a URL always renders the language it names.
A Spanish browser landing on an unprefixed URL is redirected to `/es` once,
unless the reader has used the language switcher, whose choice is remembered and
always wins.

Dictionaries are `src/assets/translations/{en,es}.json`. Add keys to both.

## Unit tests

Run `npm test` to execute the unit tests via [Vitest](https://vitest.dev). Use `npm run test:watch` to keep them running. To run a single spec file:

```
npx ng test --no-watch --include="src/app/domain/artwork/artwork.spec.ts"
```

## End-to-end tests

Cypress, against a running dev server:

```bash
npm start              # in one terminal
npm run test:e2e       # headless
npm run test:e2e:open  # the interactive runner
```

Specs live in `cypress/e2e/juanmamoreno`. They stub the backend through
`cypress/support/backend.js` — the critics endpoint above all, because browsing
an artwork page against the live API makes the backend write an essay for any
piece that has none.

## Deploy

**A push to `master` publishes the site.** `.github/workflows/deploy.yml` runs
lint, the unit tests and the build, then pushes `dist/juanmamoreno/browser` to
the `gh-pages` branch. Because the build verifies its own output, a page that
renders wrong fails the workflow instead of reaching visitors.

`npm run deploy` does the same from your machine, for when CI is unavailable.

## Versioning

`package.json` is the version, currently **1.0.0**. `scripts/write-version.mjs`
copies it into `src/version.ts` before every build — that file is generated, not
edited. The site prints its own version and the backend's at the foot of the
home page (`v1.0.0 · api v1.0.0`), so a mismatched pair is visible without
opening anything.

Bump it on every feature: patch for a fix, minor for a feature, major for a
break.
