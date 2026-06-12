# Loop Contract

A Loop Contract turns a spec into a feedback loop reality can grade.

In a runnable repo, the preferred path is
`.loopify/loops/NNN-slug/loop-contract.md`. Standalone contracts can still live
elsewhere when the user only wants a spec compiled.

The contract answers seven questions the prompt usually dodges:

- Goal: what output or state counts?
- Evidence: how will the loop know the work improved?
- State: what changes between attempts?
- Authority: what may the loop read, write, call, spend, or publish?
- Budget: how many turns, retries, minutes, or dollars are allowed?
- Stop: what ends success, blocked, escalation, or budget exhaustion?
- Trace: what evidence is preserved for review?

## Required Sections

```md
# Loop Contract

## Source Spec
## Objective
## Requirements
## Non-Goals
## Requirement Evidence Map
## Automated Checks
## Manual / Visual Review Items
## Allowed Changes
## Authority Boundaries
## Loop Procedure
## Stop Conditions
## Blocked Conditions
## Verification
## Trace Requirements
## Final Report Requirements
```

## Evidence Classes

- `automated`: command, test, script, lint, build, schema check, or other
  machine-verifiable assertion.
- `visual`: screenshot or rendered UI review.
- `manual`: human judgment, source-quality review, taste, or acceptance.
- `ambiguous`: needs clarification or narrowing before honest checking.
- `out-of-scope`: explicitly not pursued by this loop.

Do not convert taste words into fake automation. If "polished" matters, write
the checks a machine can run and leave taste where it belongs: visual or manual
review.

## Stop Rules

Every loop should stop with exactly one stop reason:

- `success`: required automated checks pass and manual/visual gates are
  satisfied or explicitly queued for review.
- `blocked`: the same blocker repeats according to the contract, or a required
  external dependency/input is unavailable.
- `escalated`: risk, ambiguity, authority boundary, or spec contradiction needs
  a human decision.
- `budget-exhausted`: the time, turn, cost, or retry budget is reached.

## Blocked Rules

Blocked rules should be concrete enough to stop the agent from chewing the same
wire forever:

- same failure signature repeats after N distinct hypotheses
- required credentials or external services are unavailable
- dependency installation is impossible in the current environment
- spec contradiction prevents choosing a safe implementation
- authority boundary forbids the next required action

## Verification Section

The contract names who is allowed to grade `success` — and it is never the
maker. The independence ladder, strongest first: **cross-model** (different
model, different harness), **fresh-context** (same model, new context window,
harness-enforced read-only where possible), **human**. The verifier re-runs
the checks, grades every evidence-map row, and writes `verdict.md` — the one
file the maker's Allowed Changes always denies. `success` without an
approving verdict is an illegal stop claim (`check-stop-reason.mjs` exits 1).
Same finding rejected twice → `escalated`; no verifier available →
`escalated` (`cannot-verify`).

What the check proves, and what it does not: `check-stop-reason.mjs` confirms
that an approving `verdict.md` exists, names a verifier distinct from the maker,
and that the gate re-runs green. It cannot prove *who authored* the verdict — a
static check of a text file never can. The real guarantee has two parts: the
automated evidence in a verdict is **reproducible** (anyone can re-run the gate
on any machine, and a forged result dies the moment they do), and the judgment
evidence (frame review, manual items) requires a **named independent judge**
each time. The checker is a tripwire against sloppy self-certification;
reproduction and an independent judge are the teeth.

## Example Evidence Map

| Requirement | Evidence Class | Evidence |
| --- | --- | --- |
| App builds | automated | `npm run build` |
| Search filters results | automated | Playwright interaction test |
| Layout feels balanced | visual + manual | screenshot review at desktop and mobile |
| Privacy policy is acceptable | manual | human legal/product review |
| Social login | out-of-scope | explicitly excluded from this loop |
