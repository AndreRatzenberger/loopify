# Loop Contract

## Source Spec

`docs/goals/prompt.md`

## Objective

Build PaperTrail, a research paper catalog with autonomous arXiv ingestion,
GraphRAG search, four specialized views, fallback behavior, real-time feedback,
extensive logging, and documented manual Playwright testing.

## Requirements

- Python 3.11+ backend using FastAPI, litellm, sentence-transformers, tinydb,
  and networkx.
- Modern frontend with four distinct views: Paper List, Paper Detail, Theory
  Mode, and Dashboard.
- Manual arXiv ingestion from links with metadata, PDF content, embeddings, and
  progress updates.
- Continuous import tasks with configurable interval and filters for category,
  semantic abstract matching, and text search.
- Semantic search over stored papers.
- GraphRAG relationship mapping based on authors, citations, topic overlap, and
  vector similarity.
- Theory Mode with pro/contra argument discovery when LLM access is available.
- Graceful degradation when LLM access is unavailable.
- Embedding fallback from litellm embeddings to sentence-transformers.
- Placeholder fields and background backfill for unavailable LLM outputs.
- Structured backend logs and frontend console logs for important operations.
- Tests for ingestion, search, embeddings, fallbacks, and core data flows.
- Manual Playwright browser testing across all views and fallback scenarios.

## Non-Goals

- No authentication or multi-user features.
- No GitHub repository scraping.
- No non-research content ingestion.
- No production deployment loop unless a later contract adds it.

## Requirement Evidence Map

| Requirement | Evidence Class | Evidence |
| --- | --- | --- |
| Backend stack and uv usage | automated + manual | `uv sync`, backend tests, file review for stack choices |
| Frontend four-view navigation | automated + visual | Playwright route/view tests and screenshots |
| Manual arXiv ingestion | automated + manual | API/integration test with fixture link plus browser test |
| Continuous import tasks | automated + manual | unit tests for scheduler/task state plus browser start/stop test |
| Semantic search | automated | retrieval tests with seeded papers |
| GraphRAG relationships | automated + manual | graph construction tests and detail-view review |
| Theory Mode pro/contra | automated + manual | mocked LLM tests plus browser review when LLM available |
| LLM fallback placeholders | automated | tests with LLM disabled verifying placeholder storage |
| Embedding fallback | automated | tests with litellm embeddings disabled |
| Background backfill | automated | tests that placeholders are queued and filled when service returns |
| Logging | manual + automated | log-emission tests where cheap plus terminal/browser console review |
| Manual Playwright session | manual + visual | recorded trace or notes listing tested views and fallback scenarios |
| README/setup docs | manual | setup and usage guide review |

## Automated Checks

- `uv sync`
- `uv run pytest`
- frontend install/build command chosen by implementation
- frontend unit tests if the chosen stack provides them
- `npx playwright test` or equivalent browser automation tests
- a project quality gate script that runs backend, frontend, and Playwright
  checks

## Manual / Visual Review Items

- Verify all four views in a browser at desktop and mobile sizes.
- Verify real-time progress feedback during ingestion.
- Verify terminal logs are readable and include fallback activations.
- Verify browser console logs cover state changes, API calls, WebSocket events,
  service availability, and user actions.
- Test LLM-disabled and embedding-disabled scenarios.
- Review Theory Mode disabled state when LLM is unavailable.

## Allowed Changes

- Backend source, frontend source, tests, fixtures, scripts, README, and project
  configuration needed for the PaperTrail app.
- `.envtemplate` or example configuration documentation.
- Local data fixtures for tests.

## Authority Boundaries

- Use `uv` for Python commands.
- Do not require real paid LLM calls for core automated tests.
- Do not scrape GitHub repositories.
- Do not add authentication or multi-user scope.
- Do not publish or deploy without a separate approval.
- Do not expose secrets in logs, traces, screenshots, or docs.

## Loop Procedure

1. Bootstrap backend and frontend with the smallest architecture that can
   support the required views and fallback behavior.
2. Add fixture-backed tests for storage, ingestion parsing, embeddings,
   GraphRAG, fallbacks, and task state.
3. Add frontend routes/views and Playwright checks for the critical flows.
4. Run the quality gate.
5. Patch the smallest useful failure.
6. Update the trace with command, result, failure, patch, rationale, and next
   check.
7. Repeat until a stop condition is met.

## Stop Conditions

- `success`: backend tests, frontend build/tests, Playwright checks, fallback
  checks, and documented manual browser review all pass.
- `blocked`: required package installation, browser dependencies, or arXiv/API
  access cannot be made available after documented recovery attempts.
- `escalated`: spec contradiction, secret-handling risk, external spend,
  deployment, or scope expansion requires a human decision.
- `budget-exhausted`: the agreed time/turn budget is reached.

## Blocked Conditions

- Browser automation cannot run in the current environment.
- The same ingestion/search/fallback failure repeats after three distinct
  hypotheses.
- Required credentials are unavailable and no mocked fallback can prove the
  behavior.
- The chosen frontend/backend stack prevents a required data flow without a
  scope decision.

## Verification

- Verifier: independent reviewer in a fresh context (different model preferred)
- Independence level: fresh-context
- Verifier inputs: loop-contract.md, trace.md, the diff, quality gate output
- Verifier authority: read everything in scope, re-run checks; writes ONLY verdict.md
- Verdict location: ./verdict.md
- Minimum independence for this loop: fresh-context

## Trace Requirements

Record every quality-gate run, browser-test run, fallback scenario, manual
review pass, failed hypothesis, patch rationale, and stop reason.

## Final Report Requirements

Report stop reason, passing commands, browser/manual evidence, fallback evidence,
trace path, remaining caveats, and any requirements left for a later loop.
