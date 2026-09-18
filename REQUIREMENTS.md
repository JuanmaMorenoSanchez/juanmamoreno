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
*Proven by:* `art-pieces-list.component.spec.ts` "links every tile to its own
artwork page"

### R3 — The catalogue opens with a mouse · met
Clicking a tile navigates. A link is draggable and a browser that has begun a
drag fires no click, which a synthetic click cannot detect.
*Proven by:* the mouse e2e run in CI

---

## Images

### R4 — Full-resolution download · met
The original file, untouched. On every artwork page, and on every certificate
still waiting to be written — the same button in both places, so "the original"
means the same file and the same sizes wherever it is asked for.
*Proven by:* `download-button.component.ts` (`downloadFull`), and a measured
download in review. Nothing automated would notice if the artwork pages stopped
offering it; the waiting list is covered by R99.

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
(3 tests), `e2e/navigation.test.mjs` "the language a link lands you in",
"keeps a Spanish reader in Spanish through the featured painting"

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
*Proven by:* `artwork-critic.component.spec.ts` "shows the essay with no way to
change it", and the prerendered essay text in `scripts/verify-render.mjs`

### R76 — A push runs the checks it is about to fail · met
`.githooks/pre-push` runs lint and the type check before a push leaves the
machine, and refuses it if either fails. `npm install` points git at that
directory through the `prepare` script, so it installs itself.

It is here because the backend had two deploys fail on formatting alone, each
costing six minutes to be told something eslint says in ten seconds — and both
times the checks had been run locally, one of them read wrongly, because
`npm run lint | tail -1` prints a blank line when everything passes. A check
whose result has to be read can be misread; an exit code cannot.

Only the fast half. The 427 tests, the prerender and its two verifiers stay in
CI, where taking minutes costs nothing. `git push --no-verify` goes past it,
deliberately.
*Proven by:* `.githooks/pre-push`, confirmed to exit 1 against an unformatted
file and 0 once it was formatted

### R78 — The years menu is a menu, not a page · met
Paintings → By Year lists every year the artist has worked in — nineteen of
them, and one more every year. As a plain Material menu it measured exactly the
height of the window at every size tried: 800px on a desktop, 700 on a laptop,
844 on a phone. Material caps a panel at the viewport less forty-eight pixels,
which for a list this long is no cap at all, so opening it replaced the page
rather than covering part of it.

It now shows about seven years at a time and scrolls to the rest — `min(22rem,
60vh)`, so a short window gets a shorter menu rather than one that overflows it.
Every year stays reachable, which matters more than the height: a menu that hid
the early work and could not be scrolled to it would be the worse fault.

