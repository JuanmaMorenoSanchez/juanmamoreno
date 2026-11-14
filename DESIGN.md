---
name: Juanma Moreno Sánchez
description: A gallery wall and its label — one plaster ground, one ink, and no colour on the page that does not belong to a painting.
colors:
  catalog-bg: '#edece8'
  catalog-ink: '#1a1a18'
  catalog-soft: '#63635e'
  catalog-faint: '#b4b3ae'
  catalog-rule: 'rgb(26 26 24 / 14%)'
  catalog-frame-bg: '#e3e2dd'
  surface: '#f7f6f3'
  catalog-paper: '#f7f6f3'
  catalog-accent: '#c0241c'
  catalog-sold: '#c0241c'
typography:
  wall-name:
    fontFamily: 'Archivo, Helvetica Neue, Helvetica, Arial, sans-serif'
    fontSize: '0.875rem'
    fontWeight: 600
    letterSpacing: '0.1em'
    fontVariation: "'wdth' 118"
  cartela-title:
    fontFamily: 'Archivo, Helvetica Neue, Helvetica, Arial, sans-serif'
    fontSize: '0.875rem'
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: '0.01em'
    fontVariation: "'wdth' 110"
  cartela:
    fontFamily: 'Archivo, Helvetica Neue, Helvetica, Arial, sans-serif'
    fontSize: '0.6875rem'
    lineHeight: 1.45
    letterSpacing: '0.08em'
    fontFeature: 'tabular-nums lining-nums'
  label:
    fontFamily: 'Archivo, Helvetica Neue, Helvetica, Arial, sans-serif'
    fontSize: '0.6875rem'
    letterSpacing: '0.08em'
  sheet-item:
    fontFamily: 'Archivo, Helvetica Neue, Helvetica, Arial, sans-serif'
    fontSize: '0.75rem'
    letterSpacing: '0.04em'
    fontFeature: 'tabular-nums'
  subheading:
    fontFamily: 'Archivo, Helvetica Neue, Helvetica, Arial, sans-serif'
    fontSize: '1rem'
    fontWeight: 600
    letterSpacing: '0.14em'
  body:
    fontFamily: 'Archivo, Helvetica Neue, Helvetica, Arial, sans-serif'
    fontSize: '1rem'
    lineHeight: 1.8
rounded:
  none: '0'
  dot: '50%'
spacing:
  xs: '0.25rem'
  sm: '0.5rem'
  sm-md: '0.75rem'
  md: '1rem'
  md-lg: '1.25rem'
  lg: '1.5rem'
  xl: '2rem'
  2xl: '2.5rem'
  3xl: '3rem'
  4xl: '4rem'
  5xl: '6rem'
components:
  bar:
    backgroundColor: '{colors.catalog-bg}'
    textColor: '{colors.catalog-ink}'
    rounded: '{rounded.none}'
    height: '4rem'
    padding: '{spacing.sm} max(1rem, 5vw)'
  bar-item:
    textColor: '{colors.catalog-ink}'
    typography: '{typography.label}'
    rounded: '{rounded.none}'
    padding: '{spacing.xs} 0'
  bar-setting:
    textColor: '{colors.catalog-soft}'
    rounded: '{rounded.none}'
    size: '2rem'
  bar-setting-hover:
    textColor: '{colors.catalog-ink}'
  sheet:
    backgroundColor: '{colors.surface}'
    rounded: '{rounded.none}'
    padding: '{spacing.sm} 0'
    width: '11rem'
  sheet-item:
    textColor: '{colors.catalog-ink}'
    typography: '{typography.sheet-item}'
    rounded: '{rounded.none}'
    padding: '{spacing.sm} {spacing.md}'
  sheet-item-hover:
    backgroundColor: '{colors.catalog-frame-bg}'
  sheet-item-disabled:
    textColor: '{colors.catalog-soft}'
  tile-cartela:
    typography: '{typography.cartela}'
    textColor: '{colors.catalog-soft}'
    rounded: '{rounded.none}'
    padding: '{spacing.xs} 0 0'
  sold-dot:
    backgroundColor: '{colors.catalog-sold}'
    rounded: '{rounded.dot}'
    size: '0.4rem'
  filter-select:
    textColor: '{colors.catalog-ink}'
    typography: '{typography.label}'
    rounded: '{rounded.none}'
    padding: '0 1.1rem 0.15rem 0'
  sort-choice:
    textColor: '{colors.catalog-soft}'
    typography: '{typography.label}'
    rounded: '{rounded.none}'
    padding: '0 0 {spacing.xs}'
  sort-choice-on:
    textColor: '{colors.catalog-ink}'
  applied-one:
    textColor: '{colors.catalog-ink}'
    typography: '{typography.label}'
    rounded: '{rounded.none}'
    padding: '0 0 {spacing.xs}'
  link-button:
    textColor: '{colors.catalog-accent}'
    rounded: '{rounded.none}'
    padding: '0'
