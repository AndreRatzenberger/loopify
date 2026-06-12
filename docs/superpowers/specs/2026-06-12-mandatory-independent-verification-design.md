# Mandatory Independent Verification for Loopify Loops

Date: 2026-06-12
Status: draft for review
Scope: Loopify skill bundle (`plugins/loopify-agent-skills/`), docs, examples, validation scripts

## Problem

Loopify's philosophy is "hard validations you cannot bullshit," but its single most
important claim — `success` — is currently self-graded. The maker agent runs its own
quality gate, writes its own trace, and declares its own stop reason. `loopify-review`
exists, but it is optional, and optional honesty mechanisms do not get invoked under
completion pressure.

Field evidence agrees: independent verifier contexts outperform self-critique because
grading happens in a context window that does not share the maker's narrative
(see Anthropic's published guidance on verifier sub-agents vs self-critique, and the
"Designing loops" results on rubric-graded long-running tasks). A model reviewing its
own output inherits its own framing errors; a fresh context — ideally a different
model — does not.

The gap, stated plainly: **the maker grades its own homework.** This design closes
that gap and makes the stop claim itself machine-checkable.

## Goals

1. `success` is an illegal stop reason unless an independent verifier has approved
   the work in a verdict artifact.
2. The legality of any claimed stop reason is checkable by a deterministic script
   (exit code, not judgment).
3. Cross-model verification (e.g. a Claude Code maker with a Codex CLI verifier, or
   the reverse) is supported and documented as the strongest independence level,
   without becoming a hard dependency.
4. No new skills. The bundle stays at 11; verification is absorbed into the existing
   contract, `loopify-review`, and `loopify-run`.

## Non-Goals

- The runnable-harness work (project profile generation, deterministic state
  helpers, recurring/watch loops, harness-level audit). Separate future loop.
- Any daemon, runtime, or CLI beyond small Node helper scripts in the existing
  `scripts/` pattern.
- Changes to `loopify-codex-sdk`, `loopify-demo`, or `loopify-governance` beyond
  documentation cross-references.
- Retroactive enforcement on existing closed loop folders (`001-loop-directories`
  remains valid history).

## Approaches Considered

**A. Contract section + absorbed verifier role + binary stop-reason check (chosen).**
Verification becomes a required Loop Contract section, `loopify-review` gains the
verifier role, `loopify-run` blocks `success` without a verdict, and a script makes
the stop claim binary. Pros: no new ceremony surface, enforcement is mechanical,
matches the existing template/script architecture. Cons: touches many files at once.

**B. New `loopify-verify` skill.** Pros: clean conceptual slot. Cons: grows the
bundle to 12 skills; verification is not a new workflow but a missing gate inside
two existing workflows. Rejected — ceremony growth is the failure mode that kills
frameworks like this.

**C. Guidance only (README + stronger language in loopify-run).** Pros: cheap.
Cons: this is the status quo with more adjectives. Prose does not gate anything.
Rejected.

## Design

### 1. Loop Contract: required `## Verification` section

The canonical Loop Contract heading set gains one section, placed after
`## Stop Conditions` / `## Blocked Conditions` and before `## Trace Requirements`:

```md
## Verification

- Verifier: <who grades success — see independence ladder>
- Independence level: cross-model | fresh-context | human
- Verifier inputs: loop-contract.md, trace.md, the diff, quality gate output
- Verifier authority: read everything in scope, re-run checks; writes ONLY verdict.md
- Verdict location: ./verdict.md
- Minimum independence for this loop: <level; governance may raise this>
```

The **independence ladder** (strongest first):

1. **cross-model** — a different model in a different harness (e.g. maker in
   Claude Code, verifier via Codex CLI, or the reverse). Breaks shared-prior
   blind spots, not just shared-context bias.
2. **fresh-context** — same model family, new context window (sub-agent), no
   access to the maker's conversation. Breaks narrative bias only.
3. **human** — a named human reviews and writes/approves the verdict.

If no level on the ladder is available, the loop cannot reach `success`; it stops
`escalated` with reason `cannot-verify`.

`loopify-spec` writes this section when compiling contracts;
`check-loop-contract.mjs` adds `## Verification` to its required-headings list.

