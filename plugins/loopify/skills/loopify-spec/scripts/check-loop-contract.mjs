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
  // Anchored: a required heading only counts as a full heading line.
  // Substring matching let prose that merely mentioned the tokens pass.
  const headingLines = new Set(
    text
      .split(/\r?\n/)
      .map((line) => line.replace(/[ \t]+$/, ""))
      .filter((line) => /^#{1,6}[ \t]/.test(line)),
  );
  for (const heading of REQUIRED_CONTRACT_HEADINGS) {
    if (!headingLines.has(heading)) {
      throw new Error(`${path} missing heading line ${heading}`);
    }
  }
  console.log(`Loop Contract headings passed: ${path}`);
}

if (process.argv[1] && import.meta.url === `file://${realpathSync(process.argv[1])}`) {
  checkLoopContract(process.argv[2] ?? ".loopify/loops/001-example/loop-contract.md");
}
