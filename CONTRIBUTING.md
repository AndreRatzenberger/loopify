# Contributing

Loopify is a Claude plugin-format skill bundle. Keep contributions focused on
making loop contracts, checks, traces, and governance more executable for
agents.

Good contributions make an agent harder to fool and easier to review.

## Quality Bar

- Keep skill frontmatter precise.
- Keep `SKILL.md` files lean and move deeper material into `references/` or
  `templates/`.
- Add validation coverage when adding a skill or changing plugin metadata.
- Run `npm run quality` before committing.
- Prefer one sharp fixture over five abstract examples.

## Skill Style

Each skill should answer:

- when to use it
- what artifact it creates or changes
- what evidence proves it worked
- when to stop or escalate

Avoid generic agent advice. Encode Loopify-specific procedure.

Bad: "Improve quality."

Good: "Run the gate, record the failure signature, patch one cause, rerun, and
stop blocked if the same failure repeats after three distinct hypotheses."
