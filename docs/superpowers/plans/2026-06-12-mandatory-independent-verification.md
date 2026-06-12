# Mandatory Independent Verification (Loop 002) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `success` an illegal stop reason without an independent verifier's approving `verdict.md`, make the stop claim machine-checkable, and rename the plugin `loopify-agent-skills` → `loopify`.

**Architecture:** Spec: `docs/superpowers/specs/2026-06-12-mandatory-independent-verification-design.md`. The contract gains a required `## Verification` section; `loopify-review` gains a verifier mode that writes `verdict.md` (the maker may not); `check-stop-reason.mjs` turns the stop claim into an exit code; a host adapter emits read-only verifier agent definitions (`.codex/` TOML / `.claude/` markdown). Zero new skills. Rename happens first so every later path is final.

**Tech Stack:** Node ≥18 ESM scripts (`.mjs`, no dependencies), bash, markdown skill files. Quality gate: `npm run quality` + `git diff --check`.

**Conventions for every task:** run commands from the repo root. Commit after each task with the exact message given. Never use `git add -A` — stage the listed paths only.

---

### Task 1: Plugin rename `loopify-agent-skills` → `loopify`

**Files:**
- Rename: `plugins/loopify-agent-skills/` → `plugins/loopify/`
- Modify: `.claude-plugin/marketplace.json`, `plugins/loopify/.claude-plugin/plugin.json`, `scripts/validate-manifests.mjs`, `scripts/validate-skills.mjs`, `README.md`

- [ ] **Step 1: Move the directory**

```bash
git mv plugins/loopify-agent-skills plugins/loopify
```

- [ ] **Step 2: Update the marketplace manifest**

In `.claude-plugin/marketplace.json`, inside the `plugins` array entry, change:

```json
      "name": "loopify",
      "source": "./plugins/loopify",
```

(both fields previously said `loopify-agent-skills`; leave `description` content as-is).

- [ ] **Step 3: Update the plugin manifest**

In `plugins/loopify/.claude-plugin/plugin.json` change the name field to:

```json
  "name": "loopify",
```

- [ ] **Step 4: Update validate-manifests.mjs**

Replace these three statements (old values `loopify-agent-skills` / `./plugins/loopify-agent-skills`):

```js
const plugin = readJson("plugins/loopify/.claude-plugin/plugin.json");
```

```js
const entry = marketplace.plugins.find((candidate) => candidate.name === "loopify");
if (!entry || entry.source !== "./plugins/loopify") {
  throw new Error("Marketplace must point to ./plugins/loopify");
}

if (plugin.name !== "loopify") {
  throw new Error("Plugin manifest name must be loopify");
}
```

- [ ] **Step 5: Update validate-skills.mjs**

```js
const skillsRoot = "plugins/loopify/skills";
```

- [ ] **Step 6: Update README install commands and add migration note**

In `README.md` replace the two install lines:

```bash
codex plugin add loopify@loopify
```

```text
/plugin install loopify@loopify
```

Directly under the Claude Code install block add:

```md
> Upgrading from 0.1.x? The plugin was renamed: uninstall
> `loopify-agent-skills@loopify`, then install `loopify@loopify`. Your
> `.loopify/` folders are unaffected — the plugin name is not part of any
> loop artifact.
```

Also update the `## 💻 Development` project-shape block: `└── loopify-agent-skills/` → `└── loopify/`.

- [ ] **Step 7: Verify no stale references**

```bash
grep -rn "loopify-agent-skills" --include="*.md" --include="*.mjs" --include="*.json" . | grep -v docs/goals/ | grep -v docs/superpowers/ | grep -v node_modules
```

Expected: no output (`docs/goals/goal.md` is historical and excluded; specs/plans document the rename).

- [ ] **Step 8: Run the quality gate**

```bash
npm run quality
```

Expected: `Manifest validation passed.` / `Skill validation passed.` / `Example smoke tests passed.`

- [ ] **Step 9: Commit**

