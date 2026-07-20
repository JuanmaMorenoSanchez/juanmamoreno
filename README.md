# Juanma Moreno Sánchez — artist portfolio

Angular 22 portfolio site, deployed as a static site to GitHub Pages.

## Structure

DDD project structure. Look at the folders and/or the tsconfig `paths` aliases to see it clearly.

- **Domain** (`@domain`): business logic and data, isolated from any dependency including Angular.
- **Features** (`@features`): "impure" code that touches Angular, HTTP, and dependencies, organized by feature.
- **Shared** (`@shared`): logic shared across the app.

See [CLAUDE.md](./CLAUDE.md) for the architecture in more depth (port/adapter for artwork data, zoneless + signals, Akita state, i18n).

## Run

Run `npm start` for a dev server, then open http://127.0.0.1:4201/. The app reloads automatically on source changes.

## Build

Run `npm run build` to build the project (artifacts in `dist/`). Use `npm run watch` for a development build that rebuilds on change.

## Unit tests

Run `npm test` to execute the unit tests via [Vitest](https://vitest.dev). Use `npm run test:watch` to keep them running. To run a single spec file:

```
npx ng test --no-watch --include="src/app/domain/artwork/artwork.spec.ts"
```

## End-to-end tests

Run `npm run test:e2e` to open the [Cypress](https://www.cypress.io) runner.

## Deploy

Run `npm run deploy` to build and publish to GitHub Pages (the `gh-pages` branch, served at juanmamoreno.com).
