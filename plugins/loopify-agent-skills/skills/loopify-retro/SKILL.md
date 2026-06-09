---
name: loopify-retro
description: "Use after a loop completes to extract reusable lessons from the contract, trace, final diff, failures, useful checks, ambiguities, and rejected attempts."
---

# loopify-retro

Extract lessons from completed loops.

## When To Use

- A loop finished.
- Trace data should improve future specs or checks.
- Failures reveal recurring weak spots.
- Rejected attempts contain useful process knowledge.

## Do Not Use

- Do not write a generic victory lap.
- Do not promote a project-specific lesson as universal without evidence.
- Do not discard "why not that" knowledge.

## Workflow

1. Read contract, trace, final diff, and final report.
2. Use `references/retro-patterns.md` to classify lessons.
3. Identify ambiguous spec phrases, useful checks, missing checks, failure
   clusters, authority surprises, and rejected attempts.
4. Write a retro from `templates/loop-retro.md`.
5. Recommend updates to future Loop Contract templates.
6. Update memory only when requested or when project rules permit it.

## Output

Loop retro document and optional template/process improvements.

## Validation

- The retro names checks that mattered.
- The retro names missing evidence.
- Future-template recommendations are concrete.

## Example

```text
Use loopify-retro on runs/trace.md and write docs/retros/2026-06-09-loop-retro.md.
```
