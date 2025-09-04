# Logic / Functional Issues

## [Logic] Past due date is accepted
**Environment:** Web (Production) — Chrome 136 / macOS  
**Status:** Reproducible

**Steps**
1. Create a task with `dueDate = 2000-01-01`.

**Expected**
Validation error; task not created (HTTP 422/400).

**Actual**
Task is created (HTTP 201) and rendered in the list.

**Evidence**
- Cypress HTML report (Tasks): `cypress/reports/tasks-html/index.html`
  - Spec: `tasks/23_negative.cy.js` — test: *"past due date shows error or prevents creation"*
  - In some runs server accepts; negative test tolerates either UI error or server-side rejection → here creation succeeded.

**Impact**
Medium. Business rule violation; users can set past dates.

**Fix Suggestion**
Enforce server-side validation (reject past dates with 422) and add client validation before submit.

---

## [Logic] Very long title not constrained (layout risk)
**Environment:** Web (Production) — Chrome 136 / macOS  
**Status:** Reproducible

**Steps**
1. Create a task with title length > 256 chars.
2. Observe list rendering and wrapping.

**Expected**
Validation with clear error **or** graceful truncation (`text-overflow: ellipsis`) without layout shift.

**Actual**
Overlong titles accepted; can overflow/wrap and affect readability.

**Evidence**
- Cypress HTML report (Tasks): `cypress/reports/tasks-html/index.html`
  - Spec: `tasks/23_negative.cy.js` — test: *"very long inputs are handled"*
  - Creation succeeds; UI shows the oversized string.

**Impact**
Low–Medium. Visual clarity & consistency.

**Fix Suggestion**
Backend + frontend max length (e.g., 120–160 chars). Apply CSS truncation in list rows.
