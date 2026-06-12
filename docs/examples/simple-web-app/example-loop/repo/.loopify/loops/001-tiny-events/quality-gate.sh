#!/usr/bin/env bash
set -euo pipefail

loop_dir="${LOOPIFY_LOOP_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)}"
repo_root="${LOOPIFY_REPO_ROOT:-$(cd "$loop_dir/../../.." && pwd)}"

cd "$repo_root"

# The snapshot ships without node_modules; fail with the prerequisite instead
# of an opaque module-resolution error mid-gate.
if [ ! -d node_modules ]; then
  echo "missing dependencies: run 'npm install' and 'npx playwright install chromium' in $repo_root first (see example-loop/README.md)" >&2
  exit 1
fi

npm run build
npx playwright test
node ../../../../../plugins/loopify/skills/loopify-spec/scripts/check-loop-contract.mjs "$loop_dir/loop-contract.md"