The rule lives in the global stylesheet rather than the component's, because a
menu panel is drawn in an overlay outside the component that declares it, and
is reached by the class the panel carries.
*Proven by:* `e2e/years-menu.test.mjs` (5 tests, including "leaves most of the
page visible behind it", "scrolls to the years it cannot show at once", "gets
shorter on a short window rather than overflowing it"), three of which were
confirmed to fail with the cap removed. It is an end-to-end test because nothing
below a real browser can see the effect: jsdom applies no stylesheet, and the
panel is not inside the component under test.

### R77 — A reel can be made again from the page it waits on · met
A *Regenerate* button on each waiting reel asks for the video to be made afresh,
with whatever the render does now. It exists because how a reel is framed, where
its shots are pointed and how the camera moves are all read from the painting,
and all of that changes as the way of reading it improves — without this, seeing
a change on a reel already made meant discarding it and waiting weeks for the
queue to come round again.

**It takes minutes, and the page does not wait on the request.** What marks it
done is the reel coming back with a later date, so the page asks the list every
fifteen seconds until it does. That is deliberate rather than convenient: a
render outlives the request that started it, so a dropped connection, a reload or
a closed tab costs nothing and the video still arrives. Only an outright refusal
to start is reported as a failure.

While it runs the button says so and cannot be pressed twice, and the card
carries a line saying roughly how long and that leaving the page is safe. When
the new one arrives, any unsaved edits to that reel's boxes go with the old
video: they belonged to a caption that has since been rebuilt from the essay as
it now reads.
*Proven by:* `publish.component.spec.ts` "making a video again" (6 tests,
including "keeps asking the list while it waits", "stops saying so once the new
one has arrived", "will not ask twice for the same one"), and backend B31

### R74 — Every artwork page has its artwork on it · met
A page under `/artwork/:id` carries the painting's name in its title and
advertises its picture. The build refuses to publish one that does not.

It exists because sixty of them shipped without either. Each page fetched the
whole 430 kB catalogue for itself — three hundred and ninety requests for one
document over a deploy — and sixty of those did not arrive inside the eight
seconds a prerendered route is given. A page whose catalogue never came fell
back to an empty store and was written out with nothing on it: no name, no
picture, nothing but the menu and the footer. They passed every check there
was, because three hundred characters of navigation clears the hundred and
twenty the content check asks for.

Google found them. It filed thirty-four English pages as duplicates of each
other, declined to index sixty-six, and chose its own canonical for
`/es/artwork/153/`, which was one of the empty ones.

Both halves are fixed: the catalogue is fetched once for a whole build and
shared by every page, so there are no longer three hundred and ninety chances
to be the request that fails; and the check above means a page like that cannot
be published again even if some other cause produces one.
*Proven by:* `scripts/verify-render.mjs` check 6b, confirmed to fail — and to
exit 1 — against a page of the exact shape the sixty had

### R75 — One painting, one address · met
Some paintings were photographed more than once and each photograph has its own
certificate, so several token ids open the same page: same name, same picture,
same essay, differing only in the address at the top. Twenty-four of the
hundred and eighty-six are copies in that sense.

Each of those names the painting's own page — the frontal view the catalogue
puts a tile on — as its canonical, and its hreflang pair moves with it, because
a canonical and an hreflang that disagree are worse than neither. The sitemap
lists only pages that stand for themselves, since submitting a page the site
itself calls a copy is how a sitemap comes to contradict the pages it lists.

The build checks that a page naming another as the original names one that was
actually built, in the same language, and that the original is not itself a
copy.
*Proven by:* `seo-title.strategy.spec.ts` "a page that is a second photograph of
a painting" (4 tests), `scripts/verify-render.mjs` check 1, and the sitemap,
which lists 342 of the 390 pages

### R11 — A build never commissions an essay · met
Nothing does any more, on any request a reader or a build can make: the route
that used to write one when asked for a missing essay no longer writes at all
(backend B5). The `?generate=false` the build used to pass went with it — there
is no longer a behaviour to ask it not to perform.
*Proven by:* backend `critics.controller.spec.ts` "never writes an essay for a
reader who asks for one"

### R72 — Only an essay the artist has read is on the page · met
A model writes the first draft and nothing about that makes it publishable. On
a page it is published whether or not anyone meant it to be: read, quoted,
indexed, and attributed to him. So an essay reaches a reader only once he has
been over it, and the twenty he has been over are the twenty that ship — the
rest of the catalogue's pages carry the painting, its details and its images,
and no text.

The gate is the backend's (B4), which is the only place it can be: the page
cannot hide what a reader can ask the API for directly. What is here is the
page not asking for what it cannot have and not announcing what it is missing.
The spinner that used to say an essay was being written is gone with the
writing: it would have promised something never coming, and on an artwork whose
draft exists but is unreviewed it would have announced the draft. The thirty
second poll went with it — a question already answered, re-asked by every
reader on a hundred and fifty pages for as long as the tab stayed open.

The artist reads everything, through the authenticated route he already used to
learn whether an essay had been edited.
*Proven by:* `artwork-critic.component.spec.ts` "when there is no essay to
read" (4 tests), and backend B4

---

## Search and machines

### R12 — Every page is readable without JavaScript · met
388 pages prerendered with their own canonical, title, description and hreflang
pair.
*Proven by:* `scripts/verify-render.mjs`, which fails the build

### R13 — Artwork pages carry structured data · met
`VisualArtwork` and `BreadcrumbList`, plus `Person` site-wide.

The `VisualArtwork` says two things the page cannot say to a machine on its own.

It names the catalogue the painting belongs to, at one address every page
repeats, so that the hundred and eighty-six of them describe one body of work
rather than a hundred and eighty-six unrelated paintings by the same person.

It names the painting's certificate — `identifier` for the token, `sameAs` for
where to read it. A claim that a painting is the artist's own, made on the
artist's own website, is worth what any such claim is worth; the same claim
written into Ethereum, with the address to go and read it, is one that can be
followed and checked without asking him. Both are ordinary schema.org
properties, so nothing has to understand a blockchain to follow them (R105).

And it says whether the painting has sold, in a word from a fixed vocabulary.
On the page that is a red dot, which is a colour and a border radius: it
survives neither being read aloud nor being turned into plain text, and those
are the two ways anything but a browser arrives. The word is now beside the dot
as well, out of sight (R103).

All of it is written in the page's own language and about the page's own
address. It was not: a Spanish artwork page gave the url of the English one and
a trail reading Home > Paintings, while its own canonical said /es/. The address
was written out without the prefix, and the test that looked localised was
passing in a Spanish url the app never passed.

The build refuses a page missing either fact, or naming an address in the wrong
language, because all of it is written by the same call and a page without it is
a page where that call did not run.
*Proven by:* `seo-title.strategy.spec.ts` "describes the artwork and who made
it", "places the artwork in a trail from the home page", "places the artwork in
the catalogue the rest of the paintings are in", "says the painting can still be
bought", "says a sold painting has sold", "names the certificate on the chain,
and where to read it"; and `scripts/verify-render.mjs`, which fails the build

### R105 — A painting says where it is written down · met
A seal in the row of icons above the painting, and behind it what the chain
holds: the work's own line — title, year, medium, size — the day the artist
recorded it, the certificate's number, the contract it lives in, and the
transaction that carries the date. All three link out to Etherscan, so nothing
on this page has to be taken on trust.

**A seal rather than a lock or a tick, and the difference is the point.** A lock
would say the record is sealed, and no token is frozen. A tick would say
somebody else checked it, and nobody did. This is the artist's own account of
his own painting, written where it cannot be unwritten — which is what a
certificate of authenticity has always been.

It says the recording was irreversible, and that is exact: the transaction is in
its block permanently and no one can unmake it. What is not fixed is what
`tokenURI` returns today, which the owner may amend until a token is frozen and
none are — so the sentence describes the act, which is irreversible, rather than
the mutability of the current metadata.

The date is the only part fetched, and the panel is written twice — with it and
without it — because everything else is known without asking anybody. The date
is shown in UTC rather than the reader's own zone: a block timestamp is UTC and
Etherscan shows UTC, and a panel whose purpose is to be checked against
Etherscan must not name a different day than Etherscan does.

**The certificate can be printed**, and the printed one abbreviates nothing. On
screen `0x6E8b…5548` is a tidy label; on paper it is useless, and a certificate
that has been printed has left the internet behind. So the page carries the
token, the contract address and the transaction hash written out in full, over
the painting at print density and at a higher jpeg quality than a catalogue
page — one painting on one page, kept and looked at closely, is worth the bytes
that thirty of them are not. It carries the same sentence the panel does, in
full, rather than a shortened one written for paper.

**One page, always** (R106). Everything but the painting is measured first and
the painting is given what is left, which is the opposite of how it was built:
a fixed share of the page for the image put it on two sheets, because the
sentence runs to five or six lines and one line either way decided it. The
address at the foot is pinned to the bottom margin rather than written in the
flow, so a rounding error in a line height cannot carry it onto a second sheet
on its own.

Every artwork has one. The catalogue is read out of the contract, so a painting
on this site is a painting with a certificate, and there is no empty state.
*Proven by:* `certificate-dialog.component.spec.ts` (4 tests, including the
panel with no date), and driven in Chrome against a running site: the seal
opens the panel, the three links are right, and the download produces a pdf
whose `/MediaBox` reads 210×297mm over a single page — none of which jsdom can
see, since it has no canvas to draw one with

### R106 — Paper that goes in a folder is A4; the book is square · met
The cv, the statement, the technical sheet and the certificate are 210×297. The
dossier, and only the dossier, keeps the 210×210 it was designed as.

The square is right for the one of them that is a book of paintings and wrong
for the four that are documents: a cv is posted to a gallery, a certificate is
filed with the papers for a painting, and a square sheet in a folder of A4 is
the one that gets bent. They had all inherited the dossier's format because
there was only ever one.
*Proven by:* every one of them downloaded from a running site and read back —
`/MediaBox` is 210×297mm on the four and the dossier's builder is the only
caller that asks for no format, which is the square

### R107 — A painting's frame is the right shape before any image loads · met
The frame takes its shape from **the photograph**, not from the canvas, and it
does so in the prerendered html — so the shape is right on the first painted
frame and never changes afterwards.

The two are not the same shape and the difference is visible: a canvas measured
130 x 130 is photographed 80 x 82. Reserved square, that is an empty strip down
each side of the blurred preview which closes when the full file lands. It is
also the only thing that can be right for a second photograph — a detail, a
corner, a canvas caught half-finished — which is a different crop and so a
different shape, where the measurements describe the whole canvas either way.

**The photograph's shape is already in the catalogue.** Every certificate
carries a two-kilobyte thumbnail of its own painting, and a JPEG holds its
dimensions in the header of its frame — so reading them is a walk along the
markers and four bytes, with nothing to decode, nothing asynchronous and no
canvas. That is what makes it work at all: it answers during a prerender, in
Node, where there is nothing to decode an image with.

Measuring it in the browser instead cannot work, which was the first attempt
and was thrown away: the preview is painted on the first frame, out of the
prerendered html, before any javascript has run. Measured in Chrome it was on
screen at 150ms while the probe had not started at 1.3s.

The blurred preview also fills its frame rather than fitting inside it, which
is now belt and braces rather than the fix — it keeps an artwork whose
thumbnail cannot be read from showing a gap while it falls back to the
measurements. Two per cent of crop on something already blurred cannot be seen;
a moving edge can.
*Proven by:* `jpeg-size.spec.ts` (11 tests, including a progressive frame, a
Huffman table that looks like a frame, and a segment claiming no length, which
would hang the walk rather than answer wrongly), and measured in Chrome on a
throttled connection: a square canvas, a portrait crop and a painting whose
photograph matches its measurements all hold one shape from first paint to
full image

### R108 — There is a page about how the product is run · met
`/about-certificates-project`, in both languages, prerendered like everything
else and deliberately absent from the menu.

It is written for somebody deciding whether to hire the person running this,
which is a different reader from the one the rest of the site is for — so it
arrives with the address in hand rather than being come across by a gallery.

It opens with where he is coming from, then what the product is for — three
things, in the order they were built — then how it is put together, and only
then the argument about how it is kept honest, which means nothing until the
reader knows what "it" is. It leads on counted figures rather than adjectives:
requirements, releases, and the twenty-five requirements that admit to having no
automated proof. Each decision it describes names what was chosen, what was
chosen instead, and what that cost; the one that went wrong is third rather than
last, because burying it at the end would be a way of hiding it politely.

**It says plainly that most of the code is written by an agent**, to a
specification and a review. That is the page's argument rather than its
disclaimer: an agent will let a requirement rot, a cost run or an abstraction
spread, and the requirements file and its proofs are what make working that way
safe.

**The build refuses it if it says anything it should not.** It is the only page
whose subject is the machinery, which makes it the one page where a useful
detail and a dangerous one look alike: the service's repository is private and
stays unnamed, as do the addresses behind a guard, the names of credentials and
the cloud it runs on. Checked rather than trusted, because the copy will be
edited later by somebody who has forgotten why.
*Proven by:* `project.component.spec.ts` (3 tests, including that only the
public repository is linked), and `scripts/verify-render.mjs`, which fails the
build on a named list of things that page may never contain — verified by
planting one in the built page and watching it fail

### R109 — The bar is pages, then three icons · met
Six places to go, then the theme, the language and the way into the workshop —
each an icon with a label and no word.

They had been gathered behind a "More" tab so that three settings would stop
competing with six pages for the reader's eye. As icons they no longer compete:
a word in a row of words asks to be read and a symbol at the end of one does
not, so the tab was doing work its own contents could do. Every one of them is
a press shorter for it.

The last icon is the only one that changes. **Signed in it opens the workshop
menu** — every private address in the site hangs off that one menu, so there is
one place to add the next and one place a reader can be certain is not theirs.
**Signed out it is the door**, which is the only way in and tells nobody
anything: the guard on each route decides what is drawn and the api decides
what happens, so an unmarked door costs nothing.

That replaced a third state, where the door appeared only on a browser that had
signed in before. It was there so that signing out could not take away the way
back; with the door shown to everybody there is no state left in which the way
back is hidden.
*Proven by:* `top-menu.component.spec.ts` (14 tests, including that each of the
three carries an icon and a label and no word, that a reader is shown the door
and nothing behind it, and that the theme names what it will switch to rather
than what is already showing)

### R110 — The cv can be read as a life rather than a table · met
Beside the download on the cv page, a second button offers the same career as
three or four paragraphs. A dossier can carry either.

They are two things for two readers. A gallery wants the list — it is scanned,
not read, and being a table is the point of it. Somebody deciding whether to
open the list at all wants the paragraph.

**Downloading is anybody's; writing it is his.** The api writes it and keeps it,
because it costs a model call and a cv changes a few times a year, so writing
one per visit would pay again for an answer nobody had changed — and a public
page that spends money per press is one somebody eventually holds F5 on. It is
also a biography of a living person written by a machine, so he reads it before
anybody else does. Until he has written one the page offers nothing, because an
empty offer is worse than no offer.

The list is rendered here and sent with the request. The cv lives in this
repository and nowhere else, and a copy on the server would be a second thing to
remember to update — the stale one being the one nobody was looking at.

**The cv downloaded on its own opens with his name and one line placing him**;
inside a dossier it does not, because the cover has already said both and the
reader has come through twenty pages of paintings to reach it.
*Proven by:* `cv-prose.service.spec.ts` (5 tests, including what the list looks
like by the time a model sees it), and the downloaded cv read back from the
file: A4, and carrying the name, the year, the city and the gallery

### R103 — Nothing on the site says what a painting costs · met
Not the page, not the structured data, not the offer that says the painting is
for sale. The offer carries where to ask — the painting's own page, which is
where the button that opens the enquiry sits — and no figure at all.

This is a decision rather than an omission waiting to be filled in. A price is
answered to whoever asks for it, and a published one is an anchor far easier to
set than to move.
*Proven by:* `seo-title.strategy.spec.ts` "never says what anything costs"

### R14 — The sitemap lists what exists · met
Generated from the prerendered output, with `lastmod`.
*Proven by:* `scripts/generate-sitemap.mjs` runs in the build

---

## Texts

### R15 — Published writing is referenced, not copied · met
`/texts` links to each piece with publication, author and date. Nothing is
reproduced: the texts belong to the outlets that ran them.
*Proven by:* `texts.component.spec.ts` "renders one entry per published text",
"links out to every source in a new tab"

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
`/studio`, `/door` and `/publish` are never prerendered, are excluded from the
sitemap, are disallowed in robots.txt and carry `noindex`.
*Proven by:* `app.routes.server.ts`, `robots.txt`, `verify-render` (none of them
appears among the built pages)

> **Not a security boundary.** The site is static: the bundle is public and
> localStorage belongs to the reader, so the guard decides what the interface
> shows and nothing more. Anything these pages are given to hold must be
> protected by the backend verifying this token — signature included — on every
> request.
>
> `/publish` is the first page where that matters rather than being
> hypothetical, and it is why every route behind it is guarded on the backend
> too: the guard here decides whether the page is drawn, and the backend decides
> whether anything happens. Reaching the page without the account gets an empty
> list, because the requests it makes are refused.

### R73 — Reels are watched before they go out · met
A page of his own at `/publish` lists the reels the nightly run has made and not
published: the video, the caption it would go out with, and the date it was
made. Each can be published as it stands, thrown away, or downloaded.

**Instagram has no draft an API can write to.** Publishing is a media container
followed by a `media_publish` call, and a container left unpublished is invisible
in the app, cannot be edited, and expires in a day. So there is no "save it as a
draft and edit it in the app later" to build. Downloading the file and posting it
from the phone is the way to edit one, which is why the page offers the file: the
video is at a public url in the bucket, which is how Instagram fetches it anyway.

**The caption is his to rewrite before it goes out, in two halves.** The
technical sheet in one box and the critic in another, because they are two
different things: one is generated from the catalogue and the other is his
writing. What is on screen when he presses publish is what is sent, recorded
and published, saved or not. Each reel keeps its own edits.

**The critic box holds the essay's own markdown, and can be saved.** A second
button, *Update critic*, writes it back over the essay through the same route
the artwork page uses — so a correction made here is a correction everywhere the
essay is read, not just on one video. The two are deliberately separate acts:
publishing changes nothing about the essay, and saving publishes nothing.

That box has to hold the markdown rather than the caption's copy of it. The
copy has been flattened and trimmed to fit Instagram, and saving it back would
truncate the essay, drop its links, and have the truncation translated into the
other language. The caption is composed from the body on the way out instead.

**A reel can go out with no critic at all.** Clearing that box publishes the
technical sheet alone: not every painting has a critic, and one that has none is
still worth showing. The character count says so before the button is pressed,
so a caption half its usual length is a thing seen on the page rather than
afterwards on Instagram. Saving an empty critic over a stored one is still
refused — the two acts stay separate, and publishing without a critic must not
empty the essay on the artwork's own page.

**Neither box is filled with nothing by accident.** A reel made before the
caption was kept in two parts carries only the composed text, and the page drew
two blank boxes for it —
which is what he opened it and found. The backend fills the halves in now, and
the page splits the caption itself if they are still missing, so an old reel, an
old backend or an oddly written document all give him something to edit rather
than nothing. That is about a box the page failed to fill, which is a different
thing from a box he emptied on purpose.

A count sits under the pair, warning rather than blocking: past 2200 characters
the backend trims the essay at a sentence, which is what it has always done, so
nothing is lost by pressing publish.

**An empty queue and a server that did not answer are told apart.** Both leave
the page with nothing on it and only one of them means everything is working;
saying "nothing is waiting" when the request failed is the reassuring answer and
the wrong one.

After publishing or discarding one the list is asked for again, so a reel that
has gone cannot be published twice from a stale page.

**Discard asks twice.** It deletes a video that took minutes of ffmpeg to make
and its button sits beside the one that publishes; the first press arms it and
says "Really discard?", the second does it. Reaching for publish disarms it
rather than counting as the confirmation.
*Proven by:* `publish.component.spec.ts` (23 tests, including "a reel with no
critic" (3 tests — the empty half sent rather than held back, the page saying
the caption will be the sheet alone, and an empty critic still refused a save),
"offers the sheet and the critic separately, to edit", "publishes what he rewrote, not what was
drafted", "updating the critic" (5 tests, including "publishes nothing"), "a reel that arrives without its halves" (3 tests, including "never shows an empty box"),
"warns that a long caption will be trimmed, and still publishes", "keeps each
caption to its own reel", "tells an empty queue apart from a server that did not
answer", "asks again once one has been dealt with", "asks before throwing one
away", "forgets an armed discard when the other button is used"), and backend
B26 and B29

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

### R25 — A side that the lens bent can be described as a curve · met
Four corners describe a painting seen at an angle and nothing more: a lens bows
the long sides, and a stretcher that has taken a bow bows them for real. Each
side carries the two control points of a cubic Bézier, dragged like the corners
and drawn as the curve they make.

A control point moves square to its side and in no other direction. Free in two
dimensions it could also slide *along* the side, which bends nothing: it changes
how fast the side is travelled, so the correction reads faster through one
stretch of the painting and slower through the next, and one part comes out
bigger than it is with its neighbour smaller. Nothing showed it — the outline
still ran through the corners and still looked like the edge of the canvas — and
the certificate was of a distorted painting. A bow is held as two distances from
the chord, so the slide cannot be expressed rather than merely being discouraged,
and the control points follow a corner that moves without being carried.

The bow rides on top of the homography rather than replacing it. A patch fitted
to the four sides interpolates evenly between them and loses the foreshortening
that makes the far edge of a leaning canvas shorter than the near one, so the
perspective stays where it was and each side's departure from its own straight
chord is added to it. Every departure is zero at a corner, which is what keeps
the corners exactly where the correction put them.
*Proven by:* `edge-bows.spec.ts` — straight sides produce byte-identical output
to having no bows at all, the corners do not move, a card photographed through a
bend comes back more than twice as close to the original as ignoring the bend
does, and the curve drawn on screen departs from its chord by exactly what the
warp underneath it applies. `edge-bows.spec.ts` "a bow never moves anything along
the side it bends" (5 tests — every side swept across the whole picture with an
enormous bow, the component along it zero to nine decimal places, and the
component across it not zero). `quad.spec.ts` "a bow can only leave the chord
sideways" (5 tests) and `photo-prep.component.spec.ts` "a handle cannot stretch
the painting along a side" (3 tests — a long drag along a side changes nothing,
the part square to it survives whole, and a bend outlives the corner beside it
being moved)

