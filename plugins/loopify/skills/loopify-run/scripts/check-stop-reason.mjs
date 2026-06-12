#!/usr/bin/env node
// Binary legality check for a claimed stop reason.
// Usage: node check-stop-reason.mjs <loop-folder> <success|blocked|escalated|budget-exhausted>
// Exit 0 = legal claim, 1 = illegal, 2 = usage error.
// Field regexes use [ \t]* on purpose: \s would swallow newlines and let an
// empty field capture the next line, defeating the maker/verifier comparison.
// Forward-compat: when a runs.jsonl ledger exists (harness-absorption design),
// future versions corroborate blocked claims against it; absence changes nothing.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const [folder, claimed] = process.argv.slice(2);
const REASONS = ["success", "blocked", "escalated", "budget-exhausted"];

function fail(message) {
  console.error(`ILLEGAL STOP CLAIM: ${message}`);
  process.exit(1);
}

function read(name) {
  const path = join(folder, name);
  if (!existsSync(path)) fail(`missing ${name}`);
  return readFileSync(path, "utf8");
}

function field(text, label) {
  const match = text.match(new RegExp(`^[-*][ \\t]*${label}:[ \\t]*(\\S.*)$`, "mi"));
  return match ? match[1].trim() : "";
}

if (!folder || !REASONS.includes(claimed)) {
  console.error(`usage: check-stop-reason.mjs <loop-folder> <${REASONS.join("|")}>`);
  process.exit(2);
}

const finalReport = read("final-report.md");
const reported = field(finalReport, "Stop reason");
if (!reported.toLowerCase().startsWith(claimed)) {
  fail(`final-report.md says "${reported || "nothing"}", claim is "${claimed}"`);
}

if (claimed === "success") {
  const verdict = read("verdict.md");
  const overall = (verdict.match(/##[ \t]*Overall[ \t]*\r?\n+[ \t]*([a-z-]+)/i) ?? [])[1] ?? "";
  if (overall.toLowerCase() !== "approve") {
    fail(`verdict.md Overall is "${overall || "missing"}", success needs "approve"`);
  }
  const verifier = field(verdict, "Verifier");
  if (!verifier) fail("verdict.md names no Verifier");
  const maker = field(finalReport, "Maker");
  if (!maker) fail("final-report.md names no Maker (required to prove verifier independence)");
  if (verifier.toLowerCase() === maker.toLowerCase()) {
    fail(`Verifier equals Maker ("${maker}") — the maker never grades its own homework`);
  }
  const gate = join(folder, "quality-gate.sh");
  if (existsSync(gate)) {
    const run = spawnSync("bash", [gate], { stdio: "inherit", cwd: folder });
    if (run.status !== 0) fail(`quality-gate.sh exited ${run.status}`);
  }
} else {
  const trace = read("trace.md");
  if (!trace.toLowerCase().includes(`stop reason: ${claimed}`)) {
    fail(`trace.md has no final entry naming "Stop reason: ${claimed}"`);
  }
}

console.log(`LEGAL STOP CLAIM: ${claimed} (${folder})`);
