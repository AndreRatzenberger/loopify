# loopify-agent-skills

Loopify agent skills convert specs into executable feedback loops with evidence,
traces, stop rules, and governance.

The plugin is organized around one spine:

```text
loopify-spec -> loopify-bootstrap -> loopify-run -> loopify-trace
```

The remaining skills strengthen checks, review, debugging, demos, Codex SDK
actuators, retros, and governance.

## Skills

| Skill | Use it when |
| --- | --- |
| `loopify-spec` | A prose spec needs a Loop Contract. |
| `loopify-bootstrap` | A repo needs goal prompt, quality gate, trace, and checklist. |
| `loopify-run` | A contract should be executed by evidence. |
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
