# Learn Playwright — Toolshop Test Automation

Playwright + TypeScript end-to-end test suite for the [Practice Software Testing (Toolshop)](https://github.com/testsmith-io/practice-software-testing) demo application (UI, REST API, and MySQL/MariaDB database).

## Project Structure

```
.
├── src/
│   ├── api/            # Thin API clients (BaseAPI, UserAPI, ProductAPI)
│   ├── config/         # Centralized env config (URLs, DB creds, file paths)
│   ├── data/            # Test data factories, enums, mock responses, static fixtures
│   │   ├── baselines/  # Visual regression baseline screenshots
│   │   ├── files/      # Static files used by tests (e.g. upload attachments)
│   │   ├── enum/
│   │   └── mocks/
│   ├── database/       # DatabaseClient + per-domain query classes (InvoiceQueries, UserQueries)
│   ├── fixtures/       # Playwright fixtures (pages, api, db) merged into one `test`
│   └── pages/          # Page Object classes, one per app page
├── tests/
│   ├── auth/           # Login / registration UI tests
│   ├── catalog/        # Product grid / filtering tests
│   ├── checkout/       # Full checkout E2E flow + DB assertions
│   ├── contact/        # Contact form / file upload tests
│   ├── network/        # Network mocking / interception tests
│   └── visual/         # Visual regression (screenshot) tests
├── playwright.config.ts
└── .github/workflows/playwright.yml
```

### Why this structure

- **Tests grouped by feature/domain** (`auth`, `catalog`, `checkout`, `contact`) rather than by test type. This scales better as the suite grows — e.g. future API- or DB-only tests for checkout naturally live next to the UI ones in `tests/checkout/`.
- **Page Objects** live under `./src/pages`, one class per page, all extending `./src/pages/base-page.page.ts` for shared navigation (nav bar links).
- **Fixtures are composed, not inherited**: `./src/fixtures/page.fixture.ts`, `./src/fixtures/api.fixture.ts`, and `./src/fixtures/db.fixture.ts` each define an isolated slice of test context (`pages`, `userAPI`/`productAPI`, `db`), merged via `mergeTests` in `./src/fixtures/test.fixture.ts`. Tests import `test`/`expect` from this single file.
- **`pages` fixture** exposes each page object directly (`pages.home`, `pages.login`, `pages.contact`, ...) instead of going through an aggregator "PageObjects" class — keeps the API flat and discoverable.
- **`db` fixture** exposes query modules grouped by domain (`db.invoice`, `db.user`) instead of a single monolithic `DatabaseClient` with all queries — mirrors the same "flat namespace per domain" pattern used for `pages`.

## Setup Instructions

### Prerequisites

- Node.js (LTS)
- The [Toolshop app](https://github.com/testsmith-io/practice-software-testing) running locally via Docker (UI, API, and database)

### 1. Start the application under test

Clone and start the Toolshop app (in a separate directory):

```bash
git clone https://github.com/testsmith-io/practice-software-testing.git
cd practice-software-testing
docker compose up -d
docker compose exec laravel-api php artisan migrate:fresh --seed
```

This exposes:
- UI: `http://localhost:4200`
- API: `http://localhost:8091`
- MySQL/MariaDB: `127.0.0.1:3306` (db `toolshop`, user `root`, password `root`)

### 2. Configure environment variables

Copy/verify `./.env` in this repo (defaults already match the Toolshop docker-compose setup):

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=toolshop
DB_USER=root
DB_PASSWORD=root

UI_BASE_URL=http://localhost:4200
API_BASE_URL=http://localhost:8091
```

### 3. Install dependencies

```bash
npm ci
npx playwright install --with-deps
```

### 4. Run the tests

```bash
npx playwright test                          # run all tests, all browsers
npx playwright test --project=chromium       # single browser
npx playwright test tests/checkout           # single folder/spec
npx playwright test --grep @regression       # by tag
```

### 5. View reports

```bash
npx playwright show-report        # HTML report
npx allure serve allure-results   # Allure report
```

## Test Design Decisions & Trade-offs

- **Data factories over static fixtures**: `createCustomer()` and `createContactMessage()` (in `./src/data/customer.ts` and `./src/data/contact.ts`) generate fresh data per call (dynamic email via `Date.now()`), created directly inside each test body rather than injected as a fixture. This avoids hidden shared state between tests and keeps each test's data setup explicit and readable, at the cost of a couple of repeated lines per test.
- **DB cleanup via `afterEach`, not fixture teardown**: tests that create users/orders (`tests/auth/login.spec.ts`, `tests/auth/register.spec.ts`, `tests/checkout/checkout-order.spec.ts`) capture the created email in an outer-scope variable and delete it in `test.afterEach` (`db.user.deleteUserByEmail` / `db.invoice.deleteOrderDataByEmail`). This keeps the DB clean across runs without coupling cleanup logic to a generic fixture that wouldn't know what to delete.

## CI/CD Setup

Defined in `./.github/workflows/playwright.yml`, triggered on push/PR to `main`/`master`.

Since the Toolshop app isn't a hosted dependency, the pipeline builds and runs the entire stack (UI + API + DB) from source before executing tests:

1. **Checkout** this repo and the Toolshop app repo (`testsmith-io/practice-software-testing`) side by side.
2. **`docker compose up -d --build`** starts the Angular UI, Laravel API, and MariaDB containers — using the same ports/credentials (`4200`, `8091`, `3306`, db `toolshop`, `root`/`root`) as this project's `./.env` defaults, so no env overrides are needed.
3. **Poll** the API and UI endpoints until they respond (containers, especially the Angular dev server, take time to become ready).
4. **Seed the database** via `artisan migrate:fresh --seed --force` so tests run against consistent data.
5. **Install Node dependencies and Playwright browsers**, then **run the full suite** across all 3 configured browsers (chromium, firefox, webkit).
6. **Upload artifacts** — the Playwright HTML report and Allure results — regardless of pass/fail, for post-run debugging.
7. **Tear down** the app stack (`docker compose down -v`) unconditionally, keeping the runner clean.

**Trade-off**: building the app from source in CI (rather than pulling prebuilt images or hitting a hosted environment) adds a few minutes to each run, but guarantees the pipeline is self-contained and doesn't depend on external hosted environments being available or in a known state.
