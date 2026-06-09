# Loop Contract

A Loop Contract turns a spec into an executable feedback loop.

In a runnable repo, the preferred path is
`.loopify/loops/NNN-slug/loop-contract.md`. Standalone contracts can still live
elsewhere when the user only wants a spec compiled.

The contract answers seven questions:

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

Do not convert taste words into fake automation. If "polished" matters, encode
the concrete checks that can be automated and leave the remaining judgment as a
manual or visual review item.

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

Blocked rules should be concrete enough to prevent endless patching:

- same failure signature repeats after N distinct hypotheses
- required credentials or external services are unavailable
- dependency installation is impossible in the current environment
- spec contradiction prevents choosing a safe implementation
- authority boundary forbids the next required action

## Example Evidence Map

| Requirement | Evidence Class | Evidence |
| --- | --- | --- |
| App builds | automated | `npm run build` |
| Search filters results | automated | Playwright interaction test |
| Layout feels balanced | visual + manual | screenshot review at desktop and mobile |
| Privacy policy is acceptable | manual | human legal/product review |
| Social login | out-of-scope | explicitly excluded from this loop |
