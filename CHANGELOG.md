# Changelog

One line per push, newest first. **feat** for a new behaviour, **fix** for a
broken one, **chore** for anything that changes no behaviour.

Versions follow the same reading: minor for a feat, patch for a fix or a chore.

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
