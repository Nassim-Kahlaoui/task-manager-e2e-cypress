## Run suites
npm run test:auth && npm run auth:report      # Auth HTML: cypress/reports/auth-html/index.html
npm run test:tasks && npm run tasks:report    # Tasks HTML: cypress/reports/tasks-html/index.html

## Full run + unified report
npm run test:all                              # HTML: cypress/reports/index.html

## JSON locations
- Auth per-spec:  cypress/reports/auth-json/*.json
- Tasks per-spec: cypress/reports/tasks-json/*.json
- Unified run:    cypress/reports/mochawesome.json

## Bug Reports
- Design: reports/bug-report/design-issues.md
- Logic:  reports/bug-report/logic-issues.md
- Evidence: reports/bug-report/evidence/
