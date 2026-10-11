# Direction

Where this project has gone, and why — including the parts that were built and
then taken away.

The other two documents here answer different questions. `CHANGELOG.md` says
what changed, one line per push, 203 releases deep; it is a record of the past
and cannot become false. `REQUIREMENTS.md` says what is true now, and a script
checks it still is. Neither says what the project is _becoming_, because
neither is readable as a shape: a direction is visible across twenty releases
and invisible within any one of them.

This file is for that. It is **append-only**, like the changelog and for the
same reason — an entry records a decision at the moment it was taken, and a
decision that was later reversed is not an error to be corrected but the most
interesting thing in here.

Write an entry when the _direction_ changes, not when a feature ships. Most
releases need nothing.

---

## The arc so far

Read backwards from today, three things have happened repeatedly, and they are
the same thing three times: **work moving from automatic to deliberate, and
from somebody else's machine to his own.**

### Automation, walked back on purpose

The project began by automating the week's work and has spent much of its life
deciding which parts should not have been.

- **1.38.0** — the five automatic photograph corrections are gone. Each
  measured the painting and acted on it; together they were a guess applied
  without being looked at.
- **1.73.0** — the section listing decisions and what each cost, removed at
  his request.
- **1.99.0** — saving a generative piece stopped publishing it. `/generative/<id>`
  had resolved any id by existing, so every save put a page on the public site
  that nobody had chosen to put there. Registering became a line added by hand.
- **3.0.0 (backend), 2.14.0 (site)** — the reel stopped being rendered nightly
  from a photograph and became a clip filmed by hand in the atelier. The cron
  job, the shot planner, the focus finder and ffmpeg went with it: about 3,200
  lines.

The pattern is not a retreat from automation in general — the catalogue, the
essays and the posts are still automatic. It is that **anything producing work
that goes out under his name has moved behind a press**, and the things that
merely maintain the site have not.

### Off other people's machines

- **1.36.0** — the catalogue stopped being a list and became the certificates
  on Ethereum, which carry the record themselves.
- **1.92.0** — the atelier arrives: a guarded page that cuts a painting into
  parallax layers, with the models running on his own computer.
- **2.0.0** — **the atelier is removed entirely.** Page, route, cost display
  and the spending row on the activity page.
- **2.7.0 – 2.12.0** — it comes back, rebuilt: brush, progress and
  cancellation, depth parallax, saving to the bucket, generated code, and
  video. Every model Apache 2.0 or MIT, every one chosen to fit 8 GB.

That removal and return is the single most informative event in the history.
The first atelier called out to a service; the second runs locally and the
licence of every model was checked before it was chosen. The feature did not
change. Where it ran did.

### Things that were tried and are gone

Kept here because a changelog buries them and because knowing what was
abandoned is most of what "direction" means.

- **Threads** (removed 1.105.0) — the tester invite could not be completed.
- **Rockets win** (1.102.0) — and everything that existed only for it.
- **Ordering reels by average watch time** (1.109.0).
- **The local region-grow mask path** (1.110.0).
- **Wind direction**, a generative piece (unpublished long before 2.11.2,
  deleted then, with 220 KB of layers that had been shipping unreachable).
- **The handle-size slider** (1.56.0), the corner-size and straighten controls
  (1.38.2).

---

## Where that points

Stated as a reading of the above, not as a plan, and to be argued with:

1. **The next thing to move onto his own machine is whatever still calls out.**
   Four services still reach a paid API: the critic essays, the artwork
   descriptions, the CV prose, and the reverse image search. The first three
   are text, and the atelier now runs a coder model locally — which makes the
   question "why not these too?" rather than "could we?".
2. **Anything new that produces public work should arrive behind a press**,
   not on a schedule. The reel took two years to learn this; a new feature
   should start there.
3. **The atelier is the centre of gravity now.** It went from removed to the
   largest part of the product in six releases, and the last four features
   have all been inside it.
4. **Open weights are a constraint, not a preference.** Three models were
   rejected on licence alone — one of them, Qwen2.5-Coder-3B, the convenient
   middle size. Paintings are sold from this site and anything a model makes
   appears beside something for sale.

---

## Entries

Newest first. One per direction change.

### 2026-10-11 — Reels move from the server to the studio

The backend stopped rendering video. A reel had been made every other night
from a still photograph, with a planned arc of Ken Burns shots; it is now a
clip filmed in the atelier from a painting and a sentence, kept, and turned
into a reel by hand. Published only after he has watched it.

_Why:_ the rendered reels were getting little traction and were made out of a
photograph rather than out of the work. Also 3,200 lines and the heaviest
thing the service did, against a 2 GiB instance.

_What it cost:_ six requirements describing behaviour that no longer exists.

### 2026-10-11 — Generated assets stop being public

The atelier bucket granted read to `allUsers` and was listable by anybody. The
service had been carefully written never to store a url, which achieved
nothing on its own. Closed, with public access prevention enforced; a waiting
reel now becomes public only at the moment of publishing.

_Why:_ found by checking rather than by reasoning, while adding a save button.

### 2026-10-10 — The atelier becomes the product's centre

Workflow C lands and with it the model stops being a tool that edits a
painting and becomes one that writes and films. Code generated by a model runs
in a frame at an opaque origin with no network, because the alternative —
reading it — does not scale.

### 2026 — The atelier returns, local

Rebuilt after its removal in 2.0.0, with every model running on an 8 GB
laptop card and every licence checked. See the arc above.

### 2.0.0 — The atelier is removed

Page, route, cost display, spending row. The version number says how large a
change it was thought to be.