---

# Design System: Juanma Moreno Sánchez

## Overview

**Creative North Star: "La cartela — the museum wall and its label"**

The site is a wall and a label. A painting is hung whole on a plaster ground, and
a small block of facts sits at a fixed offset below its left edge — what the work
is called, what it is made of and when, how big it is — in the same order and the
same shape across every one of the 192 paintings. The facts are never revealed on
hover: a catalogue whose facts appear under a pointer has no facts at all on a
phone, and none on paper.

The world is one ground, one ink and no second colour. Everything coloured on a
page belongs to a painting, with a single exception: the red dot that means sold.
There are no cards, no rounded corners, no shadows and no gradients, because a
wall has none of them. Depth is a hairline and a shade, never a lift. Variation is
read against sameness: the hang is cells of one identical size, so nineteen years
of different shapes have something steady to be different from, and one work
filling a screenful on the landing page breaks that scale deliberately.

This world governs the **public** pages. The studio half (`/publish`, `/atelier`,
`/activity`, `/mint`, `/catalogue`, `/certificates`, `/pieces`, `/parts`, `/door`)
keeps Angular Material, and `src/theme.scss` still emits its theme for them — it
is the artist's instrument, held to the same palette tokens but not to this form
language. The boundary is not yet clean in the build; see Do's and Don'ts.

**Key Characteristics:**

- One plaster ground, one ink, and the sold dot as the only non-painting colour.
- One typeface, Archivo variable, used at two extremes of its width axis.
- One clock: a single duration and easing for everything that moves.
- One hard module: plate, label, rule and margin land on the same spacing scale.
- No cards, no radius, no shadows, no gradients; hairlines and tonal shifts only.
- The label is always legible — never on hover, never behind a script.
- Every public page works with JavaScript off, which chooses the components.

## Colors

A gallery's wall under gallery light, a near-black ink, and one red. The palette
is defined as custom properties on bare `:root` so every colour has a value before
any media query is consulted, and the dark room redefines the same names.

### Primary

- **Gallery Plaster** (`--catalog-bg`): the wall, and the background of every
  public page and of the top bar — the bar is the top of the wall, not a surface
  laid over it. Deliberately not `#ffffff`: a painting photographed to its own
  canvas edge needs a ground a little darker than itself, or it floats in nothing
  instead of hanging on something. In the dark room it is a soft near-black
  (`#151513`), not pure black, which would make every canvas a glowing rectangle.
- **Catalogue Ink** (`--catalog-ink`): all primary text, every bar word, a card's
  title, and the hairline a control darkens to when it answers a pointer. Also the
  background of a text selection, which is the one inversion a wall allows.

### Secondary

- **Signal Red** (`--catalog-accent`): the focus ring, the caret, and a link drawn
  as a button. It lifts to `#e8695c` in the dark room, because `#c0241c` on
  near-black is too dark to read as a colour at the size of a dot.
- **Sold Red** (`--catalog-sold`): the dot on a sold work and its legend. The same
  value as Signal Red in both rooms, kept as a separate name because it means a
  fact about a painting rather than a state of a control.

### Neutral

- **Soft Ink** (`--catalog-soft`): the site's second and last level of writing —
  label text, a caption, a crumb, a quiet icon, a placeholder. 5.1:1 on the
  plaster ground, chosen by measurement: the previous `#6e6e6e` was 4.4:1 here and
  the whole second level of writing would have gone under the floor by changing
  the ground alone.
- **Hairline** (`--catalog-faint`): a 1px rule, a sheet's border, a trail's slash,
  an underline at rest. 2.5:1 on the light ground and never used for text.
