---
description: Source-backed capture on the emerging "I do not prompt, I loop" / loop-engineering meme, its relation to agent loops, Claude Code /loop, evaluator-optimizer workflows, durable execution, and KG-adjacent harness design.
source_type: mixed-web-research
exa_prompt: "Research what people mean by 'I don't prompt anymore, I loop' in agent/coding-agent practice: trace the phrase, distinguish Claude Code /loop from general agent loops and evaluator workflows, explain how to use loops, why to use them, limits, failure modes, and KG implications."
exa_tool: "Codex web.run search/open plus local rg over claude-knowledge"
generated: 2026-06-08T22:55:40Z
domain: "claude-knowledge"
topics:
  - "[[workflow-discipline-map]]"
  - "[[skill-architecture-map]]"
  - "[[agent-work-acceptance-map]]"
  - "[[discriminator-authoring-map]]"
---

# I do not prompt, I loop: agent work is shifting from promptcraft to feedback-control design

## Research Question

Andre asked what people mean when they say things like "I don't prompt anymore,
I loop". The suspicion was that this points at an agent-orchestration format.

The answer is: yes, but not one single format.

It is currently a compressed meme for a broader engineering shift:

```text
one-shot prompt -> repeated work loop with state, tools, evaluators, budgets,
stop conditions, traces, and sometimes human approval
```

There are at least three meanings that get blurred together:

1. The ordinary agent loop: model decides, tools run, observations come back,
   model decides again.
2. Claude Code's literal `/loop`: a scheduled recurring prompt or command that
   fires while the session stays open.
3. Loop engineering: designing a reusable system that prompts, evaluates,
   retries, verifies, escalates, and records work without the human hand-writing
   each next prompt.

The important move is not "prompting is dead." Prompts are still inside the
system. The unit of work moves from the prompt to the loop.

## Where The Phrase Comes From

The phrase is circulating in June 2026 around Boris Cherny / Claude Code. Addy
Osmani's "Loop Engineering" post cites Peter Steinberger and Boris Cherny and
frames the shift as designing the system that prompts the agent instead of
being the person who manually prompts it each time. Digg captured the same
Boris Cherny quote through a Rohan Paul/X post. Treat the exact quote as public
industry chatter rather than a formal standard.

This matters because the meme is landing at the same time the underlying tools
now expose loop surfaces:

- Claude Code documents the agent loop: Claude evaluates state, calls tools,
  receives tool results, repeats, and returns when no tool calls remain.
- Claude Code documents `/loop`: run a prompt or slash command repeatedly on a
  schedule, with optional `loop.md` defaults.
- Anthropic's "Building effective agents" names common workflow patterns such
  as prompt chaining, routing, parallelization, orchestrator-workers, and
  evaluator-optimizer.
- OpenAI Agents SDK documents an agent run loop that invokes the agent, returns
  if there is final output, hands off if needed, or runs tools and loops again,
  bounded by `max_turns` and guardrails.
- LangGraph, DBOS, Temporal-style integrations, Dapr, and Restate push the
  same idea into durable execution: persisted state, resumption, human-in-loop,
  and recovery after failures.

So the meme is not just hype. It names a real control-surface transition.

## What A Loop Is

A useful agent loop is a bounded feedback controller around an LLM.

Minimal shape:

```text
state = initial_task
while budget_remaining:
    context = build_context(state)
    proposal = model(context, tools, instructions)
    observation = execute_or_evaluate(proposal)
    trace.record(context, proposal, observation)

    if done(observation):
        return accepted_result

    if unsafe_or_blocked(observation):
        escalate_or_stop()

    state = update_state(state, observation.feedback)
```

This is not exotic. It is the same basic pattern behind test-fix-test coding
agents:

```text
run tests -> read failure -> edit code -> run tests -> repeat until pass/stop
```

The power comes from making the loop explicit, durable, and inspectable.

## Loop Taxonomy

### 1. Manual chat loop

The human reads an answer, spots gaps, asks a follow-up, supplies evidence, and
repeats. This is the ordinary conversational use of ChatGPT, Claude, or Codex.
The evaluator is mostly the human.

This is still useful. It is just low automation and low reproducibility.

