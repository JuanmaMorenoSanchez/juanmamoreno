# Changelog

One line per push, newest first. **feat** for a new behaviour, **fix** for a
broken one, **chore** for anything that changes no behaviour.

Versions follow the same reading: minor for a feat, patch for a fix or a chore.

## 1.82.0

- **feat** — the product page shows the product: four photographs of the real
  site, taken from the build that published them, each opening the page it is a
  photograph of in a new tab.
- **feat** — two maps on the same page: the routes a reader can walk to, and
  the endpoints the service answers. Both leave out everything behind the
  credential and say that they do.
- **chore** — the zone in the architecture diagram is named for what it holds:
  on-chain and immutable distributed storage.
- **fix** — the build check that watches for a page having asked the billed
  image search reads the transferred state rather than the whole page. Naming
  the address in a map of the endpoints is not the same as having called it.

## 1.81.0

- **feat** — the product page is his text as he last edited it, in his order:
  keeping control of the requirements first, then where he comes from, what the
  product is, how it is built, the agents, and the tests. The two figures and
  the second opening paragraph are gone because he took them out, and a block
  written as several paragraphs now renders as several.
- **feat** — the architecture diagram is redrawn from what he wrote and nothing
  else: the static site, the cloud with its service, AI services, database and
  bucket, and — outside both — the chain and the permanent distributed storage.

## 1.80.1

- **fix** — `/pendingmint` no longer reports "nothing is waiting" when what
  actually happened is that it could not reach the api. Every failure was being
  written down as an empty list, so a certificate waiting perfectly well looked
  like none at all until the page was reloaded. It now asks twice before giving
  up — the service sleeps when nobody is using it — and says plainly when it
  could not ask, with a way to ask again.

## 1.80.0

- **feat** — a painting can be photographed again: preparing a frontal view for
  a painting that already has one now asks whether it replaces it, and writes a
  version when it does. Saying no prepares nothing. The old certificate is not
  rewritten — the catalogue simply stops calling it the frontal view and lists
  it as work in progress.

## 1.79.1

- **fix** — both forms send the field nobody can see along with the message, so
  the api can refuse what fills it. The browser refusing to submit only ever
  stopped a sender that had loaded the page, which is not how a form like this
  is abused.

## 1.79.0

- **feat** — a painting can be marked sold, or unmarked, from its own page: a
  switch beside the technical line that only the artist sees, writing to the
  api. Which paintings are sold is no longer a list in this repository, so a
  sale is one tap from a gallery rather than an edit, a commit and a deploy.

## 1.78.1

- **fix** — the certificate's disclaimer ran off the left of the printed page.
  Centred text is placed by its middle, so giving it the left edge of its
  column put half the paragraph beyond the paper; it now sits in that column
  like the sentence above it.

## 1.78.0

- **feat** — the certificate says what it does not certify: the authorship of
  the physical work and nothing about who owns it, in the artist’s own words,
  at the foot of the panel and at the foot of the printed page. The printed one
  is still a single sheet — the painting gives up the room the sentence needs.

## 1.77.0

- **feat** — who the artist is is published too, at `/artist.json`: the
  statement, the gallery, and the career with every show, award and residency,
  in both languages, written by the build out of the cv page's own data. The
  catalogue said what the paintings were and nothing about whose they are, so
  an assistant asked about the painter had nothing to answer from.

## 1.76.0

- **feat** — the catalogue can now be called as well as read, and both the
  product page and the file assistants read first say so: the address, the
  three read-only tools, and the rule that no price is served by any of them.

## 1.75.0

- **feat** — the whole catalogue is published as one file, `/catalogue.json`,
  written by the build out of the pages themselves: every painting once, with
  its measurements, availability, both texts, both addresses and its
  certificate. An assistant comparing ten paintings asks once instead of
  fetching ten pages. No price in it, and no address that costs money to
  serve — both refused by the build rather than left to good intentions.
- **feat** — the product page says what the catalogue publishes for machines,
  and the two limits decided before the interface an assistant could call is
  written: read-only but for one way of making contact, and nothing served per
  request that carries a bill.

## 1.74.0

- **feat** — the product page draws the architecture rather than only
  describing it: reader and artist, the pages they each get, the private
  service everything fans out from, what it reaches for, and the one arrow
  that leaves the machinery — the transaction the artist signs on a phone.
  Inline svg, one colour, every label a translation key, and nothing in it
  named after what it is bought from.
- **feat** — the page is in his own words throughout, in both languages; the
  section about what the work cost is gone, and it now leads on two figures
  instead of four.

## 1.73.0

- **feat** — the product page opens in the artist's own words, in both
  languages: what the product is based on, and how each requirement proving
  itself is what heads off the greatest risk in a project implemented and
  deployed largely by agents. Where he is coming from is his text too, including
  why he worked close to product owners as a developer.
- **chore** — the section of decisions and what each cost is removed, at his
  request, along with everything that drew it.

## 1.72.0

- **feat** — the page about running this product is rewritten to its author's
  outline. It now opens with where he is coming from — ten years building, two
  leading, two designing, over a background in art rather than software — then
  what the product is for as three numbered aims, then how it is put together,
  and only then the argument about keeping control, which means nothing until a
  reader knows what "it" is.
