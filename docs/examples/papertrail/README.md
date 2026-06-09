# PaperTrail Stress Fixture

`docs/goals/prompt.md` is the source spec for this example. It is intentionally
large and demanding: ingestion, GraphRAG, fallbacks, logs, browser checks, the
whole tiny weather system. Perfect loop bait.

Files:

- `../../goals/prompt.md`: source spec.
- `loop-contract.md`: generated Loop Contract for PaperTrail.

Suggested contract-only test:

```text
Use loopify-spec on docs/goals/prompt.md and write docs/examples/papertrail/loop-contract.md.
```

Suggested runnable loop:

```text
Use loopify-spec on docs/goals/prompt.md and bootstrap it into .loopify/loops/001-papertrail/.
```

What this example teaches:

- Large specs need requirement/evidence mapping before implementation.
- Mandatory Playwright testing belongs in the contract as a manual/visual gate
  plus automated browser checks.
- Fallback behavior needs explicit tests. Prose cannot catch a broken fallback
  at 1 a.m.
