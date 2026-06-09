# loopify-agent-skills

Loopify agent skills convert specs into feedback loops with evidence, traces,
stop rules, and governance.

A good loop gives the agent a job, a meter, a leash, and a receipt.

The plugin is organized around one spine:

```text
loopify-spec -> loopify-bootstrap -> loopify-run -> loopify-trace
```

`loopify-spec` writes a contract by default. When the user asks to "bootstrap
it" or "create the loop folder", it hands off to `loopify-bootstrap`, which
seeds `.loopify/loops/NNN-slug/`.

The remaining skills tighten checks, review done claims, debug stuck runs, build
demos, wire Codex SDK actuators, write retros, and add governance.

## Skills

| Skill | Use it when |
| --- | --- |
| `loopify-spec` | A prose spec needs a Loop Contract. |
| `loopify-bootstrap` | A repo needs a numbered loop folder with source, contract, checks, trace, and reports. |
| `loopify-run` | A loop folder should be executed by evidence. |
| `loopify-checks` | Requirements need better automated, visual, or manual proof. |
| `loopify-trace` | A loop needs receipts or final evidence summary. |
| `loopify-review` | A done claim or contract needs audit. |
| `loopify-debug` | A loop is stuck or repeating failures. |
| `loopify-demo` | A public-safe demo seed should show loops in action. |
| `loopify-codex-sdk` | Codex SDK should be used as a loop actuator. |
| `loopify-retro` | A finished loop should improve future loops. |
| `loopify-governance` | A loop needs budgets, approvals, rollback, or authority boundaries. |

## Progressive Disclosure

Each `SKILL.md` contains the short procedure. Deeper guidance lives in
`references/`, and reusable output shapes live in `templates/`.

Run validation from the repository root:

```bash
npm run quality
```

If a skill change cannot explain what evidence proves it worked, the skill is
still mush. Keep shaping it.
