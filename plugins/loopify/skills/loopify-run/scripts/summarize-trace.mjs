#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";

const path = process.argv[2] ?? ".loopify/loops/001-example/trace.md";
if (!existsSync(path)) {
  throw new Error(`Missing trace: ${path}`);
}

const text = readFileSync(path, "utf8");
const turns = [...text.matchAll(/^## Turn /gm)].length;
const final = text.includes("## Final");
const stop = text.match(/- Stop reason:\s*(.*)/)?.[1]?.trim() ?? "";

console.log(JSON.stringify({ path, turns, hasFinal: final, stopReason: stop }, null, 2));
