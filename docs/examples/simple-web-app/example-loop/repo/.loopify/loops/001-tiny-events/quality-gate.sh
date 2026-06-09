#!/usr/bin/env bash
set -euo pipefail

loop_dir="${LOOPIFY_LOOP_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)}"
repo_root="${LOOPIFY_REPO_ROOT:-$(cd "$loop_dir/../../.." && pwd)}"

cd "$repo_root"

npm run build
npx playwright test
node ../../../../../plugins/loopify-agent-skills/skills/loopify-spec/scripts/check-loop-contract.mjs "$loop_dir/loop-contract.md"
