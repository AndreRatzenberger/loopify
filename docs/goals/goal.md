# Goal: Build Loopify, a Skill Bundle for Turning Specs into Loops

Work from the repository root that contains this file. If this goal is invoked
from elsewhere, first locate `docs/goals/goal.md`, then treat that repository
root as the working directory.

Build the full **Loopify** project as a Claude plugin-format skill bundle,
using the scaffold and manifests already present in this repository as the
initial source of truth, and publish it to the `AndreRatzenberger` GitHub
account.

Do not stop after scaffolding. The project is done only when the repository is
usable end to end: README, manifests, plugin metadata, all skills, supporting
references/scripts/templates, validation checks, initial git commit, GitHub
remote, and push are complete.

## Product Thesis

Loopify turns specs into executable feedback loops.

A spec says what should be true. A loopified spec says how reality is allowed
to prove it became true.

The bundle should help agents and humans move from:

```text
prompt once -> hope the result is good
```

to:

```text
spec -> loop contract -> checks -> attempts -> trace -> stop reason
```

The key distinction:

- **Spec**: desired end state.
- **Loop**: repeated feedback system that moves current reality toward that
  end state with checks, repair, boundaries, and receipts.
- **Loop Contract**: the bridge between them. It names requirements, evidence,
  allowed changes, checks, manual gates, stop rules, blocked rules, and trace
  expectations.

## Required Repository Shape

Create a repo with this high-level structure:

```text
loopify/
  .claude-plugin/
    marketplace.json
  .gitignore
  README.md
  LICENSE
  CONTRIBUTING.md
  docs/
    goals/
      goal.md
    concepts/
      loop-contract.md
      loop-patterns.md
      failure-modes.md
    examples/
      simple-web-app/
        README.md
        spec.md
        expected-loop-contract.md
      markdown-research-note/
        README.md
        spec.md
        expected-loop-contract.md
      stuck-loop-debug/
        README.md
        trace.md
        expected-diagnosis.md
  plugins/
    loopify-agent-skills/
      .claude-plugin/
        plugin.json
      README.md
      skills/
        loopify-spec/
          SKILL.md
          references/
          scripts/
          templates/
        loopify-bootstrap/
          SKILL.md
          references/
          scripts/
          templates/
        loopify-run/
          SKILL.md
          references/
          scripts/
          templates/
        loopify-checks/
          SKILL.md
          references/
          scripts/
          templates/
        loopify-trace/
          SKILL.md
          references/
          scripts/
          templates/
        loopify-review/
          SKILL.md
          references/
          scripts/
          templates/
        loopify-debug/
          SKILL.md
          references/
          scripts/
          templates/
        loopify-demo/
          SKILL.md
          references/
          scripts/
          templates/
        loopify-codex-sdk/
          SKILL.md
          references/
          scripts/
          templates/
        loopify-retro/
          SKILL.md
          references/
          scripts/
          templates/
        loopify-governance/
          SKILL.md
          references/
          scripts/
          templates/
  scripts/
    validate-manifests.mjs
    validate-skills.mjs
    smoke-test-examples.mjs
```

The exact file count can differ if a cleaner structure emerges, but the repo
must contain every skill and enough support material that the bundle is
installable, understandable, and testable.

## Plugin Format Requirements

Use the **Claude plugin format** scaffolded in this repository, not a
Codex-only plugin format.

At repo root, create:

```text
.claude-plugin/marketplace.json
```

Use this shape:

```json
{
  "name": "loopify",
  "owner": {
    "name": "Andre Ratzenberger"
  },
  "metadata": {
    "description": "Loopify - skills for converting specs into executable feedback loops with checks, traces, governance, and demos",
    "version": "0.1.0",
    "homepage": "https://github.com/AndreRatzenberger/loopify"
  },
  "plugins": [
    {
      "name": "loopify-agent-skills",
      "source": "./plugins/loopify-agent-skills",
      "description": "Skills for loopifying specs, bootstrapping loop materials, running loop contracts, designing checks, maintaining traces, reviewing loops, debugging stuck loops, building demos, using Codex SDK actuators, extracting retros, and adding governance."
    }
  ]
}
```

