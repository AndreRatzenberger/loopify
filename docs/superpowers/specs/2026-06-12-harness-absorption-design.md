# Harness Absorption: Profile, State Ledger, Comprehension, Recurrence, Audit

Date: 2026-06-12
Status: draft for review
Scope: Loopify skill bundle, templates, scripts, docs — **zero new skills**
Companion: `2026-06-12-mandatory-independent-verification-design.md` (loop 002);
this design is loop 003.

## Context

Loopify owns the contract layer: Loop Contracts, evidence classes, stop
reasons, authority boundaries, governance. Its mechanics, however, are
agent-procedural — traces, index updates, and stop claims live on the honor
system, and the framework that preaches "you cannot bullshit an exit code"
runs its own bookkeeping on prose.

A detailed comparison (2026-06-12) with **Sanket Dongre's loop-codex-plugin**
(github.com/sanky369/loop-codex-plugin, MIT, v0.2.1) located exactly the
missing organ set. His plugin is the inverse of Loopify: a thin contract
layer on top of excellent deterministic mechanics — a project probe, a
run-state ledger with a mechanical repeated-failure detector, an
understanding-debt artifact, harness-enforced maker/checker subagents, and a
clean interval parser for recurring loops.

One framing insight orders everything: these are **two loop genera**.
Loopify builds *bounded feature loops* (quest-shaped, one undertaking per
`NNN-slug/` folder, ends with a stop reason). Sanket's plugin builds
*recurring maintenance loops* (cron-shaped: CI triage, deploy watch, docs
drift). This design absorbs the mechanics genus-appropriately: feature loops
get ledgers and comprehension; maintenance loops arrive as a *recurrence
mode* without sacrificing the folder philosophy.

His plugin is Codex-only through a thin adapter layer (manifest format,
`$`-prefix invocations, `.codex/agents/*.toml`, Codex Automations as
scheduler, rendered prompts beginning with `$loop-run`). The mechanics
underneath are ~90% harness-neutral. Loopify stays harness-agnostic by
keeping that separation explicit: **neutral core artifacts, host adapters at
the edges** (see "Harness-agnosticism doctrine" below).

## Goals

1. Deterministic mechanics for the loop lifecycle: project profile, run-state
   ledger, repeated-failure detection — exit codes and JSONL, not prose.
2. An understanding-debt artifact (`comprehension.md`) and stop condition.
3. Recurring-loop support (interval parsing, automation prompts) without a
   scheduler and without harness lock-in.
4. A harness-level audit mode.
5. **Zero new skills.** The bundle stays at 11; everything absorbs into
   existing skills as modes, scripts, templates, and references.

## Non-Goals

- No global `.loop/`-style state folder — `.loopify/loops/NNN-slug/` remains
  the unit of work; project-level state is limited to `profile.yaml`,
  `index.md`, and `automations/`.
- No daemon, scheduler, or background service in the plugin. Recurrence is
  *prepared* by Loopify and *executed* by the host's native scheduling.
- No weakening of evidence classes, stop reasons, or governance.
- No importing of Python code; helpers are rebuilt as `.mjs` (one toolchain:
  npm). Ideas are credited, code is not copied.

## Skill absorption map (the zero-new-skills rule, made concrete)

| Capability (donor shape) | Absorbed into |
| --- | --- |
| `loop-init` (project probe → profile) | `loopify-bootstrap` gains a **repo mode**: "bootstrap this repo" writes `.loopify/profile.yaml`; "bootstrap a loop" stays as-is |
| `loop_state` (ledger append/summary) | shared scripts used by `loopify-run` and `loopify-trace` |
| `COMPREHENSION.md` | per-loop `comprehension.md` template + `loopify-run` step + contract stop condition |
| `loop-watch` (recurrence) | `loopify-run` gains a **recurring mode**: parse cadence, render automation prompt, hand off to host scheduling |
| `loop-audit` (harness audit) | `loopify-review` gains an **audit-the-harness mode** (next to contract audit and verifier mode from loop 002) |
| `loop-agents` (subagent emission) | covered by loop 002's `emit-verifier-agent.mjs`; explorer/worker roles ship as a reference, emitted on request by the same script |

## Design

### 1. Project profile: `.loopify/profile.yaml`

`loopify-bootstrap` repo mode runs `scripts/probe-project.mjs --write`:

- Detects package managers, frameworks, install/lint/test/build/dev commands,
  git state, connector signals (CI config, deploy config, MCP config, host
  dirs `.claude/`/`.codex/`), worktree policy, and recommends 2–3 first loops.
