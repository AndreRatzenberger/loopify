# Core Concepts

The vocabulary Loopify uses, and why each piece exists. Skim it once; come back
when a term shows up in a contract you don't recognize.

## Loop Contract

A **Loop Contract** turns a spec into something reality can check. A spec says
what should be true; the contract says how the loop is *allowed to prove* it
became true — and how it's allowed to stop.

Every contract has the same required sections:

```text
Source Spec · Objective · Requirements · Non-Goals
Requirement Evidence Map · Automated Checks · Manual / Visual Review Items
Allowed Changes · Authority Boundaries · Loop Procedure
Stop Conditions · Blocked Conditions · Verification
Trace Requirements · Final Report Requirements
```

The contract is boring on purpose. Boring is how the agent remembers where the
sharp objects are. Full anatomy: [Loop Contract concept](../concepts/loop-contract.md).

## Evidence classes

Every requirement gets classified by *how it can be proven*. This is the part
that stops a loop from pretending taste is a unit test.

| Class | Means | Example |
| --- | --- | --- |
| `automated` | A command, test, lint, or build can decide it. | "All tests in `tests/auth` pass." |
| `visual` | Needs a screenshot or rendered UI to judge. | "The dashboard reads well on desktop." |
| `manual` | Needs human judgment. | "The copy sounds trustworthy." |
| `ambiguous` | Can't be checked until it's clarified or narrowed. | "Make it feel fast." |
| `out-of-scope` | Explicitly not pursued by this loop. | "Internationalization — later." |

The point is honesty: `automated` requirements get real checks; the rest are
named as what they are instead of being laundered into a fake green check.

## Stop reasons

A loop without stop rules isn't autonomy — it's an expensive `while true`
wearing a cape. Every loop ends with exactly one of:

| Reason | When |
| --- | --- |
| `success` | The checks pass, the manual/visual gates are satisfied or queued, **and** an independent verifier approved (see below). |
| `blocked` | The same blocker repeats per the contract, or a required dependency/input is unavailable. |
| `escalated` | A human decision is required — risk, ambiguity, an authority boundary, or a spec contradiction. |
| `budget-exhausted` | The contract's turn, time, retry, or cost budget is spent. |

## Mandatory independent verification

This is the load-bearing rule of Loopify 0.2.0: **the maker never grades its own
homework.**

A model is structurally the worst judge of whether its own work is finished —
completion bias makes "done" the default answer. So `success` is illegal unless
an **independent verifier** writes an approving `verdict.md`. The verifier
re-runs the checks in its own context and grades every Requirement Evidence Map
row; the *maker* is forbidden from writing `verdict.md` at all (its Allowed
Changes always deny it).

**The independence ladder**, strongest first:

1. **cross-model** — a different model in a different harness. Breaks
   shared-prior blind spots.
2. **fresh-context** — the same model in a new context window with no access to
   the maker's conversation. Breaks narrative bias.
3. **human** — a named person reviews and approves.

No rung available → the loop can't reach `success`; it stops `escalated` with
`cannot-verify`.

The stop claim is then machine-checked by `check-stop-reason.mjs`, which exits
`0` only when an approving `verdict.md` exists, names a verifier different from
the maker, and the gate re-runs green.

**Be honest about what that check proves.** A static check of a text file
**cannot** prove who authored it — a determined faker can type any verifier
name. `check-stop-reason.mjs` is a *tripwire against sloppy self-certification*,
not an authorship oracle. The real guarantee is two-part:

- **Automated evidence is reproducible** — anyone can re-run the gate on any
  machine, and a forged result dies the moment they do.
- **Judgment evidence needs a named independent judge** each time — no file can
  stand in for that.

The verdict carries a self-declared **provenance** line (what produced it, in
what isolation) that a human audits. Naming the limitation honestly is the point;
faking a stronger check would be the exact failure mode Loopify exists to
prevent. Details: [independent-verification reference](../../plugins/loopify/skills/loopify-review/references/independent-verification.md).

## The `.loopify/` directory

Loopify saves runnable work as numbered folders — one feature, one folder — so
each little adventure stays inspectable.

```text
.loopify/
  index.md                 ← the register: loop number, slug, status, stop reason
  loops/
    001-first-loop/
      source.md            ← the spec this loop came from
      loop-contract.md      ← the deal reality can check
      quality-gate.sh       ← the checks, as one runnable command
      acceptance-checklist.md
      trace.md              ← the turn-by-turn receipt
      verdict.md            ← written by the independent verifier (never the maker)
      final-report.md       ← stop reason, evidence, caveats
      retro.md              ← lessons for the next loop
      artifacts/            ← screenshots, logs, anything worth keeping
```

Why folders? Because repos collect quests — first feature, weird bug, polish
pass, release pass. One global contract turns into a junk drawer. Numbered
folders keep each one readable. More: [Loop directories](../concepts/loop-directory.md).

## The quality gate

A **quality gate** is the checks the loop runs, wrapped in one command — usually
`quality-gate.sh` in the loop folder, or `npm run quality` at the repo root. It
exists so "done" is an exit code, not an adjective. The whole Loopify philosophy
rides on one line: *you cannot bullshit an exit code.* The verification feature
extends that to the stop claim itself.

## Glossary

- **Spec** — the desired end state, in prose.
- **Loop Contract** — the bridge between a spec and a run: requirements,
  evidence, authority, checks, budgets, stop rules, trace expectations.
- **Evidence class** — how a requirement can be proven (automated / visual /
  manual / ambiguous / out-of-scope).
- **Quality gate** — the checks as one runnable command; the source of exit-code
  truth.
- **Trace** — the turn-by-turn receipt: command, result, failure, patch,
  rationale, next check.
- **Stop reason** — how a loop ends: success / blocked / escalated /
  budget-exhausted.
- **Maker** — the agent (or session) doing the work. May not grade its own
  success.
- **Verifier** — the independent party that re-runs the checks and writes the
  verdict. Never the maker.
- **Verdict** — `verdict.md`: the verifier's graded judgment, ending in
  `approve` / `reject` / `cannot-verify`.
- **Provenance** — the verdict's self-declared record of how it was produced
  (which model/agent, in what isolation), audited by a human.
- **Authority boundary** — what a loop is allowed to read, write, run, spend, or
  publish.
