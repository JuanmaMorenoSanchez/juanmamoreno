# Changelog

One line per push, newest first. **feat** for a new behaviour, **fix** for a
broken one, **chore** for anything that changes no behaviour.

Versions follow the same reading: minor for a feat, patch for a fix or a chore.

## 1.17.0

- feat: a picker beside the year, for showing everything, only what has sold,
  or only what has not. It reads the way the year does — pick one and it
  becomes a chip in the row, take the chip off and it is gone — but it holds a
  single answer rather than collecting them, and it is remembered on the
  reader's own device instead of going into the address, because it says how
  somebody is looking rather than which paintings a link is about

## 1.16.0

- fix: back, on an artwork, no longer leaves the site. Most people arrive at a
  painting from Instagram or a search result, and the history entry behind
  theirs belongs to somebody else — the button only asked whether an entry
  existed, which it always does. It now goes back only when the entry beneath
  is one of ours, and otherwise home, in the language being read
- feat: the catalogue keeps its sort chips as they were. Filtering by material
  and by availability is gone: it put rows of controls above a page whose
  subject is the paintings. What stays is the key to the red dot, and the fact
  that the sort is remembered on the reader's own device

## 1.15.1

- fix: the essay editor carried one painting's words to the next. Pressing next
  does not rebuild the page — the route is the same and only the parameter
  changes — so a saved essay stayed behind and was handed to the editor several
  paintings later, ready to be saved over the wrong one. What has been saved
  now names the painting it belongs to, the editor closes when the reader moves
  on, and an answer that arrives late is filed under the painting it was
  written for
- fix: the description went with it, quietly. Left standing while the next one
  was fetched, it was the previous painting's — and it is the picture's alt
  text and the page's description for search, so it misled exactly the readers
  who cannot see the painting
- fix: the technical sheet printed a pixelated painting. Images were drawn at 4
  pixels per millimetre — 101.6 dpi, a screen density — so a square painting
  was 584 pixels wide out of a 3000-pixel source. Now 300 dpi, which is 1724
  pixels over the same 146mm, and it never upscales a photograph that has
  fewer

## 1.15.0

- fix: the featured painting on the Spanish landing page led into the English
  artwork page, and every way out of the 404 led into English too. Both were
  written as absolute paths while the catalogue beside them had always built
  links for the language being read. The 404's four buttons are links now, so
  they can also be middle-clicked and opened in a new tab
- feat: the catalogue narrows by material and by availability, not only by year,
  and remembers how it was left — sorted, ordered, filtered — on the reader's
  own device. Material is grouped: the catalogue records eight mediums, three of
  which cover 176 of the 186 paintings, so it offers Oil, Watercolour and
  Drawing rather than two rows of chips distinguishing board from cardboard. A
  remembered material no longer on offer shows everything rather than nothing
- feat: the site can be read dark. It follows the system until asked otherwise
  and then follows the reader, stamped before the first paint so no page starts
  light and turns
- feat: nothing moves for a reader whose system asks for less movement — the
  tiles' entrance, the route cross-fade, the viewer's slide, and the parallax,
  which had to be stopped in the directive rather than in css
- feat: a skip link past the toolbar, and a visible focus ring on everything
  Material draws none for. The sort chips say Year, Size and Medium instead of
  three icons whose meaning lived in a tooltip that does not exist on a touch
  screen — and they can now be operated from the keyboard
- feat: the viewer says what it has always answered to: double-click for
  fullscreen, Esc to leave, arrow keys between views
- feat: the red dot on a sold painting is explained, whenever there is one on
  screen. It was drawn and never named — a screen reader was told while anyone
  looking at it was not
- feat: the contact form takes 2000 characters instead of 256, and says so when
  a message is too long instead of blocking the form with an empty error
- chore: REQUIREMENTS R8 and R9 cited Cypress specs deleted in 1.14.0

## 1.14.0

- feat: the browser suite covers the artwork page, the language a menu link
  lands you in, the Spanish front door with a trailing slash, and whether the
  page hydrated at all — ten tests where there were three, all of them in CI
- chore: Cypress is gone. Ten specs that CI never ran and whose binary would not
  start on the machine, one of them cited in REQUIREMENTS as proof and one
  broken by a menu rename nobody would have noticed

## 1.13.1

- chore: the menu calls the page Statement, in both languages, which is what the
  page has called itself all along. The photographs at the head of the statement
  and the cv are gone: neither said anything the text below it did not

## 1.13.0

- feat: the statement is rewritten, in his words. Four parts instead of five,
  and the "constants and variables" scheme is gone — it split one account, of
  images found on the internet and then generated and then broken on purpose,
  across two headings that were telling the same story. The declamations went
  with it, and so did a newspaper's compliment about him that he had been
  quoting back at himself

## 1.12.1

- fix: the essays name their author. He is Juanma Moreno Sánchez, which he has
  stated plainly; the previous reasoning for leaving it out was not his

## 1.12.0

- feat: an artwork page now says that it carries writing *about* that painting,
  as an Article joined to the artwork by `about`. The catalogue entry said what
  the painting is; nothing said several hundred words had been written on it,
  which is the only thing here that exists nowhere else. No author is claimed,
  because there is no honest single answer
- fix: the sitemap dated all 388 pages to the last build, so every deploy told
  crawlers the whole catalogue had been rewritten. Pages carrying an essay now
  state when that essay last changed, and the dates spread across the days the
  work actually happened

## 1.11.0

- feat: the sitemap names the painting on each page, so the catalogue can be
  found by the pictures rather than only by the words around them
- fix: every artwork page was handing search engines a four to five hundred
  character description, which is cut off around a hundred and fifty-five. They
  now end where a sentence ends. The full text still goes into the structured
  data, which has no such limit
- fix: artwork pages described themselves as og:type website, and no page said
  which language it was in. Sharing a Spanish page attached no language at all
- fix: robots.txt did not disallow the Spanish addresses of the studio, which
  redirect rather than 404

## 1.10.2

- fix: Angular moved from 22.0.4 to 22.1.4, which closes a high-severity XSS in
  the server-side rendering this whole site is built on, and a moderate one in a
  dependency of the pdf export. The frontend now reports no known
  vulnerabilities at all

## 1.10.1

- fix: the studio's sign in and sign out sat outside the toolbar, loose under
  the bar. It belongs with the other menu items, which also puts it in the
  drawer on a narrow screen instead of leaving it stranded

## 1.10.0

- feat: the studio session renews itself. Google's token lasts an hour and
  nothing was replacing it, so the studio stopped recognising the artist
  wherever he stood — which looked like every release signing him out, a release
  being about how long he tends to be away. It is now renewed a few minutes
  before it runs out, silently
- feat: a way in and out of the studio in the menu bar, on the browser he has
  signed in on and nowhere else. A reader is never shown it and never loads
  Google's script at all
- chore: the suite allows a test twenty seconds rather than five. Three tests
  that warp photographs or render the whole catalogue had begun failing on time
  alone, passing on a quiet machine and timing out on a busy one

## 1.9.0

- feat: the catalogue can be narrowed to the essays gone over by hand, and to
  the ones still waiting, with a count beside it. Only the artist sees the
  control, and only he can get the answer behind it

## 1.8.1

- fix: the home page's featured painting was checked by driving a synthetic
  mouse across it, which fails about a quarter of the time on that element and
  never on a catalogue tile, at any drift from four pixels up. It blocked two
  deploys for a fault nobody has ever met by hand. It is now checked for the
  thing that was actually wrong with it — that the link and its images refuse to
  be dragged — which is deterministic and still catches the regression that
  happened

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