Inside `plugins/loopify-agent-skills/.claude-plugin/plugin.json`, use this
shape:

```json
{
  "name": "loopify-agent-skills",
  "version": "0.1.0",
  "description": "Loopify agent skills for turning specs into executable feedback loops with evidence, traces, stop rules, and governance.",
  "author": {
    "name": "Andre Ratzenberger"
  },
  "homepage": "https://github.com/AndreRatzenberger/loopify",
  "repository": "https://github.com/AndreRatzenberger/loopify",
  "license": "MIT"
}
```

Do not use white duck branding. Loopify is an Andre Ratzenberger project.

## README Requirements

Create a strong root `README.md` that explains:

- what Loopify is
- why loops are different from prompts
- why loops are different from specs
- what a Loop Contract is
- how to install the plugin bundle
- what each skill does
- the recommended workflow
- how to use Loopify with a future `/goal`
- how to validate the bundle
- examples

The README should include this core phrase or a close variant:

```text
A prompt asks for an answer. A loop defines how the system keeps checking,
repairing, and stopping until reality matches the contract.
```

Add a compact workflow diagram:

```text
spec
  -> loopify-spec
  -> loop-contract.md
  -> loopify-bootstrap
  -> checks + trace + quality gate
  -> loopify-run
  -> done / blocked / escalated
  -> loopify-retro
```

The README should be public-safe and should not mention private projects unless
used as local-only examples under `docs/examples`.

## Skill Authoring Rules

Every skill must have:

- `SKILL.md`
- YAML frontmatter with `name` and `description`
- crisp "When to use" guidance
- "Do not use this for" guidance when relevant
- a concrete workflow
- expected artifacts or outputs
- validation guidance
- at least one compact example invocation or output shape

Keep each `SKILL.md` lean enough to be loaded in context. Move reusable schemas,
templates, examples, and detailed taxonomies into `references/` or `templates/`
inside the skill folder.

Use progressive disclosure:

- SKILL.md contains the core procedure.
- `references/` contains optional deeper guidance.
- `templates/` contains reusable output templates.
- `scripts/` contains deterministic helpers.

Do not fill skills with generic agent advice. The skills should encode the
Loopify method.

## Core Shared Vocabulary

Use this vocabulary consistently across all skills.

### Loop Contract

A document that turns a spec into an executable feedback loop.

Required sections:

```md
# Loop Contract

## Source Spec
## Objective
## Requirements
## Non-Goals
## Requirement Evidence Map
## Automated Checks
## Manual / Visual Review Items
## Allowed Changes
## Authority Boundaries
## Loop Procedure
## Stop Conditions
## Blocked Conditions
## Trace Requirements
## Final Report Requirements
```

### Evidence Class

Each requirement should be classified:

- `automated`: can be checked by a command, test, script, lint, build, or
  machine-verifiable assertion
- `visual`: needs screenshot or rendered UI review
- `manual`: needs human judgment
- `ambiguous`: cannot be checked until clarified or narrowed
- `out-of-scope`: explicitly not pursued by this loop

### Quality Gate

A command or script that runs the checks used by the loop.

Examples:

```bash
npm run quality
bash scripts/quality-gate.sh
pytest && ruff check .
python scripts/check_loop_contract.py docs/loop-contract.md
```

### Trace

A loop receipt that records every turn:

```md
# Loop Trace

## Turn 1

- Command:
- Result:
- Failure observed:
- Patch:
- Why this patch:
- Next check:

## Final

- Stop reason:
- Passing command:
- Evidence:
- Remaining caveats:
```

### Stop Reason

Every loop must stop with one of:

- `success`: checks pass and manual/visual gates are satisfied or explicitly
  queued for human review
