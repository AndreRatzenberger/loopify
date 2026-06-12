# Review Rubric

Review loops like code review: findings first.

## Severity

- Critical: unsafe authority, data loss, secret exposure, false success claim.
- High: missing evidence for a core requirement, fake green check, invalid stop
  condition.
- Medium: weak trace, ambiguous requirement, incomplete manual review.
- Low: clarity, naming, organization, or small process improvement.

## Questions

- Does every requirement have evidence?
- Are automated checks scoped honestly?
- Are visual/manual gates explicit?
- Did the loop stay inside authority boundaries?
- Can a reviewer reconstruct attempts from the trace?
- Is residual risk named?
