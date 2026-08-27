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

### R9b — The switcher works on every page · met
Including the studio and the door, which exist at one address only and so have
no twin to move to. There the switcher changes the words where it stands, the
label follows, and the choice is still remembered. It used to navigate to
`/es/studio`, be redirected straight back, and change nothing.
*Proven by:* `top-menu.component.spec.ts` "on a page whose address carries no
language" (2 tests)

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

## The studio

### R20 — A photograph can be squared up · met
The studio takes a photograph of a painting and the painting's real width and
height, finds its four corners, and returns it as a rectangle of exactly those
proportions. Corners that were found wrong can be dragged.

The corners are found by separating painting from wall — the wall being one
flat colour, the painting differing from it in colour or in carrying texture —
and fitting the four sides of that silhouette, then moving each side onto the
boundary at full resolution. Deliberately *not* by looking for strong straight
lines: a painting's rim against the wall is frequently the faintest line in the
photograph, while the boldest belongs to the composition inside it.
*Proven by:* `detect-corners.spec.ts` (a painting the same tone as its wall; a
painting whose internal cross outvotes its outline), `quad.spec.ts`
(`correctedSize`), `prepare-photo.spec.ts` (`warpPerspective`, `preparePhoto`)

> Measured on real paintings from the catalogue, projected onto a wall across
> three wall tones, two framings and two lighting conditions: 23 of 24 found
> within 15px on a 1600px photograph, most within 3px. Measured again on a
> canvas laid on textured stone, as the artist photographs them: clean stone and
> realistic moss within 3px; a shadow gap along the rim leaves about 9px of it
> in the crop, since whether a dark seam belongs to the painting is genuinely
> ambiguous; moss covering half of one side needs correcting by hand. Any corner
> can be dragged, so a miss costs a moment rather than the result.

### R21 — No pixel is invented · met
The corrected image is never enlarged beyond the detail the photograph holds
along either axis: the largest rectangle of the right proportions that fits
inside the measured edges. Nothing is generated — every pixel is resampled from
the photograph, never synthesised by a model.
*Proven by:* `quad.spec.ts` "never enlarges either axis", `prepare-photo.spec.ts`
"never enlarges the photograph it was given"

### R22 — Uneven lighting is evened out, gently · met
Lighting is measured; if it is already even it is left alone. When it is not, a
flat-field division lifts the dim side without touching the colour of the paint,
clamped so it cannot flatten a composition it has misread.

The light is fitted as a **plane**, discarding what disagrees with it, and never
read off a blurred copy of the painting. A blurred copy cannot tell light from
paint — a pale passage is bright at every scale — so a white garment came back
as a lamp and was shaded to put it out. A plane can only say that one side got
more light than the other, which is the common fault and one a garment cannot
fake. Anything richer regains the freedom to sit down over the garment and call
it light.
*Proven by:* `prepare-photo.spec.ts` "illumination" (6 tests, including a white
garment under even light being left untouched while a real lamp is still found
on a canvas that has one)

### R23 — Glare is filled in, white paint is not · met
Small, near-white, desaturated spots that are brighter than the paint around
them are filled from their surroundings. A broad passage of white paint is too
large to qualify and is left untouched — and so is a passage of white paint cut
into pieces by dark marks, which size alone does not protect, since every piece
is small and pale and brighter than the marks beside it. Candidates are joined
up on a coarse grid first: real flare stays sparse, a patterned garment becomes
one region and is left alone entire.
*Proven by:* `prepare-photo.spec.ts` "specular highlights" (6 tests, including a
marked white garment left untouched while a real flare on the same canvas is
still found)

### R25 — A side that the lens bent can be described as a curve · met
Four corners describe a painting seen at an angle and nothing more: a lens bows
the long sides, and a stretcher that has taken a bow bows them for real. Each
side carries the two control points of a cubic Bézier, dragged like the corners
and drawn as the curve they make.

The bow rides on top of the homography rather than replacing it. A patch fitted
to the four sides interpolates evenly between them and loses the foreshortening
that makes the far edge of a leaning canvas shorter than the near one, so the
perspective stays where it was and each side's departure from its own straight
chord is added to it. Every departure is zero at a corner, which is what keeps
the corners exactly where the correction put them.
*Proven by:* `edge-bows.spec.ts` — straight sides produce byte-identical output
to having no bows at all, the corners do not move, and a card photographed
through a bend comes back more than twice as close to the original as ignoring
the bend does

