# Loop Execution Protocol

1. Re-read the contract before the first check.
2. Confirm authority boundaries and budgets.
3. Run the cheapest required check that can reveal current state.
4. Record exact output or a short, faithful summary.
5. Form one hypothesis about the failure.
6. Patch the smallest useful cause.
7. Update the trace before rerunning.
8. Rerun the relevant narrow check first, then the full gate.
9. Stop when the contract's stop rule is met.

Escalate instead of patching when the next step needs new authority, external
credentials, spend, production access, or a spec decision.