### R26 — Handles are wide enough to aim with · met
The corner rings are drawn at 46 px, and hold that size on screen however far
the picture is magnified under them. The handle is what the pointer sits on
while the corner underneath it is what has to be judged, so a wide ring is
grabbed anywhere along its edge and the hand stays clear of the point it is
setting. The cross marks the exact pixel.

The width was on a slider from 20 to 110 px, remembered between sessions, and
the artist never touched it: magnifying the picture is what it was standing in
for, and once the ring held its size through that there was nothing left for the
slider to do. A control nobody moves is a control in the way.
*Proven by:* `photo-prep.component.spec.ts` "aiming" and "going in closer"

### R93 — A photograph that arrived on its side can be stood up · met
A button above the stage turns the photograph a quarter turn clockwise, as many
times as it takes. A camera that recorded nothing about which way up it was held
hands over a painting lying on its side, and there is nothing else in the studio
that can put it right.

The pixels themselves are turned, so everything downstream — the warp, the
brush, the fingerprint — goes on working in one set of coordinates. The corners
turn with them and are renamed as they go: the corner that was at the bottom
left is the top left afterwards, which is the corner the straightening squares
to the top left of the certificate. Leaving them would give a certificate of a
sideways painting squeezed into the shape of an upright one. The brushed area
and every change kept with it come round too, since the mask lives in the
straightened rectangle and the painting arrives in it a quarter turn round.
*Proven by:* `quad.spec.ts` "turnClockwise" (4 tests — the whole frame stays the
whole frame, a bent side stays the only bent side, four turns return) and
`selection.spec.ts` "turning a selection with the photograph" (3 tests)

