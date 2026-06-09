# Loop Directory Example

The default runnable layout gives one loop a drawer for its keys, receipts, and
weird little artifacts:

```text
.loopify/
  index.md
  loops/
    001-tiny-events/
      source.md
      loop-contract.md
      quality-gate.sh
      acceptance-checklist.md
      trace.md
      final-report.md
      retro.md
      artifacts/
```

What this example teaches:

- One feature gets one numbered loop folder.
- The contract, checks, trace, reports, and evidence stay together.
- Future features can create `002-*` without rummaging through `001-*`.