- **feat** — the architecture is described without naming anything that runs it.
  "A containerised service", "a document database", "object storage": which
  cloud, which database and which indexer are nobody's business and are exactly
  what makes a page like this useful to the wrong reader. The build now refuses
  the page if any of those names appears in it, which was checked by planting
  each one and watching it fail.

## 1.71.3

- **chore** — the biography button is commented out of the cv page. What the
  brief writes is correct about the facts and empty of the person, which is
  worse than no biography. Everything behind it stays — the api still writes and
  keeps one, and a dossier can still carry it — so turning it back on is
  uncommenting one line, once the brief writes something worth reading.

## 1.71.2

- **fix** — the three setting icons in the bar are smaller, 36px against the
  40px of the words beside them. At full weight an icon in a row of text reads
  as the most important thing there, which is the opposite of what they are.

## 1.71.1

- **fix** — the browser test for the remembered theme clicked a "More" tab that
  no longer exists. The toggle moved into the bar in 1.70.0 and the unit tests
  were updated with it, but the end-to-end suite is not part of the deploy and
  was not run: it drives a real browser against a running site, so nothing
  noticed until it was run by hand.

## 1.71.0

- **feat** — the cv can be read as a life rather than a table. A button beside
  the download offers the same career as three or four paragraphs, and a dossier
  can carry either. A gallery wants the list, which is scanned rather than read;
  somebody deciding whether to open the list at all wants the paragraph.
  Downloading is anybody's and writing it is his — it costs a model call, and it
  is a biography of a living person written by a machine.
- **feat** — the cv downloaded on its own now opens with his name and the line
  that places him: Alcalá la Real (Jaén), 1986, living in Madrid, represented by
  Galería Zunino. Inside a dossier it does not, because the cover has said both
  already.

## 1.70.0

- **feat** — the theme, the language and the way into the workshop are icons at
  the end of the bar instead of items behind a "More" tab. A word in a row of
  words asks to be read; a symbol at the end of one does not, which is the work
  the tab was doing. Each is a press shorter now.
- **feat** — the last of those icons is the workshop menu when signed in and the
  door when not. The door used to appear only on a browser that had signed in
  before, so that signing out could not take away the way back; shown to
  everybody, there is no state left where the way back is hidden.
- **feat** — the list of Instagram posts is packed tighter: tiles of 7rem rather
  than 11, with less air between them, so a normal window holds five or six a
  row instead of three. It is a dozen paintings somebody is scanning for one
  they half remember, and more of them in the eye at once is the point of it.

## 1.69.0

- **feat** — a page about how this product is run, at
  `/about-certificates-project`, in both languages and out of the menu. Written
  for somebody deciding whether to hire the person running it: counted figures
  rather than adjectives, decisions with what each one cost, the one that solved
  the wrong end, and the constraint that turned out to be a human step rather
  than anything technical. It says outright that most of the code is written by
  an agent to a specification and a review, which is the argument rather than
  the disclaimer.
- **feat** — the build refuses that page if it names the private repository, an
  address behind a guard, a credential or the cloud it runs on. It is the only
  page whose subject is the machinery, so it is the one page where a useful
  detail and a dangerous one look alike.

## 1.68.0

- **feat** — a painting's frame is the right shape before anything loads, so
  nothing moves when the image arrives. It used to be reserved at the shape the
  canvas was measured as, and a photograph is never quite that: 130 x 130
  measured is 80 x 82 photographed, which showed as a gap beside the blurred
  preview and a frame that resized when the full file landed.

  The photograph's own shape was in the catalogue all along. Every certificate
  carries a two-kilobyte thumbnail of its painting and a jpeg holds its
  dimensions in its header, so the shape is four bytes and a walk along the
  markers — no decoding, nothing asynchronous, no canvas, which is what lets it
  answer during the prerender. Measuring it in the browser cannot work: the
  preview is painted out of the prerendered html before any javascript runs.

  Checked in Chrome on a throttled connection — a square canvas, a portrait
  crop and a painting whose photograph matches its measurements each hold one
  shape from the first paint to the full image.

## 1.67.1

- **fix** — the blurred preview no longer leaves a gap down each side of the
  painting until the full image arrives. The frame is the shape the painting was
  measured as until a file decodes, and a photograph is never quite that shape;
  fitted, the difference showed as two empty strips that closed a moment later.
  The preview fills the frame now instead of fitting inside it, which on
  something already blurred costs two per cent of crop nobody can see. Measuring
  the preview first cannot solve this — the page is prerendered with the
  thumbnail in it, so the gap is there on the first paint, before any javascript
  has run.

## 1.67.0

- **feat** — the cv, the statement, the technical sheet and the certificate are
  A4. They had all inherited the dossier's square page, which is right for a
  book of paintings and wrong for a document that gets filed with other paper.
  The dossier stays square.
- **fix** — the certificate is one page. It was two: the image took a fixed
  share of the page and whatever was left had to hold a sentence that runs to
  five or six lines, so one line either way decided it. Now the writing is
  measured first and the painting is given what remains, and the address at the
  foot is pinned to the bottom margin instead of being written in the flow.
