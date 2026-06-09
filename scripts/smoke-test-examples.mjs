import { existsSync, readFileSync } from "node:fs";

const required = [
  "docs/examples/simple-web-app/spec.md",
  "docs/examples/simple-web-app/expected-loop-contract.md",
  "docs/examples/markdown-research-note/spec.md",
  "docs/examples/markdown-research-note/expected-loop-contract.md",
  "docs/examples/stuck-loop-debug/trace.md",
  "docs/examples/stuck-loop-debug/expected-diagnosis.md",
  "docs/goals/prompt.md",
  "docs/goals/2026-06-09-i-dont-prompt-i-loop-agent-workflow-research.md",
  "docs/examples/papertrail/loop-contract.md",
];

for (const path of required) {
  if (!existsSync(path)) {
    throw new Error(`Missing example fixture: ${path}`);
  }
}

const headings = [
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

for (const path of [
  "docs/examples/simple-web-app/expected-loop-contract.md",
  "docs/examples/markdown-research-note/expected-loop-contract.md",
  "docs/examples/papertrail/loop-contract.md",
]) {
  const text = readFileSync(path, "utf8");
  for (const heading of headings) {
    if (!text.includes(heading)) {
      throw new Error(`${path} missing ${heading}`);
    }
  }
}

const trace = readFileSync("docs/examples/stuck-loop-debug/trace.md", "utf8");
for (const field of ["Failure observed", "Patch", "Why this patch", "Next check"]) {
  if (!trace.includes(field)) {
    throw new Error(`stuck-loop trace missing field ${field}`);
  }
}

const diagnosis = readFileSync("docs/examples/stuck-loop-debug/expected-diagnosis.md", "utf8");
for (const phrase of ["Pattern:", "Recovery:", "Escalate"]) {
  if (!diagnosis.includes(phrase)) {
    throw new Error(`stuck-loop diagnosis missing ${phrase}`);
  }
}

console.log("Example smoke tests passed.");
