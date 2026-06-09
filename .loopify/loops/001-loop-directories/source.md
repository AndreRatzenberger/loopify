# Source Spec

Implement two workflow changes:

1. `loopify-spec` should be able to continue into `loopify-bootstrap` when the
   user explicitly asks for a runnable loop.
2. Runnable loops should be saved iteratively in numbered folders so additional
   features get their own state.

Preferred shape:

```text
.loopify/
  index.md
  loops/
    001-slug/
      source.md
      loop-contract.md
      quality-gate.sh
      acceptance-checklist.md
      trace.md
      final-report.md
      retro.md
      artifacts/
```
