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

## Workflow

1. Read the Loop Contract.
2. Confirm authority boundaries.
3. Run the quality gate.
4. Inspect exact failures.
5. Patch the smallest useful change.
6. Update trace.
7. Rerun checks.
8. Stop with `success`, `blocked`, `escalated`, or `budget-exhausted`.

## Output

Updated code/docs, updated trace, and final report with stop reason.
