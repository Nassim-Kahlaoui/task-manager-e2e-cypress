# Logic/Functional Issues

## [Logic] Past due date is accepted
**Environment:** Web (Production) — Chrome 136 / macOS  
**Steps to Reproduce:**
1. Create a task with `dueDate = 2000-01-01`.

**Expected Result:**  
Validation error and task not created (HTTP 422 or 400).

**Actual Result:**  
Task is created (HTTP 201) and appears in the list.

**Evidence:** `./evidence/past-date-accepted.png`  
**Severity:** Medium  
**Fix Suggestion:**  
Add server-side validation (reject past dates with 422) and front-end validation before submit.

---

## [Logic] Very long title is not constrained (can break layout)
**Environment:** Web (Production) — Chrome 136 / macOS  
**Steps to Reproduce:**
1. Create a task with a title > 256 characters.
2. Observe the list rendering.

**Expected Result:**  
Either client/server validation with a clear error or graceful truncation (ellipsis) without layout shift.

**Actual Result:**  
Very long titles are accepted and may overflow or wrap unexpectedly, impacting readability.

**Evidence:** `./evidence/long-title-wrap.png`  
**Severity:** Low–Medium  
**Fix Suggestion:**  
Enforce a max length (e.g., 120–160 chars) on BE & FE; apply CSS truncation (e.g., `text-overflow: ellipsis`) in list rows.
