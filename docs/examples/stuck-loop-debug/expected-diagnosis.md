# Expected Diagnosis

Pattern: repeated exact failure.

Likely cause: patching visual symptoms without inspecting the element causing
overflow.

Recovery:

1. Run a DOM-level overflow diagnostic.
2. Identify the widest element.
3. Patch that element or layout constraint.
4. Rerun only the mobile test first.
5. Escalate if the same element cannot be constrained without changing the spec.