### R94 — The picture can be gone into without taking the page with it · met
The stage magnifies up to four times, and the corner rings keep the size they
had on screen while the picture grows under them — so a ring covers a quarter as
much painting at four times as it does at one. The outline and the rings thin in
step, because a line drawn over the very edge being matched hides the thing that
going in close was for. Zooming the browser was the way round this before, and
it takes every control on the page with it.
*Proven by:* `photo-prep.component.spec.ts` "going in closer" (4 tests — the
bounds, the transform on the stage, the ring drawn at half its width when the
picture is doubled, and no transform at all when the whole photograph is shown)

### R102 — The varnish can be taken off, and the brushwork left on · met
A tick in the studio takes the glints a gloss surface returns off the
photograph: 2,235 of them on one 2006 canvas, covering a third of a per cent of
the picture and making the whole of it read as though it were behind glass. Off
by default, and a tick rather than a slider — a glint taken off by half is a
dimmer glint, not a mended one.

What is measured is the least of the three channels, because what is reflected
is the lamp rather than the paint and white light lifts all three at once. What
it is compared against is the best of four openings, along the horizontal, the
vertical and both diagonals: a stroke, however fine, is long in one direction,
survives the opening that runs along it and registers as nothing, where a glint
is small in every direction and survives none. Against a single square opening
instead, this found a quarter of the picture and took the fine strokes out of a
splash of wine with it.

What goes back is the average of the neighbours that are not themselves glare,
over a mask grown and softened first — mend only the core and the bright rim
stays where it was, which reads worse than the glint did. The size a glint is
looked for at is taken from the photograph, since a speck is the same size on
the canvas and a different number of pixels in every photograph of it.
*Proven by:* `shine.spec.ts` (14 tests — nothing found on a clean painting, a
glint found and mended to the paint around it in the paint's own colour, its rim
covered, a fine stroke left alone in each of the four directions, a broad light
passage left alone, and the rest of the picture untouched to the byte) and
`prepare-photo.spec.ts` "taking the shine off" (4 tests, including that it
happens before the sliders)

### R101 — Measurements that do not match the corners are questioned · met
The studio compares the shape the four corners describe with the shape the typed
height and width describe, and says so when the two disagree by more than six
per cent: how far the painting would be stretched, and what it measures with the
corners where they are — both ways round, since the artist knows which of the
two numbers they measured properly.

A word and never a refusal, and only while "square the picture up to these" is
on; with it off the picture keeps the corners' own shape and there is nothing to
warn about. Six per cent is wide enough to sit out an angled photograph and
narrow enough to catch a measurement that is simply wrong.

It exists because of one: a canvas 23 cm across and 30,7 tall, typed in as
27,33 × 23. The corners were on the canvas and the correction did exactly what
it was asked — it squares the picture to the numbers, so it is the picture that
gives — and the painting came out an eighth too wide with nothing said. The
photograph proves the point: opposite edges of the canvas in it differ by under
1.2%, so the camera was square-on and what it saw is what the painting is.
*Proven by:* `quad.spec.ts` "squaringMismatch" (6 tests, on the measured corners
of that photograph — agreement, an angled photograph tolerated, the eighth
caught, both ways of putting it right, and the same answer whichever way up the
painting stands) and `photo-prep.component.spec.ts` "measurements that do not
match the corners" (5 tests)

