# Stuck Loop Taxonomy

- Repeated exact failure: same command, same failure signature.
- Moving-target failure: fixing one failure reveals unrelated failures without
  convergence.
- Flaky check: pass/fail changes without code or state explanation.
- Invalid check: check contradicts the spec or measures the wrong behavior.
- Missing context: patching starts before reading relevant source/logs.
- Authority boundary conflict: the next needed action is not allowed.
- Impossible spec: requirements contradict or require unavailable systems.
- Evaluator weakness: check rewards shallow output.
- Budget/stop problem: contract lacks a clear reason to stop.

Recovery should change the diagnostic, the contract, the evaluator, or the
authority state. Repeating the same patch style is not recovery.
