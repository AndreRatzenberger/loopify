# Check Patterns

Map checks to what they actually prove.

| Requirement kind | Useful check |
| --- | --- |
| Builds | build command |
| API contract | integration or schema test |
| Data transform | unit test with fixtures |
| Search/retrieval | seeded corpus relevance test |
| Fallback behavior | dependency-disabled test |
| Accessibility | Playwright + accessibility assertions |
| Performance | budgeted benchmark with baseline |
| Docs structure | heading/link checker |

Prefer one narrow check for the known failure and one full gate before final
success.