- **feat** — the printed certificate carries the whole sentence the panel
  shows, rather than the short one that had been written for it.

## 1.66.0

- **feat** — the certificate can be printed. A download in the panel writes a
  page carrying the painting, what it is, when it was recorded, and the token,
  contract address and transaction hash in full — nothing abbreviated, because
  `0x6E8b…5548` is a tidy label on screen and useless on paper. The image is at
  print density and a higher quality than a catalogue page: one painting on one
  page, kept, is worth bytes that thirty are not.
- **chore** — the line about the token not being ownership is gone, at the
  artist's request, and the sentence above it now says the recording was
  irreversible. It is: the transaction is in its block permanently. What a later
  amendment could still change is what `tokenURI` returns today, which is how
  a certificate with the wrong measurements will be corrected.

## 1.65.0

- **feat** — a painting says where it is written down. A seal joins the icons
  above it, and behind it is what Ethereum holds: the work's own line, the day
  the artist recorded it, the certificate number, the contract, and the
  transaction that carries the date — each linking out to Etherscan so none of
  it has to be taken on trust. The last line says what it is not, because a
  token beside a painting invites exactly one wrong conclusion. The date is the
  only part fetched, and the panel reads correctly without it.
- **feat** — the same provenance in the page's structured data, as `identifier`
  and `sameAs`. A claim made on the artist's own website is worth what any such
  claim is worth; the same one written into Ethereum, with the address to read
  it, can be followed and checked without asking him.

## 1.64.0

- **fix** — a Spanish reader following a link from Instagram no longer lands on
  a 404. The redirect that sends a language-free address to its Spanish twin
  built `/es/?utm_source=…` for anything arriving at the root with parameters
  on it, and the router reads `/es/` as two segments, matches nothing and draws
  the 404 page. The bare address had always worked, which is why this was
  invisible from inside and universal from outside: every link Instagram and
  Facebook hand out carries tracking parameters.
- **feat** — `/latest` is the artist's own page now, behind the admin guard and
  in the admin menu as "Latest IG posts", never prerendered and disallowed to
  crawlers. It was the public landing for the link in the Instagram profile;
  that link points at the root of the site instead.

## 1.63.0

- **feat** — an artwork page now tells a machine which catalogue the painting
  belongs to and whether it can still be bought. Both were on the page already
  and neither survived it being read as text: the works were a hundred and
  eighty-six unrelated paintings by the same person, and having sold was a red
  circle. The word "sold" is now beside that circle too, out of sight, for
  screen readers and for anything reading the text rather than the picture of a
  page. No price, anywhere, on purpose — what a painting costs is answered to
  whoever asks. The build refuses an artwork page missing either fact.
- **fix** — a Spanish artwork page no longer describes itself as the English
  one. Its structured data gave the address of the English page and a trail
  reading Home > Paintings, contradicting the page's own canonical, because the
  address was written out with no language prefix. All 201 Spanish pages are
  checked for it now.
- **chore** — the paragraph above the new-certificate form is gone.

## 1.62.0

- **feat** — a reel waiting to be published can go out with no critic. Clearing
  the box now publishes the technical sheet alone rather than being refused by
  the api, and the character count says so before the button is pressed. Saving
  an empty critic over a stored one is still refused: publishing and updating
  the critic remain two separate acts, and only the second changes the essay on
  the artwork's page.

## 1.61.0

- **feat** — the studio can take the shine off a photograph. Varnish and oil
  return the lamp as well as the paint, as hundreds of tiny white glints —
  2,235 on one 2006 canvas — and a tick beside the sliders finds and mends them.
  A glint is told from brushwork by being small in every direction: the baseline
  is the best of four openings, so a stroke survives the one that runs along it
  and registers as nothing. Off by default, shown in the preview, and what goes
  back is the paint around the glint rather than a guess at it.
- **fix** — the end-to-end check for the view counter waits for the counter
  rather than for the heading above it, which is the same fault the share
  control's check had: the heading is prerendered and the counter arrives with
  the painting.

## 1.60.0

- **feat** — the studio questions measurements that do not match the corners.
  It compares the shape the four corners describe with the shape the typed
  height and width describe, and when they disagree by more than six per cent it
  says how far the painting would be stretched and what it measures with the
  corners where they are, both ways round. A word, never a refusal, and only
  while the squaring is on. A canvas 23 × 30,7 cm typed in as 27,33 × 23 came
  out an eighth too wide with nothing said, and a certificate cannot be
  corrected once it is frozen.
- **fix** — the end-to-end check for the share control waits for the control
  rather than for the bar it sits in. It failed about half the time on this
  machine, which is worse than no gate at all.

## 1.59.0

- **feat** — a certificate waiting to be written can be corrected where it
  waits. Each row opens into the fields the studio asks for and saves them
  against that certificate; before, a typo in a title meant throwing the draft
  away and preparing it again. Not the photograph — what is stored is the
  flattened picture, and the corners and brushwork that shaped it were never
  stored anywhere — so changing the measurements is allowed and says in red that
  it corrects what the certificate reads, not the shape of the picture.

