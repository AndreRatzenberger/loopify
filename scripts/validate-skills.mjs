import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const skillsRoot = "plugins/loopify/skills";
const requiredSkills = [
  "loopify-spec",
  "loopify-bootstrap",
  "loopify-run",
  "loopify-checks",
  "loopify-trace",
  "loopify-review",
  "loopify-debug",
  "loopify-demo",
  "loopify-codex-sdk",
  "loopify-retro",
  "loopify-governance",
];

const requiredMaterials = {
  "loopify-spec": [
    "references/evidence-classes.md",
    "references/spec-to-loop-method.md",
    "templates/loop-contract.md",
    "scripts/check-loop-contract.mjs",
  ],
  "loopify-bootstrap": [
    "references/repo-stack-detection.md",
    "templates/goal-prompt.md",
    "templates/quality-gate.sh",
    "templates/trace.md",
    "templates/loop-index.md",
    "templates/loop-directory/README.md",
    "templates/loop-directory/source.md",
    "templates/loop-directory/loop-contract.md",
    "templates/loop-directory/quality-gate.sh",
    "templates/loop-directory/acceptance-checklist.md",
    "templates/loop-directory/trace.md",
    "templates/loop-directory/final-report.md",
    "templates/loop-directory/retro.md",
  ],
  "loopify-run": [
    "references/loop-execution-protocol.md",
    "templates/run-final-report.md",
    "scripts/summarize-trace.mjs",
    "scripts/check-stop-reason.mjs",
  ],
  "loopify-checks": [
    "references/check-patterns.md",
    "references/visual-review-gates.md",
    "references/manual-review-language.md",
    "templates/acceptance-checklist.md",
  ],
  "loopify-trace": [
    "templates/trace.md",
    "templates/final-evidence-summary.md",
    "scripts/check-trace.mjs",
  ],
  "loopify-review": [
    "references/review-rubric.md",
    "templates/review-report.md",
    "templates/verdict.md",
    "scripts/emit-verifier-agent.mjs",
  ],
  "loopify-debug": [
    "references/stuck-loop-taxonomy.md",
    "templates/blocked-report.md",
    "templates/recovery-plan.md",
  ],
  "loopify-demo": [
    "references/demo-patterns.md",
    "templates/demo-goal-prompt.md",
    "templates/demo-script.md",
    "templates/material-pack/README.md",
  ],
  "loopify-codex-sdk": [
    "references/codex-sdk-loop-actuators.md",
    "templates/codex-repair-actuator.py",
    "templates/codex-review-actuator.md",
  ],
  "loopify-retro": [
    "references/retro-patterns.md",
    "templates/loop-retro.md",
  ],
  "loopify-governance": [
    "references/risk-classes.md",
    "references/authority-boundaries.md",
    "templates/governance-addendum.md",
    "templates/harness-change-contract.md",
  ],
};

const requiredSections = [
  "## When To Use",
  "## Do Not Use",
  "## Workflow",
  "## Output",
  "## Validation",
  "## Example",
];

function parseFrontmatter(text, path) {
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    throw new Error(`${path} is missing YAML frontmatter`);
  }
  const fields = Object.fromEntries(
    match[1]
      .split("\n")
      .map((line) => line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/))
      .filter(Boolean)
      .map((match) => [match[1], match[2].replace(/^"|"$/g, "")]),
  );
  return fields;
}

for (const skill of requiredSkills) {
  const dir = join(skillsRoot, skill);
  const skillPath = join(dir, "SKILL.md");
  if (!existsSync(skillPath)) {
    throw new Error(`${skillPath} is missing`);
  }
  const text = readFileSync(skillPath, "utf8");
  const frontmatter = parseFrontmatter(text, skillPath);
  if (frontmatter.name !== skill) {
    throw new Error(`${skillPath} frontmatter name must be ${skill}`);
  }
  if (!frontmatter.description || frontmatter.description.length < 40) {
    throw new Error(`${skillPath} needs a useful description`);
  }
  for (const section of requiredSections) {
    if (!text.includes(section)) {
      throw new Error(`${skillPath} missing required section ${section}`);
    }
  }
  const references = join(dir, "references");
  const templates = join(dir, "templates");
  const referenceCount = existsSync(references) ? readdirSync(references).length : 0;
  const templateCount = existsSync(templates) ? readdirSync(templates).length : 0;
  if (referenceCount + templateCount === 0) {
    throw new Error(`${skill} needs at least one reference or template file`);
  }
  for (const material of requiredMaterials[skill]) {
    const materialPath = join(dir, material);
    if (!existsSync(materialPath)) {
      throw new Error(`${skill} missing required material ${material}`);
    }
  }
}

console.log("Skill validation passed.");
