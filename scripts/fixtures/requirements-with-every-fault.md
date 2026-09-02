# A document with one of each fault

Used to check that the checker still fails. Every problem it can report is
below exactly once, so `node scripts/verify-requirements.mjs
scripts/fixtures/requirements-with-every-fault.md` should list four and exit 1.

### R1 — A number used twice · met
The same id appears again below.
*Proven by:* `verify-requirements.mjs`

### R1 — The second one with that number · met
*Proven by:* `verify-requirements.mjs`

### R2 — A proof naming a file that is gone · met
*Proven by:* `a-spec-that-was-deleted.spec.ts`

### R3 — A proof quoting a test that is not there · met
*Proven by:* `verify-requirements.mjs` "a test nobody ever wrote"

### R4 — A requirement that says nothing about what proves it · met
Nothing follows.