- **Rule** (`--catalog-rule`): the ink at 14% — the bar's division from the page,
  the line a label hangs under, a select's underline. A tint of the ink rather than
  a grey, so it belongs to the ground it is drawn on in either room.
- **Frame Tint** (`--catalog-frame-bg`): the one shade a sheet item takes under a
  pointer.
- **Sheet** (`--surface`) and **Paper** (`--catalog-paper`): a panel standing on
  the page — a dropdown sheet, the phone's menu, a native select's option list. A
  shade off the ground in both rooms, so a panel has an edge without a border
  saying so.

### Named Rules

**The One Colour Rule.** All colour on a public page belongs to the paintings. The
only pigment the site itself is allowed is the sold dot. No second accent, no
status palette, no coloured chip.

**The Two Levels Rule.** Text has exactly two levels: `--catalog-ink` and
`--catalog-soft`. `--catalog-faint` is a hairline colour and is never used for
text — nine places had taken it for a third, fainter level of writing, and all
nine were under the contrast floor.

**The Bare Root Rule.** Every colour is defined on bare `:root` first and only
redefined inside the dark blocks. A token whose only definition lives inside a
`@media` block has no value at all in the other case.

## Typography

**One Font:** Archivo, self-hosted as a variable file carrying both axes — weight
100–900 and width 62–125% (with Helvetica Neue, Helvetica, Arial as fallbacks).
Two `@font-face` declarations split by `unicode-range` so the `latin-ext` file
stays off the wire for a page that sets no character outside the first; `swap`,
because a painting's label is worth more unstyled than invisible.

**Character:** one family at two extremes of size and width, the way museum
signage uses one. The width axis is the whole reason this family replaced the
platform Helvetica stack: it is what a museum does to a name across a lintel, and
what no static face could do here. Figures that line up (`tabular-nums
lining-nums`) wherever years and centimetres stack into a column.

### Hierarchy

- **Wall Name** (600, width 118%, uppercase, 0.1em tracking): the artist's name,
  as signage and never as a banner — 0.875rem on the landing page, 0.8125rem in
  the bar. The painting is the headline.
- **Cartela Title** (600, width 110%, 0.875rem, 1.3): the work's own name, on the
  landing page, in the catalogue and as the `h1` of a painting's page, where it is
  set no larger than it is on a tile.
- **Cartela** (0.6875rem, 1.45, 0.08em, uppercase, tabular lining figures): the
  label's facts, in soft ink.
- **Label** (0.6875rem, 0.08em, uppercase): the site's interface voice — every bar
  word, the sort control, the trail, the filters, the way-in link, an empty-state
  line. One size for everything that is not reading and not a title.
- **Sheet Item** (0.75rem, 0.04em, tabular figures, sentence case): a line inside a
  dropdown sheet. Marginally larger and much less tracked than a bar word, because
  it is a list to read rather than signage to scan.
- **Subheading** (600, 1rem, uppercase, 0.14em) and **Heading** (600, uppercase,
  0.14em, size inherited): the sections of a long page. Set in ink, not soft grey:
  a heading fainter than the paragraph under it inverts the hierarchy. Both carry
  `hyphens: auto` and `overflow-wrap: break-word`, because Spanish compounds at
  this tracking are wider than a 320px phone and were being cut off mid-word.
- **Body** (1.8 line-height, held to `--measure`): reading text, 55ch, which
  measures about 70 characters in Archivo — counted in a browser, not reasoned
  about, since `ch` is the width of a zero and Archivo's is wide against its
  lowercase.

### Named Rules

**The Measure Rule.** Reading text is held to `--measure` (55ch) through `.prose`,
and a page that is nothing but reading begins at `--gutter` rather than inside the
centred 970px column. Never set a measure in `rem`: 44rem of 0.8rem prose is still
110 characters.

**The One Label Size Rule.** Interface text is 0.6875rem uppercase at 0.08em
tracking, everywhere. A new control does not get a size of its own.

**The Tabular Rule.** Any figure a reader compares down a column — a year, a
measurement, a version pair — is set `tabular-nums`. A column of digits of
different widths is a column that wobbles.

## Layout

