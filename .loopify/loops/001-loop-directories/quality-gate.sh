#!/usr/bin/env bash
set -euo pipefail

loop_dir="${LOOPIFY_LOOP_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)}"
repo_root="${LOOPIFY_REPO_ROOT:-$(cd "$loop_dir/../../.." && pwd)}"

cd "$repo_root"

npm run quality
git diff --check
rg -n "\.loopify/loops" README.md docs plugins scripts .loopify >/dev/null