### 2. ReAct / tool-observation loop

The model interleaves reasoning, tool calls, and observations. The ReAct paper
formalized this as reasoning traces plus task-specific actions, with external
observations feeding the next step. Modern tool-calling agents hide much of the
format, but the execution shape remains:

```text
think/decide -> act with tool -> observe -> think/decide again
```

This is the core "agent loop" underneath many frameworks.

### 3. Prompt-chain with gates

A task is decomposed into fixed steps, with checks between steps.

Example:

```text
outline -> check outline -> draft -> check draft -> final
```

Anthropic frames prompt chaining as useful when the task has a clean sequence
of subtasks and the developer wants to trade latency for accuracy.

### 4. Evaluator-optimizer loop

One model or process generates; another evaluates and feeds back; generation
repeats. Anthropic names this explicitly as evaluator-optimizer.

Example:

```text
generator writes doc -> evaluator checks coverage -> generator revises ->
evaluator checks again -> publish when criteria pass
```

This is the cleanest answer to "I don't prompt, I loop." The loop prompts
itself because the evaluator decides what feedback the generator should receive
next.

### 5. Test/eval/repair loop

Coding agents are unusually suited to loops because code has external
feedback:

```text
implement -> run tests/lints/types/security checks -> repair -> repeat
```

Anthropic notes coding agents work well partly because code solutions can be
verified with automated tests and agents can iterate from test results. This is
also the key bridge to local KG ideas: tests are discriminators, not mere
afterthoughts.

### 6. Orchestrator-worker loop

A central process decomposes work, delegates subtasks, collects results, judges
whether more work is needed, and repeats. Anthropic distinguishes this from
simple parallelization because the subtasks are not known in advance.

Example:

```text
orchestrator identifies changed files -> workers inspect/patch each area ->
reviewer aggregates -> orchestrator sends follow-up work -> final proof
```

This is closer to agent orchestration than a single-agent loop.

### 7. Scheduled maintenance loop

Claude Code `/loop` is this in concrete product form. It can re-run a prompt or
slash command on an interval while the session stays open, optionally using a
project-level `.claude/loop.md` or user-level `~/.claude/loop.md`.

Examples:

```text
/loop 5m check the deploy
/loop 20m /review-pr 1234
/loop
```

This is not the same as an evaluator-optimizer loop. It is time-triggered
automation. It is useful for polling, monitoring, babysitting CI, or recurring
repo maintenance. It still needs a stop condition and token budget awareness.

### 8. Durable workflow loop

LangGraph checkpointers, OpenAI Agents SDK durable integrations, DBOS, Dapr,
Temporal, Restate, and similar systems add persistence:

```text
state checkpoint -> tool/action -> checkpoint -> human approval or failure ->
resume from checkpoint
```

This matters when the loop spans hours/days, involves humans, has retries, or
must survive process restarts. Without durable state, a long loop is just a
fragile chat session.

### 9. Meta-loop / harness-improvement loop

The loop watches its own traces, notices waste or repeated failure, proposes a
change to prompts/tools/evals/context selection/permissions, and tests that
change before promotion.

This is the dangerous and powerful one:

```text
trace -> diagnose harness weakness -> propose harness mutation -> regression
test -> human/policy approval -> promote or reject
```

Local KG already has this as [[Harness mutations need change contracts because
they alter the future behavior distribution of agents]]. A harness should
evolve, but never by vibes.

## Why Use Loops

### Loops turn vague instructions into external feedback

A prompt says what should happen. A loop keeps checking what did happen.

For coding, the feedback can be tests, type checks, lints, benchmarks, browser
screenshots, security scans, or review comments. For research, it can be source
coverage, contradiction checks, provenance gaps, or held-out evaluators. For
ops, it can be health endpoints, CI status, logs, metrics, or human approval.

This is the discriminator-authoring connection: the valuable part is often not
the generator, but the feedback channel that decides whether the generator has
earned another step.

### Loops make context dynamic

A one-shot prompt has one context packet. A loop can decide what context to add
or drop after each observation.

