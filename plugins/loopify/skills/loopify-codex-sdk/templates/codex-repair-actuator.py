#!/usr/bin/env python3
"""Codex repair actuator template.

This file intentionally avoids concrete SDK calls until current official Codex
SDK docs are checked. Replace invoke_codex() with the verified API call.
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path


def invoke_codex(contract: str, failure: str, allowed_paths: list[str]) -> dict:
    """Placeholder for a verified Codex SDK invocation."""
    return {
        "status": "placeholder",
        "proposed_change": "",
        "evidence": "",
        "risk": "SDK call not wired yet",
        "next_check": "",
        "allowed_paths": allowed_paths,
        "contract_excerpt": contract[:500],
        "failure_excerpt": failure[:500],
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--contract", required=True)
    parser.add_argument("--failure", required=True)
    parser.add_argument("--allowed-path", action="append", default=[])
    args = parser.parse_args()

    contract = Path(args.contract).read_text()
    failure = Path(args.failure).read_text()
    result = invoke_codex(contract, failure, args.allowed_path)
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
