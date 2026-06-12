#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";

const path = process.argv[2] ?? ".loopify/loops/001-example/trace.md";

// Anchored: headings must be real heading lines and fields must be real
// list-item lines. Substring matching let prose that merely mentioned the
// tokens pass.
const required = [
  { token: "# Loop Trace", pattern: /^#[ \t]+Loop Trace[ \t]*$/m },
  { token: "## Turn", pattern: /^##[ \t]+Turn\b/m },
  { token: "Command:", pattern: /^[-*][ \t]*Command:/m },
  { token: "Result:", pattern: /^[-*][ \t]*Result:/m },
  { token: "Next check:", pattern: /^[-*][ \t]*Next check:/m },
  { token: "## Final", pattern: /^##[ \t]+Final[ \t]*$/m },
  { token: "Stop reason:", pattern: /^[-*][ \t]*Stop reason:/m },
];

if (!existsSync(path)) {
  throw new Error(`Missing trace: ${path}`);
}

const text = readFileSync(path, "utf8");
for (const { token, pattern } of required) {
  if (!pattern.test(text)) {
    throw new Error(`${path} missing ${token}`);
  }
}

console.log(`Trace structure passed: ${path}`);
