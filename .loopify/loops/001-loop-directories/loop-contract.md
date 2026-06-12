# Loop Contract

## Source Spec

`source.md`

## Objective

Make Loopify's public docs, skills, templates, examples, and validators use
explicit spec-to-bootstrap handoff plus per-feature loop directories.

## Requirements

- Explain why `loopify-spec` does not silently mutate a repo.
- Allow `loopify-spec` to hand off to `loopify-bootstrap` when explicitly asked.
- Make `.loopify/loops/NNN-slug/` the default runnable loop layout.
- Add bootstrap templates for loop directories and an index.
- Update `loopify-run`, `loopify-trace`, and related skills to prefer loop
  directories.
- Add examples and validation coverage for the new layout.
- Dogfood the layout in this repository.

## Non-Goals

- No CLI implementation.
- No dependency installation.
- No removal of legacy flat paths when the user names them explicitly.

## Requirement Evidence Map

| Requirement | Evidence Class | Evidence |
| --- | --- | --- |
| Explicit spec-to-bootstrap handoff | manual + automated | README and skill docs mention explicit bootstrap phrase |
| Loop directory default | manual + automated | README, concept doc, templates, examples, and validators reference `.loopify/loops/NNN-slug/` |
| Bootstrap templates | automated | `scripts/validate-skills.mjs` requires loop-directory templates |
| Example coverage | automated | `scripts/smoke-test-examples.mjs` requires loop-directory fixtures |
| Dogfooding | automated + manual | Root `.loopify/index.md` and `001-loop-directories` loop exist |

## Automated Checks

- `npm run quality`
- `git diff --check`
- `rg -n "\.loopify/loops" README.md docs plugins scripts .loopify`

## Manual / Visual Review Items

- Review README wording for the "spec can bootstrap when asked" behavior.
- Review that legacy flat paths are described as legacy, not the new default.

## Allowed Changes

- README and concept docs.
- Loopify skill docs, references, templates, and helper defaults.
- Example fixtures.
- Validation scripts.
- Root `.loopify/` loop state for this change.

## Authority Boundaries

- Do not change package identity, GitHub identity, or plugin manifest ownership.
- Do not rewrite history.
- Do not introduce private names, emails, or branding.

## Loop Procedure

Patch the docs/templates/examples, run the quality gate, inspect failures, patch
the smallest useful cause, update `trace.md`, and rerun.

## Stop Conditions

Stop with `success` when quality passes, whitespace checks pass, and the new
loop-directory shape is represented in docs, templates, examples, validators,
and root loop state.

## Blocked Conditions

Stop `blocked` if validators cannot support hidden `.loopify` fixtures or if
the new layout conflicts with plugin packaging rules.

## Verification

- Verifier: independent reviewer in a fresh context (different model preferred)
- Independence level: fresh-context
- Verifier inputs: loop-contract.md, trace.md, the diff, quality gate output
- Verifier authority: read everything in scope, re-run checks; writes ONLY verdict.md
- Verdict location: ./verdict.md
- Minimum independence for this loop: fresh-context

Retroactive note: this loop closed before mandatory verification (v0.2.0);
no verdict is required retroactively.

## Trace Requirements

Record commands, results, failures, patches, and final stop reason in
`trace.md`.

## Final Report Requirements

Write `final-report.md` with stop reason, passing checks, changed surfaces, and
remaining caveats.
