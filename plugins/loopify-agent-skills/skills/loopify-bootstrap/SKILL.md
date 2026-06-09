---
name: loopify-bootstrap
description: "Use when seeding a repository with loop materials such as a goal prompt, Loop Contract, quality gate, trace template, acceptance checklist, and test skeletons."
---

# loopify-bootstrap

Seed a repository with the files needed to run a goal loop.

## When To Use

- A project has a spec or Loop Contract but no loop harness.
- A demo repo needs a prepared material pack.
- A future `/goal` should run from repo-relative files.

## Do Not Use

- Do not overwrite existing tests, scripts, or docs without preserving intent.
- Do not install dependencies unless the user authorized implementation work.
- Do not make the quality gate pass by deleting meaningful checks.

## Workflow

1. Read the Loop Contract or source spec.
2. Inspect the repo stack using `references/repo-stack-detection.md`.
3. Create or update a repo-relative goal prompt.
4. Create or copy the Loop Contract into the repo.
5. Add a quality gate from `templates/quality-gate.sh`.
6. Add a trace template from `templates/trace.md`.
7. Add an acceptance checklist or test skeletons when useful.
8. Make shell scripts executable.
9. Run the lightest validation that should pass before implementation.

## Output

Typical outputs: `docs/goals/goal.md`, `docs/loop-contract.md`,
`scripts/quality-gate.sh`, `runs/trace.md`, and an acceptance checklist.

## Validation

- Repo-relative paths work from the project root.
- Existing checks are preserved.
- If implementation has not happened, the first failing check is intentional
  and documented.

## Example

```text
Use loopify-bootstrap with docs/loop-contract.md and create scripts/quality-gate.sh plus runs/trace.md.
```