This matters because failed runs often need different context than successful
ones. If tests fail, the next context should include the failure, related files,
prior attempt, and relevant constraints. If a search result is thin, the next
query should be different. If an agent is stuck, the loop should compact,
reframe, or escalate.

HumanLayer's 12-Factor Agents argues for owning control flow and context
building instead of dumping raw errors back into the context forever. That is
loop engineering in practical terms.

### Loops preserve traces

A loop can record each proposal, tool call, observation, verifier result,
approval, and state transition. This converts "the model said it is done" into
inspectable evidence.

This plugs directly into local casefile ideas:

```text
request -> authority -> attempt trace -> proof -> residual risk -> decision
```

### Loops enable unattended work, but not unbounded autonomy

Long-running loops reveal capabilities that interactive use misses. The local
KG already has [[Autonomous long-running agent harnesses elicit capabilities
that interactive synchronous use does not]]. But unattended is not the same as
uncontrolled.

A good loop has:

- explicit budget;
- stop condition;
- permission boundary;
- tool boundary;
- evaluator;
- trace;
- escalation path;
- rollback or cleanup path.

Without these, "looping" is just burning tokens while the model chases its own
tail.

## Why This Is More Than Prompt Engineering

Prompt engineering optimizes the text fed into the model.

Loop engineering optimizes the whole runtime around the model:

```text
prompt
tools
state
context builder
evaluator
budget
stop condition
memory
trace
human approval
rollback
```

The prompt still matters, but it is one replaceable component inside a
control system.

This matches the local insight [[Code becomes an agent harness when it makes
reasoning action and environment state executable inspectable and stateful]].
Natural language is a weak harness surface. Code, tests, schemas, traces,
permissions, and state machines are stronger because they can execute, reject,
persist, and replay.

## How To Use It Practically

### Start with a loop contract

Before building the loop, write:

```text
Goal:
What output counts?

Evaluator:
How does the loop know the output improved?

State:
What changes between iterations?

Authority:
What may the loop read, write, call, or spend?

Budget:
Max turns, time, cost, retries, or scheduled runs?

Stop:
What condition ends success, failure, or escalation?

Trace:
What evidence is preserved for review?
```

If these cannot be answered, the work probably needs a better manual prompt,
not a loop.

### Choose the smallest loop that fits

Use a simple prompt when the task is simple.

Use prompt chaining when the path is known.

Use evaluator-optimizer when quality can be scored and feedback helps.

Use agent loops when the path is unknown but tools/environment feedback are
strong.

Use scheduled `/loop` only when recurrence is the point: polling, monitoring,
periodic review, or maintenance.

Use durable workflow infrastructure when the loop is long-running, restartable,
or human-in-loop.

### Put deterministic checks on the critical path

The loop should not ask the same model whether its own work is acceptable if a
deterministic or independent check exists.

For code:

```text
pytest
ruff
mypy/pyright
security scanner
browser visual check
schema validation
benchmark threshold
```

For research:

```text
source URL present
date checked
claim/source mapping
contradiction search
primary-source preference
quote limits
coverage checklist
```

For KG work:

```text
capture provenance
distill atomicity
link health
topic frontmatter audit
qmd update/embed
archive state
```

### Record "why not that"

Loops create rejected attempts. That rejected knowledge is valuable:

```text
attempt A failed because evaluator was too weak
attempt B passed tests but broke UX
attempt C fixed visible fixture but overfit hidden case
attempt D required authority the loop did not have
```

Most prompt workflows discard this. Casefile loops should preserve it.

### Add human approval as durable state

If a human approval changes future behavior, record it as policy-relevant state.

This connects to [[Human approvals become safety infrastructure when recorded
as durable harness state]]. Approval should not be a disposable chat moment.

## Failure Modes

### Token fire

Loops multiply cost. Scheduled loops can burn tokens when nothing changed.
Agent loops can reread large files or tool outputs every turn. Claude Code docs
explicitly warn that context accumulates across turns and that large tool
outputs are expensive.

Mitigations:

- cap turns/cost;
- use event triggers instead of polling where possible;
- summarize or structure tool output;
- store durable state outside the context window;
- run cheap checks before expensive model calls.

### Doom loops