## 1.58.1

- **chore** — the claim that a bow never moves anything along the side it bends
  is now measured rather than reasoned about. The displacement field moved from
  the warp into the geometry so a test can reach it, and four tests sweep the
  whole picture with a bow far larger than any photograph needs, checking the
  component along the bent side is zero to nine decimal places. No behaviour
  changed; the warp calls the same arithmetic from its new home.

## 1.58.0

- **fix** — a side's handles can no longer stretch the painting along that side.
  They were free to move in two dimensions, and the movement *along* the side
  bent nothing: it changed how fast the side was travelled, so one stretch of
  the painting came out bigger than it is and its neighbour smaller, with the
  outline still running neatly through the corners and still looking like the
  edge of the canvas. A bow is now two distances from the chord rather than two
  points, so the slide cannot be expressed at all. The handles still move the
  cut line across, which is what they were added for.
- **chore** — the correction is quicker with it: the warp was evaluating eight
  cubic Béziers per pixel of the result and subtracting them in pairs, where a
  distance along four directions settled before the loop says the same thing.

## 1.57.1

- **fix** — the requirements check passes again, and with it the deploy. R98's
  proof quoted "back to as shot" as though it were the name of a test; the
  check reads a quoted phrase in a *Proven by* line as a claim that those exact
  words are in the file named, and they were not. 1.56.0 and 1.57.0 both failed
  on it and neither reached the site.

## 1.57.0

- **feat** — every certificate waiting to be written offers its photograph for
  download, full size or medium, with the same button the artwork pages carry.
  A prepared certificate was the one place the file existed in full and could
  not be reached: it has no page yet, because it is not on the chain, and the
  list showed a thumbnail the size of a postage stamp. The button moved from the
  artwork feature into `@shared`, which is where a component two features use
  belongs.

## 1.56.0

- **feat** — the light and colour sliders stay where they were left, between
  photographs and between sessions, so the next picture opens with the
  correction already set. A studio is one room with one set of lights. Moving a
  slider writes it down, and so does saying the photograph needed nothing; the
  zeroing that keeps a change where it was made does not, or picking up the
  brush would throw the settings away.
- **chore** — the handle-size slider is gone. It was restored to the page in
  1.54.0 after a spell unreachable, and went unused: magnifying the picture is
  what it was standing in for, and the ring already holds its size on screen
  through that. The rings are drawn at 46 px.

## 1.55.0

- **feat** — the studio gets the hand tool, and the tonal sliders come apart.
  Holding space and dragging moves the magnified picture under the pointer
  rather than hunting for the scrollbars; the key is claimed only when there is
  somewhere to pan to and never while something is being typed into. The one
  range slider is now whites and darks, each reaching the end it is named for
  and leaving the midtones alone, because a canvas photographed against a lit
  wall generally needs one of them and not the other. And a colour slider, from
  grey to stronger, measured around each pixel's own grey so a hue keeps its
  brightness while it changes.

## 1.54.0

- **feat** — the studio stands a sideways photograph up, and goes in close. A
  quarter-turn button turns the pixels and the corners together, so a painting a
  camera recorded nothing about comes out of the straightening the right way up
  rather than squeezed into the shape of an upright one; the brushed area comes
  round with it. The stage magnifies up to four times with the rings and the
  outline keeping their size on screen, which is what the browser's own zoom was
  standing in for. The handle-size slider and the button that puts a bent side
  back on its chord are on the page again — both were left unreachable by the
  layout of 1.50.0. And a certificate that is saved or signed now clears the
  whole studio, the chosen file included, rather than only the form beneath it.

## 1.53.2

- **fix** — a raw file is recognised by its name alone. It also consulted the
  type the operating system reports, and Windows answering `image/nef` was read
  as a claim the browser could open it — so a perfectly good NEF came back as
  "that file could not be read as an image".

## 1.53.1

- **fix** — the raw-file test built its fixture out of the machine's temp
  directory, so it passed where it was written and failed on the deploy. The
  fixture is built inside the test now and depends on nothing outside the
  repository.

## 1.53.0

- **feat** — the studio opens raw files. A browser cannot develop a raw, but
  every raw carries the JPEG the camera made at the moment of the shot: on a
  real NEF from the artist's camera that is the full 6016 × 4000 frame, found in
  32 ms and decoded in 80. Written back at the top of the scale, since a raw has
  no quality of its own to match. NEF, NRW, CR2, CR3, ARW, ORF, RAF, RW2, PEF,
  DNG and SRW.

## 1.52.0

- **feat** — the fees the api works out are passed to the wallet rather than
  dropped. Left to itself the wallet tipped 0.1 gwei while the chain was
  charging 0.0495, which was two thirds of what a certificate cost. Passed on
  exactly as they arrive, and left out entirely when they are absent — half a
  fee is a transaction a wallet may refuse.

## 1.51.0

- **feat** — the height and width start empty and have to be given. They used to
  offer the last size typed, or the photograph's own proportions, and a
  measurement already in the box is one nobody reads before pressing on. The
  note under them is gone.
