# Loop Contract

## Source Spec

`source.md`

## Objective

Build Tiny Events Board until automated UI checks and visual review are ready.

## Requirements

- Show event list.
- Filter by category.
- Save favorite events.
- Support 390px viewport.

## Non-Goals

- No backend.
- No authentication.

## Requirement Evidence Map

| Requirement | Evidence Class | Evidence |
| --- | --- | --- |
| Event list | automated | Playwright visible list assertion |
| Category filter | automated | Playwright filter interaction |
| Favorites | automated | Playwright save interaction |
| Mobile viewport | automated + visual | Playwright overflow check and screenshot review |

## Automated Checks

- `npm run build`
- `npx playwright test`

## Manual / Visual Review Items

- Visual polish and spacing.
- Screenshot review at desktop and 390px.

## Allowed Changes

- App source files.
- Test files for covered requirements.
- This loop directory.

## Authority Boundaries

- No external services.
- No production publish.

## Loop Procedure

Run the quality gate, inspect failures, patch the smallest useful cause, update
`trace.md`, and rerun.

## Stop Conditions

Stop with `success` when build and Playwright checks pass and visual review is
recorded.

## Blocked Conditions

Stop `blocked` if browser dependencies are unavailable or the same failure
signature repeats after three distinct hypotheses.

## Trace Requirements

Record each command, result, failure, patch, rationale, and next check in
`trace.md`.

## Final Report Requirements

Write `final-report.md` with stop reason, passing commands, evidence, residual
risk, and follow-up loops.
