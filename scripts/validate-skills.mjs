import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const skillsRoot = "plugins/loopify-agent-skills/skills";
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
  const references = join(dir, "references");
  const templates = join(dir, "templates");
  const referenceCount = existsSync(references) ? readdirSync(references).length : 0;
  const templateCount = existsSync(templates) ? readdirSync(templates).length : 0;
  if (referenceCount + templateCount === 0) {
    throw new Error(`${skill} needs at least one reference or template file`);
  }
}

console.log("Skill validation passed.");
