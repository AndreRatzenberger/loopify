# Spec To Loop Method

1. Read the whole source before extracting requirements.
2. Inventory nouns, verbs, constraints, non-goals, external systems, and
   subjective words.
3. Split compound requirements until each row can have one evidence class.
4. Mark evidence class before inventing checks.
5. Propose checks only where the environment can plausibly run them.
6. Preserve manual and visual judgment instead of automating theater.
7. Define authority boundaries before procedure.
8. Define stop and blocked rules before the first run.
9. Define trace requirements so a future reviewer can reconstruct the loop.
10. Choose a loop directory when the contract is meant to be runnable:
    `.loopify/loops/NNN-slug/`.
11. Hand off to `loopify-bootstrap` only when the user asked for repo materials,
    not when they only asked for a contract.

Smell checks:

- If every row is automated, the contract is probably lying.
- If no blocked rule exists, the loop can become endless.
- If allowed changes are broad, governance should be added.
- If the output is a lone contract for a feature that will be implemented, ask
  whether it should become a loop folder.