- `blocked`: same blocker repeats according to the contract, or a required
  external dependency/input is unavailable
- `escalated`: risk, ambiguity, authority boundary, or spec contradiction
  requires a human decision
- `budget-exhausted`: the contract's time/turn/cost budget was reached

## Required Skills

Build all 11 skills below. The first 8 are the core bundle. The final 3 are
second-wave skills but must still ship in this project.

### 1. `loopify-spec`

Purpose: Convert a prose spec, README, issue, PRD, design doc, or goal prompt
into a Loop Contract.

Use when:

- the user has a spec and wants it made executable
- a goal is too prose-heavy to run safely
- "done" is vague or uncheckable
- a future `/goal` needs a stronger contract before implementation

Core workflow:

1. Locate and read the source spec.
2. Extract requirements, constraints, non-goals, and subjective language.
3. Classify each requirement by evidence class.
4. Propose automated checks for checkable requirements.
5. Identify manual/visual review items.
6. Identify ambiguous requirements and either ask for clarification or encode
   safe assumptions.
7. Define allowed changes and authority boundaries.
8. Define loop procedure, stop rules, blocked rules, trace requirements, and
   final report requirements.
9. Write `docs/loop-contract.md` or the user-specified contract path.

Must include:

- a `templates/loop-contract.md`
- a `references/evidence-classes.md`
- a `references/spec-to-loop-method.md`
- optionally a helper script that checks required Loop Contract headings

Definition of done for this skill:

- It can turn `docs/examples/simple-web-app/spec.md` into a contract close to
  `expected-loop-contract.md`.
- It does not pretend subjective requirements are automated.
- It names ambiguity instead of burying it.

### 2. `loopify-bootstrap`

Purpose: Seed a repo with loop materials from a Loop Contract.

Use when:

- a project needs `goal-prompt.md`, quality gate, trace template, and checklist
- a demo seed repo should be prepared with a normal app target, material pack,
  checks, and a first-observation failure
- a spec exists but the repo has no loop harness yet

Core workflow:

1. Read the Loop Contract.
2. Inspect repo tech stack and existing commands.
3. Create or update:
   - `materials/goal-prompt.md` or `docs/goals/goal.md`
   - `docs/loop-contract.md`
   - `scripts/quality-gate.sh`
   - `runs/trace.md` template or `runs/.gitkeep`
   - acceptance checklist
   - optional test skeletons
4. Make scripts executable.
5. Run the lightest validation available.

Must include:

- `templates/goal-prompt.md`
- `templates/quality-gate.sh`
- `templates/trace.md`
- `references/repo-stack-detection.md`

Definition of done for this skill:

- It can bootstrap a JS/Vite repo, Python repo, or markdown-only repo.
- It does not overwrite existing tests or scripts without preserving them.
- It leaves a clear first failing check if implementation has not happened.

### 3. `loopify-run`

Purpose: Execute a loop from an existing Loop Contract.

Use when:

- the user says to run a loop until checks pass
- a repo has a Loop Contract and quality gate
- a `/goal` should proceed by evidence, not prose confidence

Core workflow:

1. Read the Loop Contract.
2. Confirm allowed paths and authority boundaries.
3. Run the quality gate or specified checks.
4. Observe exact failure.
5. Patch the smallest useful change.
6. Update trace.
7. Rerun checks.
8. Repeat until success, blocked, escalated, or budget-exhausted.
9. Final report includes stop reason, checks, trace path, caveats.

Must include:

- `references/loop-execution-protocol.md`
- `templates/run-final-report.md`
- optional `scripts/summarize-trace.mjs`

Definition of done for this skill:

- It strongly discourages claiming done without running checks.
- It treats repeated failures as data, not shame.
- It respects authority boundaries and does not silently widen scope.

### 4. `loopify-checks`

Purpose: Turn vague requirements into concrete checks and review gates.

Use when:

- a Loop Contract has weak evidence
- a spec has phrases like "polished", "fast", "works", "delightful", or
  "production-ready"
