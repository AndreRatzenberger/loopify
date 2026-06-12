# Loop Execution Protocol

1. Open the loop directory and re-read `loop-contract.md` before the first
   check.
2. Confirm authority boundaries and budgets.
3. Run the cheapest required check that can reveal current state.
4. Record exact output or a short, faithful summary in `trace.md`.
5. Form one hypothesis about the failure.
6. Patch the smallest useful cause.
7. Update the trace before rerunning.
8. Rerun the relevant narrow check first, then the full gate.
9. When the gate is green and manual items are queued, obtain a verdict from
   an independent verifier (contract `## Verification`): the verifier
   re-runs checks in its own context and writes `verdict.md`. The maker never
   writes that file.
10. On reject, treat each finding as an observed failure (back to step 5).
    Same finding rejected twice → stop `escalated`.
11. Write or update `final-report.md` (`Maker:` identity, `Verdict:` link).
12. Update `.loopify/index.md` with status and stop reason when known.
13. Stop when the contract's stop rule is met, then run
    `check-stop-reason.mjs <loop-folder> <reason>` — exit 0 or the claim is
    illegal.

Escalate instead of patching when the next step needs new authority, external
credentials, spend, production access, or a spec decision.