- **feat** — the gas ceiling is 0.06 gwei, down from 0.7.
- **fix** — signing says what it is doing at every step and cannot hang. A wallet
  that never answers hands back a promise that never settles, so the page sat
  silent for as long as anyone watched it: a mint that "took forever" and never
  reached the chain, with nothing said. Every wallet call now has an end, and
  the transaction is shown in full and linked, because slow and never-sent look
  identical from here.

## 1.50.0

- **feat** — a certificate that is saved or signed says so in a floating message
  and clears the form, instead of showing a copy of itself below the fold. The
  thumbnail, title and description were all already known and none of them
  needed a decision.
- **feat** — failures say so the same way, in red, rather than as a line of text
  in the middle of the page.
- **feat** — the three warnings are drawn in the colours Material uses for an
  error, with its warning icon. They were neutral, which read as an aside.

## 1.49.0

- **feat** — the studio says when a photograph is already certified. Every
  certificate carries its thumbnail inside the token, so the whole collection is
  in the browser already: the comparison costs a quarter of a second of this
  machine's time, once, and nothing else. Measured on the collection, the same
  photograph at very different sizes differs by 2 to 7 bits of 64 and two
  different paintings never by fewer than 14, so 10 is the line.

## 1.48.0

- **feat** — the studio says when a title is already used, or nearly. Sharing a
  title is how a second photograph of one painting is grouped with the first, so
  an exact match is often right; a title one letter out is how a painting gets
  quietly split from its own other photographs, which nothing else would
  mention. Both link to what they found, and neither stops anything.

## 1.47.1

- **fix** — the viewer no longer shows a band of empty frame while the blurred
  preview is up. The frame reserves its shape from the painting's measured width
  and height, which is right for a photograph of the whole canvas and wrong for
  a second one — a detail is a different crop of the same painting. The preview
  knows its own proportions, so it is asked, and the frame is the right shape
  from the first blurred pixels rather than snapping straight later.

## 1.47.0

- **feat** — the studio asks for each thing once. Height, width and unit were
  typed in the corrector and asked for again in the certificate; there were two
  file inputs for one photograph and the artist's name in both places. The
  certificate now shows what the corrector already knows.
- **feat** — one action instead of three rows. "Preview and prepopulate" is
  gone: the full-size render happens when **Save for later** or **Prepare and
  sign** is pressed, because that is when the result is going to be used.
  Downloading the JPEG is a quiet link, not a row.
- **feat** — the photograph stays beside its controls on a wide screen, and
  stays put as they scroll. Every slider used to sit below the thing it moved.
- **chore** — the rights fields fold into a disclosure that says whose it is.
  They are filled in and remembered, and were sitting in the path of everything.
- **chore** — ten stylesheet rules removed that nothing had used since the
  markup around them went.

## 1.46.2

- **chore** — a `.gitattributes` that checks out LF, so switching branches on
  Windows no longer leaves every file modified by carriage returns alone and
  fails the lint before a push.

## 1.46.1

- **feat** — after signing, the page says whether the painting is on the site
  already or waiting for tonight's catalogue read.

## 1.46.0

- **fix** — a decimal can be typed. Both forms tidied away a trailing comma on
  every keystroke, so the comma of "140,5" was removed by the key that made it
  and the 5 landed on the whole number: 1405. No measurement with a decimal
  could be entered anywhere, by anybody.
- **fix** — the corrector's height and width take the collection's own notation.
  They were number inputs stepping in tenths, which refuse a comma outright and
  call two decimal places invalid.

## 1.45.1

- **fix** — throwing a certificate away says whether it worked. The failure was
  caught and dropped, so when the browser refused to send the request at all the
  button did nothing and explained nothing.

## 1.45.0

- **fix** — the studio's second button prepares the certificate and takes you to
  the waiting list to sign it, instead of asking the server to mint. The server
  has no minting key, by choice, so that could never work — and it asked for
  everything waiting to be written rather than the one just prepared.
- **fix** — a failure after the certificate is stored no longer claims nothing
  was stored. It reported "The api could not prepare that. Nothing was stored."
  over a certificate that had been stored perfectly, which led to the same
  painting being prepared twice.

## 1.44.2

- **fix** — the mint api's answers are read out of the envelope the backend puts
  everything in. Read as though they were the value itself, a stored certificate
  showed as "Token — undefined" and the waiting list as empty, though the
  certificate was stored correctly and its image already on Arweave. The tests
  now send the envelope the server sends, and fail without the unwrapping.

## 1.44.1

- **fix** — every call to the mint api now carries the artist's token. None of
  them did, so all six were refused with "Forbidden resource": preparing a
  certificate stored nothing and minting stopped before a wallet was ever
  opened. This application has no interceptor — each service attaches its own —
  and these had never been given one.

## 1.44.0

- **feat** — "Square the picture up to these", beside the measurements and on by
  default. Off, the corners are still straightened but the result keeps the
  shape they describe rather than being stretched to the painting's
  measurements — for a detail, or a canvas photographed half-finished, where the
  measurements belong to the work and the photograph shows part of it. The
  measurements still go on the certificate either way.