The loop repeats the same failed repair. This often means the state update is
bad: the loop is feeding raw error text back without adding a new hypothesis,
new context, or changed evaluator.

Mitigations:

- track repeated failure signatures;
- force a reframe after N failed attempts;
- escalate to human or different evaluator;
- change context builder rather than only prompt wording.

### Weak evaluator overconfidence

The loop converges to what its evaluator rewards. If the evaluator is shallow,
the loop can produce plausible garbage.

This is the local [[Verification evidence bundles prevent executable feedback
from becoming false certainty]] problem. A green test is evidence only for what
that test actually checks.

### Benchmark overfitting

An optimizer loop can learn the visible eval instead of the true task. This is
especially dangerous for self-improving harnesses, code-search systems,
Wishful-style generated functions, and KG ideation loops.

Mitigations:

- held-out cases;
- verifier independence;
- trace replay;
- adversarial review;
- explicit residual-risk notes;
- separation between exploration and promotion.

### Authority creep

Loops that start as low-risk monitoring can quietly gain write access,
credential access, or permission to mutate their own prompt/evaluator.

Mitigations:

- symbolic authority envelopes;
- per-turn permissions;
- human approval for high-impact actions;
- immutable audit records;
- change contracts for harness mutation.

### Closed-loop favorite-frame overfitting

The KG already knows this failure: a loop can become very coherent while only
refining its own favorite frame. The `/akinate` and `/synthesize` upgrade notes
call this "favorite-frame overfitting" and route world-contact questions out of
the closed KG loop.

Mitigations:

- external sources;
- adversarial corpus;
- "break favorite frame" mode;
- multi-corpus routing;
- explicit uncertainty and defer states.

## What This Means For The KG

This topic is a near-perfect bridge between three existing KG regions:

1. **Discriminator-authoring**: loops need external evaluators. The evaluator
   is the real leverage point.
2. **Code as agent harness**: loops become powerful when model reasoning,
   action, and state move into executable/inspectable artifacts.
3. **Agent work acceptance**: loop output becomes adoptable only when the trace
   answers whether the work is allowed to count.

The strongest local synthesis:

```text
Prompting asks the model for an answer.
Looping authors the conditions under which an answer can earn continuation,
promotion, or rejection.
```

That is exactly the KG's substrate-externality obsession in new clothes.

## Relation To Codex SDK / Tendril / Wishful

The Codex SDK active-artifact captures make more sense under the loop frame.

### Wishful

A wished import should not be "generate once." It should become a maintained
loop:

```text
missing import -> generate implementation -> generate tests -> prove -> cache
failure arrives -> resume thread -> patch -> regression test -> casefile
```

This is a function-scale loop where the artifact owns the failure inbox and
proof policy.

### Tendril

An autonomous KG is a graph-maintenance loop:

```text
capture -> topic agents propose edges -> proof agents check bloat/conflict ->
meta layer notices weak process -> human/validator approves mutation
```

The danger is not agent agency alone. It is unreviewed topology mutation. The
solution is proof and acceptance loops.

### Flock

Flock-style blackboards can make loops compositional:

```text
workers produce candidates -> evaluators annotate -> rankers select ->
reviewers preserve reasons -> next iteration consumes structured state
```

This is "looping" as typed state movement, not as one chat transcript.

### Proofroom

Proofroom is the acceptance surface for loops:

```text
what did the loop do?
what was it allowed to do?
what evidence exists?
what remains unproven?
who accepted the risk?
```

Without this layer, loops look magical until a human has to trust them.

## Sharpest Naming

The broad term in the wild is likely to become "loop engineering."

Better technical names for local use:

- **Feedback-control agent work**: emphasizes evaluators, stop conditions, and
  state.
- **Harness loops**: emphasizes that the loop lives in the runtime around the
  model.
- **Acceptance loops**: emphasizes reviewability and proof.
- **Resident artifact loops**: for Wishful/Tendril active-object cases.

For the KG, "loop engineering" is the surface meme; "harness loop" is probably
the useful internal concept.

## Distillation Candidates

- Loop engineering moves the unit of AI work from prompt text to a feedback
  controller with state, tools, evaluators, budgets, stop conditions, traces,
  and review boundaries.