- The profile is the *project-level* contract that loop contracts reference
  for command names instead of re-deriving them per loop.
- Improvements over the donor probe (bugs found in comparison):
  - read `package.json` scripts even when no lockfile exists (the donor
    requires a JS lockfile and misses script-only repos — including Loopify
    itself);
  - when `uv.lock` is present, emit `uv run pytest` / `uv sync` style
    commands instead of raw `pip`/`pytest`;
  - never overwrite an existing profile silently — print a diff and require
    confirmation (propose-confirm).
- Unknown stacks degrade conservatively: empty command lists plus a note,
  never invented commands.

### 2. Run-state ledger: per-loop `runs.jsonl`

`scripts/loop-state.mjs` (shared by `loopify-run` and `loopify-trace`):

- `append`: one JSON line per pass into the **loop folder's** `runs.jsonl`
  (`.loopify/loops/NNN-slug/runs.jsonl`) — fields: timestamp, status
  (`passed | failed | noop | blocked | paused | completed`), summary,
  evidence, prompt, cadence, next_action, pause_reason. Per-loop placement
  preserves the one-feature-one-folder philosophy; cross-loop views aggregate
  at read time.
- `summary`: status counts, recent entries, and the **repeated-failure
  detector**: ≥3 same-reason `failed`/`blocked` entries within the last 20
  passes → exit code 1 with the offending reason. `loopify-run` treats that
  as a mechanical instruction to stop (`blocked`) instead of patching again;
  `loopify-debug` consumes it as evidence. This is the doom-loop detector as
  an exit code instead of a vibe.
- The trace remains the human-readable narrative; the ledger is the
  machine-readable counterpart. `check-trace.mjs` cross-checks that final
  trace entries and ledger tail agree on the stop reason.

### 3. Comprehension: the understanding-debt artifact

- New per-loop file `comprehension.md` (template in `loopify-bootstrap`,
  seeded with the loop folder): *what changed, why it matters, what the human
  must understand before trusting continuation, which assumptions are now
  embedded.* Distinct from the trace (reconstruction) and the final report
  (outcome): comprehension is what the human needs to *keep up*.
- `loopify-run` appends a comprehension note whenever a pass changes
  behavior, architecture, public docs, or project direction.
- The Loop Contract template's Stop Conditions gain a canonical entry:
  *"the human would lose important understanding if the loop continued
  without review."* Understanding debt becomes a first-class stop reason
  feeding `escalated`.

### 4. Recurrence: prepared by Loopify, executed by the host

