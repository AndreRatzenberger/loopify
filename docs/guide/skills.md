# Skills Reference

Loopify ships 11 skills. Four are the **spine** — the path most loops walk. The
other seven are **satellites**: you reach for them when a loop bites back, gets
risky, or finishes and has something to teach.

Each skill keeps its own `SKILL.md` lean; deeper guidance lives in that skill's
`references/`, copyable shapes in `templates/`, and deterministic helpers in
`scripts/`. This page is the at-a-glance map.

---

## The spine

```text
loopify-spec → loopify-bootstrap → loopify-run → loopify-trace
```

### `loopify-spec`

Convert a prose spec, PRD, README, issue, or goal prompt into a Loop Contract.

- **When to use:** you have a spec and want it made executable; a goal is too
  prose-heavy to run safely; "done" is vague or uncheckable.
- **When not to use:** a one-line task you can just do and verify directly; never
  to turn subjective requirements into fake automated checks; never to silently
  widen scope beyond the source.
- **Produces:** `.loopify/loops/NNN-slug/loop-contract.md` (or a path you name).
  It won't mutate the repo beyond the contract unless you explicitly ask it to
  bootstrap.
- **Example:**
  ```text
  Use loopify-spec on docs/goals/prompt.md and bootstrap it into .loopify/loops/001-papertrail/.
  ```

### `loopify-bootstrap`

Seed a repo with the files needed to run a loop.

- **When to use:** a project has a spec or contract but no loop harness; a demo
  repo needs a material pack; a goal should run from repo-relative files.
- **When not to use:** don't overwrite existing tests/scripts/docs without
  preserving intent; don't install dependencies unless implementation was
  authorized; don't make the gate pass by deleting meaningful checks.
- **Produces:** the full loop folder — `index.md` entry, `source.md`,
  `loop-contract.md`, `quality-gate.sh`, `acceptance-checklist.md`, `trace.md`,
  `final-report.md`, `retro.md`, and `artifacts/`. It notes in the loop README
  that `verdict.md` will be written by the verifier, not the maker.
- **Example:**
  ```text
  Use loopify-bootstrap with .loopify/loops/001-papertrail/loop-contract.md.
  ```

### `loopify-run`

Execute a loop from an existing contract: run checks, observe the failure, patch
the smallest cause, update the trace, rerun — and stop only with evidence.

- **When to use:** the repo has a loop folder, contract, or quality gate; you
  want to run until checks pass; a goal should proceed by evidence, not prose
  confidence.
- **When not to use:** never run outside the contract's authority boundaries;
  don't keep patching past the blocked rule; don't claim success without running
  the checks; **never write `verdict.md` yourself** — the maker doesn't grade its
  own homework.
- **Produces:** updated artifacts, an updated `trace.md`, and a `final-report.md`
  with a `Maker:` identity and a `Verdict:` link. Before claiming `success` it
  requests an independent verdict; it validates the stop claim with
  `check-stop-reason.mjs`.
- **Example:**
  ```text
  Use loopify-run on .loopify/loops/001-papertrail/. Stop only when quality-gate.sh passes or the blocked rule is met.
  ```

### `loopify-trace`

Maintain the loop's receipt — create, tidy, audit, or summarize the trace.

- **When to use:** a loop needs a trace file; a finished loop needs its evidence
  summarized; you want to know what happened across attempts; a trace is messy or
  missing its stop reason.
- **When not to use:** never rewrite failed attempts out of the trace; never
  present a passing command as broader proof than it is; never hide missing
  evidence.
- **Produces:** `trace.md` (turn-by-turn: command, result, failure, patch,
  rationale, next check), plus a final evidence summary when asked.
- **Example:**
  ```text
  Use loopify-trace to summarize .loopify/loops/001-papertrail/trace.md and report the stop reason plus residual risk.
  ```

---

## Quality & honesty

### `loopify-checks`

Turn vague requirements into honest evidence — concrete checks, visual gates,
manual review items, acceptance tests.

- **When to use:** a contract has weak evidence; a spec leans on words like
  *polished*, *fast*, *delightful*, *production-ready*; a project needs tests,
  screenshot checks, build checks, or manual gates.
- **When not to use:** never invent tests that don't prove the requirement; never
  erase manual review just because automation is easier; don't change product
  behavior unless implementation was authorized.
- **Produces:** an updated contract / quality gate / tests / screenshot plan /
  acceptance checklist, with the Requirement Evidence Map updated.
- **Example:**
  ```text
  Use loopify-checks to strengthen .loopify/loops/001-papertrail/loop-contract.md for mobile layout and fallback behavior.
  ```

### `loopify-review`

