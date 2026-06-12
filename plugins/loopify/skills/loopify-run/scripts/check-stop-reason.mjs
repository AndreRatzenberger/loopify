#!/usr/bin/env node
// Binary legality check for a claimed stop reason.
// Usage: node check-stop-reason.mjs <loop-folder> <success|blocked|escalated|budget-exhausted>
// Exit 0 = legal claim, 1 = illegal, 2 = usage error.
// Field regexes use [ \t]* on purpose: \s would swallow newlines and let an
// empty field capture the next line, defeating the maker/verifier comparison.
// Forward-compat: when a runs.jsonl ledger exists (harness-absorption design),
// future versions corroborate blocked claims against it; absence changes nothing.
// The maker/verifier comparison is a TRIPWIRE against sloppy self-
// certification, not proof of independence — a lying maker can write any
// name. Real enforcement is the write-authority boundary on verdict.md:
// the contract denies the maker authorship, and emit-verifier-agent's
// read-only Codex verifier produces the verdict body without any file
// write — the caller transcribes it verbatim.
import { existsSync, lstatSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const [folder, claimed] = process.argv.slice(2);
const REASONS = ["success", "blocked", "escalated", "budget-exhausted"];

const PLACEHOLDER_IDENTITIES = new Set([
  "n/a", "na", "none", "unknown", "tbd", "null", "-", "pending",
  "<verifier>", "<verifier-name>", "<maker>",
]);

// Strips all control + format characters (\p{Cc}\p{Cf}: C0/C1 controls, NUL,
// soft hyphen U+00AD, zero-width/bidi U+200B-U+200F/U+202A-U+202E/U+2060-U+206F,
// BOM U+FEFF) plus default-ignorable fillers (CGJ, Hangul/Khmer/Mongolian
// fillers) after NFKC, so visually identical identities compare equal.
function normalizeIdentity(value) {
  return value
    .normalize("NFKC")
    .replace(/[\p{Cc}\p{Cf}\u034F\u115F\u1160\u17B4\u17B5\u180E\u3164\uFFA0]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

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

// Every claim — success included — must match the trace's final section.
// A success final-report over a blocked trace is a forged receipt.
const trace = read("trace.md");
const traceSections = trace.split(/^##[ \t]/m);
const traceFinal = (traceSections[traceSections.length - 1] ?? "").toLowerCase();
if (!traceFinal.includes(`stop reason: ${claimed}`)) {
  fail(`trace.md's final section does not name "Stop reason: ${claimed}"`);
}

if (claimed === "success") {
  const verdict = read("verdict.md");
  const overallHeadings = [...verdict.matchAll(/^##[ \t]*Overall[ \t]*$/gim)];
  if (overallHeadings.length !== 1) {
    fail(`verdict.md must contain exactly one "## Overall" section (found ${overallHeadings.length})`);
  }
  // The section body must be exactly one non-empty line holding a bare
  // verdict. First-token parsing would read the unedited template line
  // "approve | reject | cannot-verify" as approval.
  const afterHeading = verdict.slice(overallHeadings[0].index + overallHeadings[0][0].length);
  const nextHeading = afterHeading.search(/^#{1,6}([ \t]|$)/m);
  const overallBody = nextHeading === -1 ? afterHeading : afterHeading.slice(0, nextHeading);
  const overallLines = overallBody.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (overallLines.length !== 1) {
    fail(`verdict.md "## Overall" must contain exactly one non-empty line — the bare verdict (found ${overallLines.length})`);
  }
  const overall = overallLines[0].toLowerCase();
  if (!["approve", "reject", "cannot-verify"].includes(overall)) {
    fail(`verdict.md Overall is "${overallLines[0]}" — write exactly approve, reject, or cannot-verify (an unedited template line is not a verdict)`);
  }
  if (overall !== "approve") {
    fail(`verdict.md Overall is "${overall}", success needs "approve"`);
  }
  const verifier = normalizeIdentity(field(verdict, "Verifier"));
  if (!verifier) fail("verdict.md names no Verifier");
  if (PLACEHOLDER_IDENTITIES.has(verifier)) {
    fail(`verdict.md Verifier is a placeholder ("${verifier}")`);
  }
  const maker = normalizeIdentity(field(finalReport, "Maker"));
  if (!maker) fail("final-report.md names no Maker (required to prove verifier independence)");
  if (PLACEHOLDER_IDENTITIES.has(maker)) {
    fail(`final-report.md Maker is a placeholder ("${maker}")`);
  }
  if (verifier === maker) {
    fail(`Verifier equals Maker ("${maker}") — the maker never grades its own homework`);
  }
  const gate = join(folder, "quality-gate.sh");
  if (existsSync(gate)) {
    if (!lstatSync(gate).isFile() || statSync(gate).size === 0) {
      fail("quality-gate.sh exists but is not a regular non-empty file");
    }
    const run = spawnSync("bash", [resolve(gate)], { stdio: "inherit", cwd: resolve(folder) });
    if (run.status !== 0) fail(`quality-gate.sh exited ${run.status}`);
  } else {
    console.warn(
      "WARNING: no quality-gate.sh in loop folder — automated evidence was not re-verified here; the verdict's re-executed checks are the only automated proof",
    );
  }
}

console.log(`LEGAL STOP CLAIM: ${claimed} (${folder})`);
