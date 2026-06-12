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
3. Pick the next loop directory: `.loopify/loops/NNN-slug/`.
   - Note in the loop README that `verdict.md` will be written by the
     independent verifier at the end — the maker must not create it.
4. Create or update `.loopify/index.md` with the new loop entry.
5. Copy the source spec to `source.md` when available.
6. Create or copy the Loop Contract to `loop-contract.md`.
7. Add `quality-gate.sh`, `trace.md`, `acceptance-checklist.md`,
   `final-report.md`, `retro.md`, and `artifacts/`.
8. Add a repo-relative goal prompt when the target agent needs one.
9. Make shell scripts executable.
10. Run the lightest validation that should pass before implementation.

## Output

Default outputs:

- `.loopify/index.md`
- `.loopify/loops/NNN-slug/source.md`
- `.loopify/loops/NNN-slug/loop-contract.md`
- `.loopify/loops/NNN-slug/quality-gate.sh`
- `.loopify/loops/NNN-slug/acceptance-checklist.md`
- `.loopify/loops/NNN-slug/trace.md`
- `.loopify/loops/NNN-slug/final-report.md`
- `.loopify/loops/NNN-slug/retro.md`
- `.loopify/loops/NNN-slug/artifacts/`

Legacy flat paths such as `docs/loop-contract.md`, `scripts/quality-gate.sh`,
and `runs/trace.md` are supported when the user names them, but new loops
should use loop directories.

## Validation

- Repo-relative paths work from the project root.
- The loop directory is self-contained enough for `loopify-run`.
- `.loopify/index.md` lists the loop number, slug, source, status, and stop
  reason when known.
- Existing checks are preserved.
- If implementation has not happened, the first failing check is intentional
  and documented.

## Example

```text
Use loopify-bootstrap with .loopify/loops/001-papertrail/loop-contract.md.
```
