# Changelog

One line per push, newest first. **feat** for a new behaviour, **fix** for a
broken one, **chore** for anything that changes no behaviour.

Versions follow the same reading: minor for a feat, patch for a fix or a chore.

## 1.8.0

- feat: an essay that cites another of the artist's paintings now shows it. The
  pointer resting on the link brings the painting up beside it, with its title,
  and takes it away again on leaving. The thumbnail only — the full painting is
  what the link itself is for — and nothing is fetched until the pointer has
  actually reached the link

## 1.7.0

- feat: the list of places a painting has been found is grouped by site rather
  than listed page by page. A painting used as a record sleeve turns up once for
  every listener who saved it; flat, that reads as fifty findings and buries the
  one new gallery among them. Each site shows how many pages it accounts for and
  opens on click, busiest first
- chore: the bowed-sides test that compares two full warps byte for byte is
  given room. It ran within a quarter second of the default limit and failed on
  a loaded machine while passing on a quiet one

## 1.6.0

- feat: a shadow or a bright rim along the edges of the painting — where a
  canvas lifts off the ground, or the side facing the lamp — is found one side
  at a time and evened out, fading to nothing before it reaches the paint
- feat: the size boxes come filled in: with the last size given, or on a first
  visit with the proportions of the photograph, so nothing has to be typed
- fix: taking hold of a corner moved it to the cursor, throwing away the placing
  already made and hiding the point being aimed at under the hand aiming it. The
  offset it was grabbed at is kept, so the corner travels exactly as far as the
  hand does. The same for the control points on a bowed side

## 1.5.2

- fix: the home page mouse test failed about two runs in five and blocked the
  deploy. It counted drags on `window`, and a click landing before the page has
  hydrated follows the link as a plain anchor and replaces the document, taking
  the counter with it — which then read as "the link was dragged". The count is
  kept where it outlives the navigation

## 1.5.1

- fix: a white garment in a painting was read as light rather than as paint,
  and shaded to put the imagined lamp out. On an evenly lit canvas the lighting
  pass reported 121% unevenness and darkened the garment from 244 to 181; both
  are now left alone. The light is fitted as a plane, which can say one side got
  more light than the other and cannot say a garment
- fix: white paint broken up by dark marks — a patterned jumper — was filled in
  as though each patch between the marks were a separate highlight, which shaded
  it with the colour of its own marks

## 1.5.0

- feat: the corner handles carry a cross, so a corner is placed on a point
  rather than somewhere under a circle, and the photograph is shown as large as
  the window allows instead of at the width of a paragraph
- feat: the corrected painting saves as JPEG at 95 rather than PNG
- fix: auto levels came back too heavy. Capping the steepness while still
  pinning the darkest pixel to black is a different correction, not a gentler
  one — the dark end arrives, the light end never does, and every tone between
  is dragged down. On the photograph that prompted this, 44 to 197, the midtone
  went 120 to 101; it now goes to 123 while the top lifts 197 to 223

## 1.4.1

- fix: the catalogue mouse test waited for the page to finish loading, which
  waits on a hundred and sixty thumbnails from someone else's CDN. It asks
  whether the address changed now. This is what stopped 1.4.0 reaching the site

## 1.4.0

- feat: the studio judges the colour too. It opens the tones back out when the
  photograph never reached either end, takes off a blue or yellow cast when
  there is something pale enough in the painting to judge one by, and says
  which of those it did. Both measure first and do nothing when nothing is wrong
- feat: it also warns when part of the painting came out soft, told apart from
  flat paint by the ratio of fine detail to coarse
- fix: the photograph never appeared — the canvas is inside the block that
  opening a file reveals, so it did not exist yet at the moment it was drawn
  into. Without it a mis-found corner could not be dragged, which made every
  other failure unrecoverable
- fix: switching to Spanish anywhere in the studio answered 404. The switcher
  builds /es/<wherever you are> from the address, and the studio has no Spanish
  twin; those two addresses now lead back to the pages they are the translation
  of
- fix: a shadow along the edge of a canvas laid on the ground dragged the crop
  badly. Gaps inside the silhouette were closed by spanning each row between its
  extremes, which also joined anything else that row touched; only enclosed
  holes are filled now. Moss against the rim is outvoted by consensus fitting
  rather than averaged in
- fix: auto levels read its black point from luminance and applied it per
  channel, which drove a saturated red's other two channels to nothing

## 1.3.1

- fix: the studio could not find a painting in a real photograph. It looked for
  the strongest straight lines, but a painting's rim against the wall is often
  the faintest line in the shot while the boldest is inside the composition. It
  now separates painting from wall by colour and texture and fits the four
  sides of that silhouette, then puts each side on the boundary at full
  resolution. Measured on real paintings across wall tones, framings and
  lighting: 7 of 24 before, 22 of 24 now, most within 3px of true

## 1.3.0

- feat: the studio flattens a photograph of a painting — finds its four corners,
  squares up the perspective to the painting's real proportions, evens out
  uneven lighting and fills in the glare off the varnish, then hands back a PNG.
  Computer vision over the real pixels, in the browser: nothing is uploaded and
  no part of the picture is regenerated

## 1.2.1

- fix: the door had no Google client id, so it could not open at all

## 1.2.0

- feat: `/studio`, opening only for the one allowed account, and `/door` to sign
  in with Google. Neither is prerendered, indexed or in the sitemap
- fix: a slow backend could exceed a prerendered route's time budget and fail
  the whole build; a page now ships without its essay rather than not at all
- chore: REQUIREMENTS.md, so behaviours can be checked rather than remembered
- chore: this changelog

## 1.1.1

- chore: removed duplicated aspect-ratio and content-language logic, renamed
  four misleading identifiers, covered SeoTitleStrategy for the first time
- fix: the backend e2e suite had never run — its jest config could not resolve
  the path aliases

## 1.1.0

- feat: medium-resolution download, at least 2500 px and at most 5 MB, chosen
  from a menu beside the full-resolution one
- fix: the download button's spinner never stopped, because its state was a
  plain field in a zoneless app

## 1.0.2

- fix: the home page printed the backend version from build time rather than the
  one answering, so it was reliably a release out of date

## 1.0.1

- chore: documented the endpoints, the three places configuration lives, and
  deploying

## 1.0.0

- feat: deploy on push, for both halves, with the build verifying its own
  prerendered output first
- feat: both versions printed at the foot of the home page
- feat: `/texts`, referencing published writing about the work
- feat: Spanish at `/es`, every page prerendered in both languages with hreflang
- feat: essays about each artwork, shown on the artwork page in the reader's
  language
- feat: prerendering — 388 pages readable without JavaScript, each with its own
  canonical, title and structured data
