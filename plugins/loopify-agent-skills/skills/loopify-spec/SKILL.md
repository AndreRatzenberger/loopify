---
name: loopify-spec
description: "Use when converting a prose spec, PRD, README, issue, or goal prompt into a Loop Contract with requirements, checks, authority boundaries, stop rules, and trace requirements."
---

# loopify-spec

Convert a source spec into a Loop Contract.

## When To Use

- The user has a spec and wants it made executable.
- A goal is too prose-heavy to run safely.
- "Done" is vague or uncheckable.

## Workflow

1. Read the source spec.
2. Extract requirements, constraints, non-goals, and subjective language.
3. Classify each requirement as `automated`, `visual`, `manual`, `ambiguous`,
   or `out-of-scope`.
4. Map requirements to evidence.
5. Define checks, allowed changes, authority boundaries, stop conditions,
   blocked conditions, trace requirements, and final report requirements.
6. Write or update the Loop Contract.

## Output

Default output: `docs/loop-contract.md`.

Use `templates/loop-contract.md` as the structure.
