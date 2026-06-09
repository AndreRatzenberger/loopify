---
name: loopify-governance
description: "Use when adding budgets, approvals, rollback plans, data/privacy limits, dependency policy, authority boundaries, and harness-change contracts to higher-risk loops."
---

# loopify-governance

Add governance to higher-risk loops.

## When To Use

- A loop can affect production, security, money, data, migrations, dependencies,
  public content, or external accounts.
- A loop can mutate its own harness, checks, prompts, or agent configuration.

## Workflow

1. Read the Loop Contract.
2. Identify risk class.
3. Add budgets, allowed paths, denied paths, approvals, rollback, data/privacy
   constraints, and harness mutation rules.
4. Update stop and escalation rules.
5. Add review gates.

## Output

Governance addendum or updated Loop Contract.