Audit a loop — **or** act as the independent verifier that grades a success
claim. Two modes, one skill.

- **When to use (audit):** a loop claims done; a gate may be incomplete; a
  contract may have weak evidence or broad authority; a trace needs review before
  a human accepts it.
- **When to use (verifier mode):** a loop requests verification per its contract's
  `## Verification` section. In this mode the skill re-runs the gate itself,
  grades every evidence-map row, and writes `verdict.md` — its only write —
  ending in `approve` / `reject` / `cannot-verify`.
- **When not to use:** never rubber-stamp passing tests; never bury findings below
  a summary; never treat missing evidence as low-risk by default.
- **Produces:** a severity-ordered review report (audit mode) or `verdict.md`
  (verifier mode).
- **Example:**
  ```text
  Use loopify-review on .loopify/loops/001-papertrail/loop-contract.md, its trace.md, and the current git diff.
  ```

### `loopify-debug`

Rescue stuck loops before they become doom spirals.

- **When to use:** the same failure repeats; checks are flaky or invalid; the
  evaluator is weak; the loop is burning turns without converging; the next move
  might be *blocked* or *escalated*, not another patch.
- **When not to use:** don't keep applying cosmetic patches to repeated failures;
  don't weaken checks to escape; don't ignore authority-boundary conflicts.
- **Produces:** a diagnosis, a recovery plan, or a blocked/escalated report that
  cites the contract rule.
- **Example:**
  ```text
  Use loopify-debug on docs/examples/stuck-loop-debug/trace.md and classify why the loop is not converging.
  ```

---

## Release & advanced

### `loopify-demo`

Build demo-ready loop seed projects — a normal app target, a material pack, a
quality gate, and a presenter script — so "I don't prompt, I loop" is obvious to
a room.

- **When to use:** you want a demo of loop engineering; a seed repo should show a
  normal app being built by a loop; a workshop or article needs visible evidence
  of a loop running.
- **When not to use:** don't make the app itself the whole story (the *loop* is
  the demo); don't use private context in a public demo; don't hide the first
  failing observation.
- **Produces:** a demo seed repo or material pack plus presenter notes.
- **Example:**
  ```text
  Use loopify-demo to create a tiny event-board seed repo with a failing Playwright acceptance check.
  ```

### `loopify-codex-sdk`

Scaffold Codex SDK scripts as loop **actuators** — repair, review, evaluator,
context-builder, or trace-summarizer steps. The SDK call is the actuator, not the
loop.

- **When to use:** a loop should call the Codex SDK programmatically; a project
  needs a repair/review/evaluator/summarizer actuator; the loop needs resumable
  threads, sandbox assumptions, or structured outputs.
- **When not to use:** never treat an SDK call as the whole loop; never write
  concrete SDK API calls from memory if current docs weren't verified; never hide
  sandbox, model, cost, or authority decisions.
- **Produces:** an actuator script/template plus integration notes — with the
  surrounding loop still owning checks, state, stop rules, and trace.
- **Example:**
  ```text
  Use loopify-codex-sdk to scaffold a repair actuator for the failing check in .loopify/loops/001-papertrail/loop-contract.md.
  ```

### `loopify-retro`

After a loop finishes, extract reusable lessons from the contract, trace, diff,
and failures — including the useful *rejected* attempts.

- **When to use:** a loop finished; trace data should improve future specs or
  checks; failures reveal recurring weak spots.
- **When not to use:** don't write a generic victory lap; don't promote a
  project-specific lesson to universal without evidence; don't discard "why not
  that" knowledge.
- **Produces:** a retro document and concrete recommendations for future contract
  templates.
- **Example:**
  ```text
  Use loopify-retro on .loopify/loops/001-papertrail/trace.md and write .loopify/loops/001-papertrail/retro.md.
  ```

### `loopify-governance`

Add budgets, approvals, rollback, authority boundaries, and harness-change
contracts to higher-risk loops — making them slower and safer on purpose.

- **When to use:** a loop can affect production, security, money, data,
  migrations, dependencies, public content, or external accounts; a loop can
  mutate its own harness, checks, prompts, tools, or config; a loop needs
  budgets, approvals, rollback, or stronger boundaries.
- **When not to use:** don't slow low-risk loops with ceremony; never let an
  agent silently widen its own authority; don't treat approval as durable unless
  it's recorded.
- **Produces:** a governance addendum, an updated contract, or a harness-change
  contract — with high-risk actions gated on explicit approval and rollback named
  where mutation is possible.
- **Example:**
  ```text
  Use loopify-governance to add budgets, denied paths, and a harness-change contract to .loopify/loops/001-papertrail/loop-contract.md.
  ```