- a project needs Playwright, unit, lint, build, screenshot, or manual review
  checks

Core workflow:

1. Read spec or Loop Contract.
2. Identify weak or missing evidence.
3. Suggest checks by evidence class.
4. Add or draft tests/scripts only when authorized.
5. Keep manual/visual review explicit when automation is not honest.
6. Update the Loop Contract evidence map.

Must include:

- `references/check-patterns.md`
- `references/visual-review-gates.md`
- `references/manual-review-language.md`
- `templates/acceptance-checklist.md`

Definition of done for this skill:

- It improves evidence without turning taste into fake tests.
- It distinguishes automated proof from human review.
- It can add Playwright tests for simple UI requirements.

### 5. `loopify-trace`

Purpose: Maintain loop receipts.

Use when:

- a loop needs a trace file
- a completed loop needs evidence summarized
- a user wants to know what happened across attempts
- the trace is messy or missing stop reason

Core workflow:

1. Locate or create trace file.
2. Record each turn with command, result, failure, patch, rationale, next check.
3. Preserve failed attempts and rejected directions.
4. Summarize final stop reason and evidence.
5. Flag missing trace data honestly.

Must include:

- `templates/trace.md`
- `templates/final-evidence-summary.md`
- optional `scripts/check-trace.mjs`

Definition of done for this skill:

- A reader can reconstruct the loop from the trace.
- The trace distinguishes passing command from broader acceptance.
- The trace preserves useful failure memory.

### 6. `loopify-review`

Purpose: Audit a loop before or after execution.

Use when:

- a Loop Contract may be too weak
- a loop claims done and needs review
- a quality gate may be fake, incomplete, or too narrow
- authority creep or "done by vibes" risk is suspected

Core workflow:

1. Read Loop Contract, trace, checks, and diff if present.
2. Review requirement coverage.
3. Identify weak evidence, missing checks, ambiguous stop rules, overbroad
   authority, and untested behavior.
4. Produce findings ordered by severity.
5. Recommend concrete contract/check/trace fixes.

Must include:

- `references/review-rubric.md`
- `templates/review-report.md`

Definition of done for this skill:

- It behaves like code review: findings first, severity-ordered, file/path
  grounded.
- It does not rubber-stamp passing tests.
- It names residual risk.

### 7. `loopify-debug`

Purpose: Rescue stuck loops.

Use when:

- the same failure repeats
- checks are flaky
- the evaluator is weak
- the agent keeps patching the wrong thing
- the loop is burning turns without converging

Core workflow:

1. Read Loop Contract and trace.
2. Classify the stuck pattern:
   - repeated exact failure
   - moving-target failure
   - flaky check
   - invalid check
   - missing context
   - authority boundary conflict
   - impossible spec
   - evaluator weakness
   - budget/stop problem
3. Recommend recovery:
   - narrow scope
   - strengthen check
   - isolate failing unit
   - ask human decision
   - rewrite contract
   - mark blocked
4. Patch only if the recovery is clear and authorized.

Must include:

- `references/stuck-loop-taxonomy.md`
- `templates/blocked-report.md`
- `templates/recovery-plan.md`

Definition of done for this skill:

- It prevents endless patching.
- It can turn chaos into a blocked/escalated/success path.
- It is honest when the spec or check is the problem.

### 8. `loopify-demo`

Purpose: Create demo-ready loop projects.

Use when:

- the user wants a spectacle demo showing a normal app built by a loop
- a seed repo should include spec, data, tests, gate, trace, and presenter
  script
- the demo should make "I do not prompt, I loop" obvious to laypeople

Core workflow:

1. Choose a normal app target with visible behavior.
2. Create material pack:
   - app brief
   - design direction
   - seeded data
   - acceptance checklist
   - quality gate
   - goal prompt
   - demo script
3. Leave the app intentionally incomplete if the demo is about the loop build.
4. Verify material checks pass and quality gate fails for intended acceptance
   reason.

