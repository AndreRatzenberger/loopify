# Quick Start

Five minutes from install to a loop that stops for a reason.

## 1. Install the plugin

**Claude Code / GitHub Copilot:**

```text
/plugin marketplace add AndreRatzenberger/loopify
/plugin install loopify@loopify
```

**Codex CLI:**

```bash
codex plugin marketplace add AndreRatzenberger/loopify
codex plugin add loopify@loopify
```

Or browse interactively: run `codex`, then `/plugins`, and choose **Add to
Codex** / **Install plugin**. On any other agent harness, point it at
`https://github.com/AndreRatzenberger/loopify` and ask it to load the
`loopify` skill bundle.

> Upgrading from 0.1.x? The plugin was renamed. Uninstall
> `loopify-agent-skills@loopify`, then install `loopify@loopify`. Your existing
> `.loopify/` folders are unaffected — the plugin name isn't part of any loop
> artifact.

## 2. Turn a spec into a loop folder

Point `loopify-spec` at a prose goal and ask it to bootstrap a runnable folder:

```text
Use loopify-spec on docs/goals/goal.md and bootstrap it into .loopify/loops/001-first-loop/.
```

That produces a self-contained loop folder:

```text
.loopify/
  index.md
  loops/
    001-first-loop/
      source.md            ← the spec it came from
      loop-contract.md      ← requirements, evidence, authority, stop rules
      quality-gate.sh       ← the checks, as one command
      acceptance-checklist.md
      trace.md              ← the receipt (starts empty)
      final-report.md
      retro.md
      artifacts/
```

For a read-only compile, drop `and bootstrap it` — `loopify-spec` then writes
only the `loop-contract.md` and mutates nothing else. Add the bootstrap phrase
("bootstrap it", "make this runnable", "create the loop folder") when you want
the repo files.

## 3. Run until the loop earns a stop reason

```text
Use loopify-run on .loopify/loops/001-first-loop/. Stop only with success, blocked, escalated, or budget-exhausted.
```

The run reads the contract, runs the quality gate, observes the exact failure,
patches the smallest useful cause, updates the trace, and reruns — until it
earns one of four stop reasons.

## The spine

Those three commands are three of the four spine skills. The fourth keeps the
receipt:

```text
loopify-spec → loopify-bootstrap → loopify-run → loopify-trace
```

`loopify-spec` can hand off to `loopify-bootstrap` automatically when you say so;
`loopify-run` writes the trace as it goes, and `loopify-trace` is there when you
want to tidy or summarize it. The other seven skills are satellites you reach for
when a loop bites back (see the [Skills Reference](skills.md)).

## What just happened

- **The spec** said what should become true.
- **The Loop Contract** named the evidence, the checks, what the loop is allowed
  to touch, the budget, and the stop rules.
- **The run** checked reality, patched from feedback, wrote a trace, and stopped
  with receipts instead of a victory monologue.

## Verifying success

In Loopify, **the agent that did the work does not get to declare it done.**
`success` is only legal once an *independent* verifier — a different model, a
fresh read-only context, or a human — re-runs the checks and produces an
approving `verdict.md` (a read-only verifier returns the verdict body and the
caller transcribes it verbatim). The stop claim is then machine-checked:

```bash
node plugins/loopify/skills/loopify-run/scripts/check-stop-reason.mjs .loopify/loops/001-first-loop success
```

Exit `0` means the claim is legal; exit `1` means it isn't. See
[Mandatory independent verification](core-concepts.md#mandatory-independent-verification)
for how — and why it's a tripwire, not a magic authorship oracle.

## First-run gotchas

- **Don't claim done without running the checks.** "The agent said so" is not
  evidence; an exit code is.
- **A repeated failure is data, not shame.** The loop records it and changes the
  next move; it doesn't paper over it.
- **Respect the authority boundaries.** A loop only touches what its contract
  allows. If the next step needs new authority, the honest move is to stop
  `escalated`, not to widen scope quietly.
