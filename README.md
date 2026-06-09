# Loopify

Loopify is a Claude plugin-format skill bundle for turning specs into
executable feedback loops.

A prompt asks for an answer. A loop defines how the system keeps checking,
repairing, and stopping until reality matches the contract.

## Core Idea

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

A spec says what should be true. A Loop Contract says what evidence would prove
it, which checks to run, what the agent may change, how retries work, when to
stop, and what trace must be left behind.

## Skills

| Skill | Purpose |
| --- | --- |
| `loopify-spec` | Convert a spec into a Loop Contract. |
| `loopify-bootstrap` | Seed a repo with loop materials, quality gate, and trace template. |
| `loopify-run` | Execute a Loop Contract by checking, patching, rerunning, and tracing. |
| `loopify-checks` | Turn vague requirements into concrete checks and review gates. |
| `loopify-trace` | Maintain loop receipts and final evidence summaries. |
| `loopify-review` | Audit Loop Contracts, traces, evidence, and authority boundaries. |
| `loopify-debug` | Diagnose stuck loops and choose recovery paths. |
| `loopify-demo` | Create demo-ready loop seed projects. |
| `loopify-codex-sdk` | Add Codex SDK scripts as loop actuators. |
| `loopify-retro` | Extract reusable lessons from completed loops. |
| `loopify-governance` | Add budgets, approvals, rollback, and authority boundaries. |

## Install

```text
/plugin marketplace add AndreRatzenberger/loopify
/plugin install loopify-agent-skills@loopify
```

## Try The Fixture Prompt

The goals folder contains a deliberately large test spec:

```text
docs/goals/prompt.md
```

Use it to exercise `loopify-spec`:

```text
Use loopify-spec on docs/goals/prompt.md and write docs/examples/papertrail/loop-contract.md.
```

## Validate

```bash
npm run quality
```

This checks manifests, required skill skeletons, and example fixtures.
