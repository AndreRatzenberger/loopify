---
name: loopify-trace
description: "Use when creating, maintaining, auditing, or summarizing loop trace receipts that record checks, failures, patches, rationale, evidence, and stop reasons."
---

# loopify-trace

Maintain loop receipts.

## When To Use

- A loop needs a trace file.
- A finished loop needs evidence summarized.
- The user asks what happened across attempts.

## Workflow

1. Locate or create the trace.
2. Record each turn with command, result, failure, patch, rationale, and next
   check.
3. Preserve failed attempts and rejected directions.
4. Summarize final stop reason and evidence.
5. Flag missing trace data honestly.

## Output

Default output: `runs/trace.md`.
