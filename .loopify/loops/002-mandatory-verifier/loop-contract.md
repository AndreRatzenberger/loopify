# Loop Contract

## Source Spec

`source.md`

## Objective

Implement the mandatory independent verification spec end-to-end: success
becomes an illegal stop reason without an approving verdict.md from an
independent verifier, the stop claim is machine-checked via
check-stop-reason.mjs, and the plugin is renamed loopify-agent-skills ->
loopify.

## Requirements

- Plugin renamed from `loopify-agent-skills` to `loopify` throughout the
  codebase.
- `## Verification` section required in all loop contracts (automated check via
  check-loop-contract.mjs).
- Example contracts carry the `## Verification` heading (automated, smoke:examples).
- verdict.md template and example verdict provided (automated, validate-skills +
  smoke:examples).
- emit-verifier-agent.mjs host adapter implemented (automated, smoke:verification).
- check-stop-reason.mjs enforces success/blocked/escalated stop reasons
  (automated, smoke:verification — adversarial fixture suite including forged
  verdict, empty Maker, duplicate/inline-decoy Overall, placeholder and
  invisible-char identities, gate deception, CRLF; 16 fixtures at loop time,
  the suite grows).
- loopify-run and loopify-review skill docs updated to include verification steps
  (manual).
- concepts, README, and failure-modes docs updated to reflect mandatory
  verification (manual).

## Non-Goals

- No CLI implementation.
- No dependency installation.
- No network publishing or registry push.
- No changes to other plugins not in scope.

## Requirement Evidence Map

| Requirement | Evidence Class | Evidence |
| --- | --- | --- |
| Plugin renamed to `loopify` | automated + manual | All manifests, skill docs, and scripts reference `loopify`; no `loopify-agent-skills` references remain |
| `## Verification` required in contracts | automated | `check-loop-contract.mjs` enforces the heading; smoke:examples checks all example contracts |
| Example contracts carry `## Verification` | automated | `smoke:examples` checks heading-checked file list |
| verdict.md template + example | automated | `validate-skills` requires verdict template; `smoke:examples` checks example verdict fields |
| emit-verifier-agent.mjs host adapter | automated | `smoke:verification` exercises the adapter |
| check-stop-reason.mjs — adversarial fixtures | automated | `smoke:verification` runs the adversarial fixture suite (16 at loop time, grown since) incl. forged verdict, empty Maker, duplicate Overall, placeholder identities, invisible chars, gate deception, CRLF |
| loopify-run + loopify-review docs updated | manual | Skill docs reviewed for verification-step wording |
| concepts/README/failure-modes updated | manual | Concept doc, README, and failure-modes reviewed for mandatory-verification mentions |
| Verification framing is honest (tripwire, not authorship proof) | manual | docs state check-stop-reason is a tripwire; independence = reproducible automated evidence + a named independent judge + a self-declared provenance line (loop-contract.md Verification Section, independent-verification.md, failure-modes.md) |

## Automated Checks

- `npm run quality`
- `git diff --check`

## Manual / Visual Review Items

- Review loopify-run skill doc for verification steps (protocol section).
- Review loopify-review skill doc for verifier mode instructions.
- Review concepts/loop-directory.md and README.md for mandatory-verification
  wording.
- Review failure-modes doc for escalation and verifier-refusal patterns.

## Allowed Changes

- All repo files per the implementation plan.
- Plugin manifest, skill docs, scripts, templates, examples, and validators.
- Root `.loopify/` loop state for this change.
- Denied always: `verdict.md` — only the verifier writes it.

## Authority Boundaries

- No network access, no publish, no registry push.
- Changes are worktree-local only.
- Do not rewrite history.
- Do not introduce private names, emails, or branding outside of the author
  field.

## Loop Procedure

Patch the implementation per the plan, run the quality gate, inspect failures,
patch the smallest useful cause, update `trace.md`, and rerun until all
automated checks pass and manual items are reviewed.

## Stop Conditions

- `success`: quality gate passes, whitespace check passes, an independent
  verifier (different model or fresh read-only context) has written an approving
  verdict.md with `## Overall` section containing `approve`.
- `blocked`: a validator or packaging rule makes a required change impossible.
- `escalated`: all automated checks pass but the maker cannot self-certify;
  loop stops here and waits for an independent verifier to write verdict.md.
- `budget-exhausted`: token/turn budget runs out before completion.

## Blocked Conditions

Stop `blocked` if validators or plugin packaging rules make any required change
impossible, or if the check-stop-reason logic itself conflicts with the contract
structure.

## Verification

- Verifier: independent reviewer in a fresh context (different model preferred)
- Independence level: cross-model
- Verifier inputs: loop-contract.md, trace.md, the diff, quality gate output
- Verifier authority: read everything in scope, re-run checks; writes ONLY verdict.md
- Verdict location: ./verdict.md
- Minimum independence for this loop: fresh-context

## Trace Requirements

Record one entry per implementation task with: Command, Result, Failure
observed (or "none — green"), Patch, Why this patch, Next check. End with a
`## Final` section naming the stop reason and evidence.

## Final Report Requirements

Write `final-report.md` with: stop reason, Maker identity, Verdict link,
evidence of automated checks passing, manual review status, remaining
caveats, and follow-up loops.
