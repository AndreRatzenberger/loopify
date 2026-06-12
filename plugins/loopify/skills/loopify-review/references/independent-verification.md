# Independent Verification

Models reviewing their own output inherit their own framing errors; grading
belongs in a context window that never saw the maker's conversation. That is
why `success` requires a verdict from an independent verifier.

## Independence ladder (strongest first)

1. **cross-model** — different model, different harness. Breaks shared-prior
   blind spots, not just shared-context bias. Examples: a Claude Code maker
   hands the loop folder to a Codex CLI verifier session, or the reverse.
2. **fresh-context** — same model family, new context (sub-agent), no access
   to the maker's conversation. Breaks narrative bias only. Use the emitted
   host agent (`scripts/emit-verifier-agent.mjs`) so read-only authority is
   enforced by the harness, not by politeness.
3. **human** — a named human reviews and writes/approves the verdict.

No rung available → the loop cannot reach `success`; stop `escalated`
(`cannot-verify`).

## Verifier rules

- Re-execute the quality gate and cheap checks yourself. Reading the maker's
  trace is not verification; exit codes are.
- `pass` verdicts cite evidence (command output, file, screenshot), never the
  maker's claim.
- Review the contract too: if the evidence map no longer measures the
  objective, that is a finding even when every check is green.
- Confirm the manual/visual queue is enumerated with owners.
- If the full gate is too expensive to re-run, the contract's Verification
  section may name a cheaper command subset — but it must be a command list,
  never "trust the trace".
- Your only output artifact is `verdict.md` (template: `templates/verdict.md`).
  In a writable context it is your only write; in a read-only sandbox (the
  emitted Codex verifier) return the verdict body and the caller transcribes
  it verbatim.

## Wiring recipes

- **Claude Code maker → Codex verifier:** run the emitted
  `.codex/agents/loop-verifier.toml` in a Codex session pointed at the repo;
  prompt: "Verify .loopify/loops/NNN-slug/ against its loop-contract.md and
  return the verdict.md body." The sandbox is read-only, so the caller
  transcribes the returned body verbatim as `verdict.md`.
- **Codex maker → Claude Code verifier:** use the emitted
  `.claude/agents/loopify-verifier.md` sub-agent with the same prompt.
- **Fallback (no host dirs):** spawn a fresh sub-agent with read+run-checks
  instructions only; it returns the verdict body, the human or harness places
  it as `verdict.md`.
- **Disagreement:** one re-run is allowed only for infrastructure failures
  (a check would not run). Never re-roll a verifier until it approves;
  persistent disagreement goes to a human (`escalated`).

## What the static check can and cannot prove

`check-stop-reason.mjs` is a tripwire, not an authorship oracle. It can confirm
the verdict says `approve`, names a verifier different from the maker, and that
the gate re-runs green. It cannot prove a different party actually wrote the
verdict — a maker willing to type a false verifier name defeats the name check
in one line. Independence is therefore not a property of the verdict file; it
is a property of *process*:

- **Automated rows** are guaranteed by reproducibility — anyone can re-run the
  gate, and a forged pass is caught on the next independent run.
- **Judgment rows** (frame review, manual items) are guaranteed only by a named
  independent judge running each time; no file can stand in for that.

Record how the verdict was produced in its Provenance line (what model/agent,
in what isolation). That line is self-declared and human-audited, explicitly not
machine-verified — naming the assumption is the honest alternative to pretending
the checker enforces it.
