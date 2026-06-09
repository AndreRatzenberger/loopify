---
name: loopify-checks
description: "Use when turning vague requirements into concrete automated checks, visual review gates, manual review items, acceptance tests, or quality-gate commands."
---

# loopify-checks

Turn requirements into honest evidence.

## When To Use

- A Loop Contract has weak evidence.
- A spec uses words like polished, fast, delightful, or production-ready.
- A project needs tests, screenshot checks, build checks, or manual gates.

## Do Not Use

- Do not invent tests that do not prove the requirement.
- Do not erase manual review just because automation is easier.
- Do not modify product behavior unless the user authorized implementation.

## Workflow

1. Read the spec or Loop Contract.
2. Identify weak, fake, or missing evidence.
3. Use `references/check-patterns.md` to propose checks by evidence class.
4. Use `references/visual-review-gates.md` for UI/screenshot work.
5. Use `references/manual-review-language.md` for subjective acceptance.
6. Add or draft checks only when authorized.
7. Update the Requirement Evidence Map.

## Output

Updated Loop Contract, quality gate, tests, screenshot plan, or acceptance
checklist using `templates/acceptance-checklist.md`.

## Validation

- Each required behavior has evidence or an explicit ambiguity.
- Visual/manual gates are not hidden inside automated claims.
- New checks are runnable or clearly marked as drafts.

## Example

```text
Use loopify-checks to strengthen .loopify/loops/001-papertrail/loop-contract.md for mobile layout and fallback behavior.
```
