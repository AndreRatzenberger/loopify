# Loop Patterns

The shared Loopify shape is:

```text
state -> check -> action -> observation -> trace -> stop or repeat
```

In repo work, each loop keeps that state in its own numbered folder under
`.loopify/loops/`. New features get new folders instead of overwriting an
older contract or trace.

The pattern changes based on the feedback source.

## Test / Repair Loop

Use when deterministic feedback exists.

```text
run tests -> inspect failure -> patch smallest cause -> rerun -> trace
```

Good for code, schemas, build systems, static checks, and generated artifacts
with exact validators.

## Evaluator / Optimizer Loop

Use when a reviewer or evaluator can score quality and provide useful feedback.

```text
draft -> evaluate coverage/quality -> revise -> evaluate again
```

This is useful for docs, prompts, specs, and examples. The evaluator must be
stronger than "the same model likes its own answer."

## Research / Source Loop

Use when claims need provenance.

```text
claim inventory -> source search -> claim/source map -> contradiction pass -> final note
```

Good checks include source URLs, dates checked, claim mapping, quote limits,
primary-source preference, and unresolved uncertainty.

## Visual Polish Loop

Use when rendered behavior matters.

```text
run app -> screenshot -> inspect layout/accessibility -> patch -> screenshot again
```

Keep visual review honest. A screenshot proves what was rendered, not that the
design is good enough for every audience.

## Benchmark / Optimization Loop

Use when a metric can guide improvement.

```text
baseline -> change -> measure -> compare -> accept/reject
```

Guard against benchmark overfit with held-out cases and residual-risk notes.

## Scheduled Maintenance Loop

Use when recurrence is the point: polling CI, checking a deploy, refreshing a
report, or watching a queue.

Scheduled loops need strict budgets and event triggers where possible. Polling
without state-change checks causes token fire.

## Human-In-The-Loop Review

Use when approval changes the loop's authority or risk posture.

```text
proposal -> human decision -> recorded approval state -> next action
```

Approval should be durable state, not a disposable chat moment.

## Meta-Loop / Harness Improvement

Use when a loop proposes changes to its own prompts, checks, tools, context
builder, permissions, or memory.

Harness changes alter future agent behavior, so they need change contracts,
rollback plans, and regression checks.
