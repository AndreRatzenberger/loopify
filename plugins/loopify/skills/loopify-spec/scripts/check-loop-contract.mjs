#!/usr/bin/env node
import { existsSync, readFileSync, realpathSync } from "node:fs";

export const REQUIRED_CONTRACT_HEADINGS = [
  "# Loop Contract",
  "## Source Spec",
  "## Objective",
  "## Requirements",
  "## Non-Goals",
  "## Requirement Evidence Map",
  "## Automated Checks",
  "## Manual / Visual Review Items",
  "## Allowed Changes",
  "## Authority Boundaries",
  "## Loop Procedure",
  "## Stop Conditions",
  "## Blocked Conditions",
  "## Verification",
  "## Trace Requirements",
  "## Final Report Requirements",
];

export function checkLoopContract(path) {
  if (!existsSync(path)) {
    throw new Error(`Missing Loop Contract: ${path}`);
  }
  const text = readFileSync(path, "utf8");
  for (const heading of REQUIRED_CONTRACT_HEADINGS) {
    if (!text.includes(heading)) {
      throw new Error(`${path} missing ${heading}`);
    }
  }
  console.log(`Loop Contract headings passed: ${path}`);
}

if (process.argv[1] && import.meta.url === `file://${realpathSync(process.argv[1])}`) {
  checkLoopContract(process.argv[2] ?? ".loopify/loops/001-example/loop-contract.md");
}