Must include:

- `references/demo-patterns.md`
- `templates/demo-goal-prompt.md`
- `templates/demo-script.md`
- `templates/material-pack/`

Definition of done for this skill:

- It can reproduce the shape of a normal app loop demo without private context.
- It separates "the app is the demo target" from "the build process is the
  loop".
- It creates clear first-observation failure.

### 9. `loopify-codex-sdk`

Purpose: Add Codex SDK scripts as loop actuators.

Use when:

- a loop should call Codex SDK programmatically
- a project wants a repair/review/evaluator script
- a loop needs resumable thread IDs, sandbox settings, or structured outputs

Core workflow:

1. Read Loop Contract.
2. Identify which loop step should use Codex SDK:
   - repair actuator
   - review/evaluator
   - context builder
   - trace summarizer
   - meta-loop proposer
3. Scaffold minimal script and config.
4. Encode authority boundaries and sandbox assumptions.
5. Ensure script outputs are structured enough for the surrounding loop.
6. Add docs explaining that Codex SDK is the actuator, not the whole loop.

Must include:

- `references/codex-sdk-loop-actuators.md`
- `templates/codex-repair-actuator.py` or a language-neutral pseudocode
  template if current SDK shape needs confirmation
- `templates/codex-review-actuator.md`

Important:

The Codex SDK is current and may change. When implementing this skill, verify
the current official Codex SDK docs before writing concrete API calls. If
verification is not possible, provide templates with clearly marked placeholders
instead of fake APIs.

Definition of done for this skill:

- It explains actuator vs loop clearly.
- It never hides sandbox/authority decisions.
- It can scaffold a small script or template without pretending unverified SDK
  details are stable.

### 10. `loopify-retro`

Purpose: Extract lessons after a loop completes.

Use when:

- a loop finished and the user wants reusable learning
- trace data should improve future specs or checks
- failures reveal recurring weak spots

Core workflow:

1. Read Loop Contract, trace, final diff, and final report.
2. Identify:
   - ambiguous spec phrases
   - checks that caught real issues
   - checks that were missing
   - repeated failure clusters
   - authority or scope surprises
   - useful rejected attempts
3. Write a retro document.
4. Recommend updates to future Loop Contract templates.
5. Optionally update project docs or memory if the user asked for memory.

Must include:

- `templates/loop-retro.md`
- `references/retro-patterns.md`

Definition of done for this skill:

- It converts one loop into future process improvement.
- It preserves "why not that" knowledge.
- It distinguishes project-specific lessons from reusable Loopify improvements.

### 11. `loopify-governance`

Purpose: Add governance to higher-risk loops.

Use when:

- a loop can affect production, security, money, external accounts, data,
  migrations, dependencies, or public content
- a loop needs budgets, human approval, rollback, or stronger authority
  boundaries
- a loop can mutate its own harness, checks, prompts, or agent configuration

Core workflow:

1. Read Loop Contract and identify risk class.
2. Add governance:
   - budgets
   - allowed paths
   - denied paths
   - required approvals
   - rollback plan
   - dependency policy
   - data/privacy constraints
   - harness mutation change contract
3. Update stop/escalation rules.
4. Add review gates.

Must include:

- `references/risk-classes.md`
- `references/authority-boundaries.md`
- `templates/governance-addendum.md`
- `templates/harness-change-contract.md`

Definition of done for this skill:

- It makes high-risk loops slower and safer on purpose.
- It treats harness mutations as changes to future behavior distribution.
- It never lets an agent silently widen its own authority.

## Shared References

Create shared conceptual docs under `docs/concepts/`:

### `docs/concepts/loop-contract.md`

Explain:

- what a Loop Contract is
- required sections
- evidence classes
- how to write stop/blocked/escalation rules
- examples

### `docs/concepts/loop-patterns.md`

Explain common loop types:

- test/repair loop
- evaluator/optimizer loop
- research/source loop
- visual polish loop
- benchmark/optimization loop
- scheduled maintenance loop
- human-in-the-loop review loop
- meta-loop/harness-improvement loop