One hard module. Four tokens carry the page's geometry: `--bar-height` (4rem),
`--gutter` (`max(1rem, 5vw)`), `--measure` (55ch) and the eleven-step spacing
scale in `src/styles/_tokens.scss`, every step a multiple of 4px
(`$spacing-xs` 4px through `$spacing-5xl` 96px). Spacing is reached as
`tokens.$spacing-lg`, never typed as a number; when no step fits, the answer is the
nearest one.

`--gutter` is the page's own left edge, and everything the reader orients by begins
there: the bar's first word, the landing page's name, the trail, and the hang.
Reading pages are a `--measure` column at that gutter; the painting's page and the
studio's are centred on purpose. `.container` is `2vw` margins below 62em and a
fixed 970px column above it; the catalogue overrides it to `100rem` with gutter
padding, because 970px is right for a paragraph and wrong for a hang.

**The hang** is a CSS grid of identical square cells — two columns, three from
600px, four from 1100px — each painting whole, `object-fit: contain`, centred by
`inset: 0; margin: auto` inside the cell, with its label hanging under the _cell_
rather than under the picture so a portrait and a landscape in one row keep their
labels on one line. The artwork page's related strip is the same grid denser:
three columns, six from 600px. The layout is in media queries rather than in
script because the 402 pages are prerendered and there is no window to observe;
a `mat-grid-list` wrote every static page with the desktop column count and
re-laid it out on a phone the moment it hydrated.

**The plate** on the landing page is a three-term height, smallest wins:
`min(72vh, calc(100dvh - 21rem), calc(86vw / var(--aspect)))` — the height the
work wants, the room actually left once the bar, the padding, the signage and the
card have taken theirs, and the cap that stops a landscape work running off a
narrow screen. The frame is reserved at the painting's own aspect ratio, written
into the prerendered HTML, so nothing moves when the image arrives. The plate and
its label share one `max-content` column, which is what holds the label's left
edge on the painting's left edge at every aspect ratio without measuring anything
in script.

Mass and void rather than even whitespace: deep quiet fields (`$spacing-4xl`,
`$spacing-5xl`) between dense label blocks set at `$spacing-xs` and `0.2rem`.

## Elevation & Depth

**There are no shadows.** A wall has none. Depth is carried two ways only: a
hairline (`--catalog-rule` or `--catalog-faint`, always 1px) and a tonal shift
(`--surface` or `--catalog-frame-bg`, a shade off the ground). A dropdown sheet is
a sheet of paper held against the wall: its own ground and a hairline round it.
The shadow that used to be there separated nothing in the dark room, where the
sheet and the page were the same colour and the shadow was black on near-black.

Stacking is declared rather than implied: the bar at `z-index: 60`, its sheets at
`70`, the sold dot at `2`, the studio's overlay scrim at `40`.

### Named Rules

**The No-Lift Rule.** Nothing on a public page casts a shadow or raises on hover.
A hung work is still. What answers a pointer is a hairline arriving or darkening,
or a shade appearing behind a list item — never movement of the subject.

## Shapes

Square. Every corner on a public page is a right angle: the bar, the sheets, the
cells of the hang, the native select (explicitly reset to `border-radius: 0`). The
only curve in the system is a full circle (`50%`), and it exists for one thing —
the dot that means sold, at `0.4rem` on a tile and `1rem` beside a measurement.

Lines are hairlines: 1px, always, as a border-bottom under a control, a border-top
over a label, a `border-bottom: 1px solid transparent` that becomes ink on hover
so nothing shifts by a pixel when it does.

**Icons are drawn, not set.** Six authored SVGs — menu, sun, moon, globe, studio,
person — plus the small marks (a disclosure chevron, a sort arrow, a select mark, a
dismiss cross, a home crumb). All of them are `fill: none; stroke: currentcolor`
at one weight: 1.5 at 20px and 14px, 1.4 at 10px, round caps and joins. This is
the whole icon vocabulary of the public site, and the reason Material's icon font
no longer loads on a public page.

## Components

### Navigation (the bar)

The bar is the top of the wall: the same ground, divided from the page by one
hairline, 4rem minimum, padded to `--gutter`. Words at label size in ink; the one
thing that happens under a pointer is the hairline beneath a word arriving.
Settings are at the end in soft ink at 2rem square, quieter than the words beside
them, because an icon at full weight in a row of text reads as the most important
thing in the bar.

