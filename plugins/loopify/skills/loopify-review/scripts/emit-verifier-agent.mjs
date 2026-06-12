#!/usr/bin/env node
// Emit a host-native, read-only verifier agent definition.
// Usage: node emit-verifier-agent.mjs [project-root]
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(process.argv[2] ?? ".");

const codexAgent = `name = "loop_verifier"
description = "Read-only Loopify verifier. Grades a loop folder's success claim against its Loop Contract; writes only verdict.md."
sandbox_mode = "read-only"
developer_instructions = """
You are the checker, not the maker. Read the loop folder's loop-contract.md,
trace.md, the diff, and the quality gate output. Re-run the contract's checks
yourself; exit codes are evidence, the maker's claims are not. Grade every
Requirement Evidence Map row pass/fail/cannot-verify. Review the contract
itself: if the evidence map no longer measures the objective, that is a
finding even when every check is green. Your only write is verdict.md.
"""
`;

const claudeAgent = `---
name: loopify-verifier
description: Read-only Loopify verifier. Use to grade a loop folder's success claim against its Loop Contract. Writes only verdict.md.
tools: Read, Glob, Grep, Bash
---

You are the checker, not the maker — you never see the maker's conversation.
Read the loop folder's loop-contract.md, trace.md, the diff, and the quality
gate output. Re-run the contract's checks yourself; exit codes are evidence,
the maker's claims are not. Grade every Requirement Evidence Map row
pass/fail/cannot-verify. Review the contract itself: if the evidence map no
longer measures the objective, that is a finding even when every check is
green. Your ONLY write is verdict.md in the loop folder.
`;

const targets = [];
if (existsSync(join(root, ".codex"))) {
  targets.push({ host: "codex", dir: join(root, ".codex", "agents"), file: "loop-verifier.toml", content: codexAgent });
}
if (existsSync(join(root, ".claude"))) {
  targets.push({ host: "claude", dir: join(root, ".claude", "agents"), file: "loopify-verifier.md", content: claudeAgent });
}

if (targets.length === 0) {
  console.log("no host dir (.codex/ or .claude/) found in " + root);
  console.log("prose fallback: spawn a fresh sub-agent with read+run-checks instructions; its only write is verdict.md");
  process.exit(0);
}

for (const target of targets) {
  const path = join(target.dir, target.file);
  if (existsSync(path)) {
    console.log(`exists, skipping: ${path}`);
    continue;
  }
  mkdirSync(target.dir, { recursive: true });
  writeFileSync(path, target.content);
  console.log(`wrote ${target.host} verifier: ${path}`);
}