### R100 — A waiting certificate can be corrected where it waits · met
Every row on the waiting list opens into the fields the studio asks for — title,
medium, kind of photograph, height, width, unit, year, description — and saves
them against that certificate. Nothing on the list has reached the chain, and
every fault the migration's audit found in the old collection was a typed one,
so a title with a letter wrong is a thing to fix rather than a reason to throw
the certificate away.

Not the photograph, and the page says why rather than leaving it out: what is
stored is the flattened picture, and the corners and the brushwork that shaped
it were never stored anywhere. Changing the measurements is allowed and warned
about in red — the picture was squared up to the old ones and stays that shape,
so this corrects what the certificate says and not the picture. A year the list
does not offer is kept rather than quietly swapped for the first one. A refusal
from the api leaves the form open with what was typed still in it.
*Proven by:* `pending-mint.component.spec.ts` "correcting what a certificate
says" (8 tests — the certificate read into the form, the correction sent against
the right token, a half-written measurement tidied, an empty title refused, the
warning when the measurements change, an unlisted year kept, a refusal leaving
the form open, and cancelling forgetting the draft)

### R99 — The photograph can be taken back off a prepared certificate · met
Every certificate on the waiting list carries the download button the artwork
pages carry, offering the full stored file and the medium size.

A prepared certificate is the one place the photograph exists in full and
cannot be reached: it is in the originals bucket under the token id, the
painting has no page because it is not on the chain, and the list showed a
thumbnail the size of a postage stamp. The original is offered first and the web
copy second, and the file is named for the token as well as the title, since two
certificates can share a title — the studio warns about exactly that.
*Proven by:* `pending-mint.component.spec.ts` (3 tests — the original offered
first with the web copy behind it, the file named for the token, and nothing
offered when nothing is waiting)

### R98 — The sliders stay where they were left · met
Brightness, temperature, whites, darks and colour keep their positions between
photographs and between sessions, so the next picture opens with the correction
already set. A studio is one room with one set of lights: the correction one
photograph needs is very nearly the correction the next one needs, and starting
every picture at nought meant finding the same numbers again each time.

Written down when the artist moves a slider, and when they say the photograph
needed nothing — both are statements about the room. Never written down when
the component zeroes the sliders itself, which it does to keep a change where it
was made; that is bookkeeping, and saving it would throw the settings away the
moment a brush was picked up.
*Proven by:* `photo-prep.component.spec.ts` "the sliders stay where they were
left" (6 tests — written down, still there for the next photograph and for a
fresh page, being told the photograph needed nothing remembered too, the
brush's zeroing not remembered, and nought when nothing was ever stored)

### R96 — The view is moved with the hand, not with the scrollbars · met
Holding the space bar and dragging moves the magnified picture under the
pointer, the distance dragged and the direction dragged — the hand tool every
other program has. Held rather than switched on, because panning happens in the
middle of placing a corner and a mode you have to leave and come back to is a
mode you forget you are in.

The space bar already means something, so it is taken only where it is worth
taking: a photograph on the stage, magnified past one, and the focus not in a
box being typed into, a list, or a checkbox. Buttons and sliders give it up,
which is the one real cost, and Enter still presses a button. Nothing is
brushed and no corner is dragged while the hand has it.
*Proven by:* `photo-prep.component.spec.ts` "moving the view" (7 tests — the key
claimed only when magnified, left alone while typing, released on keyup and on
losing the window, the view moved by exactly the distance dragged, and no mark
left by a brush that is in hand)

### R97 — The two ends of the scale move separately, and the colour with them · met
Whites, darks and colour are three sliders where whites and darks were one.
That one stretched both ends away from mid grey together, and a canvas
photographed against a lit wall generally needs one of them: whites that have
gone grey over blacks that are already black, so moving both was a choice of
which to get wrong.

Which half a pixel belongs to, and how far into it, is read from the pixel's own
brightness — so each slider reaches the end it is named for and leaves the
middle where it is. Splitting hard at mid grey instead would put a crease across
every smooth gradient, which is exactly what a wall behind a canvas is. Colour
is measured from each pixel's own grey, so a hue stays where it is while it
gets stronger or weaker, and something already grey does not pick up a cast.
*Proven by:* `adjustments.spec.ts` "the whites" (3 tests), "the darks" (4 tests,
including that the deep shadow moves further than the half light) and "the
strength of the colour" (4 tests, including that grey stays grey and the
brightness is kept)

### R95 — A certificate that is stored leaves an empty studio · met
Saving or signing a certificate clears the whole page, not only the form: the
chosen file, the photograph on the stage, the corners, the measurements, the
brushwork and the magnification all go, leaving the studio as it opens. The
corrector hears this through the same handoff the form asks for the photograph
on, counted rather than flagged so a second certificate clears it again.
*Proven by:* `studio-handoff.service.spec.ts` (the count, and the held
photograph dropped) and `photo-prep.component.spec.ts` "starting again"

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
Signed in, the last icon in the bar opens the workshop menu, and every address
behind the guard hangs off it: the studio, the reels waiting to be published,
and the way out. One place to add the next private page, and one menu a reader
can be certain does not appear for them. It sits in the same template as the
rest of the menu, so on a narrow screen it travels into the drawer with
everything else.

Signed out, the same icon is the door (R109). It used to appear only on a
browser that had signed in here before — so that signing out could not take
away the way back — and it is now shown to everybody, which leaves no state in
which the way back is hidden. An unmarked door costs nothing: what is behind it
is a Google sign-in, and knowing the address gets nobody through it.

Not translated, alone among the menus: these pages exist at one address rather
than two and are written in one language, so a Spanish label would promise a
Spanish page that is not there.

None of it is a security boundary — the guard on each route decides what is
drawn and the backend decides what happens. This decides only what is offered.
*Proven by:* `top-menu.component.spec.ts` "shows a reader the door and none of
what is behind it", "leaves the door once the session has lapsed", "gathers
the private pages and the way out", "links each of them to its own address",
"signs out from inside it"; `admin-auth.service.spec.ts` (the marker outliving
a sign-out), and the browser probe across both states

### R37 — The artist can see which essays he has been over · met
The catalogue can be narrowed to the artworks whose essay has been corrected by
hand, or to the ones still waiting, with a count of how many are done. An
artwork with no essay at all counts as waiting, which is what it is.

Only the artist sees the control, and it is not merely hidden from everyone
else: the flag comes from a route behind his own account, so a reader who looks
at the network gets nothing to hide. The whole catalogue is answered in one
request rather than one per artwork.
*Proven by:* `art-pieces-list.component.spec.ts` (5 tests, including that a
reader is shown no control), `critics.service.spec.ts` (`editedByArtwork`) in the backend

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

### R63 — Softness is reported, never repaired · met
Parts of the painting that came out soft are named. Blur is told from flat paint
by the ratio of fine detail to coarse: flat paint has neither and is not judged.
Nothing is sharpened — the report says the photograph wants taking again.
*Proven by:* `prepare-photo.spec.ts` "focus" (3 tests)

### R64 — Every correction reports what it did · met
Each of the five passes says whether it acted and why: the lighting, the glare,
the colour temperature, the tones, and the focus. A pass that found nothing
wrong says so rather than staying silent.
*Proven by:* the studio probe, which reads all five lines back