```bash
git add -- .claude-plugin/marketplace.json plugins scripts/validate-manifests.mjs scripts/validate-skills.mjs README.md
git commit -m "rename plugin loopify-agent-skills -> loopify with migration note"
```

---

### Task 2: `## Verification` becomes a required contract heading

**Files:**
- Modify: `plugins/loopify/skills/loopify-spec/scripts/check-loop-contract.mjs`
- Modify: `plugins/loopify/skills/loopify-spec/templates/loop-contract.md`
- Modify: `plugins/loopify/skills/loopify-bootstrap/templates/loop-directory/loop-contract.md`

- [ ] **Step 1: Add the heading requirement (the failing test)**

In `check-loop-contract.mjs`, in the `headings` array, insert between `"## Blocked Conditions"` and `"## Trace Requirements"`:

```js
  "## Verification",
```

- [ ] **Step 2: Run the checker against the template to verify it fails**

```bash
node plugins/loopify/skills/loopify-spec/scripts/check-loop-contract.mjs plugins/loopify/skills/loopify-spec/templates/loop-contract.md
```

Expected: FAIL — `missing ## Verification`

- [ ] **Step 3: Add the section to both contract templates**

In `plugins/loopify/skills/loopify-spec/templates/loop-contract.md` AND
`plugins/loopify/skills/loopify-bootstrap/templates/loop-directory/loop-contract.md`,
insert between the `## Blocked Conditions` and `## Trace Requirements` sections:

```md
## Verification

- Verifier:
- Independence level: cross-model | fresh-context | human
- Verifier inputs: loop-contract.md, trace.md, the diff, quality gate output
- Verifier authority: read everything in scope, re-run checks; writes ONLY verdict.md
- Verdict location: ./verdict.md
- Minimum independence for this loop:
```

In both files, under `## Allowed Changes`, add this line:

```md
Denied always: `verdict.md` — only the verifier writes it.
```

- [ ] **Step 4: Run the checker again on both templates**

```bash
node plugins/loopify/skills/loopify-spec/scripts/check-loop-contract.mjs plugins/loopify/skills/loopify-spec/templates/loop-contract.md
node plugins/loopify/skills/loopify-spec/scripts/check-loop-contract.mjs plugins/loopify/skills/loopify-bootstrap/templates/loop-directory/loop-contract.md
```

Expected: `Loop Contract headings passed: <path>` twice.

- [ ] **Step 5: Commit**

```bash
git add -- plugins/loopify/skills/loopify-spec plugins/loopify/skills/loopify-bootstrap/templates/loop-directory/loop-contract.md
git commit -m "feat: require Verification section in Loop Contracts"
```

---

### Task 3: Example contracts gain `## Verification` (smoke test first)

**Files:**
- Modify: `scripts/smoke-test-examples.mjs`
- Modify: the six contract files listed in its heading-check loop

- [ ] **Step 1: Extend the smoke test (failing first)**

In `scripts/smoke-test-examples.mjs`, in the `headings` array, insert between `"## Blocked Conditions"` and `"## Trace Requirements"`:

```js
  "## Verification",
```

- [ ] **Step 2: Run to verify it fails**

```bash
npm run smoke:examples
```

Expected: FAIL — `docs/examples/simple-web-app/expected-loop-contract.md missing ## Verification`

- [ ] **Step 3: Add a filled Verification section to all six contracts**

