# Design (UI/UX) Issues

## [UI] Header still shows old title after edit
**Environment:** Web (Production) — Chrome 136 / macOS  
**Steps to Reproduce:**
1. Create a task titled "A".
2. Edit the task title to "B".
3. Return to the task list.

**Expected Result:**  
Only the new title **"B"** is visible in task list containers and page chrome.

**Actual Result:**  
Legacy title **"A"** remains visible in a non-list element (e.g., page header/section title), which can mislead users and cause false test failures.

**Evidence:** `./evidence/header-old-title.png`  
**Severity:** Low–Medium  
**Notes:** Assign a unique test id to each list row; ensure non-list headers don’t mirror the previous task title after edits or are clearly scoped.

---

## [UX/A11y] Toggle is not a semantic control
**Environment:** Web (Production) — Chrome 136 / macOS  
**Steps to Reproduce:**
1. Open a task item in the list.
2. Try to mark complete/incomplete.

**Expected Result:**  
A semantic control (native checkbox or `role="switch"/"checkbox"` with `aria-checked`) that supports keyboard and screen readers.

**Actual Result:**  
A custom button/icon is used without a clear role/state, making the control hard to automate and inaccessible.

**Evidence:** `./evidence/toggle-a11y.png`  
**Severity:** Medium  
**Notes:** Use a native `<input type="checkbox">` or add `role="switch"` and `aria-checked="true|false"`, plus focus styles and keyboard support.