`loopify-run` recurring mode ("run this loop every 20m", "watch the deploy,
5m"):

- `scripts/parse-cadence.mjs` ports the donor's three parsing rules
  (leading interval token; trailing `every <N> <unit>` only when a real time
  unit follows — `check every PR` has no interval; otherwise dynamic cadence)
  plus cron conversion with honest rounding notes ("rounded 7m to every 6m
  for even cron spacing"). Fixture-tested.
- Output: a **harness-neutral automation prompt** at
  `.loopify/automations/<slug>.md` — it references the loop folder, the
  contract, one-pass-per-firing semantics, ledger recording, and auto-pause
  rules. It does NOT contain host invocation syntax.
- Delivery: a per-host wiring note rendered alongside (host detected from
  `.claude/`/`.codex`/neither): how to register the prompt with the host's
  native scheduler (e.g. Codex Automations pane; Claude Code `/loop` or
  scheduled agents; plain cron + CLI as fallback). Loopify never schedules
  anything itself.
- Hard semantics carried over from the donor (and consistent with
  `loopify-governance`): one bounded pass per firing; run one pass
  immediately unless asked to "just schedule"; edit-capable recurring loops
  require a contract and a verifier (loop 002) before `passed` is legal;
  auto-pause on the repeated-failure detector, missing credentials, or scope
  expansion.

### 5. Harness audit: `loopify-review` audit-the-harness mode

Reviews the whole `.loopify/` state, severity-ordered findings:

- loops without contracts, traces, final reports, or comprehension notes
- weak or fake quality gates; `success` claims without verdicts (ties into
  loop 002's `check-stop-reason.mjs`)
- repeated-failure clusters across ledgers (aggregated `loop-state.mjs
  summary`)
- stale profile vs. reality (commands that no longer exist)
- automation hygiene: prompts without budgets/pause rules, more than one
  pass per firing, dynamic loops without a stop story
- authority creep: loops whose diffs exceed their contracts' allowed changes

### 6. README quick path

One compact operational table once the modes exist:
`bootstrap repo → spec → bootstrap loop → run → (recur) → review/audit →
retro`. Keeps the Loopify voice; adds the donor's at-a-glance scannability.

## Harness-agnosticism doctrine (why this stays portable)

The donor's lock-in lives entirely in five edges: manifest format, invocation
prefix, subagent file format, scheduler, and host syntax inside rendered
artifacts. Loopify's rules, derived from that diagnosis:

1. Core artifacts (contracts, profiles, ledgers, automation prompts,
   comprehension) are markdown/YAML/JSONL with **no host syntax inside**.
2. Host specifics live only in adapters: emission scripts that detect
   `.claude/` / `.codex/` and a wiring note, never in templates.
3. Skills reference each other by neutral names (already the case).
4. The plugin manifest stays in the format both major harnesses read
   (already the case — Loopify installs in Claude Code and Codex today).

## Error handling

- Probe on exotic stacks: conservative empty sections + explicit note; the
  agent fills gaps interactively, never the script.
- Corrupt ledger lines: skipped and counted as `invalid`, never fatal.
- Cadence parser ambiguity: dynamic cadence is the safe default; rounding is
  always reported before anything is written.
- Existing `.codex/`/`.claude/` agent files: never overwritten; print and
  propose.
- Profile drift (commands renamed): audit flags it; bootstrap repo mode
  re-probes and proposes a diff.

## Testing and validation

- `npm run quality` extended: profile schema check; cadence-parser fixture
  table (including `check every PR` → no interval, `30s` → 1m rounding note);
  ledger fixture where 3 same-reason failures make `loop-state.mjs summary`
  exit 1; comprehension template presence.
- Forged-fixture test from loop 002 extended: a `success` claim whose ledger
  tail says `failed` must make `check-stop-reason.mjs` exit 1.
- Dogfood = loop 003 on Loopify itself: repo-mode bootstrap writes a profile
  for this repository **without touching existing loop folders**; the
  recurring-mode parser renders an automation prompt for the quality gate;
  stop reason requires `npm run quality`, `git diff --check`, and the
  untouched-folders check.

## Rollout

1. Loop 002 first (mandatory verifier — companion design); its
   `emit-verifier-agent.mjs` is shared infrastructure for this design's
   subagent emission.
2. Loop 003 implements this design in the absorption-map order: profile →
   ledger → comprehension → recurrence → audit → README.
3. Credits section in the README: "Loopify's runnable-harness mechanics were
   inspired by Sanket Dongre's loop-codex-plugin (MIT); interval-parsing
   rules and the understanding-debt artifact are adapted with attribution."

## File-by-File Change List

| File | Change |
| --- | --- |
| `plugins/.../loopify-bootstrap/SKILL.md` | repo mode (profile) + comprehension seeding |
| `plugins/.../loopify-bootstrap/scripts/probe-project.mjs` | new |
| `plugins/.../loopify-bootstrap/templates/profile.yaml` | new |
| `plugins/.../loopify-bootstrap/templates/loop-directory/comprehension.md` | new |
| `plugins/.../loopify-run/SKILL.md` | ledger steps, comprehension step, recurring mode |
| `plugins/.../loopify-run/scripts/loop-state.mjs` | new — append/summary/repeated-failure detector |
| `plugins/.../loopify-run/scripts/parse-cadence.mjs` | new |
| `plugins/.../loopify-run/templates/automation-prompt.md` | new (host-neutral) |
| `plugins/.../loopify-run/references/recurrence-and-wiring.md` | new — per-host scheduling recipes |
| `plugins/.../loopify-trace/SKILL.md`, `scripts/check-trace.mjs` | ledger cross-check |
| `plugins/.../loopify-review/SKILL.md` | audit-the-harness mode |
| `plugins/.../loopify-review/references/harness-audit-checklist.md` | new |
| `plugins/.../loopify-debug/references/stuck-loop-taxonomy.md` | repeated-failure detector as evidence source |
| `plugins/.../loopify-spec/templates/loop-contract.md` | understanding-debt stop condition |
| `docs/concepts/loop-patterns.md` | maintenance-loop genus + recurrence semantics |
| `docs/concepts/failure-modes.md` | understanding debt as failure mode |
| `scripts/validate-skills.mjs`, `smoke-test-examples.mjs` | new fixtures/checks |
| `README.md` | quick path table + credits |
| `.claude-plugin/marketplace.json`, `plugins/.../plugin.json` | version bump |
