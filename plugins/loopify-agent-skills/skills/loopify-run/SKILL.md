---
name: loopify-run
description: "Use when executing an existing Loop Contract by running checks, observing failures, patching, rerunning, updating the trace, and stopping only with evidence."
---

# loopify-run

Execute a loop from an existing Loop Contract.

## When To Use

- The repo already has a Loop Contract or quality gate.
- The user asks to run until checks pass.
- A goal should proceed by evidence rather than prose confidence.

## Do Not Use

- Do not run outside the contract's authority boundaries.
- Do not keep patching after the blocked rule is met.
- Do not claim success without running the required checks.

## Workflow

1. Read the Loop Contract.
2. Confirm allowed paths, denied paths, budgets, and stop rules.
3. Run the quality gate or specified checks.
4. Inspect the exact failure.
5. Patch the smallest useful cause.
6. Update the trace.
7. Rerun checks.
8. Repeat according to `references/loop-execution-protocol.md`.
9. Stop with `success`, `blocked`, `escalated`, or `budget-exhausted`.

## Output

Updated artifacts, updated trace, and a final report using
`templates/run-final-report.md`.

## Validation

- The final report names the stop reason.
- The trace records checks, failures, patches, and rationale.
- Passing checks are scoped to what they prove.

## Example

```text
Use loopify-run on docs/loop-contract.md. Stop only when scripts/quality-gate.sh passes or the blocked rule is met.
```
