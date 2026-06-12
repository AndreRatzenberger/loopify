# Loop Directory

This folder is one feature, repair, experiment, writing pass, or delivery loop.
Keep its contract, checks, trace, reports, and artifacts together so later loops
can start cleanly.

Files:

- `source.md`: copied or summarized source spec.
- `loop-contract.md`: evidence, authority, budget, procedure, and stop rules.
- `quality-gate.sh`: repo-root command that checks current reality.
- `acceptance-checklist.md`: manual and visual gates.
- `trace.md`: attempt-by-attempt receipt.
- `final-report.md`: stop reason and evidence summary.
- `retro.md`: reusable lessons after completion.
- `artifacts/`: screenshots, logs, recordings, exports, or other evidence.

`verdict.md` appears at the end of the loop: it is written by the independent
verifier (see the contract's Verification section), never by the maker.
Validate stop claims with `check-stop-reason.mjs <this-folder> <reason>`.
