# Authority Boundaries

State what the loop may and may not do.

## Include

- allowed paths
- denied paths
- allowed commands
- denied commands
- network policy
- dependency policy
- data/privacy limits
- spend limits
- approval requirements
- rollback plan

## Good Boundary

The loop may edit `src/**`, `tests/**`, and `docs/**`. It may run local test
commands. It may not publish, deploy, rotate secrets, change billing, or modify
CI credentials.

## Bad Boundary

"Do what is needed."