**The menus are `<details>`/`<summary>`**, which is why they work with JavaScript
off — the years menu, nineteen of them, could not be opened at all without a
script. With a script the component owns `open`, so one sheet is up at a time and
all of them close on arrival somewhere; `preventDefault` never runs without
JavaScript, so the browser's own disclosure takes over. The native disclosure
triangle is removed in both dialects and replaced by the house chevron, which
rotates 180° on `[open]`.

**Which menu a reader gets is decided in CSS, in this component's stylesheet**, at
600px — not in a signal, and not in the global sheet. Both menus are in the markup
and a media query picks one. On a phone the open menu is a full-width sheet
dropped under the bar, in which the dropdown sheets go `position: static` and sit
under the word that opened them.

### Sheet / Sheet item

A sheet: `--surface` ground, 1px `--catalog-faint` border, no radius, no shadow,
11rem minimum, opening against the bar's left edge or its right (`.sheet--right`)
for the three at the end. A sheet item is a full-width row, `$spacing-sm`
`$spacing-md`, ink on nothing, taking `--catalog-frame-bg` on hover and soft ink
when disabled (the language the reader is already in). The years sheet is capped
at `min(16rem, 46vh)` and scrolls itself, so it always reads as a list with more
below it rather than as a page of its own.

### Cards / Containers

**There are none.** The catalogue tile is a square frame and a label under it, with
nothing drawn around either. A painting is not put in a box.

### The tile

- **Frame:** `aspect-ratio: 1`, identical at every cell; the painting inside is
  not square and is never cropped (`object-fit: contain`).
- **Label:** the cartela, hanging under a 1px `--catalog-rule` top border.
- **Hover / focus:** the rule above the label goes to ink on `--clock-quick`. The
  picture does not move. A lean needed the image scaled to 1.1 to have slack
  within, which cropped ten per cent off every painting in the catalogue so one of
  them could move when a mouse went near it.
- **Entrance:** `tile-enter` — opacity and `translateY(0.75rem)`, once, on
  `--clock`.
- **Progressive image:** the ~112px picture carried inside the certificate paints
  first under `filter: blur(6px)`, swapped for the full file on a filter
  transition. The blur is a state and survives `prefers-reduced-motion`; only the
  fade goes.
- **Sold:** a `0.4rem` dot at the bottom-right corner of the cell, with a legend
  above the hang whenever one is on screen.

### Inputs / Fields (the filters)

Native `<select>`, which is why the filters work with JavaScript off — the
`mat-select` they replaced is a button that opens an overlay, and with no script it
opened nothing. Stripped to the words: `appearance: none`, no border but a 1px
`--catalog-rule` underline that goes to ink on hover, label type, and the house
select mark absolutely positioned at the right. The option list is drawn by the
operating system, so `option` is given `--catalog-paper` and ink explicitly, or
the options are black on white inside a dark room.

### Buttons

The system has almost no filled buttons on its public pages. A control is one of:

- **A word with a rule under it** — the sort choices, the dismiss of an applied
  filter: no border, no background, `font: inherit` at label size, soft ink, going
  to ink with a 1px ink underline when it is the one in force (`.is-on`).
- **A link drawn as a button** (`.link-button`): no padding, no border, no
  background, Signal Red, underlined at `0.2em` offset. For something that goes
  somewhere or undoes something rather than submitting anything.
- **An icon at 2rem** (`.bar-setting`): soft ink to ink on hover, nothing else.

### Focus

One ring for the whole site: `2px solid var(--catalog-accent)` at `2px` offset, on
`:focus-visible` only, so a mouse click leaves no outline behind. The catalogue
tile takes `4px` offset so the ring clears the picture.

### The cartela (signature component)

The one component the whole system is named for. A grid of `0.2rem` rows,
left-aligned, uppercase at label size in soft ink with tabular lining figures, its
title in ink at `0.875rem` and width 110%. The facts and their order are fixed in
the domain layer (`Artwork.cartela()`): **title, then medium and year, then size**,
the size always as `height × width unit` with the multiplication sign and never
the letter x, because it is a measurement.

The same block appears in three places at the same offset from the painting's left
edge — under the landing page's plate, under every tile in the catalogue, and as
the heading block of a painting's own page — so that across 192 paintings the eye
learns one place to look and one order to read. On the artwork page it gains one
line, the view (`a frontal view, a detail, the canvas half-finished`), which is the
only line of the card that is about the photograph rather than about the work.

