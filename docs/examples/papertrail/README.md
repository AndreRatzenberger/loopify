# PaperTrail Stress Fixture

`docs/goals/prompt.md` is the source spec for this example. It is intentionally
large and demanding so `loopify-spec` can be tested on a realistic app request.

Files:

- `../../goals/prompt.md`: source spec.
- `loop-contract.md`: generated Loop Contract for PaperTrail.

Suggested test:

```text
Use loopify-spec on docs/goals/prompt.md and write docs/examples/papertrail/loop-contract.md.
```

What this example teaches:

- Large specs need requirement/evidence mapping before implementation.
- Mandatory Playwright testing belongs in the contract as a manual/visual gate
  plus automated browser checks.
- Fallback behavior needs explicit tests, not just prose.
