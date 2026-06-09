---
name: loopify-review
description: "Use when auditing a Loop Contract, loop trace, quality gate, or done claim for weak evidence, missing checks, authority creep, ambiguity, and residual risk."
---

# loopify-review

Review a loop before or after execution.

## When To Use

- A loop claims done.
- A quality gate may be incomplete.
- A contract may have weak evidence or broad authority.

## Workflow

1. Read Loop Contract, trace, checks, and diff if present.
2. Review requirement coverage.
3. Identify weak evidence, missing checks, ambiguous stops, authority creep,
   and untested behavior.
4. Present findings first, ordered by severity.
5. Recommend concrete fixes.

## Output

A review report with findings, residual risk, and recommended repairs.