### `docs/concepts/failure-modes.md`

Explain:

- token fire
- doom loop
- weak evaluator
- fake green check
- benchmark overfit
- authority creep
- missing context
- moving target spec
- hidden subjective requirement
- favorite-frame overfitting
- silent harness mutation

## Scripts and Validation

Add deterministic validation scripts where useful.

At minimum create:

### `scripts/validate-manifests.mjs`

Checks:

- `.claude-plugin/marketplace.json` exists and parses as JSON
- marketplace has `name`, `owner.name`, `metadata.description`,
  `metadata.version`, and `plugins`
- plugin entry points to `./plugins/loopify-agent-skills`
- `plugins/loopify-agent-skills/.claude-plugin/plugin.json` exists and parses
- plugin manifest has `name`, `version`, `description`, `author.name`,
  `homepage`, `repository`, and `license`

### `scripts/validate-skills.mjs`

Checks:

- all 11 required skill directories exist
- every skill has `SKILL.md`
- every `SKILL.md` has YAML frontmatter with `name` and `description`
- frontmatter `name` matches directory name
- every skill has at least one `references/` or `templates/` file unless a
  deliberate exception is documented

### `scripts/smoke-test-examples.mjs`

Checks:

- example specs exist
- expected loop contracts exist
- required headings appear in expected loop contracts
- trace/debug example has enough fields to be useful

If Node is not desirable, use Python scripts instead, but keep validation
runnable by one obvious command.

Add a README command:

```bash
node scripts/validate-manifests.mjs
node scripts/validate-skills.mjs
node scripts/smoke-test-examples.mjs
```

Or wrap them in:

```bash
bash scripts/quality-gate.sh
```

if you create a quality gate.

## Examples

Create at least three examples.

### `docs/examples/simple-web-app/`

Contains:

- `README.md`
- `spec.md`
- `expected-loop-contract.md`

The spec should describe a small UI app. The expected contract should map
requirements to Playwright/build/manual checks.

### `docs/examples/markdown-research-note/`

Contains:

- `README.md`
- `spec.md`
- `expected-loop-contract.md`

The spec should describe improving a markdown research note. The expected
contract should map claims to source checks, citation requirements, and manual
review items.

### `docs/examples/stuck-loop-debug/`

Contains:

- `README.md`
- `trace.md`
- `expected-diagnosis.md`

The trace should show a repeated loop failure. The diagnosis should classify
the stuck pattern and recommend recovery.

## Installation Instructions

Add installation docs matching the Claude plugin format and the manifests in
this repository:

```bash
/plugin marketplace add AndreRatzenberger/loopify
/plugin install loopify-agent-skills@loopify
```

If actual plugin install syntax differs locally, inspect existing plugin docs
or installed examples and update the README to match current reality.

## GitHub Remote and Publishing

Initialize git if needed.

Use the `AndreRatzenberger` GitHub account/org for the remote:

```text
https://github.com/AndreRatzenberger/loopify
```

Before creating or pushing the remote:

1. Run `gh auth status`.
2. Verify the active GitHub identity can create repos under
   `AndreRatzenberger`.
3. Verify git author email is appropriate for Andre Ratzenberger work.

Create the GitHub repo if it does not exist.

Unless Andre says otherwise, make the repository **private** because the path is
under `~/projects/private`. If Andre explicitly asks to make it public, use
public.

Commit and push the finished project to `origin/main`.

## Memory

Initialize project memory if `codies-memory` is available:

```bash
codies-memory init --type project --agent Codie --working-dir "$(pwd)"
```

Create a project session/decision note summarizing:

- Loopify exists as a Claude plugin-format skill bundle
- all 11 skills are included
- the core concept is spec -> Loop Contract -> checks -> run -> trace -> retro
- remote/repo privacy status
- validation commands and results

If memory tooling is unavailable, note that in the final report instead of
blocking.