- **chore** — the switch reaches the brush as well as the picture. Both are
  measured in the straightened rectangle, and a mask built to one shape while
  the pixels were built to another would land in the wrong place.

## 1.43.0

- **fix** — a change now stays where it was made. The sliders described one
  change to whatever was selected at that moment, so brightening one corner and
  then selecting another carried the brightening across and undid it on the
  first: the correction followed the brush around. Changes are kept the moment
  the selection is about to differ, and the sliders start again, so successive
  edits accumulate.
- **feat** — the preview shows all of them stacked, as the saved file will, and
  the page says how many are kept. "Back to as shot" discards every one.

## 1.42.0

- **feat** — the corrected photograph is written back the way it arrived. The
  quality and the colour sampling are read out of the chosen file's own header,
  and the encoder is given a number rather than a constant: a full-colour
  photograph is saved at the top of the scale, one whose colour was already
  halved comes back at the quality it came in at instead of being inflated.
- **feat** — the page says what it read — "quality 98, full colour" — under the
  file's name, because a saved file larger than the original is otherwise a
  mystery. It is not extra detail; maximum quality faithfully records the grain
  and the original's own compression.

## 1.41.1

- **feat** — a link that opens the waiting list inside the Base app's own
  browser, where the wallet is. A plain link the app registers, so nothing is
  installed and no relay is involved.

## 1.41.0

- **feat** — a certificate can be signed from the phone. Opened inside a wallet
  app's browser, `/pendingmint` offers **Sign** on each waiting certificate: the
  api assembles it and encodes the call, the wallet signs as the artist, and the
  list clears only once the chain says the token is there.
- **feat** — the wallet is reached through the page's own provider. No connector
  library, no project id and no new dependency: the site already talks to a node
  over plain fetch, and this is the same idea.
- **fix** — the chain is checked before anything is signed. A wallet on another
  network would otherwise sign something meaningless and report success.

## 1.40.0

- **feat** — pnpm replaces npm, pinned by the `packageManager` field and
  installed by corepack, which ships with Node. `yarn.lock` is gone; nothing
  referenced it.
- **feat** — a package must have been on the registry **thirty days** before it
  can be installed, checked on every install and not only when resolving, so a
  young package cannot arrive by way of a lockfile either. The 36 versions
  already running when the rule came in are carried over at their exact
  versions, so the exemption expires by itself.
- **feat** — dependency install scripts are refused. Only `esbuild` is allowed
  one, because Angular's bundler is a binary it downloads; the four refusals are
  written down as decisions rather than left silent.
- **fix** — `@types/node` is declared. `tsconfig.spec.json` has always asked for
  it and npm's hoisting supplied it by accident.

## 1.39.2

- **chore** — deleted 795 lines of image code nothing called: the lighting,
  glare, rim and colour passes removed in 1.38.0, still carrying tests that
  proved code no page could reach. R22, R23, R31, R61 and R62 went with them.
- **chore** — one `MintApiService` instead of two components holding their own
  copy of the same four calls and their own `PendingMint`, which disagreed.
- **chore** — the photograph corrector is 966 lines rather than 1,089: the brush
  and the rights panel are objects of their own, each with its own tests, and
  neither has anything to do with correcting a photograph.
- **chore** — the outlined-button recipe was written out three times; it is a
  mixin now, and the gate's styles moved out of the component into a file like
  every other component's.
- **fix** — the years-menu test measured an overlay before it had been laid out
  and failed only under the load of the full suite. It waits for the box now.

## 1.39.1

- **feat** — the brush erases as well as selects. Taking a selection back was
  only ever on shift, which is nowhere a person would find it, and pulling an
  edge back is most of what selecting an area is. Shift now reverses whichever
  tool is in hand, and the ring under the pointer goes dashed while erasing.
- **fix** — a brush finer than one of the mask's cells could fall between four
  of them, reach none and paint nothing at all, silently. The smallest brush is
  now 1% rather than 4%, and a dab always reaches at least the cell it is in.
- **fix** — "Save for later" sat lower than "Mint now": it kept a top margin
  from when it stood alone under the form.
- **fix** — the selection has been drawn as a dashed outline since 1.38.3, but
  the note beside it still said it was shown in blue.

## 1.39.0

- **feat** — the price of gas is shown beside every mint button and refreshed
  every fifteen seconds. Above 0.7 gwei it says **Too expensive!** and the
  button will not press: writing a certificate is about three quarters of a
  million gas, so the price of gas is the whole of what one costs.
- **feat** — a certificate can be saved for later instead of written now. The
  night's work writes whatever is waiting, and only while gas is under the same
  0.7 gwei.
- **feat** — `/pendingmint`, behind the admin guard, lists what is waiting with
  the live price at the top, a button to write them all, and a way to discard
  one. Written certificates leave the list.

## 1.38.3

- **fix** — the saved JPEG was encoded at 0.95, which turned a 2.35 MB
  photograph into 0.50 MB and strayed up to 19 levels from the straightened
  pixels. At maximum the same image is 2.09 MB and strays 4 at worst.
