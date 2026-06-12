# Simple Web App Example Loop

The snapshot preserves a disposable end-to-end Loopify run for
`docs/examples/simple-web-app/spec.md`.

Open it when you want to see the loop shape without running the loop:

- `repo/package.json`: tiny app project used for the run.
- `repo/index.html`, `repo/src/`, `repo/tests/`: final app snapshot and checks.
- `repo/.loopify/index.md`: loop ledger.
- `repo/.loopify/loops/001-tiny-events/`: source, contract, quality gate,
  checklist, trace, final report, retro, and artifacts.

The trace is not a polished success story. Good. It keeps the useful failures:

- first gate failed because the app did not exist yet
- second gate failed because Playwright's Chromium browser was missing
- automated checks passed before visual review caught an awkward desktop footer
  wrap

Loops are not wish spells. They let reality talk back until the work earns its
stop reason.

## Re-running the gate

The snapshot ships without dependencies installed. To re-run the quality gate
yourself:

```bash
cd docs/examples/simple-web-app/example-loop/repo
npm install
npx playwright install chromium
bash .loopify/loops/001-tiny-events/quality-gate.sh
```

Without the install steps the gate fails fast with the prerequisite message
instead of running.