Files (same list as the smoke test's loop):
1. `docs/examples/simple-web-app/expected-loop-contract.md`
2. `docs/examples/simple-web-app/example-loop/repo/.loopify/loops/001-tiny-events/loop-contract.md`
3. `docs/examples/markdown-research-note/expected-loop-contract.md`
4. `docs/examples/papertrail/loop-contract.md`
5. `docs/examples/loop-directory/.loopify/loops/001-tiny-events/loop-contract.md`
6. `.loopify/loops/001-loop-directories/loop-contract.md`

For files 1–5, insert between `## Blocked Conditions` and `## Trace Requirements`:

```md
## Verification

- Verifier: independent reviewer in a fresh context (different model preferred)
- Independence level: fresh-context
- Verifier inputs: loop-contract.md, trace.md, the diff, quality gate output
- Verifier authority: read everything in scope, re-run checks; writes ONLY verdict.md
- Verdict location: ./verdict.md
- Minimum independence for this loop: fresh-context
```

For file 6 (the closed historical loop), insert the same block plus one trailing line:

```md
Retroactive note: this loop closed before mandatory verification (v0.2.0);
no verdict is required retroactively.
```

- [ ] **Step 4: Run to verify it passes**

```bash
npm run smoke:examples
```

Expected: `Example smoke tests passed.`

- [ ] **Step 5: Commit**

```bash
git add -- scripts/smoke-test-examples.mjs docs/examples .loopify/loops/001-loop-directories/loop-contract.md
git commit -m "feat: example contracts carry Verification sections, smoke-enforced"
```

---

### Task 4: Verdict template, example verdict, Maker line in final reports

**Files:**
- Create: `plugins/loopify/skills/loopify-review/templates/verdict.md`
- Create: `docs/examples/simple-web-app/example-loop/repo/.loopify/loops/001-tiny-events/verdict.md`
- Modify: `scripts/validate-skills.mjs`, `scripts/smoke-test-examples.mjs`
- Modify: `plugins/loopify/skills/loopify-run/templates/run-final-report.md`, `plugins/loopify/skills/loopify-run/templates/final-report.md`, `plugins/loopify/skills/loopify-bootstrap/templates/loop-directory/final-report.md`
- Modify: `docs/examples/simple-web-app/example-loop/repo/.loopify/loops/001-tiny-events/final-report.md`

- [ ] **Step 1: Require the template (failing first)**

In `scripts/validate-skills.mjs`, `requiredMaterials["loopify-review"]`, add:

```js
    "templates/verdict.md",
```

Run `npm run validate:skills` — expected: FAIL — `loopify-review missing required material templates/verdict.md`

- [ ] **Step 2: Create the verdict template**

`plugins/loopify/skills/loopify-review/templates/verdict.md`:

```md
# Verdict

- Loop:
- Verifier:
- Independence level: cross-model | fresh-context | human
- Date:

## Checks Re-Executed

| Command | Exit code |
| --- | --- |

## Requirement Verdicts

| Requirement | Evidence class | Verdict (pass / fail / cannot-verify) | Note |
| --- | --- | --- | --- |

## Manual / Visual Queue

## Findings

## Overall

approve | reject | cannot-verify
```

Run `npm run validate:skills` — expected: `Skill validation passed.`

- [ ] **Step 3: Add Maker and Verdict lines to all three final-report templates**

In `run-final-report.md`, `final-report.md` (loopify-run), and
`loopify-bootstrap/templates/loop-directory/final-report.md`, add directly
under the `- Stop reason:` line:

```md
- Maker:
- Verdict:
```

- [ ] **Step 4: Write the example verdict and update the example final report**

Create `docs/examples/simple-web-app/example-loop/repo/.loopify/loops/001-tiny-events/verdict.md`:

```md
# Verdict

- Loop: 001-tiny-events
- Verifier: fresh-context reviewer (independent session)
- Independence level: fresh-context
- Date: 2026-06-12

## Checks Re-Executed

| Command | Exit code |
| --- | --- |
| `bash quality-gate.sh` | 0 |

## Requirement Verdicts

| Requirement | Evidence class | Verdict (pass / fail / cannot-verify) | Note |
| --- | --- | --- | --- |
| Event list renders from seeded data | automated | pass | covered by tests/tiny-events.spec.mjs |
| Add-event form validates input | automated | pass | gate re-run green |
| Layout reads well on desktop | visual | pass | artifacts/visual-review.md before/after |

## Manual / Visual Queue

- none open — visual review completed in artifacts/visual-review.md

## Findings

- none blocking

## Overall

approve
```

In the example loop's `final-report.md`, add under `- Stop reason:` line:

```md
- Maker: example maker session
- Verdict: ./verdict.md (approve, fresh-context)
```

- [ ] **Step 5: Smoke-enforce the example verdict**

In `scripts/smoke-test-examples.mjs`:

(a) add to the `required` array:

```js
  "docs/examples/simple-web-app/example-loop/repo/.loopify/loops/001-tiny-events/verdict.md",
```

(b) append after the `visualReview` check block:

```js
const exampleVerdict = readFileSync(
  "docs/examples/simple-web-app/example-loop/repo/.loopify/loops/001-tiny-events/verdict.md",
  "utf8",
);
for (const phrase of ["Independence level", "## Checks Re-Executed", "## Overall", "approve"]) {
  if (!exampleVerdict.includes(phrase)) {
    throw new Error(`example verdict missing ${phrase}`);
  }
}
```

- [ ] **Step 6: Run the gate**

```bash
npm run quality
```

Expected: all three validators pass.

- [ ] **Step 7: Commit**

```bash
git add -- plugins/loopify/skills/loopify-review/templates/verdict.md plugins/loopify/skills/loopify-run/templates plugins/loopify/skills/loopify-bootstrap/templates/loop-directory/final-report.md docs/examples/simple-web-app/example-loop scripts/validate-skills.mjs scripts/smoke-test-examples.mjs
git commit -m "feat: verdict artifact template, example verdict, Maker identity in final reports"
```

---

### Task 5: Host adapter — `emit-verifier-agent.mjs`

**Files:**
- Create: `plugins/loopify/skills/loopify-review/scripts/emit-verifier-agent.mjs`
- Modify: `scripts/validate-skills.mjs`

- [ ] **Step 1: Require the script (failing first)**

In `requiredMaterials["loopify-review"]` add:

```js
    "scripts/emit-verifier-agent.mjs",
```

Run `npm run validate:skills` — expected FAIL.

- [ ] **Step 2: Create the script**

`plugins/loopify/skills/loopify-review/scripts/emit-verifier-agent.mjs`:

```js
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
```

- [ ] **Step 3: Manually verify host detection and idempotency**

```bash
TMP=$(mktemp -d) && mkdir "$TMP/.codex" && node plugins/loopify/skills/loopify-review/scripts/emit-verifier-agent.mjs "$TMP"
```

Expected: `wrote codex verifier: <tmp>/.codex/agents/loop-verifier.toml`

```bash
node plugins/loopify/skills/loopify-review/scripts/emit-verifier-agent.mjs "$TMP" && grep -c 'sandbox_mode = "read-only"' "$TMP/.codex/agents/loop-verifier.toml" && rm -rf "$TMP"
```

Expected: `exists, skipping: …` then `1`.

- [ ] **Step 4: Run validate:skills, then commit**

```bash
npm run validate:skills
git add -- plugins/loopify/skills/loopify-review/scripts/emit-verifier-agent.mjs scripts/validate-skills.mjs
git commit -m "feat: emit host-native read-only verifier agent definitions"
```

---

### Task 6: `check-stop-reason.mjs` + verification smoke test

**Files:**
- Create: `plugins/loopify/skills/loopify-run/scripts/check-stop-reason.mjs`
- Create: `scripts/smoke-test-verification.mjs`
- Modify: `scripts/validate-skills.mjs`, `package.json`

- [ ] **Step 1: Require the script (failing first)**

In `requiredMaterials["loopify-run"]` add:

```js
    "scripts/check-stop-reason.mjs",
```

Run `npm run validate:skills` — expected FAIL.

- [ ] **Step 2: Create check-stop-reason.mjs**

`plugins/loopify/skills/loopify-run/scripts/check-stop-reason.mjs`:

```js
#!/usr/bin/env node
// Binary legality check for a claimed stop reason.
// Usage: node check-stop-reason.mjs <loop-folder> <success|blocked|escalated|budget-exhausted>
// Exit 0 = legal claim, 1 = illegal, 2 = usage error.
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
  const match = text.match(new RegExp(`^[-*]\\s*${label}:\\s*(.+)$`, "mi"));
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
  const overall = (verdict.match(/##\s*Overall\s*\n+\s*([a-z-]+)/i) ?? [])[1] ?? "";
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
```

Run `npm run validate:skills` — expected: `Skill validation passed.`

- [ ] **Step 3: Create the fixture-based smoke test**

`scripts/smoke-test-verification.mjs`:

```js
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

for (const dir of [legal, forged, rejected, noVerdict, blocked, mismatched, host]) {
  rmSync(dir, { recursive: true, force: true });
}
console.log("Verification smoke tests passed.");
```

- [ ] **Step 4: Wire into the quality gate**

In `package.json` scripts:

```json
    "smoke:verification": "node scripts/smoke-test-verification.mjs",
    "quality": "npm run validate:manifests && npm run validate:skills && npm run smoke:examples && npm run smoke:verification"
```

- [ ] **Step 5: Run it**

```bash
npm run quality
```

Expected: six `ok:` lines, `Verification smoke tests passed.`, all validators green.

- [ ] **Step 6: Commit**

```bash
git add -- plugins/loopify/skills/loopify-run/scripts/check-stop-reason.mjs scripts/smoke-test-verification.mjs scripts/validate-skills.mjs package.json
git commit -m "feat: stop claims become exit codes — check-stop-reason with forged-verdict fixtures"
```

---

### Task 7: `loopify-run` protocol — verification before success

**Files:**
- Modify: `plugins/loopify/skills/loopify-run/SKILL.md`
- Modify: `plugins/loopify/skills/loopify-run/references/loop-execution-protocol.md`

- [ ] **Step 1: Update SKILL.md**

(a) In `## Do Not Use` append:

```md
- Do not write `verdict.md` — the maker never grades its own homework.
```

(b) Replace workflow steps 10–11 (`10. Write final-report.md.` / `11. Stop with…`) with:

```md
10. When checks pass and manual items are queued, request verification per the
    contract's `## Verification` section: hand contract, trace, diff, and gate
    output to an independent verifier (different model, fresh sub-agent, or
    human — see loopify-review verifier mode). Never write `verdict.md`
    yourself.
11. On reject: append the findings to `trace.md` as observed failures and
    continue within budget. If the verifier rejects the same finding twice,
    stop `escalated`. On cannot-verify: stop `escalated`.
12. Write `final-report.md` with `Maker:` identity and a `Verdict:` link.
13. Stop with `success` (requires an approving verdict), `blocked`,
    `escalated`, or `budget-exhausted`, and validate the claim:
    `node <plugin>/skills/loopify-run/scripts/check-stop-reason.mjs <loop-folder> <reason>`
```

(c) In `## Validation` append:

```md
- `check-stop-reason.mjs` exits 0 for the claimed stop reason.
- `success` claims carry an approving `verdict.md` whose verifier differs from
  the final report's `Maker:`.
```

- [ ] **Step 2: Update the execution protocol reference**

In `references/loop-execution-protocol.md` replace steps 9–11 with:

```md
9. When the gate is green and manual items are queued, obtain a verdict from
   an independent verifier (contract `## Verification`): the verifier
   re-runs checks in its own context and writes `verdict.md`. The maker never
   writes that file.
10. On reject, treat each finding as an observed failure (back to step 5).
    Same finding rejected twice → stop `escalated`.
11. Write or update `final-report.md` (`Maker:` identity, `Verdict:` link).
12. Update `.loopify/index.md` with status and stop reason when known.
13. Stop when the contract's stop rule is met, then run
    `check-stop-reason.mjs <loop-folder> <reason>` — exit 0 or the claim is
    illegal.
```

Keep the existing trailing escalation paragraph unchanged.

- [ ] **Step 3: Validate and commit**

```bash
npm run validate:skills
git add -- plugins/loopify/skills/loopify-run/SKILL.md plugins/loopify/skills/loopify-run/references/loop-execution-protocol.md
git commit -m "feat: loopify-run requires an independent verdict before success"
```

---

### Task 8: `loopify-review` verifier mode + independence reference

**Files:**
- Modify: `plugins/loopify/skills/loopify-review/SKILL.md`
- Create: `plugins/loopify/skills/loopify-review/references/independent-verification.md`
- Modify: `scripts/validate-skills.mjs`

- [ ] **Step 1: Require the reference (failing first)**

`requiredMaterials["loopify-review"]` add:

```js
    "references/independent-verification.md",
```

Run `npm run validate:skills` — expected FAIL.

- [ ] **Step 2: Write the reference**

`plugins/loopify/skills/loopify-review/references/independent-verification.md`:

```md
# Independent Verification

Models reviewing their own output inherit their own framing errors; grading
belongs in a context window that never saw the maker's conversation. That is
why `success` requires a verdict from an independent verifier.

## Independence ladder (strongest first)

1. **cross-model** — different model, different harness. Breaks shared-prior
   blind spots, not just shared-context bias. Examples: a Claude Code maker
   hands the loop folder to a Codex CLI verifier session, or the reverse.
2. **fresh-context** — same model family, new context (sub-agent), no access
   to the maker's conversation. Breaks narrative bias only. Use the emitted
   host agent (`scripts/emit-verifier-agent.mjs`) so read-only authority is
   enforced by the harness, not by politeness.
3. **human** — a named human reviews and writes/approves the verdict.

No rung available → the loop cannot reach `success`; stop `escalated`
(`cannot-verify`).

## Verifier rules

- Re-execute the quality gate and cheap checks yourself. Reading the maker's
  trace is not verification; exit codes are.
- `pass` verdicts cite evidence (command output, file, screenshot), never the
  maker's claim.
- Review the contract too: if the evidence map no longer measures the
  objective, that is a finding even when every check is green.
- Confirm the manual/visual queue is enumerated with owners.
- If the full gate is too expensive to re-run, the contract's Verification
  section may name a cheaper command subset — but it must be a command list,
  never "trust the trace".
- Your only write is `verdict.md` (template: `templates/verdict.md`).

## Wiring recipes

- **Claude Code maker → Codex verifier:** run the emitted
  `.codex/agents/loop-verifier.toml` in a Codex session pointed at the repo;
  prompt: "Verify .loopify/loops/NNN-slug/ against its loop-contract.md and
  write verdict.md."
- **Codex maker → Claude Code verifier:** use the emitted
  `.claude/agents/loopify-verifier.md` sub-agent with the same prompt.
- **Fallback (no host dirs):** spawn a fresh sub-agent with read+run-checks
  instructions only; it returns the verdict body, the human or harness places
  it as `verdict.md`.
- **Disagreement:** one re-run is allowed only for infrastructure failures
  (a check would not run). Never re-roll a verifier until it approves;
  persistent disagreement goes to a human (`escalated`).
```

Run `npm run validate:skills` — expected: pass.

- [ ] **Step 3: Update SKILL.md**

(a) Replace the frontmatter description with:

```md
description: "Use when auditing a Loop Contract, trace, quality gate, or done claim — or when acting as the independent verifier that grades a loop's success claim and writes verdict.md."
```

(b) In `## When To Use` append:

```md
- A loop requests verification per its contract's `## Verification` section
  (verifier mode).
```

(c) After the existing workflow list append:

```md
## Verifier Mode

When invoked as the independent verifier (never the maker's session):

1. Read `references/independent-verification.md` and the loop folder's
   contract, trace, and diff.
2. Re-run the quality gate and the contract's cheap checks yourself.
3. Grade every Requirement Evidence Map row pass/fail/cannot-verify.
4. Confirm the manual/visual queue is enumerated.
5. Write `verdict.md` from `templates/verdict.md` — your only write.
6. Overall: `approve` only when every automated row passes and nothing
   blocking remains; otherwise `reject` with severity-ordered findings, or
   `cannot-verify` with what was missing.
```

(d) In `## Validation` append:

```md
- Verifier mode: `verdict.md` exists, names the verifier and independence
  level, and every Overall=approve is backed by re-executed checks.
```

- [ ] **Step 4: Validate and commit**

```bash
npm run validate:skills
git add -- plugins/loopify/skills/loopify-review scripts/validate-skills.mjs
git commit -m "feat: loopify-review verifier mode with independence ladder reference"
```

---

### Task 9: Concepts, failure modes, README, bootstrap mention

**Files:**
- Modify: `docs/concepts/loop-contract.md`, `docs/concepts/failure-modes.md`, `README.md`
- Modify: `plugins/loopify/skills/loopify-bootstrap/SKILL.md`, `plugins/loopify/skills/loopify-bootstrap/templates/loop-directory/README.md`

- [ ] **Step 1: docs/concepts/loop-contract.md**

(a) In the `## Required Sections` code block insert `## Verification` between
`## Blocked Conditions` and `## Trace Requirements`.

(b) After the `## Blocked Rules` section insert:

```md
## Verification Section

The contract names who is allowed to grade `success` — and it is never the
maker. The independence ladder, strongest first: **cross-model** (different
model, different harness), **fresh-context** (same model, new context window,
harness-enforced read-only where possible), **human**. The verifier re-runs
the checks, grades every evidence-map row, and writes `verdict.md` — the one
file the maker's Allowed Changes always denies. `success` without an
approving verdict is an illegal stop claim (`check-stop-reason.mjs` exits 1).
Same finding rejected twice → `escalated`; no verifier available →
`escalated` (`cannot-verify`).
```

- [ ] **Step 2: docs/concepts/failure-modes.md — append two modes**

```md
## Self-Graded Success

The maker declares done on its own authority. Completion bias makes this the
default failure, not the exception: the model that produced the work is
structurally the worst judge of whether it is finished. Mitigation: the
contract's Verification section plus `check-stop-reason.mjs` — success
requires an approving verdict from an independent context.

## Verifier Capture

The verifier rubber-stamps because it grades the maker's narrative instead of
reality: it reads the trace, believes the claims, and approves. Mitigation:
the verifier re-executes checks itself, cites evidence per requirement, and
is re-rolled only for infrastructure failures — never until it approves.
```

- [ ] **Step 3: README**

(a) In `## 🛡️ Stop Rules`, after the four-reason list, append:

```md
And one rule above the four: **the maker never grades its own homework.**
`success` is only legal with an approving `verdict.md` written by an
independent verifier — a different model, a fresh read-only context, or a
human. The stop claim itself is machine-checked (`check-stop-reason.mjs`).
```

(b) Update the skill table row for `loopify-review` to:

```md
| `loopify-review` | Audits contracts, traces, done claims, and residual risk — and acts as the independent verifier that writes `verdict.md`. |
```

- [ ] **Step 4: Bootstrap mentions**

(a) `plugins/loopify/skills/loopify-bootstrap/SKILL.md` — in its Workflow
section, after the step that seeds the loop directory, add:

```md
- Note in the loop README that `verdict.md` will be written by the
  independent verifier at the end — the maker must not create it.
```

(b) `plugins/loopify/skills/loopify-bootstrap/templates/loop-directory/README.md` — append:

```md
`verdict.md` appears at the end of the loop: it is written by the independent
verifier (see the contract's Verification section), never by the maker.
Validate stop claims with `check-stop-reason.mjs <this-folder> <reason>`.
```

- [ ] **Step 5: Gate and commit**

```bash
npm run quality
git add -- docs/concepts/loop-contract.md docs/concepts/failure-modes.md README.md plugins/loopify/skills/loopify-bootstrap
git commit -m "docs: verification concept, self-graded-success and verifier-capture failure modes"
```

---

### Task 10: Version bump, full gate, dogfood loop folder

**Files:**
- Modify: `.claude-plugin/marketplace.json`, `plugins/loopify/.claude-plugin/plugin.json`, `package.json`, `.loopify/index.md`
- Create: `.loopify/loops/002-mandatory-verifier/` (source.md, loop-contract.md, quality-gate.sh, trace.md, final-report.md, artifacts/.gitkeep)

- [ ] **Step 1: Bump versions to 0.2.0**

`marketplace.json` `metadata.version`, `plugin.json` `version`, `package.json`
`version` → `"0.2.0"`.

- [ ] **Step 2: Create the dogfood loop folder**

`.loopify/loops/002-mandatory-verifier/source.md`:

```md
# Source

Spec: ../../../docs/superpowers/specs/2026-06-12-mandatory-independent-verification-design.md
Plan: ../../../docs/superpowers/plans/2026-06-12-mandatory-independent-verification.md
```

`loop-contract.md`: full contract using the NEW template (all headings
including `## Verification`). Key content: Objective = implement the spec;
Requirements = the spec's goals 1–4 plus the plugin rename; evidence map rows
pointing at `npm run quality`, `git diff --check`, and the new smoke tests;
Allowed Changes = repo files per plan, `Denied always: verdict.md`;
Verification = independence level `cross-model` minimum `fresh-context`;
Stop Conditions = the four reasons with success requiring an approving
verdict.

`quality-gate.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../../.."
npm run quality
git diff --check
```

`trace.md`: one turn per implementation task (1–10), each with Command /
Result / Failure observed / Patch / Why this patch / Next check, ending:

```md
## Final

- Stop reason: escalated
- Passing command: npm run quality
- Evidence: all validators green incl. smoke:verification fixtures
- Remaining caveats: verdict.md pending — awaiting independent verifier
```

`final-report.md`:

```md
# Final Report

- Stop reason: escalated
- Maker: <the implementing session/model>
- Verdict: pending — independent verifier queued
- Loop directory: .loopify/loops/002-mandatory-verifier/
- Contract: ./loop-contract.md
- Trace: ./trace.md
- Loop turns: 10
- Commands run: npm run quality; git diff --check
- Passing command: npm run quality
- Evidence: validators + verification smoke fixtures green
- Manual / visual review: none required
- Remaining caveats: success may only be claimed after an independent
  verifier writes an approving verdict.md
- Follow-up loops: 003-harness-absorption
```

The loop stops `escalated` — honestly: the feature it implements forbids the
maker from declaring its own success. The verifier (a different model or a
fresh read-only context) writes `verdict.md` afterwards; only then may the
index flip to `success`.

- [ ] **Step 3: Update `.loopify/index.md`**

Add the row for `002-mandatory-verifier` with status `escalated — awaiting
independent verdict`.

- [ ] **Step 4: Validate the stop claim mechanically**

```bash
node plugins/loopify/skills/loopify-run/scripts/check-stop-reason.mjs .loopify/loops/002-mandatory-verifier escalated
```

Expected: `LEGAL STOP CLAIM: escalated (...)`

- [ ] **Step 5: Full gate**

```bash
npm run quality && git diff --check
```

Expected: everything green.

- [ ] **Step 6: Commit**

```bash
git add -- .claude-plugin/marketplace.json plugins/loopify/.claude-plugin/plugin.json package.json .loopify
git commit -m "release: loopify 0.2.0 — mandatory independent verification, dogfooded as loop 002"
```

---

## Post-plan verification (executor checklist)

1. `npm run quality` green, `git diff --check` clean, working tree clean.
2. `grep -rn "loopify-agent-skills" --include="*.md" --include="*.mjs" --include="*.json" .` hits only `docs/goals/` and `docs/superpowers/`.
3. The forged-verdict fixture (`maker == verifier`) exits 1 — run
   `npm run smoke:verification` once more and read the six `ok:` lines.
4. Loop 002 sits at `escalated` until an independent verifier writes
   `verdict.md` — do NOT flip it to success from the implementing session.
```