- **feat** — the selection is drawn as a dashed contour rather than a blue wash,
  so the colours underneath can still be judged, and the brush shows a ring at
  the width it would cover.

## 1.38.2

- **fix** — the brush selected nothing at all. Every dab was mapped through a
  homography read as nine numbers when the solver returns eight, so each landed
  at NaN and painted silently outside the picture.
- **chore** — the corner size and straighten-the-sides controls are gone, the
  rights fields sit below the image controls rather than between them, and the
  notice comes filled in with this year.

## 1.38.1

- **feat** — the preview changes as the sliders move, and the brushed area is
  washed in blue on the photograph so it can be seen. "Unselect all" is always
  there rather than appearing once something is selected.

## 1.38.0

- **feat** — the photograph is corrected by hand: brightness, temperature and
  range, each starting at the photograph as it arrived, with a brush to say
  where they apply. Nothing brushed means everywhere.
- **feat** — a corrected photograph and its size go straight to the certificate
  form, instead of being downloaded and chosen again from disk. Downloading is
  still there.
- **chore** — the five automatic corrections are gone. Each measured the
  photograph and decided for itself, and none could tell a lamp that fell off
  from paint that is dark.

## 1.37.2

- **fix** — the end-to-end theme test reaches the toggle through the More menu,
  where it now lives. Two deploys failed on it.
- **chore** — height is asked for before width, in the studio and in the mint
  form, which is the order the collection is written in.

## 1.37.1

- **fix** — the studio's rights fields come filled in with the artist's name and
  the terms page, instead of holding the answer in a placeholder and letting a
  photograph go out unattributed when it was not typed again.

## 1.37.0

- **feat** — the theme, the language and the artist's own way in are gathered
  behind a "More" menu. The bar had grown to eight items, three of which were
  settings rather than places, and the language now opens as a submenu.

## 1.36.1

- **fix** — the grid softens a tile while it is still showing the picture the
  certificate carries. That image is about 112px, so at tile size it was sharp
  and pixelated, which reads as a bad photograph rather than as one loading.

## 1.36.0

- **feat** — the catalogue comes from the certificates on Ethereum, which carry
  their own metadata and a small image of the painting inside the token itself.
- **fix** — images load smallest first again. The token's own thumbnail used to
  be the middling one and is now the smallest there is, so ranking it where it
  had always been made the page visibly worse as it loaded.
- **feat** — the studio describes a new painting from a fixed vocabulary and
  prepares its certificate, leaving the signing to a wallet.

## 1.35.1

- **fix** — the years menu took the whole height of the window; it now shows
  about seven at a time and scrolls to the rest.

## 1.35.0

- **feat** — a *Regenerate* button on each waiting reel makes the video again
  with whatever the render does now; it takes minutes, so the page watches for
  the new one rather than waiting on the request.

## 1.34.2

- **fix** — `/publish` showed two empty boxes for reels made before the caption
  was kept in halves; it recovers them from the caption when they are missing.

## 1.34.1

- **chore** — a pre-push hook runs lint and the type check, so formatting cannot
  reach a deploy and fail it there.

## 1.34.0

- **feat** — `/publish` edits the technical sheet and the critic in separate
  boxes, and a new *Update critic* button saves the essay everywhere it is read
  rather than only on the video being published.

## 1.33.0

- **fix** — sixty artwork pages were being published with no painting on them:
  the catalogue is now fetched once per build instead of once per page, and the
  build refuses to publish a page like that again.
- **feat** — the second photograph of a painting names the painting's own page
  as its canonical, and the sitemap lists only pages that stand for themselves.

## 1.32.0

- **feat** — the caption on `/publish` can be rewritten before the reel is
  published, with a count against Instagram's limit.

## 1.31.1

- **chore** — the menu item holding the private pages is called Admin rather
  than Workshop.

## 1.31.0

- **feat** — a Workshop item appears in the menu when he is signed in, holding
  every private address — the studio, the reels waiting, and signing out. A
  reader never sees it.

## 1.30.0

- **feat** — `/publish`, behind his own account: the reels made overnight, with
  the caption each would go out with, to publish, discard or download. Instagram
  has no draft an API can write to, so the video waits in the bucket instead.

## 1.29.0

- **feat** — an essay appears on an artwork page only once the artist has been
  over it. Unreviewed drafts are no longer shown, announced, or waited for.

## 1.28.0

- **feat** — the button that puts a generative sketch full screen is no longer
  drawn once it is: nothing is left over the drawing, and Escape brings it
  back.

## 1.27.0

- fix: a build never asks the reverse image search. It rendered 186 artwork
  pages and asked once for each, and while that endpoint re-ran the search when
  its answer had aged, every build was 186 billed Google calls — a few days of
  building came to about ninety euros. `getLinks` now refuses outside a
  browser, the answer is kept out of the transfer cache so an empty build-time
  one cannot silence the browser, and `verify-render` fails the build if any
  page shows that it asked. Nothing is lost from the page: the list lives
  behind a button, in a dialog, which nothing without javascript can open

## 1.26.0