### R65 — The studio has no Spanish twin, and does not 404 · met
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

### R71 — A sketch full screen has nothing over it · met
The button that puts a generative piece full screen is not drawn once it has.
The whole point of the state is that there is nothing on the screen but the
drawing, and a button floating over it was the one thing still in the way.

Nothing is lost by taking it away. The Fullscreen API leaves on Escape by
itself, and the browser says so on the way in; `fullscreenchange` is what
brings the button back, which is the same event Escape causes, so the way in
is there again the moment the sketch stops being full screen.
*Proven by:* `generative-piece.component.spec.ts` "takes the button away once
the sketch is full screen" and "brings it back when the sketch stops being full
screen", and a browser driven in and out of the state twice

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

### R59 — The artist can see what has lately gone to Instagram · met
`/latest` shows the paintings most recently posted, newest first, each linking
to its own page, in the order they actually went out rather than the order the
catalogue is in.

**It was the public landing for the link in the Instagram profile, and is not
any more.** The profile link points at the root of the site instead, by the
artist's decision; this is his page now, behind the same guard as the studio,
out of the sitemap and disallowed to crawlers. What was given up with it is
real and worth writing down: a follower who has just scrolled past a painting
no longer has a route to that painting's page, only to the front of the site.
The account still gets one clickable link and a caption still cannot carry
another.

A failed request is told apart from an empty account: the page says nothing has
been posted only when that is what was answered. Answering a failure the same
way would put a claim that there are no paintings over a page that had twelve.
*Proven by:* `latest.component.spec.ts` (8 tests, including the failed request)

### R104 — A Spanish reader is never sent to an address that does not exist · met
The guard that redirects a language-free address to its Spanish twin builds
`/es` and never `/es/`, which the router reads as the segments `["es", ""]` —
matching no route and drawing the 404 page.

The bare `/` was always handled. `/?utm_source=ig` was not: it became
`/es/?utm_source=ig`, and the reader was shown a 404. This was the whole of the
traffic from Instagram and Facebook, both of which append tracking parameters
to every link they hand out, so the address worked whenever it was typed by
hand and failed for everybody who actually followed it. It was found in Search
Console rather than by anybody using the site.
*Proven by:* `language.guard.spec.ts` (5 tests, including the tracking
parameters and a fragment), each of which fails against the expression it
replaced

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

### R67 — The essay has no heading · met
It is read under the painting's name, which the page gives directly above it,
so a heading of its own was a second title saying the same thing.

What is left on that line is the artist's own note about whether he has been
over the text, and it is drawn only when there is a note to make: a reader is
never sent the flag at all, so for a reader the line does not exist rather than
standing empty above the essay.
*Proven by:* `artwork-critic.component.spec.ts` "shows the essay with no way to
change it", "never says whether an essay has been edited", and
`critics.service.spec.ts` in the backend

### R68 — The catalogue answers the pointer, one tile at a time · met
The tile under the pointer leans towards the corner the pointer is in; every
other tile stays where it is, and the one being left is put back before the
next one leans. It used to measure from the centre of the viewport and write
the answer once on the grid, so all two hundred tiles leaned together — which
reads as the page sliding rather than as an answer to the pointer.

Still one listener however long the grid is: the tile is found from the event
rather than by giving each tile a listener of its own.

The lean and the image's oversize are one number. At `scale(1.1)` there is 5%
of overhang on each side against a 4.5% lean, and moving either alone pulls the
edge of the picture into the frame. The scale is kept as low as the lean allows:
every extra bit of it is another bit of the painting cropped away, on two
hundred of them.
*Proven by:* `parallax-tilt.directive.spec.ts` (7 tests, four of which fail
against the whole-grid version)

### R69 — The landing page moves, and how depends on what is pointing at it · met
Where there is a pointer the painting answers it, leaning towards it as the
catalogue tiles do. Where there is not, it drifts by itself. Never both: a
picture already wandering cannot be seen to lean towards anything.

With a pointer it is drawn at its own size until somebody approaches, so the
page shows the whole work uncropped and only grows enough to have somewhere to
lean once it is being looked at. Measured in a browser, that is 17 to 21 pixels
of movement against the five the drift alone managed — which is the difference
between an effect and one nobody notices.

Either way it is a transform on the image the page was already loading: no
video, no second request, no bytes beyond the painting itself, on the one page
every visitor sees first. A canvas would have cost the prerendered `<img>`,
which is what makes this page readable with javascript off and what a link
preview shows.

Both movements are bounded by their own scale, so the frame is always full of
painting, and the drift returns exactly where it began so the loop has no seam.
Under reduced motion nothing moves and the painting sits whole.
*Proven by:* the lean, the drift, the frame staying covered through both, and
the stillness under reduced motion, all measured in a browser against the built
page

### R70 — A build never asks the reverse image search · met
Nothing the prerender does may reach `/vision/search`, in any circumstance. A
build renders 186 artwork pages and used to ask once for each of them; while
that endpoint re-ran the search when its answer had aged, every build was 186
billed Google calls, and a few days of building came to about ninety euros
before anyone read the meter.

Three things hold it, and any one of them would do:

- `getLinks` returns an empty list when it is not running in a browser, so the
  request is never made from a build at all.
- The answer is kept out of the transfer cache, so an empty build-time answer
  cannot be carried into the browser and stop it asking properly.
- `scripts/verify-render.mjs` fails the build if any prerendered page shows
  that it asked. That is the one that matters: the first two are code anyone
  could undo, and this refuses to publish the result.

The backend not searching on read (B-side) is a fourth, and is deliberately not
relied upon here. "The endpoint is cheap today" is a fact about today; a build
that never takes the path cannot be made expensive by anything that changes at
the other end.

Nothing is lost from the page: the list lives behind a button, in a dialog,
which nothing without javascript can open.
*Proven by:* `scripts/verify-render.mjs` check 7, which was confirmed to fail
against a page carrying the request, and 390 prerendered pages carrying none

### R66 — This document still describes the code · met
`scripts/verify-requirements.mjs` runs in the build and fails it when a
requirement number is used twice, when a requirement says nothing about what
proves it, when a proof names a file that is not in the repository, or when a
proof quotes a test that is in none of the files it names.

It also reports, without failing, the requirements whose only proof is prose —
the ones nothing automated would notice the loss of. That list is meant to be
uncomfortable rather than empty.

The reason it exists: four requirements spent fifteen releases marked "met ·
proven by" three Cypress specs deleted in 1.14.0, and five numbers were used
twice for unrelated things. A changelog is a record of the past and cannot
become false. A requirements document is a claim about the present, and goes
false quietly, one feature at a time, unless something checks it.
*Proven by:* `scripts/verify-requirements.mjs` run against
`scripts/fixtures/requirements-with-every-fault.md`, which contains one of each
fault and must exit 1

---

## Versions

### R19 — Both halves report their version · met
The foot of the home page reads `v1.1.1 · api 1.0.2`, the backend's read live
rather than from build time.
*Proven by:* `GET /version`, and the footer in the deployed page

### R79 — The paintings arrive smallest first, and the original always arrives · met
Each artwork now has four sizes: about 112px carried inside the certificate as a
data uri, ~360px from the api, ~1000px on Arweave, and the full-resolution
original in cloud storage. The artwork page shows the original, as it always has
— the others exist so that something is on screen while it arrives.

