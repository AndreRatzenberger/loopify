---
name: loopify-debug
description: "Use when a loop is stuck, repeating failures, flaking, patching the wrong target, hitting an authority conflict, or burning turns without convergence."
---

# loopify-debug

Rescue stuck loops.

## When To Use

- The same failure repeats.
- Checks are flaky or invalid.
- The evaluator is weak.
- The loop is burning turns without convergence.
- The next useful step might be blocked or escalated, not another patch.

## Do Not Use

- Do not keep applying cosmetic patches to repeated failures.
- Do not weaken checks just to escape a stuck loop.
- Do not ignore authority-boundary conflicts.

## Workflow

1. Read Loop Contract and trace.
2. Classify the stuck pattern with `references/stuck-loop-taxonomy.md`.
3. Identify whether the issue is implementation, check, spec, context,
   authority, or budget.
4. Recommend recovery using `templates/recovery-plan.md`.
5. Write a blocked report if no authorized recovery exists.
6. Patch only when recovery is clear and authorized.

## Output

Diagnosis, recovery plan, or blocked/escalated report.

## Validation

- The repeated pattern is named.
- The next diagnostic differs from the failed attempts.
- Blocked/escalated recommendations cite the contract rule.

## Example

```text
Use loopify-debug on docs/examples/stuck-loop-debug/trace.md and classify why the loop is not converging.
```
