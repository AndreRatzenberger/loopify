---
name: loopify-bootstrap
description: "Use when seeding a repository with loop materials such as a goal prompt, Loop Contract, quality gate, trace template, acceptance checklist, and test skeletons."
---

# loopify-bootstrap

Seed a repository with the files needed to run a goal loop.

## When To Use

- A project has a spec but no loop harness.
- A demo repo needs a prepared material pack.
- A future `/goal` should run from repo-relative files.

## Workflow

1. Read the Loop Contract or source spec.
2. Inspect the repo stack and existing commands.
3. Create or update loop materials.
4. Add a quality gate that runs the strongest available checks.
5. Add a trace template.
6. Run the lightest validation that should pass before implementation.

## Output

Typical outputs: `docs/goals/goal.md`, `docs/loop-contract.md`,
`scripts/quality-gate.sh`, `runs/trace.md`, and acceptance-test skeletons.
