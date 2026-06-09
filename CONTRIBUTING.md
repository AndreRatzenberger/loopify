# Contributing

Loopify is a Claude plugin-format skill bundle. Keep contributions focused on
making loop contracts, checks, traces, and governance more executable for
agents.

## Quality Bar

- Keep skill frontmatter precise.
- Keep `SKILL.md` files lean and move deeper material into `references/` or
  `templates/`.
- Add validation coverage when adding a skill or changing plugin metadata.
- Run `npm run quality` before committing.

## Skill Style

Each skill should answer:

- when to use it
- what artifact it creates or changes
- what evidence proves it worked
- when to stop or escalate

Avoid generic agent advice. Encode Loopify-specific procedure.
