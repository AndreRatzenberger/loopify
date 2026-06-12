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

1. Locate the loop directory or named trace file.
2. Create `trace.md` from `templates/trace.md` if missing.
3. Record each turn with command, result, failure, patch, rationale, and next
   check.
4. Preserve failed attempts and rejected directions.
5. Summarize final stop reason and evidence.
6. Use `templates/final-evidence-summary.md` for completion summaries.
7. Update `.loopify/index.md` when the stop reason changes.
8. Run the trace checker if available.

## Output

Default output: `.loopify/loops/NNN-slug/trace.md`, plus a final evidence
summary when requested.

Legacy `runs/trace.md` paths are supported when the user names one.

## Validation

- A reader can reconstruct the loop from the trace.
- Every final claim points to evidence.
- Missing trace data is flagged.

## Example

```text
Use loopify-trace to summarize .loopify/loops/001-papertrail/trace.md and report the stop reason plus residual risk.
```
