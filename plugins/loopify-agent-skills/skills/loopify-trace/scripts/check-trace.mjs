#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";

const path = process.argv[2] ?? "runs/trace.md";
const required = ["# Loop Trace", "## Turn", "Command:", "Result:", "Next check:", "## Final", "Stop reason:"];

if (!existsSync(path)) {
  throw new Error(`Missing trace: ${path}`);
}

const text = readFileSync(path, "utf8");
for (const token of required) {
  if (!text.includes(token)) {
    throw new Error(`${path} missing ${token}`);
  }
}

console.log(`Trace structure passed: ${path}`);
