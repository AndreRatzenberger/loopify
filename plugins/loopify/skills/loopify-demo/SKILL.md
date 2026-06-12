---
name: loopify-demo
description: "Use when creating demo-ready loop seed projects with a normal app target, material pack, quality gate, acceptance tests, trace template, and presenter script."
---

# loopify-demo

Create demo-ready loop projects.

## When To Use

- The user wants a demo for "I do not prompt, I loop".
- A seed repo should show a normal app being built by a loop.
- A workshop or article needs visible evidence of loop execution.

## Do Not Use

- Do not make the app itself the whole story; the loop is the demo.
- Do not use private project details in a public demo.
- Do not hide the first failing observation.

## Workflow

1. Choose a visible, normal app target.
2. Use `references/demo-patterns.md` to choose the demo shape.
3. Create a material pack from `templates/material-pack/`.
4. Add a repo-relative goal prompt from `templates/demo-goal-prompt.md`.
5. Add quality gate, seed data, acceptance checklist, and trace template.
6. Leave the app intentionally incomplete if the demo is the build loop.
7. Verify material checks pass and the quality gate fails for the intended
   acceptance reason.

## Output

A loop demo seed repo or material pack, plus presenter notes from
`templates/demo-script.md`.

## Validation

- The first failure is clear and useful.
- A viewer can see checks driving patches.
- Public-safe materials contain no private context.

## Example

```text
Use loopify-demo to create a tiny event-board seed repo with a failing Playwright acceptance check.
```
