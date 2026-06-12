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
- A trace needs review before a human accepts the result.

## Do Not Use

- Do not rubber-stamp passing tests.
- Do not bury findings below a summary.
- Do not treat missing evidence as low risk by default.

## Workflow

1. Read Loop Contract, trace, checks, and diff if present.
2. Review requirement coverage using `references/review-rubric.md`.
3. Identify weak evidence, missing checks, ambiguous stops, authority creep,
   and untested behavior.
4. Present findings first, ordered by severity.
5. Recommend concrete contract/check/trace fixes.

## Output

A review report using `templates/review-report.md`.

## Validation

- Findings are severity-ordered and path-grounded when possible.
- Residual risk is explicit.
- The verdict states whether the work is allowed to count.

## Example

```text
Use loopify-review on .loopify/loops/001-papertrail/loop-contract.md, .loopify/loops/001-papertrail/trace.md, and the current git diff.
```
