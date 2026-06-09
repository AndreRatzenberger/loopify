# Loopify

Loopify is a Claude plugin-format skill bundle for turning specs into
executable feedback loops.

A prompt asks for an answer. A loop defines how the system keeps checking,
repairing, and stopping until reality matches the contract.

Loopify helps agents and humans move from:

```text
prompt once -> hope the result is good
```

to:

```text
spec -> loop contract -> checks -> attempts -> trace -> stop reason
```

## Why Loops

Prompts are still useful, but they are a weak unit of work for anything that
needs proof. A prompt can describe a desired answer. A loop names the feedback
system that decides whether another attempt is earned.

A spec says what should be true. A Loop Contract says what evidence would prove
it, which checks should run, what the agent may change, how retries work, when
to stop, and what trace must be left behind.

## Workflow

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

Use the smallest loop that fits. Simple work can stay a prompt. Repeated,
high-stakes, long-running, or hard-to-review work should have a contract,
checks, authority boundaries, and receipts.

## Install

```text
/plugin marketplace add AndreRatzenberger/loopify
/plugin install loopify-agent-skills@loopify
```

## Skills

| Skill | Purpose |
| --- | --- |
| `loopify-spec` | Convert a prose spec into a Loop Contract. |
| `loopify-bootstrap` | Seed a repo with loop materials, quality gate, and trace template. |
| `loopify-run` | Execute a Loop Contract by checking, patching, rerunning, and tracing. |
| `loopify-checks` | Turn vague requirements into concrete checks and review gates. |
| `loopify-trace` | Maintain loop receipts and final evidence summaries. |
| `loopify-review` | Audit Loop Contracts, traces, evidence, and authority boundaries. |
| `loopify-debug` | Diagnose stuck loops and choose recovery paths. |
| `loopify-demo` | Create demo-ready loop seed projects. |
| `loopify-codex-sdk` | Add Codex SDK scripts or templates as loop actuators. |
| `loopify-retro` | Extract reusable lessons from completed loops. |
| `loopify-governance` | Add budgets, approvals, rollback, and authority boundaries. |

## Use With A Future `/goal`

For a repo that already has a contract:

```text
/goal Read docs/loop-contract.md and run loopify-run until success, blocked, escalated, or budget-exhausted.
```

For a prose-heavy goal:

```text
Use loopify-spec on docs/goals/goal.md, write docs/loop-contract.md, then use loopify-bootstrap to seed checks and trace files.
```

The contract is the bridge. The `/goal` prompt should point at the contract and
quality gate instead of restating the whole project in chat.

## Examples

- `docs/examples/simple-web-app/` maps a tiny UI spec to build and Playwright
  checks.
- `docs/examples/markdown-research-note/` maps a research-note cleanup spec to
  source and uncertainty checks.
- `docs/examples/stuck-loop-debug/` shows repeated failure diagnosis.
- `docs/examples/papertrail/loop-contract.md` is a larger stress fixture
  generated from `docs/goals/prompt.md`.

## Validate

```bash
npm run quality
git diff --check
```

`npm run quality` validates plugin manifests, required skill materials, and
example loop contracts.

## Repository Shape

Loopify ships as a marketplace entry plus one plugin:

```text
.claude-plugin/marketplace.json
plugins/loopify-agent-skills/.claude-plugin/plugin.json
plugins/loopify-agent-skills/skills/
docs/concepts/
docs/examples/
scripts/
```

The repository is intentionally documentation-and-template heavy. The skills are
the product; scripts are only there to make missing pieces obvious.
