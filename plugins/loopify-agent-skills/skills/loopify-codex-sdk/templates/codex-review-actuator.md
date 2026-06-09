# Codex Review Actuator Template

## Role

Review a Loop Contract, trace, or diff and return structured findings.

## Inputs

- Contract path:
- Trace path:
- Diff or artifact path:
- Authority boundaries:
- Required checks:

## Output Schema

```json
{
  "findings": [
    {
      "severity": "critical|high|medium|low",
      "path": "",
      "issue": "",
      "evidence": "",
      "recommendation": ""
    }
  ],
  "residualRisk": "",
  "verdict": "counts|does-not-count|needs-human"
}
```

## Guardrails

- Do not modify files.
- Do not approve work without evidence.
- Do not claim SDK behavior that has not been verified against current docs.
