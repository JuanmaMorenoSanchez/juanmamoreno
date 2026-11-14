---
version: 1
slug: "src-app-features-home-home-component-ts"
primary_target: "src/app/features/home/home.component.ts"
related_targets: ["src/app/features/artworks/art-pieces-list.component.ts","src/app/features/artwork/art-piece.component.ts","src/app/shared/components/top-menu/top-menu.component.ts","src/styles.scss"]
---

Scope: the public spine — home, the catalogue, a painting's page, about, contact,
the top bar and the foot. Visitor mode: Experience. The studio pages (/publish,
/atelier, /activity, /mint) keep Angular Material and are out of this pass.

Audience: a collector weighing one work, a gallery or jury assessing a practice,
a professional checking the CV, and someone who simply found the paintings. None
of them may be served at the cost of another. Action: keep looking, read an
essay, or write to ask. Proof on hand: 192 photographed paintings with full
metadata, a real CV, certificates on Ethereum, the record of where each work has
been. Constraints: no prices anywhere; every public page must work with
JavaScript off; both languages are first class; WCAG 2.2 AA; motion offered,
never required.

## Direction contract

THESIS: the site is a wall and a label. One work at a time, hung, with a small
block of facts at a fixed offset that never moves across 192 pages. It refuses
what the site is now — a Material shell with a centred image inside it — and
refuses the category's hover-caption grid, where the facts hide until pointed at.
The label is always legible, because a catalogue whose facts appear on hover is
unreadable to the phone and the printer alike.

OWN-WORLD: gallery plaster ground, one ink, and no second colour anywhere except
the red dot that means sold — all colour on the page belongs to the paintings.
Archivo Expanded for the name and the titles, Archivo for everything else, one
family at two extremes of size the way museum signage uses one. Tabular numerals
for years and centimetres. Hairline rules, generous voids, dense label blocks. No
cards, no rounded corners, no shadows, no gradients: a wall has none of them.

STORY: within one screen the visitor understands this is a painter with nineteen
years of work; they believe it because every painting carries its measurements,
its provenance and a verifiable certificate rather than an adjective; and they
keep looking, read an essay, or write to ask.

FIRST VIEWPORT: home. One painting hung at 72vh, slightly above centre, whole and
uncropped at its own proportion on the plaster ground. Its label sits at a fixed
offset below the plate's left edge: title, medium and year, dimensions in cm. The
artist's name set small in Expanded caps at the top left — signage, not a banner.
Nothing else above the fold; the way in is one line beneath the label.

FORM: La cartela — the museum wall and its label. Candidate 1 of the ordered
grounded list, taken by the user as IMPECCABLE'S PICK over the roll's assignment
(candidate 7, Cartel de sala). The familiarity risk was named on the card and
accepted: this direction is won on execution, not on idea. seed:6c641e09378c7e48

FINISH: unreviewed and undocumented is unfinished; this build ends with the
finish review, the verdict, DESIGN.md, and every shipping raster carrying its
provenance

### Disciplines carried from the declined challengers

Written into this direction rather than the roll's, because they are system
discipline and not clothes:

- **The row as a ruler** (VU-meter bridge): the catalogue is a hang of identical
  height, every work whole at its own width, read by sweeping the row.
- **Scale dissonance** (Tropicália sleeve): one work per screenful may break the
  row's scale completely.
- **One hard module** (pixorama): plate, label, rule and margin all land on one
  unit; nothing is set off-grid for effect.
- **One clock** (algorave floor): a single declared duration and easing for
  everything that moves, not per-component hovers.
- **Mass and void** (cloud quarry): deep quiet fields between dense label blocks,
  rather than evenly distributed whitespace.

### Unresolved

- Whether the hang's centre-line alignment survives at 320px, where a portrait
  and a landscape work at the same height leave very different widths.
- The Material removal reaches the artwork page's action row; the actions need
  names in label type rather than unlabelled icons.
