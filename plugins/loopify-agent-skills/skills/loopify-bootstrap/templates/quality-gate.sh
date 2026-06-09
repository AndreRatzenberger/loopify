#!/usr/bin/env bash
set -euo pipefail

if [ -f package.json ]; then
  npm run build --if-present
  npm test --if-present
fi

if [ -f pyproject.toml ]; then
  if command -v uv >/dev/null 2>&1; then
    uv run pytest
  else
    echo "uv is required for Python checks" >&2
    exit 1
  fi
fi

if [ -f docs/loop-contract.md ] && [ -f plugins/loopify-agent-skills/skills/loopify-spec/scripts/check-loop-contract.mjs ]; then
  node plugins/loopify-agent-skills/skills/loopify-spec/scripts/check-loop-contract.mjs docs/loop-contract.md
fi
