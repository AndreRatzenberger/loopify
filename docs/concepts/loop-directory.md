# Loop Directory

One loop should fit in one folder:

```text
.loopify/
  index.md
  loops/
    001-first-loop/
      source.md
      loop-contract.md
      quality-gate.sh
      acceptance-checklist.md
      trace.md
      final-report.md
      retro.md
      artifacts/
```

Loopify uses this shape for runnable work. One loop, one little box of
evidence.

## Why Not One Global Contract?

A repo accumulates loops: first feature, next feature, repair pass, polish pass,
release pass, migration, demo, retrospective. If all of those write
`docs/loop-contract.md` and `runs/trace.md`, the repo gets a junk drawer with a
Markdown extension.

Numbered loop folders make history reviewable:

- `001-papertrail` can prove the first app loop.
- `002-mobile-polish` can narrow authority to screenshots and CSS.
- `003-release-readiness` can focus on packaging, docs, and publish checks.

Each loop can inherit lessons from the previous one without pretending it is the
same job.

## Naming

Use a three-digit sequence plus a short slug:

```text
.loopify/loops/001-papertrail/
.loopify/loops/002-mobile-polish/
.loopify/loops/003-release-readiness/
```

Pick the next number by scanning existing folders. Keep the slug descriptive,
lowercase, and stable.

## The Index

`.loopify/index.md` is a ledger, not a database. It should answer:

- Which loops exist?
- What source started each loop?
- Is the loop planned, running, blocked, escalated, complete, or abandoned?
- What stop reason was recorded?
- When was it last updated?

Details stay inside the loop folder.

## Spec And Bootstrap

`loopify-spec` is a compiler by default: it reads prose and writes a Loop
Contract. It should not silently create repo state.

When the user asks to "bootstrap it", "make this runnable", "prepare the repo",
or "create the loop folder", `loopify-spec` should hand off to
`loopify-bootstrap` with the chosen loop directory. Smooth workflow, no surprise
mutation.
