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
- Your only write is `verdict.md` (template: `templates/verdict.md`).

## Wiring recipes

- **Claude Code maker → Codex verifier:** run the emitted
  `.codex/agents/loop-verifier.toml` in a Codex session pointed at the repo;
  prompt: "Verify .loopify/loops/NNN-slug/ against its loop-contract.md and
  write verdict.md."
- **Codex maker → Claude Code verifier:** use the emitted
  `.claude/agents/loopify-verifier.md` sub-agent with the same prompt.
- **Fallback (no host dirs):** spawn a fresh sub-agent with read+run-checks
  instructions only; it returns the verdict body, the human or harness places
  it as `verdict.md`.
- **Disagreement:** one re-run is allowed only for infrastructure failures
  (a check would not run). Never re-roll a verifier until it approves;
  persistent disagreement goes to a human (`escalated`).
