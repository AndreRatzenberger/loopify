#!/usr/bin/env bash
set -euo pipefail

loop_dir="${LOOPIFY_LOOP_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)}"
repo_root="${LOOPIFY_REPO_ROOT:-$(cd "$loop_dir/../../.." && pwd)}"

cd "$repo_root"

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

contract="${LOOPIFY_CONTRACT:-$loop_dir/loop-contract.md}"
checker="plugins/loopify/skills/loopify-spec/scripts/check-loop-contract.mjs"

if [ -f "$contract" ] && [ -f "$checker" ]; then
  node "$checker" "$contract"
fi
