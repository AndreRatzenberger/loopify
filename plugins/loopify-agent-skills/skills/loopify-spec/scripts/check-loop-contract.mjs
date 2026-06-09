#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";

const path = process.argv[2] ?? ".loopify/loops/001-example/loop-contract.md";
const headings = [
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
  "## Trace Requirements",
  "## Final Report Requirements",
];

if (!existsSync(path)) {
  throw new Error(`Missing Loop Contract: ${path}`);
}

const text = readFileSync(path, "utf8");
for (const heading of headings) {
  if (!text.includes(heading)) {
    throw new Error(`${path} missing ${heading}`);
  }
}

console.log(`Loop Contract headings passed: ${path}`);
