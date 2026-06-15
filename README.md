# Telnyx E2E Test Suite

Cypress E2E tests for [telnyx.com](https://telnyx.com).

## Project Structure

```
├── .github/
│   └── workflows/
│       └── cypress.yml    # CI pipeline
├── cypress/
│   ├── e2e/               # Test spec files
│   │   ├── signUp.cy.js
│   │   ├── contact.cy.js
│   │   └── navigation.cy.js
│   ├── fixtures/          # Test data
│   │   ├── auth.json
│   │   └── contact.json
│   ├── pages/             # Page Object Model classes
│   │   ├── SignUpPage.js
│   │   ├── ContactPage.js
│   │   └── NavigationPage.js
│   └── support/
│       ├── commands.js    # Custom Cypress commands (cy.login)
│       └── e2e.js         # Global hooks
├── cypress.config.js
├── package.json
└── .gitignore
```

## Setup

```bash
npm install
```

## Running Tests

| Command | Description |
|---|---|
| `npm run cy:open` | Open Cypress Test Runner (interactive) |
| `npm run cy:run` | Run all tests headlessly |
| `npm run cy:run:signUp` | Run sign-up tests only |
| `npm run cy:run:contact` | Run contact form tests only |
| `npm run cy:run:navigation` | Run navigation tests only |
| `npm run cy:record` | Run all tests and record to Cypress Dashboard |

## Cypress Dashboard

Test results, videos, and screenshots are recorded to [Cypress Cloud](https://cloud.cypress.io).

To enable recording locally:

```bash
export CYPRESS_RECORD_KEY=your_key_here
npm run cy:record
```

### Setup steps:
1. Create a project at [cloud.cypress.io](https://cloud.cypress.io)
2. Copy the **Project ID** into `cypress.config.js` → `projectId`
3. Add **Record Key** as a GitHub secret: `Settings → Secrets → CYPRESS_RECORD_KEY`

## CI/CD

GitHub Actions runs the full suite on every push and pull request to `main`/`master`, with results recorded to Cypress Dashboard. See `.github/workflows/cypress.yml`.

## Custom Commands

- `cy.login(email, password)` — logs in and caches the session via `cy.session()`