### R26 — Handles are as large as the hand wants · met
The corner rings are wide by default and adjustable from 20 to 110 px, and the
width is remembered. The handle is what the pointer sits on while the corner
underneath it is what has to be judged, so a small ring puts the cursor exactly
where the eye needs to be; a wide one is grabbed anywhere along its edge. The
cross still marks the exact pixel.
*Proven by:* `photo-prep.component.spec.ts` "aiming" (3 tests)

### R27 — The file says whose it is · met
The corrected jpeg carries the artist's name and a copyright notice as both exif
and xmp, with the name remembered between sessions. A canvas encodes a jpeg with
no metadata at all, so every corrected painting used to leave the studio
anonymous.

Both are header segments ahead of the compressed image, so writing them moves no
pixel. Accented names survive: exif calls these fields ASCII, which has no room
for the á in the artist's own name, so they are written as utf-8 — as every tool
worth the name reads them — and the xmp block carries the same text in a format
that specifies utf-8 outright.
*Proven by:* `jpeg-rights.spec.ts` (11 tests, including the scan data being
copied through byte for byte)

### R28 — The artist can rewrite an essay from the page it is on · met
Signed in as himself, an edit button sits under the text; it opens the markdown
the html was made from, not the html, and saving replaces the text. A save that
fails leaves what was written on screen rather than losing it.
*Proven by:* `artwork-critic.component.spec.ts` "for the artist" (6 tests)

### R29 — A reader sees an essay and nothing else · met
No edit button, and no word about whether an essay has been edited. The page
does not even ask the authenticated route, and the backend strips the flag from
the public one, so it is absent rather than hidden.
*Proven by:* `artwork-critic.component.spec.ts` "for a reader" (3 tests), and
`critics.controller.spec.ts` in the backend

### R24 — The photograph is visible while it is being corrected · met
The opened photograph is shown as large as the window allows, with its four
corners drawn over it, and each corner can be dragged. Each handle carries a
cross so the corner is placed on a point rather than somewhere under a circle.
This is what makes a mis-found outline recoverable rather than fatal.
*Proven by:* the studio probe (the preview canvas is painted and fills the
window; each handle has both strokes)

### R25 — The tones are opened out only when they are shut, and only partly · met
When the photograph never reached either end of the range, it is stretched back
out — per channel rather than by luminance, never onto pure black or pure white,
at no more than half the full correction and no steeper than a third. The
correction is scaled as one thing: capping the steepness alone while pinning the
dark end to black drags every midtone down with it. When the photograph already
used its range, nothing is done.
*Proven by:* `prepare-photo.spec.ts` "auto levels" (4 tests, including that a
midtone stays where it was)

### R26 — A colour cast is judged only where there is evidence · met
A blue or yellow cast is measured from the pale, near-colourless parts of the
painting and corrected by at most 14% per channel. A painting with nothing pale
in it is left exactly as photographed and the report says why — a mostly
terracotta painting must never be averaged towards grey.
*Proven by:* `prepare-photo.spec.ts` "colour temperature" (4 tests)

### R27 — Softness is reported, never repaired · met
Parts of the painting that came out soft are named. Blur is told from flat paint
by the ratio of fine detail to coarse: flat paint has neither and is not judged.
Nothing is sharpened — the report says the photograph wants taking again.
*Proven by:* `prepare-photo.spec.ts` "focus" (3 tests)

### R28 — Every correction reports what it did · met
Each of the five passes says whether it acted and why: the lighting, the glare,
the colour temperature, the tones, and the focus. A pass that found nothing
wrong says so rather than staying silent.
*Proven by:* the studio probe, which reads all five lines back

### R29 — The studio has no Spanish twin, and does not 404 · met
`/es/studio` and `/es/door` lead to the English pages rather than the 404. The
studio is one person's workshop and is written in one language, but the language
switcher builds its target from the address alone.
*Proven by:* `app-routing.module.ts`, and the studio probe

### R30 — The result downloads as a JPEG · met
The corrected painting is offered as JPEG at quality 95, which discards far less
than the camera already did in making the file it came from.
*Proven by:* `photo-prep.component.ts` (`toJpegUrl`), and the studio probe,
which reads the saved blob's type back

---

## Versions

### R19 — Both halves report their version · met
The foot of the home page reads `v1.1.1 · api 1.0.2`, the backend's read live
rather than from build time.
*Proven by:* `GET /version`, and the footer in the deployed page
