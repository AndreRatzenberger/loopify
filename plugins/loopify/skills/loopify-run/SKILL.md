---
name: loopify-run
description: "Use when executing an existing Loop Contract by running checks, observing failures, patching, rerunning, updating the trace, and stopping only with evidence."
---

# loopify-run

Execute a loop from an existing loop directory or Loop Contract.

## When To Use

- The repo already has a `.loopify/loops/NNN-slug/` directory, Loop Contract,
  or quality gate.
- The user asks to run until checks pass.
- A goal should proceed by evidence rather than prose confidence.

## Do Not Use

- Do not run outside the contract's authority boundaries.
- Do not keep patching after the blocked rule is met.
- Do not claim success without running the required checks.
- Do not write `verdict.md` — the maker never grades its own homework.

## Workflow

1. Locate the loop directory, or accept a named Loop Contract path.
2. Read `loop-contract.md`.
3. Confirm allowed paths, denied paths, budgets, and stop rules.
4. Run the loop directory `quality-gate.sh` or specified checks.
5. Inspect the exact failure.
6. Patch the smallest useful cause.
7. Update `trace.md`.
8. Rerun checks.
9. Repeat according to `references/loop-execution-protocol.md`.
10. When checks pass and manual items are queued, request verification per the
    contract's `## Verification` section: hand contract, trace, diff, and gate
    output to an independent verifier (different model, fresh sub-agent, or
    human — see loopify-review verifier mode). Never write `verdict.md`
    yourself.
11. On reject: append the findings to `trace.md` as observed failures and
    continue within budget. If the verifier rejects the same finding twice,
    stop `escalated`. On cannot-verify: stop `escalated`.
12. Write `final-report.md` with `Maker:` identity and a `Verdict:` link.
13. Stop with `success` (requires an approving verdict), `blocked`,
    `escalated`, or `budget-exhausted`, and validate the claim:
    `node <plugin>/skills/loopify-run/scripts/check-stop-reason.mjs <loop-folder> <reason>`

## Output

Updated artifacts, updated loop-directory trace, and a final report using
`templates/run-final-report.md`.

Preferred loop path: `.loopify/loops/NNN-slug/`. Legacy direct contract paths
are supported when the user names one.

## Validation

- The final report names the stop reason.
- The trace records checks, failures, patches, and rationale.
- Passing checks are scoped to what they prove.
- `.loopify/index.md` is updated when the loop status changes.
- `check-stop-reason.mjs` exits 0 for the claimed stop reason.
- `success` claims carry an approving `verdict.md` whose verifier differs from
  the final report's `Maker:`.

## Example

```text
Use loopify-run on .loopify/loops/001-papertrail/. Stop only when quality-gate.sh passes or the blocked rule is met.
```