### 2. Verdict artifact: `verdict.md`

One file per loop folder, written only by the verifier. Template ships in
`loopify-review/templates/verdict.md`:

```md
# Verdict

- Loop: <NNN-slug>
- Verifier: <model/harness or human name>
- Independence level: cross-model | fresh-context | human
- Date: <YYYY-MM-DD>

## Checks Re-Executed

| Command | Exit code |
| --- | --- |

## Requirement Verdicts

<one row per Requirement Evidence Map entry>

| Requirement | Evidence class | Verdict (pass / fail / cannot-verify) | Note |
| --- | --- | --- | --- |

## Manual / Visual Queue

<enumerated items confirmed as explicitly queued, with owner>

## Findings

<severity-ordered; required when overall is reject>

## Overall

approve | reject | cannot-verify
```

Hard rules:

- The verifier re-executes the quality gate and any cheap automated checks itself.
  Reading the maker's trace is not verification; exit codes are.
- `pass` verdicts must point at evidence (command output, file, screenshot), not at
  the maker's claim.
- The verifier reviews the contract too: if the evidence map no longer measures the
  objective (frame drift), that is a finding, even if every check is green.

### 3. `loopify-run` protocol change

`references/loop-execution-protocol.md` and the SKILL.md gain a verification step
between "checks pass" and "claim success":

1. Maker believes the work is done (gate green, manual items queued).
2. Maker requests verification per the contract's `## Verification` section —
   spawning a fresh sub-agent, invoking the second harness, or handing to a human.
   The verifier receives the contract, trace, diff, and gate output. It does not
   receive the maker's conversation.
3. **Authority boundary: `verdict.md` is excluded from the maker's allowed
   changes.** The contract template's `## Allowed Changes` section lists it as
   denied. A maker that writes its own verdict has violated the contract — this is
   the one rule everything else hangs on.
4. On `reject`: findings are appended to the trace as observed failures; the loop
   continues within budget. If the verifier rejects the same finding twice, stop
   `escalated` (human decides; the maker does not get to out-argue the verifier).
5. On `cannot-verify`: stop `escalated`.
6. On `approve`: `success` is now legal. The final report links the verdict.

Verification runs once per success claim, not per turn — the loop's inner cadence
is unchanged.

### 4. `check-stop-reason.mjs` — the stop claim as an exit code

New script in `loopify-run/scripts/`, seeded into loop folders by
`loopify-bootstrap`. Usage:

```bash
node check-stop-reason.mjs <loop-folder> <claimed-reason>
```

Logic (all binary, no judgment):

- `success`:
  - `verdict.md` exists, parses, `Overall` is `approve`
  - the verdict's `Verifier` field is non-empty and differs from the `Maker`
    field recorded in `final-report.md` (the final report template gains a
    required `Maker: <model/harness>` line for exactly this comparison)
  - the contract's quality gate command exits 0 when re-run
  - `final-report.md` exists and claims `success`
- `blocked` / `escalated` / `budget-exhausted`:
  - `trace.md` has a final entry naming the reason
  - `final-report.md` exists and matches

Exit 0 = legal claim, exit 1 = illegal, with a one-line reason. This is the same
move the rest of Loopify makes everywhere else: relocate trust from prose to an
exit code.

### 5. `loopify-review`: the verifier role, absorbed

`loopify-review` already owns audit. It gains an explicit second mode:

- **Audit mode** (existing): review contracts/traces/claims, produce
  `review-report.md`.
- **Verifier mode** (new): execute the contract's `## Verification` section as the
  independent party and produce `verdict.md`. Read + re-run checks only; single
  write target is the verdict.

New reference `loopify-review/references/independent-verification.md` documents the
ladder, the rationale (verifier contexts outperform self-critique; cross-model
breaks shared priors), and generic wiring recipes: Claude Code maker → Codex CLI
verifier, Codex maker → Claude Code verifier, and the sub-agent fallback. Recipes
are harness-generic; no plugin is a hard dependency.

### 6. Documentation and examples

- `README.md`: Stop Rules section gains the verifier rule — "the maker never
  grades its own homework" — and the skill table row for `loopify-review` mentions
  verifier mode.
- `docs/concepts/loop-contract.md`: document the `## Verification` section and the
  independence ladder.
