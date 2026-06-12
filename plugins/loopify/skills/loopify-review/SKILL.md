---
name: loopify-review
description: "Use when auditing a Loop Contract, trace, quality gate, or done claim — or when acting as the independent verifier that grades a loop's success claim and writes verdict.md."
---

# loopify-review

Review a loop before or after execution.

## When To Use

- A loop claims done.
- A quality gate may be incomplete.
- A contract may have weak evidence or broad authority.
- A trace needs review before a human accepts the result.
- A loop requests verification per its contract's `## Verification` section
  (verifier mode).

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

## Verifier Mode

When invoked as the independent verifier (never the maker's session):

1. Read `references/independent-verification.md` and the loop folder's
   contract, trace, and diff.
2. Re-run the quality gate and the contract's cheap checks yourself.
3. Grade every Requirement Evidence Map row pass/fail/cannot-verify.
4. Confirm the manual/visual queue is enumerated.
5. Write `verdict.md` from `templates/verdict.md` — your only write.
6. Overall: `approve` only when every automated row passes and nothing
   blocking remains; otherwise `reject` with severity-ordered findings, or
   `cannot-verify` with what was missing.

## Output

A review report using `templates/review-report.md`.

## Validation

- Findings are severity-ordered and path-grounded when possible.
- Residual risk is explicit.
- The verdict states whether the work is allowed to count.
- Verifier mode: `verdict.md` exists, names the verifier and independence
  level, and every Overall=approve is backed by re-executed checks.

## Example

```text
Use loopify-review on .loopify/loops/001-papertrail/loop-contract.md, .loopify/loops/001-papertrail/trace.md, and the current git diff.
```
