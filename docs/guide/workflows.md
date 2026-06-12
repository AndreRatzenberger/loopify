# Workflows

End-to-end recipes. Each is a short scenario and the ordered skills to run. They
all assume the plugin is installed (see [Quick Start](quickstart.md)).

## 1. Turn a prose spec into a running loop

You have a goal in prose and want it executable.

1. **`loopify-spec`** — compile the spec into a Loop Contract, and ask it to
   bootstrap a folder:
   ```text
   Use loopify-spec on docs/goals/goal.md and bootstrap it into .loopify/loops/001-feature/.
   ```
   (`loopify-spec` hands off to **`loopify-bootstrap`** when you say "bootstrap
   it"; without that phrase it writes only the contract.)
2. **`loopify-run`** — execute until a stop reason:
   ```text
   Use loopify-run on .loopify/loops/001-feature/.
   ```

You now have a folder with a contract, a trace, and a final report.

## 2. Run a loop to a verified success

The checks pass — but in Loopify the maker can't call its own work done.

1. **`loopify-run`** drives the loop until the gate is green and manual items are
   queued, then *requests* verification (it will not write `verdict.md` itself).
2. **`loopify-review` in verifier mode** — run it as an **independent** party
   (ideally a different model or a fresh read-only context), pointed at the loop
   folder. It re-runs the checks, grades every evidence-map row, and writes
   `verdict.md` ending in `approve` / `reject` / `cannot-verify`.
3. **Validate the claim** mechanically:
   ```bash
   node plugins/loopify/skills/loopify-run/scripts/check-stop-reason.mjs .loopify/loops/001-feature success
   ```
   Exit `0` means `success` is legal: an approving verdict exists, its verifier
   differs from the maker, and the gate re-runs green.

If the verdict is `reject`, treat the findings as observed failures, fix, and
re-verify — that's the loop, not a setback. See
[Mandatory independent verification](core-concepts.md#mandatory-independent-verification).

## 3. Rescue a stuck loop

The same failure keeps coming back, or the loop is burning turns.

1. **`loopify-debug`** — classify the stuck pattern and get a recovery plan or a
   blocked/escalated report:
   ```text
   Use loopify-debug on .loopify/loops/001-feature/trace.md and tell me why it isn't converging.
   ```
2. Apply the recovery: narrow the scope, strengthen or isolate the failing check,
   ask for the human decision, or mark the loop `blocked`/`escalated`. The debug
   skill insists the next diagnostic differs from the failed attempts — no
   re-running the same patch and hoping.

## 4. Strengthen weak checks

A requirement is real but the contract proves it with a vibe.

1. **`loopify-checks`** — find the weak/fake/missing evidence and propose checks
   by class (automated, visual, manual):
   ```text
   Use loopify-checks to strengthen .loopify/loops/001-feature/loop-contract.md for the "fast" and "polished" requirements.
   ```
2. It updates the Requirement Evidence Map — turning `automated` requirements into
   real commands and naming the `visual`/`manual` ones honestly instead of faking
   them.

## 5. Add governance to a risky loop

The loop can touch production, money, data, dependencies, or its own harness.

1. **`loopify-governance`** — classify the risk and add budgets, allowed/denied
   paths, approvals, rollback, and a harness-change contract:
   ```text
   Use loopify-governance to add budgets, denied paths, and a rollback plan to .loopify/loops/002-deploy/loop-contract.md.
   ```
2. High-risk actions now require explicit, recorded approval, and any mutation of
   the loop's own checks/prompts/tools is reviewed as a change to future
   behavior.

## 6. Learn from a finished loop

The loop is done; bank what it taught you.

1. **`loopify-retro`** — read the contract, trace, diff, and final report, and
   extract reusable lessons (including the useful rejected attempts):
   ```text
   Use loopify-retro on .loopify/loops/001-feature/ and write its retro.md.
   ```
2. Feed the recommendations back into your next Loop Contract — the missing check
   it found becomes a check the next loop starts with. That's how one loop's
   failures become better future loops.