The order they are raced in had to change with them. `thumbnailUrl` used to be
Alchemy's cached copy, a middling size, and was ranked above the api's
thumbnail; it is now the two kilobytes inside the token, the smallest image
there is. Left where it was, the page showed the 360px thumbnail and then
visibly got worse. The same move nearly cost more than looks: the reel renderer
and the vision search both take "the source image", which was the cached copy,
and would have been handed 95KB instead of several megabytes.
*Proven by:* `preview-quality.spec.ts` (3 tests) and `artwork.spec.ts` "goes smallest to largest" for the ordering,
and in the api `nft-image.util` puts the original first for anything that
processes a painting rather than displays it.

### R80 — A new painting is described from a fixed vocabulary · met
The studio offers the medium, the unit, the year and the kind of photograph as
choices taken from the 186 certificates already written, and does not ask for
the artist at all. Only the title, the two measurements and an optional
description are typed.

This is not tidiness. An audit of the collection before it moved found two
certificates spelling the artist "Juan Manuel Moreno Sánchez", one with no unit
at all, a title ending in a space and another reading "spash" — every one of
them a typed field. On the new contract a certificate can be frozen, and after
that nothing can correct it.

A measurement typed with a dot becomes a comma as it is typed, because the
collection writes decimals with a comma and one written both ways can never be
sorted or matched cleanly.
A decimal can be typed, which for a while it could not: the trailing comma was
tidied away on the keystroke that made it, so "140,5" became 1405 and every
measurement in the collection could only be a whole number. Tidying now happens
when a measurement is read rather than while it is written, and the corrector's
boxes take the same notation as the form — they were number inputs stepping in
tenths, which refuse a comma outright.
*Proven by:* `mint-vocabulary.spec.ts` (19 tests, including "lets a decimal be
typed at all" and "keeps the comma where it was put, so the next digit lands
after it", both typed one key at a time as a person would; and "offers the artist
under the one spelling the collection uses", "rewrites a dot as a comma rather
than refusing it" and "takes a half-typed decimal as the whole number it
already is")

<!--
  R22, R23, R31, R61 and R62 described the five passes that measured the
  photograph and decided for themselves whether to act — the lighting, the
  glare, the rims, the tonal range and the cast. They were removed in 1.38.0 in
  favour of the three sliders described below, and their code was deleted in
  1.39.2. A requirements document is a claim about the present, so they are gone
  rather than marked unmet.
-->

### R81 — The photograph is corrected by hand, not by guesswork · met
Three sliders — brightness, temperature, range — each sitting at nought on the
photograph as it arrived, so the starting point is the middle of every one
rather than an end of it. A brush selects where they apply; nothing selected
means everywhere, which is the usual case and needs no brushwork at all.

This replaced five checkboxes that each measured the photograph and decided for
themselves whether to act: the lighting, the glare, the rims, the cast and the
tonal range. They were removed rather than improved. Every one was trying to
answer a question it could not — whether a dark corner is a lamp that fell off
or paint that is dark — and the lighting pass said so in its own comment, and
was deliberately kept too weak because of the doubt. On a real photograph its
dark corner needed lifting by about half again and it gave a tenth.

The brush is mapped through the same homography as the pixels, because it is
used on the photograph while the adjustment lands on the straightened rectangle:
a mask in the photograph's own coordinates would sit crooked on the result, and
worst at the corners, which is where a brush is most often wanted.

It erases as well as selects, as a named tool rather than a held key: pulling an
edge back is most of what selecting an area is, and it was reachable only on
shift, which is to say by nobody. Shift still reverses whichever tool is in hand,
and the ring under the pointer goes dashed while erasing, so which way the next
stroke goes is readable without looking away from the photograph.

The finest brush is one percent of the long side, and no brush can paint nothing.
The mask is 128 cells across however large the photograph is, so a fine enough
dab can fall between four cell centres, reach none of them and report nothing
wrong — which looks exactly like a brush that is broken.
Each change is kept where it was made. The sliders describe one change to
whatever is selected now, and that alone meant a correction followed the brush:
brightening one corner and then selecting another carried the brightening across
and left the first as it was. A change is committed the moment the selection is
about to differ — at the start of a stroke, never during one, so extending a
selection in a single movement goes on refining the same change — and the
sliders start again from nothing. The preview shows them stacked, as the saved
file will.
*Proven by:* `prepare-photo.spec.ts` — "keeps an earlier change where it was
made when a later one is made elsewhere", which lifts opposite corners in turn
and finds both lifted; it fails when the changes are collapsed back into one.
Also `adjustments.spec.ts` (13 tests, including "keeps the colour while
changing the light", "leaves green alone, so a warm shift does not become a
tint", and "fades the adjustment out with the brush, rather than ending it at a
line"); `selection.spec.ts` (9 tests, including "takes a selection back rather
than making it start again" and "paints something however fine the brush is",
which fails without the floor); and `photo-prep.component.spec.ts` — "takes the
same area back again with the erasing brush"

### R82 — A corrected photograph reaches the certificate without a round trip · met
The corrector hands the finished JPEG and the size it was corrected at straight
to the form below it. The only way across used to be downloading the file and
choosing it again from disk — the same bytes out of the browser and back in —
and retyping the height and width that the straightening had already been given,
which is one more chance to type them differently.

Downloading is still offered beside it, since a photograph is often wanted for
something other than a certificate.
*Proven by:* `studio-handoff.service.ts` and its use in both halves; the size
travels in the notation the collection writes, comma and all, so the form
receives what it expects rather than something it has to correct.

### R83 — A certificate is never written while gas is expensive · met
The price of gas is read every fifteen seconds and shown beside the button that
would spend it. Above 0.7 gwei the button says **Too expensive!** and refuses,
and so does the night's work, which checks again before each certificate rather
than once at the start — gas rose ninefold in the middle of the original
migration, which is exactly the case a single check at the start cannot catch.

The button also refuses before the first price has arrived: not knowing the
price is not the same as the price being low.
*Proven by:* `mint-gate.component.spec.ts` (9 tests, including "says so plainly
and refuses when gas is dear", "refuses at anything above the limit, not merely
far above it", "allows exactly the limit" and "refuses before the first price has
arrived"). The night's work enforces the same number in the backend, as B34
there.

### R84 — A certificate can wait for a cheap morning · met
Preparing and writing are separate. **Save for later** stores the prepared
certificate, images and all, and the last step of every cron run writes whatever
is waiting while gas is cheap. `/pendingmint` is the same list by hand, behind
the admin guard: what is waiting, the live price, one button to write them, and
a way to discard one that was a mistake.

A certificate leaves the list only once its transaction has landed. Removed any
earlier it would be gone from both places at once.
*Proven by:* `pending-mint.component.ts`, reached only through `adminOnly` in
`app-routing.module.ts` and, like the studio, listed in `app.routes.server.ts` as
client-rendered so no copy of it is ever written into the published site. The
waiting and the writing are the backend's B34.

### R85 — A dependency cannot arrive unwatched · met
Two rules, both enforced by pnpm on every install rather than only when
resolving. A version must have been on the registry thirty days before it can be
installed here, which is the window in which a compromised release is normally
noticed and pulled; and a dependency may not run install or postinstall scripts,
which is how a compromised package usually does its damage.

Neither is silent. pnpm names every package it holds back and every script it
refuses, and fails the install rather than continuing — so a refusal is
something read, not something missed. `esbuild` is the one exception, because
Angular's bundler is a binary it downloads; the packages deliberately refused
are listed alongside it with their reasons.

The versions already installed when the rule came in are carried over at their
exact versions rather than by name, so each exemption ends the moment that
package is updated.
*Proven by:* `pnpm-workspace.yaml`, and the deploy workflow, which installs with
`--frozen-lockfile` — the policy is checked there too, so a lockfile that
bypassed it locally fails in CI.

### R86 — The artist signs his own certificates, from his own phone · met
The contract's minter is his own wallet, so he is the one who can add a
certificate — and a wallet app's browser puts that wallet on the page. Opened
there, the waiting list offers **Sign** on each certificate: the api assembles
what it will say and encodes the call, the wallet signs it as him, and no
minting key exists anywhere for anyone to steal.

Nothing is built in the browser. The bytes arrive already encoded, because what
a certificate says is decided in one place, and the page's only jobs are to ask
which wallet is signing and to hand the bytes over.

The chain is checked before a signature is asked for. A wallet pointed at
another network would sign something meaningless and report success, and the
certificate would look written when nothing had happened. The list is shortened
only once the chain has been asked whether the token is really there.
*Proven by:* `wallet.service.spec.ts` (7 tests, including "refuses to go on when
the wallet will not leave the wrong chain", "sends exactly what it was given, and
builds nothing itself" and "says where to find a wallet rather than failing
silently"). The transaction itself is the backend's B39.

### R87 — A photograph is written back the way it arrived · met
Straightening moves every pixel, so the picture has to be encoded again and one
generation of loss cannot be avoided. How large that generation is, and how
large the file is, are decided from the chosen file's own header rather than by
a constant: both the quality it was written at and whether it kept every pixel's
colour are read out of it.

The browser makes the choice sharper than it looks. Measured in Chrome,
`canvas.toBlob` writes 4:2:0 — half the colour detail in each direction — at
every quality up to 0.99, and 4:4:4 only from 0.995. There is nothing in
between. So a photograph that arrived in full colour can only keep it at the top
of the scale, and is larger than the original as a result: maximum quality
records the grain and the original's own compression faithfully, and neither is
extra detail. One whose colour was already halved has nothing left to protect
and comes back at the quality it came in at, about the size it was.

The page says what it read, because a file larger than the one chosen is
otherwise unexplained.
*Proven by:* `jpeg-source.spec.ts` (9 tests, read from real encoder output
rather than hand-written bytes, including "recovers a high quality closely,
which is the range that matters", "tells a full-colour file from one that halved
its colour" and "does not inflate one whose colour was already halved").

### R88 — A photograph of part of a painting is not stretched to the whole · met
Straightening squares the four corners up to the painting's own proportions,
which is right for a photograph of a whole canvas and wrong for a detail or a
canvas caught half-finished: there the measurements describe the work and the
photograph shows part of it, so squaring one to the other stretches what is
there.

A switch beside the measurements, on by default, because most photographs are of
a whole canvas and the exception should be asked for rather than assumed. It is
not remembered between photographs — a stretched painting is easy to leave
switched on and hard to notice afterwards. The measurements still go on the
certificate either way; only the geometry changes.

The switch reaches the brush as well as the pixels. Both are measured in the
straightened rectangle, and a mask built to one shape while the picture was
built to another would put every selection in the wrong place.
*Proven by:* `quad.spec.ts` — "keeps the shape the corners describe when not",
"squares up by default, since most photographs are of a whole canvas" and "still
straightens when it is not reshaping"; and through the whole pipeline in
`prepare-photo.spec.ts` — "does not stretch the picture to the measurements when
told not to".

### R89 — The studio asks for each thing once, and acts once · met
Correcting a photograph and describing a certificate are one job, and were laid
out as two pages that each asked for the same things: the painting's height,
width and unit in both, a file input in both, the artist's name in both. The
handoff copied them across, so a field was filled in, scrolled past, and met
again. The certificate now shows what the corrector already knows rather than
asking for it.

There is one action where there were three rows. Rendering the painting at full
size is the expensive part, and it used to be asked for by a button of its own
before anything could be saved; it now happens when saving or signing needs the
result. Downloading the JPEG stays as a quiet link, since that is the one thing
a person might want without minting anything.

On a screen with room, the photograph sits beside the controls and stays put as
they scroll. Stacked, every slider was below the thing it moved.
*Proven by:* `studio-handoff.service.spec.ts` (6 tests, including "answers an
ask that cannot be met, rather than leaving it waiting" and "answers every ask,
not just the first"), which is the contract that lets the form offer its buttons
before anything has been rendered.

### R90 — A title that would collide is mentioned before it is written · met
Titles carry meaning here: certificates sharing one are the same painting
photographed more than once, and the site groups them on that basis — twenty-four
of the first hundred and eighty-six are grouped that way. So a repeated title
joins that painting's group, which is right for another view of it and wrong for
a different painting; and a title one letter out splits a painting from its own
other photographs, silently.

Both are said before the certificate is prepared, with links to what was found,
and neither stops anything: the first is often exactly what was meant. Compared
the way a person reads a title — case, accents and punctuation are ways of
writing one name, not different names.
*Proven by:* `title-check.spec.ts` (8 tests, including "finds the painting a
repeated title would join", "catches the near miss, which is the dangerous one"
and "reads accents, case and punctuation as ways of writing one name").

### R91 — A photograph already certified is mentioned before it is certified again · met
It has happened: a certificate was prepared, an error wrongly said nothing had
been stored, and the same painting was prepared a second time. The collection
can say so, because every certificate carries its own thumbnail inside the token
— all 186 of them arrive with the catalogue, 364 KB the site downloads anyway.
Nothing is uploaded and no service is called.

Each picture is reduced to sixty-four bits: shrunk to nine by eight and each
cell compared with the one to its right, so what is kept is the arrangement of
light and dark and not the values. That survives a change of size, of
compression and of overall brightness — which it must, since a full-size
corrected photograph is compared against a two-kilobyte thumbnail.

Measured on this collection: the same photograph as an on-chain thumbnail and as
its web copy, fifty times the area, differs by 2 to 7 bits; across all 17,156
pairs of different paintings the closest is 14. Ten is the line, and it flagged
nothing it should not have. It catches the same photograph twice rather than
another view of the same painting, which is allowed and is what the title check
is for.
*Proven by:* `fingerprint.spec.ts` (7 tests, including "is unmoved by size,
which is why a thumbnail can stand for the original" and "is unmoved by the
whole picture being lighter or darker") and `image-match.service.spec.ts`
(5 tests, including "says nothing before it has read the collection").

### R92 — A raw file can be corrected without leaving the studio · met
A browser cannot develop a raw: demosaicing a sensor's own readings needs the
camera's colour profile and a great deal of arithmetic, and none of it is built
in. What every raw does carry is the JPEG the camera made at the moment of the
shot — the picture on its back screen — and on the artist's own NEF that is the
whole frame at full resolution, 6016 × 4000, in 3 MB of a 21 MB file.

It is found by scanning for the markers a JPEG opens and closes with, rather
than by walking the file's directories: raw formats are TIFF containers whose
layout differs by maker and by model, and a parser written for one is a parser
that fails on the next camera bought. Inside a JPEG's compressed data an FF is
always written as FF 00, so those markers cannot occur there by accident. The
largest of the embedded JPEGs is the full-size one; the smaller are for the
camera's own menus.

The result is written back at the top of the scale. A raw has no quality of its
own to match — the number would belong to the JPEG embedded in it, not to the
sensor.
*Proven by:* `raw-preview.spec.ts` (5 tests, against a file built to the shape
of a NEF), and measured end to end in Chrome on a real 21.4 MB NEF: three
embedded JPEGs, the largest decoding to 6016 × 4000, found in 32 ms.

