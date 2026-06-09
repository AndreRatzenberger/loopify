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
- A future `/goal` needs stronger evidence before implementation.

## Do Not Use

- Do not use this for a one-line task that can be completed and verified
  directly.
- Do not turn subjective requirements into fake automated checks.
- Do not silently widen scope beyond the source spec.

## Workflow

1. Locate and read the source spec.
2. Extract requirements, constraints, non-goals, and subjective language.
3. Classify each requirement using `references/evidence-classes.md`.
4. Map requirements to automated, visual, manual, ambiguous, or out-of-scope
   evidence.
5. Identify missing checks and ambiguous requirements.
6. Define allowed changes and authority boundaries.
7. Define loop procedure, stop conditions, blocked conditions, trace
   requirements, and final report requirements.
8. Write the Loop Contract using `templates/loop-contract.md`.
9. Run the heading checker if available.

## Output

Default output: `docs/loop-contract.md`, unless the user names another path.

## Validation

- Required Loop Contract headings are present.
- Subjective requirements are marked visual/manual or narrowed honestly.
- Ambiguous requirements are surfaced instead of buried.
- Automated checks are commands the repo can plausibly run.

## Example

```text
Use loopify-spec on docs/goals/prompt.md and write docs/examples/papertrail/loop-contract.md.
```