## Implementation Order

Follow this order.

1. Inspect the existing scaffold and plugin manifests for exact plugin shape.
2. Create root repo docs and manifests.
3. Create plugin folder and plugin manifest.
4. Create root README.
5. Create shared concepts.
6. Create required examples.
7. Create validation scripts.
8. Create core skills:
   - `loopify-spec`
   - `loopify-bootstrap`
   - `loopify-run`
   - `loopify-checks`
   - `loopify-trace`
   - `loopify-review`
   - `loopify-debug`
   - `loopify-demo`
9. Create second-wave skills:
   - `loopify-codex-sdk`
   - `loopify-retro`
   - `loopify-governance`
10. Run validation.
11. Initialize memory.
12. Commit.
13. Create GitHub remote if needed.
14. Push.
15. Final report.

## Quality Bar

This project should feel like a real first release, not a placeholder pile.

README:

- clear
- public-safe
- installable
- concise but complete

Skills:

- trigger descriptions are specific
- workflows are actionable
- outputs are named
- validation is included
- no huge generic filler

References:

- useful enough that future agents can load them as needed
- not duplicated across every skill

Examples:

- small enough to understand quickly
- concrete enough to test the skill behavior

Validation:

- catches missing manifests, missing skills, malformed frontmatter, and broken
  examples

Git:

- clean worktree at end
- commit message describes project value
- pushed to `origin/main`

## Completion Audit

Before claiming done, verify every item below with current evidence.

### Repository

- [ ] The current repository exists and contains `docs/goals/goal.md`.
- [ ] It is a git repo on `main`.
- [ ] `.gitignore` exists.
- [ ] `LICENSE` exists.
- [ ] `CONTRIBUTING.md` exists.
- [ ] `README.md` exists and describes installation, workflow, skills, and
      validation.

### Plugin Manifests

- [ ] `.claude-plugin/marketplace.json` exists and parses.
- [ ] `plugins/loopify-agent-skills/.claude-plugin/plugin.json` exists and
      parses.
- [ ] Manifest names and repository URLs are correct.
- [ ] Manifests point to `AndreRatzenberger/loopify`.

### Skills

- [ ] `loopify-spec` exists and validates.
- [ ] `loopify-bootstrap` exists and validates.
- [ ] `loopify-run` exists and validates.
- [ ] `loopify-checks` exists and validates.
- [ ] `loopify-trace` exists and validates.
- [ ] `loopify-review` exists and validates.
- [ ] `loopify-debug` exists and validates.
- [ ] `loopify-demo` exists and validates.
- [ ] `loopify-codex-sdk` exists and validates.
- [ ] `loopify-retro` exists and validates.
- [ ] `loopify-governance` exists and validates.

### Concepts and Examples

- [ ] `docs/concepts/loop-contract.md` exists.
- [ ] `docs/concepts/loop-patterns.md` exists.
- [ ] `docs/concepts/failure-modes.md` exists.
- [ ] `docs/examples/simple-web-app/` exists and has spec plus expected
      contract.
- [ ] `docs/examples/markdown-research-note/` exists and has spec plus
      expected contract.
- [ ] `docs/examples/stuck-loop-debug/` exists and has trace plus expected
      diagnosis.

### Validation

- [ ] Manifest validation passes.
- [ ] Skill validation passes.
- [ ] Example smoke tests pass.
- [ ] `git diff --check` passes.

### Memory and Remote

- [ ] Project memory initialized or unavailable status reported.
- [ ] GitHub remote exists at `AndreRatzenberger/loopify`.
- [ ] Repo privacy matches Andre's instruction or private default.
- [ ] Final commit exists.
- [ ] Push to `origin/main` succeeded.

## Final Report Requirements

Report:

- repository path
- remote URL
- privacy status
- commit hash
- push status
- validation command results
- list of skills created
- memory initialization status
- any caveats or intentionally deferred work

Do not claim the project is done until the completion audit passes.
