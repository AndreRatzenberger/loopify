# Risk Classes

## Low

Docs, examples, local-only tests, scratch prototypes.

Governance: normal trace and quality gate.

## Medium

Dependencies, generated code, broad refactors, public docs, non-secret external
APIs.

Governance: explicit allowed paths, review gate, rollback notes.

## High

Production, money, migrations, credentials, user data, public publishing,
security posture, or harness mutation.

Governance: human approval, rollback plan, denied paths, budget, and final
review.

## Critical

Irreversible destructive actions, secret exposure risk, legal/compliance risk,
or self-widening agent authority.

Governance: stop and escalate unless explicit written approval exists.
