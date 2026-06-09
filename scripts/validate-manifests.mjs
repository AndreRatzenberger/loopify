import { existsSync, readFileSync } from "node:fs";

function readJson(path) {
  if (!existsSync(path)) {
    throw new Error(`Missing ${path}`);
  }
  return JSON.parse(readFileSync(path, "utf8"));
}

const marketplace = readJson(".claude-plugin/marketplace.json");
const plugin = readJson("plugins/loopify-agent-skills/.claude-plugin/plugin.json");

const requiredMarketplace = [
  ["name", marketplace.name],
  ["owner.name", marketplace.owner?.name],
  ["metadata.description", marketplace.metadata?.description],
  ["metadata.version", marketplace.metadata?.version],
  ["metadata.homepage", marketplace.metadata?.homepage],
  ["plugins", Array.isArray(marketplace.plugins) && marketplace.plugins.length > 0],
];

const requiredPlugin = [
  ["name", plugin.name],
  ["version", plugin.version],
  ["description", plugin.description],
  ["author.name", plugin.author?.name],
  ["homepage", plugin.homepage],
  ["repository", plugin.repository],
  ["license", plugin.license],
];

for (const [field, value] of [...requiredMarketplace, ...requiredPlugin]) {
  if (!value) {
    throw new Error(`Manifest field missing: ${field}`);
  }
}

const entry = marketplace.plugins.find((candidate) => candidate.name === "loopify-agent-skills");
if (!entry || entry.source !== "./plugins/loopify-agent-skills") {
  throw new Error("Marketplace must point to ./plugins/loopify-agent-skills");
}

if (plugin.name !== "loopify-agent-skills") {
  throw new Error("Plugin manifest name must be loopify-agent-skills");
}

console.log("Manifest validation passed.");
