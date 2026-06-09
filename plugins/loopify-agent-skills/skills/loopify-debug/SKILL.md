---
name: loopify-debug
description: "Use when a loop is stuck, repeating failures, flaking, patching the wrong target, hitting an authority conflict, or burning turns without convergence."
---

# loopify-debug

Rescue stuck loops.

## When To Use

- The same failure repeats.
- Checks are flaky.
- The evaluator is weak.
- The loop is burning turns without convergence.

## Workflow

1. Read Loop Contract and trace.
2. Classify the stuck pattern.
3. Identify whether the issue is implementation, check, spec, context, or
   authority.
4. Recommend recovery.
5. Patch only when recovery is clear and authorized.

## Output

Diagnosis, recovery plan, or blocked/escalated report.
