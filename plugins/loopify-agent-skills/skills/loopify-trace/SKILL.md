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
- A trace is messy, missing turn data, or missing a stop reason.

## Do Not Use

- Do not rewrite failed attempts out of the trace.
- Do not present a passing command as broader proof than it is.
- Do not hide missing evidence.

## Workflow

1. Locate or create the trace from `templates/trace.md`.
2. Record each turn with command, result, failure, patch, rationale, and next
   check.
3. Preserve failed attempts and rejected directions.
4. Summarize final stop reason and evidence.
5. Use `templates/final-evidence-summary.md` for completion summaries.
6. Run the trace checker if available.

## Output

Default output: `runs/trace.md`, plus a final evidence summary when requested.

## Validation

- A reader can reconstruct the loop from the trace.
- Every final claim points to evidence.
- Missing trace data is flagged.

## Example

```text
Use loopify-trace to summarize runs/trace.md and report the stop reason plus residual risk.
```
