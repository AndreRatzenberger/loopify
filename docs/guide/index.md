# Loopify Guide

Loopify turns a spec into an **executable feedback loop**: instead of asking an
agent for an answer and hoping, you hand it a workbench — check reality, patch
the thing, write down what happened, and stop for a reason it can defend.

This guide is the practical manual. If you want the pitch and the personality,
the [README](../../README.md) has those. If you want to *use* the thing, start
here.

## The mental model, in one line

```text
spec → Loop Contract → checks → run → independent verdict → trace → stop reason
```

A **spec** says what should become true. A **Loop Contract** says how reality is
allowed to prove it. The **run** checks reality and patches from feedback. An
**independent verifier** — not the agent that did the work — decides whether
`success` is earned. The **trace** is the receipt. The **stop reason** is how the
loop ends honestly instead of by vibes.

## Where to go

| Page | What's in it |
| --- | --- |
| **[Quick Start](quickstart.md)** | Install, then turn a goal into a running loop in three steps. Start here. |
| **[Core Concepts](core-concepts.md)** | The vocabulary: Loop Contract, evidence classes, stop reasons, mandatory verification, the `.loopify/` directory, the quality gate, and a glossary. |
| **[Skills Reference](skills.md)** | Every one of the 11 skills — what it does, when to use it, when not to, what it produces. |
| **[Workflows](workflows.md)** | End-to-end recipes: spec → run, rescue a stuck loop, strengthen weak checks, add governance, run a retro. |

## Going deeper

The conceptual essays live alongside this guide:

- [Loop Contract anatomy](../concepts/loop-contract.md)
- [Loop patterns](../concepts/loop-patterns.md) — the common loop shapes
- [Failure modes](../concepts/failure-modes.md) — how loops go wrong, and the guards
- [Loop directories](../concepts/loop-directory.md) — the one-feature-one-folder layout

Worked examples are under [`docs/examples/`](../examples/), including the
[PaperTrail stress fixture](../goals/prompt.md) for testing how `loopify-spec`
handles a deliberately lumpy app request.

## If you just want to start

Read the [Quick Start](quickstart.md). You can come back for the vocabulary when
a loop bites back.