- Prompting asks for an answer, while looping authors the conditions under
  which an answer can earn continuation, promotion, or rejection.
- Claude Code `/loop` is scheduled prompt recurrence, not the whole loop
  engineering pattern.
- The agent loop is simple; most of the engineering value lives in the systems
  around it: permissions, context management, tool interfaces, evaluators,
  traces, compaction, and durable state.
- Coding agents are especially loop-suitable because tests, type checks,
  linters, security scanners, and browser checks provide external feedback.
- A loop without an independent evaluator converges toward the model's current
  frame rather than toward the task.
- Durable human approvals turn loop interruptions into safety infrastructure
  only when recorded as harness state.
- Harness loops need change contracts because modifying prompts, tools,
  context builders, memory, permissions, or evaluators changes future agent
  behavior distributions.
- Active artifacts are resident loops attached to software objects: failure
  inbox, proof policy, thread continuity, proposal generation, and casefile
  memory.

## Research Directions

- Define a local "harness loop contract" schema that captures goal, evaluator,
  state, authority, budget, stop condition, trace, and escalation.
- Compare one-shot prompting, manual chat loops, scheduled `/loop`, and
  evaluator-optimizer loops on the same small coding/research tasks.
- Test whether Proofroom-style casefiles reduce the review burden for looped
  agent work compared with raw transcripts.
- Design a "loop smell" checklist: token fire, doom loop, weak evaluator,
  benchmark overfit, authority creep, favorite-frame overfitting, and
  missing-stop-condition.
- Connect Wishful maintained imports to explicit harness-loop records rather
  than only Codex thread IDs.
- Investigate whether Tendril topic agents should be modeled as resident
  artifact loops with bounded topology-change authority.

## Sources

- Addy Osmani, "Loop Engineering" (June 7, 2026): https://addyosmani.com/blog/loop-engineering/
- Digg capture of Rohan Paul/X post quoting Boris Cherny (June 6, 2026):
  https://digg.com/ai/v1igoqs7
- Claude Code docs, "How the agent loop works":
  https://code.claude.com/docs/en/agent-sdk/agent-loop
- Claude Code docs, "Run prompts on a schedule":
  https://code.claude.com/docs/en/scheduled-tasks
- Claude Code docs, "How Claude Code works":
  https://code.claude.com/docs/en/how-claude-code-works
- Anthropic, "Building effective agents" (Dec 19, 2024):
  https://www.anthropic.com/engineering/building-effective-agents
- OpenAI Agents SDK, Python runner reference:
  https://openai.github.io/openai-agents-python/ref/run/
- OpenAI Agents SDK, running agents and durable integrations:
  https://openai.github.io/openai-agents-python/running_agents/
- LangGraph docs, persistence/checkpointing:
  https://docs.langchain.com/oss/python/langgraph/persistence
- DBOS docs, OpenAI Agents SDK durable execution:
  https://docs.dbos.dev/integrations/openai-agents
- HumanLayer, "12 Factor Agents":
  https://www.humanlayer.dev/blog/12-factor-agents
- Yao et al., "ReAct: Synergizing Reasoning and Acting in Language Models":
  https://arxiv.org/abs/2210.03629
- Liu et al., "Dive into Claude Code: The Design Space of Today's and Future AI
  Agent Systems":
  https://arxiv.org/abs/2604.14228

## Local Adjacencies

- [[Code becomes an agent harness when it makes reasoning action and environment state executable inspectable and stateful]]
- [[Harness-level evaluation should measure runtime quality rather than only final task success]]
- [[Harness mutations need change contracts because they alter the future behavior distribution of agents]]
- [[Agent work becomes adoptable when review surfaces answer whether the work is allowed to count]]
- [[Autonomous long-running agent harnesses elicit capabilities that interactive synchronous use does not]]
- [[Human approvals become safety infrastructure when recorded as durable harness state]]
- [[Type contracts dominate prose prompts because the parser is structurally outside the conversational frame the LLM optimizes within and cannot be reshaped by alignment theater]]
- [[Akinator-style discriminator-authoring makes the question sequence itself the provenance artifact rather than leaving selection rationale outside the generated idea]]