### Motion

**One clock.** `--clock: 520ms` and `--clock-quick: 180ms`, both on
`--ease: cubic-bezier(0.16, 1, 0.3, 1)`, a hard exponential settle: fast away,
long arrival. The quick one is for anything the pointer caused, where anything
slower reads as lag rather than as grace. These replaced seven durations and four
easings scattered across the stylesheets, which is how a page comes to feel
assembled — each part moving to its own idea of time.

`prefers-reduced-motion: reduce` collapses every animation and transition to
`0.01ms` — near-zero rather than none, so `transitionend` listeners still fire and
nothing waits forever on a callback that never comes — and cancels the view
transitions. Routed content cross-fades through `view-transition-name:
routed-content`.

### Browser surfaces

The surfaces nobody draws are drawn here, because leaving them is the cheapest
tell that a page was assembled instead of built: selection is the ink inverted,
the caret is Signal Red, `accent-color` is the ink, the scrollbar is thin in
`--catalog-faint` on transparent, a link's underline sits at `0.18em` with
`from-font` thickness, and `::placeholder` is soft ink at full opacity (the
browser's own is about 3.8:1 and under the floor).

Images inside links and the picture links themselves give up being dragged
(`user-drag: none`, paired with `draggable="false"`): a started drag eats the click
that would have followed, which left the catalogue's only route to a painting
failing on any mouse with a few pixels of drift.

## Do's and Don'ts

### Do:

- **Do** put anything that must be correct at first paint in a **component**
  stylesheet. Angular serves the global sheet through a `<noscript><link>` and
  loads it from script otherwise, so with JavaScript on `src/styles.scss` arrives
  _after_ the first paint; a component's styles are inlined into every prerendered
  page. This is why the bar's phone/desktop menu choice lives in the bar's own
  stylesheet, and why putting it in the global sheet measured as an 80px jump.
- **Do** build every public control out of elements that work with no JavaScript:
  `<details>` for a disclosure, a real `<select>` for a filter, an `<a href>` for
  anything that goes somewhere. A `<button mat-button [routerLink]>` renders a
  `<button>` with no href — nothing to follow, middle-click, copy, or use without
  a script.
- **Do** answer a question about the width of the window in a media query, not in
  script. The pages are prerendered; there is no window to observe at build time.
- **Do** reach for a spacing step (`tokens.$spacing-lg`) and the clock
  (`var(--clock-quick)`, `var(--ease)`) rather than typing a number.
- **Do** keep text to the two levels, and measure a new colour against both
  grounds before using it for text (4.5:1 minimum; the light ground is `#edece8`,
  not white, so a value that passes on white may not pass here).
- **Do** show a painting whole. `object-fit: contain`, at its own proportion, with
  the frame reserved at its own aspect ratio before the image lands.
- **Do** give every control a name in label type. The actions on a painting's page
  need words, not unlabelled glyphs.

### Don't:

- **Don't** add a radius, a shadow, a gradient, or a card to a public page. The
  only curve in the system is the sold dot's full circle.
- **Don't** introduce a second colour. All colour belongs to the paintings; the
  sold dot is the single exception, and it is already named.
- **Don't** use `--catalog-faint` for text, and don't invent a third level of
  writing.
- **Don't** hide a fact behind a hover. A label that appears under a pointer does
  not exist on a phone or on paper.
- **Don't** move, scale, lean or parallax a painting. A hung work is still, and
  every attempt at it so far has worked by cropping the picture to make slack.
- **Don't** set a glyph from an icon font. Icons are authored SVG at
  `stroke-width` 1.4–1.5 with `stroke: currentcolor`. The Material icon font must
  not return to a public page.
- **Don't** add a per-component duration or easing. There is one clock.
- **Don't** extend Angular Material onto a public page. It belongs to the studio
  half, and the residue still on the public pages is debt, not precedent: the
  artwork page's walk control is still `mat-icon-button` with ligature glyphs
  (`skip_previous`, `chevron_left`) and a `mat-divider`, `/cv` is still a
  `mat-grid-list`, `/contact` still uses Material form fields, and several shared
  buttons still import it. Each of those is a surface still to be converted — not
  a pattern to copy.
