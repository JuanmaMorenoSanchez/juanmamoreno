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
*Proven by:* `e2e/navigation.test.mjs` ("shows the painting, its year, its
medium and its size", "offers the other views of the same painting")

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
Menu, breadcrumb, catalogue and artwork links carry the `/es` prefix when in
Spanish — and so do the two that did not: the featured painting on the landing
page, which was the most prominent link on the site, and the four ways out of
the 404, which are reached by someone who has already gone wrong once.
*Proven by:* `language-url.service.spec.ts`, `not-found.component.spec.ts`
(3 tests), `e2e/navigation.test.mjs` ("keeps a Spanish reader in Spanish when
following ...", "keeps a Spanish reader in Spanish through the featured
painting")

### R9 — The switcher moves between the two trees · met
Switching changes the address, not just the words, and the choice is remembered
and beats the browser's own language.
*Proven by:* `top-menu.component.spec.ts` "goes to the Spanish address and
remembers the choice"

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

### R42 — The writing is identifiable as writing about the painting · met
An artwork page carries an `Article` whose `about` is the `VisualArtwork` on the
same page, with the essay's own headline, its language, and when it was
published and last changed. The catalogue entry already said what the painting
is; this says the page also holds several hundred words written about that one
work, which is the only thing on the site that exists nowhere else.

The author is **Juanma Moreno Sánchez**. A model drafts and he corrects and
publishes under his own name on his own site; whose the writing is, is his to
say, and it is the answer a reader and a search engine are entitled to.
*Proven by:* the built pages, which carry four structured-data blocks where they
carried three

### R43 — A changed essay is dated as changed · met
A page carrying an essay states when that essay last changed, and the sitemap
uses it. Before, all 388 entries carried the date of the last build, so every
deploy announced that the whole catalogue had been rewritten — a signal always
reading "just now" is worth nothing and is liable to be ignored. The dates now
spread across the days the writing actually happened.
*Proven by:* the built sitemap, whose lastmod values span eight distinct dates
where they were previously one

### R40 — A search result shows a whole sentence · met
The description tag ends where a sentence ends, within the hundred and
fifty-five characters a result has room for, rather than being cut mid-word by
the search engine. Where no sentence ends early enough it stops at a word and
says it was cut. The full written description still goes to the structured data,
which has no such limit and where a machine reading about the painting benefits
from all of it.
*Proven by:* `meta-description.spec.ts` (9 tests), and the built pages, whose
descriptions run 95 to 142 characters where they ran 408 to 539

### R41 — The paintings are findable as pictures · met
The sitemap carries the image on each page and what it is called, so the
catalogue can be reached through an image search — which for a painter is a
first way in, not a secondary one. Read back out of the prerendered html, so it
can only ever name an image the page really shows.
*Proven by:* the built sitemap, 388 urls each carrying an image, 163 of them
distinct, with the image namespace declared and nothing left unescaped

### R38 — The studio session outlives Google's hour · met
A Google identity token expires after an hour. It is renewed a few minutes
before that, silently, so the studio does not stop recognising the artist in the
middle of what he is doing. When Google will not answer without asking him
something — several accounts signed in, or none — he is left signed out and the
menu carries the way back in.

Nothing is renewed, and Google's script is not so much as fetched, on a browser
that has never signed in here. That is every reader of the catalogue.
*Proven by:* `admin-auth.service.spec.ts` ("keeping the session alive", 5 tests,
including that a reader loads nothing), and the browser probe

### R39 — The way in and out is his alone · met
The menu shows "Sign out" while he is signed in, and "Sign in" once the session
has lapsed — but only on a browser that has signed in here before, so a reader
is never offered a login to somewhere that is not theirs. The marker survives
signing out, or signing out would take away the way back.
*Proven by:* `admin-auth.service.spec.ts` (the marker outliving a sign-out), and
the browser probe across all three states

### R37 — The artist can see which essays he has been over · met
The catalogue can be narrowed to the artworks whose essay has been corrected by
hand, or to the ones still waiting, with a count of how many are done. An
artwork with no essay at all counts as waiting, which is what it is.

Only the artist sees the control, and it is not merely hidden from everyone
else: the flag comes from a route behind his own account, so a reader who looks
at the network gets nothing to hide. The whole catalogue is answered in one
request rather than one per artwork.
*Proven by:* `art-pieces-list.component.spec.ts` (5 tests, including that a
reader is shown no control), `critics.service.spec.ts` (`editedByArtwork`)

### R36 — A painting an essay cites can be seen without leaving · met
The essays link to other paintings in the catalogue by their full public
address. Resting the pointer on one of those links shows that painting beside
the pointer, with its title, staying on screen and clear of the pointer itself,
and going away when the pointer leaves. Links to anywhere else do nothing.

Only the thumbnail is ever loaded, and only once the pointer has reached the
link: the artwork itself is already in the session, so nothing else is fetched,
and the full painting is what following the link is for.
*Proven by:* `artwork-link.spec.ts` (10 tests, including that a host merely
containing our name is not ours), `artwork-critic.component.spec.ts`
("previewing a painting the essay cites", 3 tests)

### R35 — Where a painting has been found is grouped by site · met
The list of pages a painting appears on is gathered by site: one row per site,
carrying how many pages it accounts for, opening on click. Sites with a single
page stay a plain link. Ordered busiest first, ties broken by name so the list
does not reshuffle between visits and look as though it changed.

Grouping is the point: one place can be a great many pages — a painting used as
a record sleeve appears once for every listener who saved it — and listed flat
those bury the one genuinely new site among them.
*Proven by:* `link-groups.spec.ts` (11 tests, including the record-sleeve case),
and the browser probe against token 71, whose ten pages are all one site

### R31 — A rim along an edge is evened out · met
A shadow or a bright band along any of the four edges is found one side at a
time — read as the median across the length of that side, so a dark passage of
paint reaching the edge cannot invent one — and lifted back towards the paint
beside it, fading to nothing by the inner edge of the band. Clean edges are left
alone and the report says which sides, if any, were touched.
*Proven by:* `prepare-photo.spec.ts` "a rim of shadow or glare along an edge"
(5 tests, including that the middle of the painting is untouched)

### R32 — The size is never typed twice · met
The width and height boxes arrive filled: with the last size given, or on a
first visit with the proportions of the photograph itself, which keeps the
button live from the start. Focusing a box selects it, so replacing a value is
one gesture.
*Proven by:* the studio probe (filled on a first visit, and the size given is
offered back on the next photograph)

### R33 — A corner is taken hold of, not moved · met
Pressing a handle does not move the corner under it. The offset between pointer
and corner is kept and added back on every move, so the corner travels exactly
as far as the hand does — which is what lets a wide ring be grabbed by its edge
while the point it marks stays visible.
*Proven by:* the studio probe (the corner does not shift on press, and follows
the pointer afterwards)

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

## Reading the site

### R55 — The catalogue narrows to what has sold, or what has not · met
A picker beside the year, offering all three answers and holding one at a time.
Choosing puts a chip in the same row as the year chips, and taking the chip off
shows everything again; "both" is the absence of a filter and shows no chip.

Remembered on the reader's own device, and deliberately not in the address: the
year says which paintings a link is about and belongs in a url that can be
shared, while this says how somebody is looking, and putting it there would
give the catalogue several addresses for the same paintings.

The choice lives in a service because the two halves are nowhere near each
other — the picker is in the breadcrumb at the top of every page, the grid that
answers to it is the catalogue's own component, which is also rendered as the
"more from this year" widget on each artwork page. That widget is left showing
everything: the section around it decides whether to appear by counting every
painting of the year, so narrowing its contents would leave a heading standing
over an empty row.
The two pickers read as one pair: both name themselves above the box, and the
value underneath sits on the same line as the words in the chips beside them.
The year keeps its label up although it is always empty — it clears itself
after each pick, the year having become a chip — and says "all" underneath
until one has been chosen, after which the chips say which years.
*Proven by:* `availability-filter.service.spec.ts` (5 tests),
`breadcrumb.component.spec.ts` (12 tests), `art-pieces-list.component.spec.ts`
"narrowing by availability" (6 tests), `e2e/navigation.test.mjs` "the
availability picker" (3 tests, which check the counts add back up to the whole
catalogue)

### R56 — A catalogue narrowed to nothing says so · met
When no painting survives the year and availability the reader has chosen, the
page says as much where the paintings would have been, in the language being
read. It is told apart from a catalogue that has not arrived yet, which shows
the spinner: saying "nothing matched" during a wait blames the reader's filters
for it.

The grid is not rendered at all when it is empty. An empty `mat-grid-list` does
not collapse — it keeps the height it had when it was full, some seventeen
thousand pixels — which put the message far below the fold on a page that
looked simply blank.

The "more from this year" strip on an artwork page says nothing, having no
controls of its own to blame.
*Proven by:* `art-pieces-list.component.spec.ts` (4 tests),
`e2e/navigation.test.mjs` "a catalogue narrowed to nothing" (4 tests, one of
which checks where on the page the message lands)

### R45 — The catalogue is remembered as the reader left it · met
How it was sorted and in which direction, kept on the reader's own device and
never sent anywhere. A stored value the site has no case for is ignored rather
than obeyed, and the "more from this year" grid on an artwork page — which
carries no controls of its own — never writes to it.

Filtering by material was tried and taken out again: it put rows of controls
above a page whose subject is the paintings. Availability came back as a picker
beside the year instead — see R55, which is remembered the same way.
*Proven by:* `art-pieces-list.component.spec.ts` "remembering how the reader
likes it" (5 tests), `preferences.constants.spec.ts` (5 tests),
`e2e/navigation.test.mjs` "comes back to the catalogue arranged the way it was
left"

### R46 — The site can be read on a dark ground · met
Following the system until the reader says otherwise, and then following the
reader — in both directions, so light on a dark system is honoured. The choice
is stamped on the document by a few inline lines in `index.html` before the
first paint, so the page never appears light and then turns dark. With no
choice made nothing is stamped and the stylesheet's `prefers-color-scheme`
rules decide, which is also what happens with javascript switched off.
*Proven by:* `theme.service.spec.ts` (7 tests), `e2e/navigation.test.mjs` "is
still dark on the next page after asking for dark"

### R47 — Nothing moves for a reader who asked for less movement · met
The tiles' entrance, the route cross-fade, the viewer's slide and the parallax
under the pointer all stop under `prefers-reduced-motion`. The parallax is
handled in the directive rather than in css: with only the transition removed
it would snap to the pointer instead of gliding with it, which is more movement
rather than less.
*Proven by:* the reduced-motion block in `styles.scss` and the guard in
`parallax-tilt.directive.ts`

### R48 — A keyboard reaches the page in one step · met
A skip link, first in the tab order and visible once focused, moves focus into
`<main>` — past a toolbar and its menus that otherwise had to be tabbed through
on every page. Everything focusable draws a visible ring, including the plain
anchors and buttons Material draws nothing for: the catalogue tiles, the
essay's own controls, the filter chips.
*Proven by:* `app.component.html`, the `:focus-visible` rule in `styles.scss`

### R49 — The viewer says what it answers to · met
Double-click for fullscreen, Escape to leave, and the arrow keys to move
between views of the same painting. All three had always worked and none had
ever been mentioned. Hidden on a touch screen, where no such gesture exists,
but named in the accessibility tree either way.
*Proven by:* `image-viewer.component.html`, and the prerendered pages, which
carry the text

### R50 — The dot on a sold painting is explained · met
A key appears beneath the catalogue's controls whenever there is a sold piece
on screen, and not otherwise. The dot was drawn and never explained: a screen
reader was told "sold" by the tile's own label while anybody looking at it had
no way to find out.
*Proven by:* `art-pieces-list.component.spec.ts` "explaining the dot"

### R51 — A first message is not cut off mid-thought · met
The contact form accepts 2000 characters rather than 256, which was about three
sentences. The backend had always accepted 5000; this was the page's own limit.
Going over it now says so, where before it blocked the form and showed an empty
error.
*Proven by:* `contact.component.ts` (`MESSAGE_MAX_LENGTH`, `getMessageError`)

### R52 — The page is about the painting on it · met
Pressing "next" does not rebuild the artwork page: the route is the same
`/artwork/:id`, so Angular keeps the components and changes the parameter, and
anything held in a plain signal survives the move.

What has been saved names the painting it belongs to, so one painting's essay
can never appear under another's title — not even for a frame. The editor closes
when the reader moves on, because saving what was left in it would write one
painting's words onto another. The description is dropped rather than left
standing, since it is the picture's alt text and the page's description for
search. And an answer that arrives after the reader has gone is filed under the
painting it was asked about, not the one now on screen.
*Proven by:* `artwork-critic.component.spec.ts` "moving to the next painting"
(6 tests), `art-piece.component.spec.ts` (4 tests) — all of which fail against
the code as it was

### R53 — An artwork prints at print resolution · met
Images in a generated pdf are drawn at 300 dpi. They were drawn at 4 pixels per
millimetre, which is 101.6 dpi: a square painting came out 584 pixels wide from
a source 3000 pixels square, and a technical sheet meant for a submission was
visibly pixelated. A photograph with fewer pixels than the box is never
upscaled to a sharpness it does not have.
*Proven by:* `pdf-image.utils.spec.ts` (5 tests), and the generated sheet, whose
embedded image measures 1724px across the 146mm it is drawn at

### R54 — Back never leaves the site · met
The back button on an artwork returns the reader to where they came from only
when that was a page of this site. Most people arrive at a painting from
outside — a link from Instagram, a search result — and the entry behind theirs
belongs to somebody else; `window.history.length > 1` was true for every one of
them, so the button quietly threw them off the site.

It reads the number the router stamps on each entry it creates, which travels
with the entry through back and forward, and falls back to the referrer on the
entry the document was loaded into. It errs towards home: a reader sent home
when they could have gone back has lost a step, one sent off the site has lost
the site. Home means the home page in the language being read.
*Proven by:* `back-button.component.spec.ts` (8 tests)

### R57 — Every page offers a way to the rest of the work · met
A footer on every page carrying Instagram, contact, and the Privacy and Terms
pages, in the language being read. Before it there was no
footer at all and the only Instagram link on the site was a sentence on the
contact page; Privacy and Terms were prerendered in both languages and linked
from nowhere.

Plain links. No Instagram embed or follow widget: the privacy page promises no
third-party anything, and one would make that untrue on every page at once.
*Proven by:* `footer.component.spec.ts` (5 tests), `e2e/navigation.test.mjs`
"the foot of the page" (6 tests, one of which checks that nothing at all is
loaded from another origin)

### R58 — A painting can be passed on as itself · met
The share control names the painting: its title, and the year, medium and size
printed under it. It used to float over every page and share the artist's name
and the words "Contemporary Art" whatever was on screen, so passing on a
particular painting produced a message that did not name it.

It lives in the artwork toolbar with the other things that can be done with
that painting, and where `navigator.share` does not exist — Firefox has never
had it — it copies the address rather than hiding itself.
*Proven by:* `share-button.component.spec.ts` (5 tests),
`e2e/navigation.test.mjs` "passing a painting on" (2 tests)

### R59 — There is a way from Instagram to a painting's page · met
`/latest` shows the paintings most recently put on Instagram, newest first,
each linking to its own page. The account gets one clickable link and a caption
cannot carry another, so this is the whole of the route from a painting
somebody has just scrolled past to the page about it.

The order comes from what was actually posted rather than from the catalogue,
so it is the sequence the reader has just seen — which is what makes a painting
findable, since they are looking for the one from a moment ago. The page is
prerendered in both languages and readable with javascript switched off, then
refreshed in the browser so it does not go stale between deploys.

A failed request is told apart from an empty account: the page says nothing has
been posted only when that is what was answered. Answering a failure the same
way would put a claim that there are no paintings over a page that had twelve.
*Proven by:* `latest.component.spec.ts` (8 tests, including the failed request),
`e2e/navigation.test.mjs` "where the profile link lands" (2 tests)

### R60 — A painting points back at the post about it · met
Each artwork page carries a link to its own Instagram post, which is the
direction an Instagram caption cannot carry. Absent for most of the catalogue,
which has never been posted, and for anything posted before the address of a
post was kept.

Held to the same rule as everything else on that page: it belongs to the
painting on screen. Moving to the next one drops it, and an answer arriving
after the reader has moved on is ignored rather than pointing them at a post
about a different painting.
*Proven by:* `art-piece.component.spec.ts` (2 tests)

---

## Versions

### R19 — Both halves report their version · met
The foot of the home page reads `v1.1.1 · api 1.0.2`, the backend's read live
rather than from build time.
*Proven by:* `GET /version`, and the footer in the deployed page
