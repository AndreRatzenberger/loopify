# Stuck Loop Debug Example

Use this fixture to test `loopify-debug`.

Files:

- `trace.md`: a repeated failure trace.
- `expected-diagnosis.md`: target diagnosis and recovery plan.

What this example teaches:

- Repeated failures are data.
- The recovery should change the diagnostic, not keep applying smaller visual
  patches.
- A good debug report names when to escalate instead of pretending one more
  tiny patch will summon the answer.
