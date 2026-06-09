# Failure Modes

Loopify should help agents name loop failures explicitly.

- token fire: no budget or stop rule
- doom loop: repeated attempts without meaningful new evidence
- weak evaluator: checker shares the generator's blind spot
- fake green check: passing command does not cover the requirement
- benchmark overfit: loop optimizes a narrow metric while damaging broader quality
- authority creep: loop silently widens what it may change
- missing context: loop repairs from incomplete evidence
- moving target spec: requirements shift without contract updates
- hidden subjective requirement: taste words masquerade as automated proof
- favorite-frame overfitting: loop polishes the first interpretation
- silent harness mutation: loop changes its own future behavior without review
