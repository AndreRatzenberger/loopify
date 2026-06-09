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
  "## Requirement Evidence Map",
  "## Stop Conditions",
  "## Trace Requirements",
];

for (const path of [
  "docs/examples/simple-web-app/expected-loop-contract.md",
  "docs/examples/markdown-research-note/expected-loop-contract.md",
]) {
  const text = readFileSync(path, "utf8");
  for (const heading of headings) {
    if (!text.includes(heading)) {
      throw new Error(`${path} missing ${heading}`);
    }
  }
}

console.log("Example smoke tests passed.");
