# Codex SDK Loop Actuators

The Codex SDK can be one actuator inside a loop. It is not the loop itself.

Possible roles:

- repair actuator: propose or apply a patch for a known failure
- review actuator: inspect a contract, trace, or diff
- context builder: gather and summarize relevant files/logs
- trace summarizer: turn turns into final evidence
- meta-loop proposer: suggest harness improvements under governance

Required wrapper responsibilities:

- input schema
- output schema
- sandbox assumptions
- allowed paths
- denied actions
- model/cost policy
- trace write
- stop/escalation behavior

Concrete SDK calls should be filled from current official docs at the time of
implementation.
