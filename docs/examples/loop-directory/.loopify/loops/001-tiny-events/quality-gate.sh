#!/usr/bin/env bash
set -euo pipefail

loop_dir="${LOOPIFY_LOOP_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)}"

if [ ! -f "$loop_dir/loop-contract.md" ]; then
  echo "Missing loop-contract.md" >&2
  exit 1
fi

if [ ! -f "$loop_dir/trace.md" ]; then
  echo "Missing trace.md" >&2
  exit 1
fi

echo "Loop directory fixture is present."
