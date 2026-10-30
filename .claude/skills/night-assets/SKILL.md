---
name: night-assets
description: Runs the overnight cut of the catalogue — the atelier engine cuts each painting into its separate subjects and each one is kept as its own asset. Use when asked to run the night, start the nightly asset run, cut the catalogue overnight, or when woken by the scheduled 1am task. Also use to check what last night did, or to work out why a night kept nothing.
---

# The night that cuts the catalogue

Each painting in the catalogue is cut into the separate things in it, and each
of those is kept as its own asset, so that months later there is a library of
parts rather than a hundred and ninety-two flat pictures.

**You are the wrapper, not the worker.** The loop is
`scripts/night/cut-the-catalogue.mjs` and it is deterministic on purpose: there
is no judgement in it that a model needs to make, so paying for seven hours of
agent to press buttons would be waste. Your job is to see that the conditions
are right before it starts, read what it says when it stops, and leave one
honest paragraph for the morning.

## What has to be true before it starts

Check these in order and stop at the first one that fails. Each has one
sentence to say and one thing for him to do, which goes in the report.

1. **The engine is running.** `curl -s -m 8 http://127.0.0.1:7860/health`
   must answer `"ok":true`. Nothing else works without it, and it is the
   failure that costs a whole night. If it is not up, say so and stop — a page
   cannot launch a program, and nor can you.
2. **The card is free.** The same answer carries `working` and `resident`. If
   something is already running on it, stop: two things on an eight-gigabyte
   card is how a run dies four hours in.
3. **`gcloud` is signed in.** `gcloud auth print-identity-token` must answer
   with a token. That is the night's whole credential: it posts to the backend
   as him, and the guard there accepts the Cloud SDK as well as the site. The
   runner asks for it before it cuts anything, so a missing one costs a minute
   rather than a night — but check it anyway, because it is the only thing
   between a working engine and a shelf nothing can be written to.

   Never print the token, write it to a file, or put it in a report. If it is
   missing, the command is his to run: `gcloud auth login`.

   **There is no browser in this and no Chrome profile to check.** There was,
   and it could not work: Google refuses its sign-in screens to a browser
   something is driving. Do not propose going back to it.

## Running it

```
node scripts/night/cut-the-catalogue.mjs --until 08:00
```

It stops itself at the deadline, between paintings, and writes its report.

- `--limit 10` — ten paintings through **each** pass, not ten in all. A good
  first or cautious night.
- `--dry` — cut and judge, keep nothing, open no browser. The way to see what
  the thresholds would do before they do it.
- `--describe-only` — the vision pass alone. It needs no credential at all, so
  it is what to run on a night when the credential is the problem.
- `--cut-only` — skip straight to cutting what has already been described.

Run it in the background and wait to be told it finished. Do not poll it: a
describe is tens of seconds and a cut is minutes, and watching costs more than
it tells you.

## What it decides, so you do not

- **What to cut** comes from the local vision model looking at each painting,
  not from a word list. Grounding DINO does not answer *is this thing in the
  painting* — asked for a unicorn on a canvas with none it returns the arms at
  0.395 against 0.418 for a girl who is really there. A fixed vocabulary run
  over the catalogue would therefore cut something for every word in it.
- **What to keep** is decided by arithmetic in `judge.mjs`: a mask covering
  more than 85% of the canvas is the painting rather than a thing in it, one
  under half a percent is a speck, and SAM's own confidence under 0.7 means the
  box held two things. Nothing looks at these cuts. That is his decision, taken
  knowingly; do not quietly add an eye to it, and do not raise the bars because
  a night kept something ugly. A bad asset comes off the shelf with Forget.
- **One cut with two names is refused as a copy.** A cut sitting in nearly the
  same box at nearly the same size as one already kept for that painting is the
  same picture: asked for a woman, a man and a kiss on a canvas holding an
  embrace, the same mask came back three times, all three plausible. This is the
  one failure arithmetic catches that an eye would have, and it is why the
  engine reports each mask's own bounds.
- **What is already done** is in `atelier-engine/local/night.json`. It records
  refusals as well as keeps, which is what lets the catalogue ever finish: a
  ledger of successes alone leaves every painting with one bad subject at the
  front of the queue for ever.

## The report

Write the night's own report (`atelier-engine/local/night-report.md`) into your
answer, and then the one thing it does not say: whether this night was normal.
Compare the keeps against the cuts refused. A night that refused most of what
it cut is not a night that worked, and the likely causes in order are a cold
card falling back to a worse copy of the painting, a vision model naming
actions and effects rather than objects, and a painting whose subjects really
are not separable.

A night that *cut* and kept nothing is a different fault and almost always the
credential: every painting in the report will say the shelf answered 401 or
403.

Say plainly if nothing was kept, and why. Never report a night as done on the
strength of the script exiting.

## What you must not do

- **Do not raise the thresholds, change the prompt, or edit the ledger** to
  make a night look better. Report what happened.
- **Do not touch the credential.** It comes from `gcloud`, lasts an hour, and
  the runner asks for a fresh one when it needs it. Never read it out, print
  it, write it to a file, or pass it to anything else.
- **Do not keep anything by hand** to make up a shortfall. Keeping is the only
  route by which anything leaves this machine and it is never taken unasked.
- **Do not start a second run** while one is going. One card, one engine.

## Setting up the 1am task

Windows Task Scheduler, not `/schedule` — a scheduled cloud agent cannot reach
this laptop's engine or its card.

Import the task once:

```
schtasks /create /xml scripts/night/night-assets.xml /tn "Night assets"
```

It is set to wake the machine at 01:00 and to be killed at 08:00 if it has not
stopped itself. **Waking works from sleep, not from a machine that is shut
down or hibernating**, so the laptop has to sleep rather than switch off.

To check or change it afterwards: `taskschd.msc`, under Task Scheduler Library.
