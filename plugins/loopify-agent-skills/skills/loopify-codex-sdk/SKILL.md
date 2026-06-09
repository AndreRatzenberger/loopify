---
name: loopify-codex-sdk
description: "Use when adding Codex SDK scripts or templates as loop actuators for repair, review, context building, trace summarization, or meta-loop proposal steps."
---

# loopify-codex-sdk

Add Codex SDK actuators to loops.

## When To Use

- A loop should call Codex SDK programmatically.
- A project needs a repair, review, evaluator, or trace-summarizer actuator.
- The loop needs resumable thread IDs, sandbox assumptions, or structured
  outputs.

## Do Not Use

- Do not treat a Codex SDK call as the whole loop.
- Do not write concrete SDK API calls from memory if current docs were not
  verified.
- Do not hide sandbox, model, cost, or authority decisions.

## Workflow

1. Read the Loop Contract.
2. Identify the actuator role: repair, review, evaluator, context builder,
   trace summarizer, or meta-loop proposer.
3. Verify current official SDK docs before concrete API calls.
4. If verification is unavailable, use clearly marked placeholders.
5. Scaffold the actuator from `templates/codex-repair-actuator.py` or
   `templates/codex-review-actuator.md`.
6. Encode authority boundaries and structured output.
7. Document that Codex SDK is the actuator, not the loop.

## Output

Codex SDK actuator script/template and integration notes.

## Validation

- The surrounding loop still owns checks, state, stop rules, and trace.
- Outputs are structured enough for the next loop step.
- Sandbox and authority assumptions are explicit.

## Example

```text
Use loopify-codex-sdk to scaffold a repair actuator for the failing check in docs/loop-contract.md.
```
