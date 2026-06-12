# Evidence Classes

Use these classes in the Requirement Evidence Map.

| Class | Use for | Good evidence | Bad evidence |
| --- | --- | --- | --- |
| `automated` | Build, test, lint, schema, command, machine-verifiable assertion | exact command and expected result | "the agent checked it" |
| `visual` | rendered UI, layout, screenshots, charts | screenshot path plus viewport/device | prose confidence |
| `manual` | taste, source quality, legal/product acceptance, subjective judgment | named reviewer action or checklist | fake unit test |
| `ambiguous` | unclear or contradictory requirement | clarification question or safe assumption | silent guess |
| `out-of-scope` | explicitly excluded work | source quote or contract non-goal | ignored requirement |

Rules:

- Prefer automated checks for critical paths.
- Keep visual/manual gates explicit.
- Mark uncertainty early.
- A passing command proves only the behavior it covers.
