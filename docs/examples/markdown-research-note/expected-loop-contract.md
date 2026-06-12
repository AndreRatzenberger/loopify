# Loop Contract

## Source Spec

`docs/examples/markdown-research-note/spec.md`

## Objective

Improve the note until claims are source-backed and uncertainty is explicit.

## Requirements

- Add sources for factual claims.
- Label unsupported speculation.
- Include summary, open questions, and source list.

## Non-Goals

- No invented citations.

## Requirement Evidence Map

| Requirement | Evidence Class | Evidence |
| --- | --- | --- |
| Factual claims sourced | manual + automated | Link scan plus human source audit |
| Speculation labeled | manual | Review note language |
| Required sections | automated | Heading check |

## Automated Checks

- Heading checker.
- Link presence checker.

## Manual / Visual Review Items

- Source quality.
- Whether claims are fairly represented.

## Allowed Changes

- Target markdown note and source list.

## Authority Boundaries

- Do not fabricate source content.

## Loop Procedure

Audit claims, add or remove claims, run checks, update trace.

## Stop Conditions

Stop when required sections exist and source audit passes.

## Blocked Conditions

Stop blocked if a critical claim cannot be sourced.

## Verification

- Verifier: independent reviewer in a fresh context (different model preferred)
- Independence level: fresh-context
- Verifier inputs: loop-contract.md, trace.md, the diff, quality gate output
- Verifier authority: read everything in scope, re-run checks; writes ONLY verdict.md
- Verdict location: ./verdict.md
- Minimum independence for this loop: fresh-context

## Trace Requirements

Record claim changes and source decisions.

## Final Report Requirements

Report changed claims, sources added, and unresolved uncertainty.
