# Failure Modes

Loopify should help agents name failures while the failures are still useful.
The trace is not a confession booth. It is a diagnostic tool.

## Token Fire

The loop spends tokens or time without a meaningful state change.

Mitigations: cap turns/cost, run cheap checks first, summarize bulky outputs,
prefer event triggers over polling, and stop when nothing changed.

## Doom Loop

The loop repeats the same repair against the same failure. It sands the same
corner forever and calls the dust progress.

Mitigations: track failure signatures, force a new hypothesis after N attempts,
change the diagnostic, or escalate.

## Weak Evaluator

The evaluator shares the generator's blind spot, so the loop converges to
plausible garbage.

Mitigations: use deterministic checks where possible, add independent review,
and record residual risk.

## Fake Green Check

A command passes but does not cover the requirement being claimed.

Mitigations: map each requirement to evidence. Say what each check proves and
what it leaves untouched.

## Benchmark Overfit

The loop optimizes the visible metric while damaging the real task.

Mitigations: held-out cases, adversarial review, metric scope notes, and
manual acceptance for broad quality claims.

## Authority Creep

The loop silently widens what it may change, call, publish, or spend.

Mitigations: allowed/denied paths, per-risk approvals, rollback plans, and
explicit escalation when a needed action is out of bounds.

## Missing Context

The loop patches from incomplete evidence.

Mitigations: inspect the relevant files/logs/rendered surface before patching
and include the new evidence in the trace.

## Moving Target Spec

Requirements shift while the loop keeps running.

Mitigations: pause, update the Loop Contract, reset evidence expectations, and
record the decision.

## Hidden Subjective Requirement

Taste words masquerade as automated proof.

Mitigations: split the checkable parts from manual/visual judgment.

## Favorite-Frame Overfitting

The loop polishes its first interpretation instead of testing whether that
interpretation is wrong.

Mitigations: contradiction passes, alternate-frame review, and explicit
uncertainty notes.

## Silent Harness Mutation

The loop changes its own prompts, checks, tools, context builder, permissions,
or memory without approval.

Mitigations: harness-change contracts, review gates, rollback plans, and
recorded approvals.
