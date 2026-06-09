# Loop Contract

## Source Spec

`.loopify/loops/001-tiny-events/source.md`

## Objective

Build Tiny Events Board until automated UI checks and build checks pass.

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

## Allowed Changes

- App source files.
- Test files only if the spec changes.
- Loop trace and final report.

## Authority Boundaries

- No external services.
- No backend or authentication.

## Loop Procedure

Run checks, patch the smallest useful failure, update trace, rerun.

## Stop Conditions

Stop on passing build and Playwright checks plus visual review.

## Blocked Conditions

Stop blocked if browser dependencies are unavailable and cannot be installed in
the disposable environment.

## Trace Requirements

Record each check, failure, patch, and stop reason.

## Final Report Requirements

Report passing commands and remaining caveats.
