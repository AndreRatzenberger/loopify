# Simple Web App Example Loop

This folder is a preserved snapshot from a disposable end-to-end Loopify run for
`docs/examples/simple-web-app/spec.md`.

It is here so readers can inspect what a completed loop looks like without
running anything:

- `repo/package.json`: tiny app project used for the run.
- `repo/index.html`, `repo/src/`, `repo/tests/`: final app snapshot and checks.
- `repo/.loopify/index.md`: loop ledger.
- `repo/.loopify/loops/001-tiny-events/`: source, contract, quality gate,
  checklist, trace, final report, retro, and artifacts.

The trace is intentionally not a polished success story. It keeps the useful
failures:

- first gate failed because the app did not exist yet
- second gate failed because Playwright's Chromium browser was missing
- automated checks passed before visual review caught an awkward desktop footer
  wrap

That is the point: loops are not magic prompts. They are a way to let reality
talk back until the work earns its stop reason.
