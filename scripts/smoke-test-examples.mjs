import { existsSync, readFileSync } from "node:fs";

const required = [
  "docs/examples/simple-web-app/spec.md",
  "docs/examples/simple-web-app/expected-loop-contract.md",
  "docs/examples/simple-web-app/example-loop/README.md",
  "docs/examples/simple-web-app/example-loop/repo/package.json",
  "docs/examples/simple-web-app/example-loop/repo/index.html",
  "docs/examples/simple-web-app/example-loop/repo/src/app.js",
  "docs/examples/simple-web-app/example-loop/repo/src/styles.css",
  "docs/examples/simple-web-app/example-loop/repo/tests/tiny-events.spec.mjs",
  "docs/examples/simple-web-app/example-loop/repo/.loopify/index.md",
  "docs/examples/simple-web-app/example-loop/repo/.loopify/loops/001-tiny-events/source.md",
  "docs/examples/simple-web-app/example-loop/repo/.loopify/loops/001-tiny-events/loop-contract.md",
  "docs/examples/simple-web-app/example-loop/repo/.loopify/loops/001-tiny-events/quality-gate.sh",
  "docs/examples/simple-web-app/example-loop/repo/.loopify/loops/001-tiny-events/trace.md",
  "docs/examples/simple-web-app/example-loop/repo/.loopify/loops/001-tiny-events/final-report.md",
  "docs/examples/simple-web-app/example-loop/repo/.loopify/loops/001-tiny-events/artifacts/visual-review.md",
  "docs/examples/markdown-research-note/spec.md",
  "docs/examples/markdown-research-note/expected-loop-contract.md",
  "docs/examples/stuck-loop-debug/trace.md",
  "docs/examples/stuck-loop-debug/expected-diagnosis.md",
  "docs/goals/prompt.md",
  "docs/goals/2026-06-09-i-dont-prompt-i-loop-agent-workflow-research.md",
  "docs/examples/papertrail/loop-contract.md",
  "docs/concepts/loop-directory.md",
  "docs/examples/loop-directory/README.md",
  "docs/examples/loop-directory/.loopify/index.md",
  "docs/examples/loop-directory/.loopify/loops/001-tiny-events/source.md",
  "docs/examples/loop-directory/.loopify/loops/001-tiny-events/loop-contract.md",
  "docs/examples/loop-directory/.loopify/loops/001-tiny-events/quality-gate.sh",
  "docs/examples/loop-directory/.loopify/loops/001-tiny-events/acceptance-checklist.md",
  "docs/examples/loop-directory/.loopify/loops/001-tiny-events/trace.md",
  "docs/examples/loop-directory/.loopify/loops/001-tiny-events/final-report.md",
  ".loopify/index.md",
  ".loopify/loops/001-loop-directories/source.md",
  ".loopify/loops/001-loop-directories/loop-contract.md",
  ".loopify/loops/001-loop-directories/quality-gate.sh",
  ".loopify/loops/001-loop-directories/trace.md",
  ".loopify/loops/001-loop-directories/final-report.md",
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
  "docs/examples/simple-web-app/example-loop/repo/.loopify/loops/001-tiny-events/loop-contract.md",
  "docs/examples/markdown-research-note/expected-loop-contract.md",
  "docs/examples/papertrail/loop-contract.md",
  "docs/examples/loop-directory/.loopify/loops/001-tiny-events/loop-contract.md",
  ".loopify/loops/001-loop-directories/loop-contract.md",
]) {
  const text = readFileSync(path, "utf8");
  for (const heading of headings) {
    if (!text.includes(heading)) {
      throw new Error(`${path} missing ${heading}`);
    }
  }
}

const loopIndex = readFileSync("docs/examples/loop-directory/.loopify/index.md", "utf8");
for (const phrase of ["001", "tiny-events", "planned"]) {
  if (!loopIndex.includes(phrase)) {
    throw new Error(`loop-directory index missing ${phrase}`);
  }
}

const exampleLoopTrace = readFileSync(
  "docs/examples/simple-web-app/example-loop/repo/.loopify/loops/001-tiny-events/trace.md",
  "utf8",
);
for (const phrase of [
  "Missing required app file: index.html",
  "Chromium",
  "visual review found awkward desktop wrapping",
  "Stop reason: success",
]) {
  if (!exampleLoopTrace.includes(phrase)) {
    throw new Error(`simple-web-app example loop trace missing ${phrase}`);
  }
}

const visualReview = readFileSync(
  "docs/examples/simple-web-app/example-loop/repo/.loopify/loops/001-tiny-events/artifacts/visual-review.md",
  "utf8",
);
for (const phrase of ["Before Patch", "After Patch", "quality gate still passes"]) {
  if (!visualReview.includes(phrase)) {
    throw new Error(`simple-web-app visual artifact missing ${phrase}`);
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