- `docs/concepts/failure-modes.md`: add **self-graded success** (maker declares
  done on its own authority) and **verifier capture** (verifier rubber-stamps
  because it grades the maker's narrative instead of re-running reality).
- All three example expected contracts (`simple-web-app`, `markdown-research-note`,
  `papertrail`) gain `## Verification` sections; `simple-web-app/example-loop/`
  gains an example `verdict.md`.
- `scripts/smoke-test-examples.mjs`: require the new heading in expected contracts.
- `plugins/loopify-agent-skills/.claude-plugin/plugin.json` and
  `.claude-plugin/marketplace.json`: version 0.1.0 → 0.2.0.

## Error Handling and Edge Cases

- **No second model available:** degrade down the ladder; the verdict records the
  achieved level. Contracts may set a minimum level; high-risk loops (per
  `loopify-governance` risk classes) should require `cross-model` or `human`.
- **Verifier flakiness:** one verification re-run is allowed per success claim if
  the verdict failed on infrastructure (command could not run) rather than on
  findings. Disagreement is never resolved by re-rolling until approve.
- **Maker/verifier ping-pong:** bounded by the existing loop budget plus the
  two-strikes escalation rule (same finding rejected twice → `escalated`).
- **Gate too expensive to re-run:** the contract's Verification section may name a
  cheaper verification gate subset, but it must be a command list, not "trust the
  trace."
- **Old loop folders:** `check-stop-reason.mjs` is invoked on demand; closed
  folders are not retroactively judged. New contracts get the new heading via the
  updated template and checker.

## Testing and Validation

- `npm run quality` extended: skill validation covers the new templates/references;
  smoke tests require the `## Verification` heading in example contracts and the
  example verdict's required fields.
- Unit-style check: a fixture loop folder with a forged verdict (maker == verifier)
  must make `check-stop-reason.mjs` exit 1.
- Integration test = dogfood: the implementation itself runs as
  `.loopify/loops/002-mandatory-verifier/` with a contract, gate, trace, and a
  cross-model verifier producing the first real `verdict.md` in the repo.

## Rollout

1. Implement contract template + checker changes (`loopify-spec`).
2. Implement verdict template + verifier mode (`loopify-review`).
3. Implement run-protocol changes + `check-stop-reason.mjs` (`loopify-run`,
   `loopify-bootstrap` seeding).
4. Update concepts, README, examples, smoke tests, version bump.
5. Dogfood as loop `002-mandatory-verifier`; the verdict for loop 002 is written by
   a different model than the one that implements it.

## File-by-File Change List

| File | Change |
| --- | --- |
| `plugins/.../loopify-spec/templates/loop-contract.md` | add `## Verification`; deny `verdict.md` in Allowed Changes |
| `plugins/.../loopify-spec/scripts/check-loop-contract.mjs` | require new heading |
| `plugins/.../loopify-spec/SKILL.md`, `references/spec-to-loop-method.md` | verification design step |
| `plugins/.../loopify-review/SKILL.md` | add verifier mode |
| `plugins/.../loopify-review/templates/verdict.md` | new |
| `plugins/.../loopify-review/references/independent-verification.md` | new |
| `plugins/.../loopify-run/SKILL.md`, `references/loop-execution-protocol.md` | verification step; success gating; escalation rules |
| `plugins/.../loopify-run/templates/run-final-report.md`, `templates/final-report.md` | verdict link field; required `Maker:` identity line |
| `plugins/.../loopify-run/scripts/check-stop-reason.mjs` | new |
| `plugins/.../loopify-bootstrap/templates/loop-directory/` | seed verdict placeholder note; SKILL.md mentions stop-reason check |
| `docs/concepts/loop-contract.md` | Verification section + ladder |
| `docs/concepts/failure-modes.md` | self-graded success; verifier capture |
| `docs/examples/*/expected-loop-contract.md` (3) | add `## Verification` |
| `docs/examples/simple-web-app/example-loop/` | example `verdict.md` |
| `scripts/smoke-test-examples.mjs` | require new heading/fields |
| `README.md` | stop rules + skill table |
| `.claude-plugin/marketplace.json`, `plugins/.../plugin.json` | 0.2.0 |
