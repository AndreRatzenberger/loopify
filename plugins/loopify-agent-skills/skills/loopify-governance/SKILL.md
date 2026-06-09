---
name: loopify-governance
description: "Use when adding budgets, approvals, rollback plans, data/privacy limits, dependency policy, authority boundaries, and harness-change contracts to higher-risk loops."
---

# loopify-governance

Add governance to higher-risk loops.

## When To Use

- A loop can affect production, security, money, data, migrations,
  dependencies, public content, or external accounts.
- A loop can mutate its own harness, checks, prompts, tools, or agent
  configuration.
- A loop needs budgets, approvals, rollback, or stronger authority boundaries.

## Do Not Use

- Do not slow down low-risk loops with unnecessary ceremony.
- Do not let an agent silently widen its own authority.
- Do not treat approval as durable unless it is recorded.

## Workflow

1. Read the Loop Contract.
2. Identify risk class with `references/risk-classes.md`.
3. Add allowed paths, denied paths, budgets, approvals, rollback, data/privacy
   constraints, and dependency policy.
4. Use `references/authority-boundaries.md` for boundary language.
5. Add a harness-change contract if prompts, checks, tools, context builders,
   memory, or permissions can change.
6. Update stop and escalation rules.
7. Add review gates.

## Output

Governance addendum, updated Loop Contract, or harness-change contract.

## Validation

- High-risk actions require explicit approval.
- Rollback is named where mutation is possible.
- Harness mutations are reviewed as future-behavior changes.

## Example

```text
Use loopify-governance to add budgets, denied paths, and a harness-change contract to docs/loop-contract.md.
```
