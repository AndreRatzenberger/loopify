# Repo Stack Detection

Inspect before creating a quality gate.

## JavaScript / TypeScript

Signals: `package.json`, `vite.config.*`, `next.config.*`, `playwright.config.*`.

Useful checks:

- `npm run build`
- `npm test`
- `npm run lint`
- `npx playwright test`

## Python

Signals: `pyproject.toml`, `uv.lock`, `pytest.ini`, `ruff.toml`.

Useful checks:

- `uv sync`
- `uv run pytest`
- `uv run ruff check .`
- `uv run pyright`

## Markdown / Docs

Signals: `.md` target, no app runtime, citation/source requirements.

Useful checks:

- heading checker
- link checker
- claim/source checklist
- manual source audit

## Rule

Use existing commands first. If no command exists, add the smallest quality gate
that reveals the first meaningful failure.