- feat: the painting on the landing page leans towards the pointer, the way the
  catalogue tiles do — 17 to 21 pixels of it, where the drift it replaces moved
  about five and could not be seen. At rest it is drawn at its own size, so the
  page shows the whole work uncropped until somebody approaches it. Where there
  is no pointer the drift stays, and is twice what it was; never both at once,
  since a picture already wandering cannot be seen to lean towards anything

## 1.25.0

- feat: the painting on the landing page never quite settles. The same movement
  the reels are built from — a slow push in and across the work — done as a
  transform on the image the page was already loading, so it costs no bytes, no
  video and no request. It returns exactly where it began, so the loop has no
  seam, and it holds still for a reader who has asked for less movement
- chore: the catalogue's lean is 4.5% rather than 6%. Still half again what it
  was when the whole grid moved together, and the image goes back to being
  drawn at 1.1 instead of 1.14 — every bit of extra scale is another bit of the
  painting cropped away, on two hundred of them

## 1.24.0

- feat: only the tile under the pointer leans, and it leans twice as far. The
  effect measured from the centre of the viewport and was written once on the
  grid, so all two hundred tiles moved together — the page appearing to slide
  rather than answering the pointer, and small because two hundred things
  moving at once has to be. Confined to one tile it can be 6% instead of 3% and
  still be quieter overall. The image is drawn 1.14 rather than 1.1 to keep the
  slack the bigger lean needs

## 1.23.0

- feat: the essay no longer carries a heading. It sits under the painting's
  name, which the page gives directly above it, so a second title said the same
  thing twice. The editor loses its title field one release after gaining it,
  and the line that held the heading is drawn only when it has something to say
  — for a reader it is not there at all rather than standing empty above the
  text (needs backend 1.18.0)

## 1.22.0

- feat: the essay's heading can be changed from the page it is on. It was the
  one part of an essay that could not be, so retitling meant editing Firestore
  by hand. The heading is sent only when it has actually been changed, so an
  edit to the prose alone asks for exactly what it always did
  (needs backend 1.17.0)

## 1.21.0

- feat: the build checks REQUIREMENTS.md the way it already checks the rendered
  pages. A requirement number used twice, a requirement with nothing said about
  what proves it, a proof naming a file that has been deleted, or a proof
  quoting a test that has been renamed — any of them fails the build. It also
  reports, without failing, the requirements whose only proof is prose: 19 of
  the 64, which is the honest number
- fix: four requirements had been marked "met · proven by" three Cypress specs
  deleted in 1.14.0, and five numbers were used twice for unrelated things.
  Nobody had been careless; there was simply nothing checking

## 1.20.1

- chore: the gallery link is out of the footer. It is still on the contact page
  and in the cv, where it belongs to something being said

## 1.20.0

- feat: a page at /latest showing the paintings most recently put on Instagram,
  newest first, each leading to its own page. This is where the link in the
  Instagram profile can point: the account gets one clickable link and a
  caption cannot carry another, so until now a follower who had just seen a
  painting had no route to the page about it. The order is read from what was
  actually posted, so it matches what somebody scrolling has just seen, and it
  stays current without anyone editing it. On the artist's own domain, with no
  tracking and nothing that can start charging
- feat: each artwork page links to the Instagram post about it, when there is
  one — the direction a caption cannot carry. Absent for the rest of the
  catalogue, which has never been posted
- fix: a failed request no longer reads as an empty account. The list told
  apart "nothing has been posted" from "could not ask", because answering one
  with the other puts a claim that there are no paintings over a page that had
  twelve

## 1.19.0

- feat: a footer, on every page. The site had none — pages simply stopped — and
  the only link to Instagram anywhere on it was one sentence on the contact
  page, the least-visited page there is. Privacy and Terms are in it too: four
  prerendered pages that were linked from nowhere at all. Plain links, no
  follow widget: the privacy page promises no third-party anything, and an
  embed would make that untrue on all 388 pages at once
- feat: the share button shares the painting. It floated over every page at
  z-index 9999, on top of the first tile in the grid, and handed the operating
  system the same three lines wherever it was pressed — the artist's name, the
  words "Contemporary Art", and whatever address was showing. It now sits in
  the artwork's own toolbar and passes on the title and the technical sheet.
  Where the browser has no share sheet it copies the link instead of hiding
  itself

## 1.18.0

- feat: a catalogue narrowed to nothing says so, where before the page simply
  ended after the controls and read as broken rather than as narrowed. The grid
  is not rendered at all when it is empty: an empty mat-grid-list does not
  collapse, it keeps the height it had when it was full, which would have left
  the message some seventeen thousand pixels below the fold

## 1.17.1

- fix: the row of controls above the catalogue did not line up. The chosen
  value in each select sat 4px above the words in the chips beside it — the
  infix is a block, so its line rested at the top of the box instead of in the
  middle — and the year picker showed its label as a placeholder while the
  availability picker showed its own above the box, so the two read as
  different kinds of thing. The year now says "Year" above it like its
  neighbour, and "All" underneath until a year is chosen. Both boxes are
  narrower: they were half full of nothing between chips as wide as their words
- chore: the artist's edited-essay controls sit after everything a reader is
  offered, with room around them, instead of above the sort chips

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
