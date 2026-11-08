# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Two, both primary, and one of them is the artist.**

**The reader**, arriving from Instagram, a search, a gallery's link or a
business card, looking at paintings. Four kinds, and the site is not allowed to
choose between them: a collector weighing one work; a gallery, jury or curator
assessing a practice; a professional contact checking the CV; and someone who
simply found the work and wants to look without being sold to.

**The artist**, running the studio from the same site. The private half is not
an admin panel bolted on — it is the other half of the product. He records a
sale, mints a certificate, reviews the reel the night made, cuts a painting
into its parts in the atelier, and checks what the cron did, from the same
address the public reads.

## Product Purpose

A painter's catalogue that is also the painter's instrument.

The public half publishes the work: 192 paintings across nineteen years, each
with its measurements, its photographs, an essay, the record of where it has
been, and a certificate. The private half runs the practice: the nightly
posting, the certificates, the reels, the asset cutting, and the catalogue's
own upkeep.

Success is all four of these at once, and none of them is allowed to crowd out
the rest: an enquiry about a particular painting; a gallery or jury taking the
work seriously; the work simply being seen and read; and the studio running
without him touching it.

## Positioning

Three things a neighbouring painter's site could not truthfully copy, named by
the artist as the ones future work must protect:

- **A certificate on chain for every painting.** An ERC-721 record, verifiable
  from the painting's own page, with the image on Arweave and a reduced copy on
  chain itself.
- **The record of each painting.** Where it was shown, what it won, when it
  sold and to whom — provenance published on the work's own page rather than
  kept in the artist's head.
- **The generative work and the atelier.** Pieces drawn in the browser from the
  studio's own engine, and the workshop that cuts paintings into their separate
  subjects.

The essay on every painting was deliberately **not** named as distinguishing.
It is content the site needs; it is not the claim.

## Operating Context

- Two repositories released together: this site, and a backend on Cloud Run.
- The site is prerendered to static files and served from GitHub Pages — every
  route written out at build time, in English and Spanish, so the work is
  readable without JavaScript.
- A nightly run posts one painting to Instagram, Facebook and Bluesky; reels
  are reviewed by the artist and published by hand from `/publish`.
- The private pages are reached from one menu, guarded, and `noindex`.
- The artist reviews work on the deployed site rather than locally.

## Capabilities and Constraints

- **Bilingual, and the language is part of the address.** Every route exists at
  `/x` and `/es/x`. Both are first-class; neither is a translation layer over
  the other.
- **No prices anywhere, ever** — not displayed, not recorded, not inferable. A
  price is quoted by the artist for the particular work. The site offers a way
  to ask and nothing more.
- **No logs, messages or credential URLs are stored.** What is written down
  about a run is a kind and a time.
- **Every image is the artist's own work.** No stock photography, ever.
- **A certificate is irreversible.** Freezing one is never done without asking.
- The site must work with JavaScript off for everything public; four routes are
  drawn in the browser by necessity (the generative pieces, the atelier).
- Dependencies are a supply-chain decision and are asked about before adding.

## Brand Commitments

- The artist's name is the site: **Juanma Moreno Sánchez**, one spelling, in
  both languages.
- The writing about the work is the artist's own voice. Where a model drafts
  it, he goes over it by hand, and only the language he wrote in is published
  under his name.
- English words he uses in Spanish stay English: tests, blockchain, mint,
  bucket, storage.

## Evidence on Hand

- 192 photographs of real paintings, with full metadata, in the catalogue.
- A real CV: shows, prizes, residencies, with venues and cities, used by the
  record to cite what it claims.
- Real certificates on Ethereum, verifiable.
- Real Instagram posts, with permalinks back to the painting's page.
- **No testimonials, no press quotes, no customer logos, no metrics.** None
  exist; future work must not invent them.

## Product Principles

1. **The painting is the subject.** Interface recedes; the work leads.
2. **Both halves are the product.** The artist's tools deserve the same care as
   the reader's pages, and are held to the same system.
3. **Say a thing once.** One fact, in the place that says most about it.
4. **Claim nothing the site cannot show.** No invented proof, no price, no
   metric, no name it has not been given.
5. **It must survive without JavaScript, and without the backend.** What the
   build wrote down stands when the API cannot be reached.

## Accessibility & Inclusion

WCAG 2.2 AA is the standard the site is held to: contrast, labelled controls,
a reachable keyboard path, and a 320px phone that loses nothing. Motion is
offered but never required — a reader who asks for less movement gets a still
page.
