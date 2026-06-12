import { mkdtempSync, mkdirSync, writeFileSync, existsSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { spawnSync } from "node:child_process";

const CHECK = "plugins/loopify/skills/loopify-run/scripts/check-stop-reason.mjs";
const EMIT = "plugins/loopify/skills/loopify-review/scripts/emit-verifier-agent.mjs";

function loopFixture({ stopReason, maker, verifier, overall, traceReason, withVerdict = true }) {
  const dir = mkdtempSync(join(tmpdir(), "loopify-fixture-"));
  writeFileSync(join(dir, "final-report.md"),
    `# Final Report\n\n- Stop reason: ${stopReason}\n- Maker: ${maker}\n- Verdict: ./verdict.md\n`);
  writeFileSync(join(dir, "trace.md"),
    `# Loop Trace\n\n## Final\n\n- Stop reason: ${traceReason ?? stopReason}\n`);
  writeFileSync(join(dir, "quality-gate.sh"), "#!/usr/bin/env bash\nexit 0\n");
  if (withVerdict) {
    writeFileSync(join(dir, "verdict.md"),
      `# Verdict\n\n- Loop: fixture\n- Verifier: ${verifier}\n- Independence level: fresh-context\n\n## Overall\n\n${overall}\n`);
  }
  return dir;
}

function expectExit(name, args, expected) {
  const run = spawnSync("node", args, { encoding: "utf8" });
  if (run.status !== expected) {
    throw new Error(`${name}: expected exit ${expected}, got ${run.status}\n${run.stdout}${run.stderr}`);
  }
  console.log(`ok: ${name}`);
}

const legal = loopFixture({ stopReason: "success", maker: "maker-model-a", verifier: "verifier-model-b", overall: "approve" });
expectExit("legal success", [CHECK, legal, "success"], 0);

const forged = loopFixture({ stopReason: "success", maker: "same-model", verifier: "same-model", overall: "approve" });
expectExit("forged verdict (maker == verifier)", [CHECK, forged, "success"], 1);

const emptyMaker = loopFixture({ stopReason: "success", maker: "", verifier: "verifier-model-b", overall: "approve" });
expectExit("success with empty Maker line", [CHECK, emptyMaker, "success"], 1);

const rejected = loopFixture({ stopReason: "success", maker: "maker-model-a", verifier: "verifier-model-b", overall: "reject" });
expectExit("rejected verdict", [CHECK, rejected, "success"], 1);

const noVerdict = loopFixture({ stopReason: "success", maker: "maker-model-a", verifier: "x", overall: "approve", withVerdict: false });
expectExit("success without verdict", [CHECK, noVerdict, "success"], 1);

const blocked = loopFixture({ stopReason: "blocked", maker: "maker-model-a", verifier: "n/a", overall: "n/a", withVerdict: false });
expectExit("legal blocked", [CHECK, blocked, "blocked"], 0);

const mismatched = loopFixture({ stopReason: "escalated", maker: "m", verifier: "n/a", overall: "n/a", traceReason: "blocked", withVerdict: false });
expectExit("escalated claim without matching trace", [CHECK, mismatched, "escalated"], 1);

const host = mkdtempSync(join(tmpdir(), "loopify-host-"));
mkdirSync(join(host, ".codex"));
spawnSync("node", [EMIT, host], { encoding: "utf8" });
if (!existsSync(join(host, ".codex", "agents", "loop-verifier.toml"))) {
  throw new Error("emit-verifier-agent did not write the codex verifier");
}
const second = spawnSync("node", [EMIT, host], { encoding: "utf8" });
if (!second.stdout.includes("exists, skipping")) {
  throw new Error("emit-verifier-agent overwrote an existing definition");
}
console.log("ok: emit-verifier-agent host detection + idempotency");

for (const dir of [legal, forged, emptyMaker, rejected, noVerdict, blocked, mismatched, host]) {
  rmSync(dir, { recursive: true, force: true });
}
console.log("Verification smoke tests passed.");
