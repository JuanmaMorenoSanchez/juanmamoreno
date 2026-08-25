# Requirements

What this site is supposed to do, written so it can be checked. Each entry is a
behaviour someone asked for and a note of what proves it still works.

The point is regression: features get quietly lost in refactors, and a list of
"this must be true" outlives the conversation the feature came from. When a
change adds or alters a behaviour, add or amend the entry in the same commit.

Status: **met** means there is a check that would fail if it broke.

---

## Catalogue

### R1 — Every artwork has its own page · met
`/artwork/{tokenId}` shows the piece, its year, medium and dimensions, and the
other views of the same painting.
*Proven by:* `cypress/e2e/juanmamoreno/art-piece.cy.js`

### R2 — The grid links to the artworks · met
The catalogue tiles are real anchors, so the artwork pages have inbound links
and can be opened in a new tab.
*Proven by:* `rendering.cy.js` "links to artworks with real anchors"

### R3 — The catalogue opens with a mouse · met
Clicking a tile navigates. A link is draggable and a browser that has begun a
drag fires no click, which a synthetic click cannot detect.
*Proven by:* the mouse e2e run in CI

---

## Images

### R4 — Full-resolution download · met
The original file, untouched.
*Proven by:* `art-piece.cy.js`, and a measured download in review

### R5 — Medium-resolution download · met
At least **2500 px** on the shorter side and at most **5 MB**. Never enlarges an
original that is already smaller. Asked for as a submission requirement.
*Proven by:* `src/app/domain/artwork/image-sizes.spec.ts` (13 tests)

### R6 — Tiles never blink · met
A tile that has shown a painting never returns to blank.
*Proven by:* hydration + the `.loaded` class removal; measured at 0 blank ms

---

## Language

### R7 — Every page exists in both languages · met
`/about` and `/es/about`, each prerendered in its own language.
*Proven by:* `scripts/verify-render.mjs`, 194 pages each

### R8 — Links keep the reader's language · met
Menu, breadcrumb and artwork links carry the `/es` prefix when in Spanish.
*Proven by:* `language.cy.js`, `language-url.service.spec.ts`

### R9 — The switcher moves between the two trees · met
Switching changes the address, not just the words, and the choice is remembered
and beats the browser's own language.
*Proven by:* `language.cy.js`

---

## Writing

### R10 — Each artwork may carry an essay · met
Shown after the technical details, in the reader's language, as HTML from the
backend, links opening in a new tab.
*Proven by:* `art-piece.cy.js`, and the prerendered essay text in `verify-render`

### R11 — A build never commissions an essay · met
Prerendering asks with `?generate=false`. Without it, every build would pay for
an essay for every artwork that lacks one.
*Proven by:* backend `critics.controller.spec.ts`

---

## Search and machines

### R12 — Every page is readable without JavaScript · met
388 pages prerendered with their own canonical, title, description and hreflang
pair.
*Proven by:* `scripts/verify-render.mjs`, which fails the build

### R13 — Artwork pages carry structured data · met
`VisualArtwork` and `BreadcrumbList`, plus `Person` site-wide.
*Proven by:* `seo-title.strategy.spec.ts`, `seo.cy.js`

### R14 — The sitemap lists what exists · met
Generated from the prerendered output, with `lastmod`.
*Proven by:* `scripts/generate-sitemap.mjs` runs in the build

---

## Texts

### R15 — Published writing is referenced, not copied · met
`/texts` links to each piece with publication, author and date. Nothing is
reproduced: the texts belong to the outlets that ran them.
*Proven by:* `texts.component.spec.ts`, `rendering.cy.js`

---

## Studio

### R16 — One account, and only one · met
`/studio` opens only for **morenosanchezjuanma@gmail.com**. Any other Google
account is refused, including a signed-in valid one. The token is checked for
issuer, audience, verified address, address, and expiry.
*Proven by:* `admin-auth.service.spec.ts` (13 tests), `admin.guard.spec.ts`

### R17 — Signing in is remembered · met
The token is kept in localStorage and a returning visit is signed in without a
prompt.
*Proven by:* `admin-auth.service.spec.ts` "remembers the session"

### R18 — The studio is not public · met
`/studio` and `/door` are never prerendered, are excluded from the sitemap, are
disallowed in robots.txt and carry `noindex`.
*Proven by:* `app.routes.server.ts`, `robots.txt`, `verify-render` (neither
appears among the built pages)

> **Not a security boundary.** The site is static: the bundle is public and
> localStorage belongs to the reader, so the guard decides what the interface
> shows and nothing more. Anything the studio is ever given to hold must be
> protected by the backend verifying this token — signature included — on every
> request. Until then, `/studio` is empty and there is nothing to take.

---

## Versions

### R19 — Both halves report their version · met
The foot of the home page reads `v1.1.1 · api 1.0.2`, the backend's read live
rather than from build time.
*Proven by:* `GET /version`, and the footer in the deployed page
