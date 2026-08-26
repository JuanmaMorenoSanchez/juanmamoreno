# Changelog

One line per push, newest first. **feat** for a new behaviour, **fix** for a
broken one, **chore** for anything that changes no behaviour.

Versions follow the same reading: minor for a feat, patch for a fix or a chore.

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
