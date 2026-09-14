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
└── .github/workflows/toolshop.yml
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

Defined in `./.github/workflows/toolshop.yml`, triggered on push to `main`, on pull requests, and manually via `workflow_dispatch`.

Since the Toolshop app isn't a hosted dependency, the pipeline builds and runs the entire stack (UI + API + DB) from source before executing tests, then runs Playwright in a sharded matrix:

1. **Checkout** this repo and the Toolshop app repo (`testsmith-io/practice-software-testing`) side by side.
2. **`docker compose up -d --build`** starts the Angular UI, Laravel API, MariaDB, and phpMyAdmin containers (phpMyAdmin is required because the `web`/nginx container's vhost config hardcodes a `fastcgi_pass phpmyadmin:9000` upstream — nginx won't start, and the API port never listens, without it).
3. **Poll** the API endpoint (`$API_BASE_URL/products`) until it responds.
4. **Wait for Composer install to finish** inside `laravel-api` (checks for `vendor/autoload.php`), then **fix `storage`/`bootstrap/cache` permissions** — the upstream `composer` service's `chown`/`chmod` step runs as a different UID than `laravel-api`'s remapped `www-data`, so ownership/permissions are re-applied explicitly.
5. **Wait for MariaDB** to accept connections (`mysqladmin ping`).
6. **Seed the database** via `artisan migrate:refresh --seed`, retried a few times, then **verify the seed data** (products count and a known category) actually landed, dumping logs/permissions on failure.
7. **Poll the UI endpoint** (`$UI_BASE_URL`) until it responds.
8. **Install Node dependencies and Playwright browsers** (chromium, firefox, webkit).
9. **Run Playwright tests**, split across a `shard` matrix (1 or 2, depending on `workflow_dispatch` inputs). On push/PR this runs `--project=chromium --grep @regression`; on manual dispatch, CLI args (`--grep`, `--project`, `--retries`, `--repeat-each`, `--workers`, `--trace`, spec path) are built from the dispatch inputs (`scope`, `browser`, `test_name`, `spec`, `shards`, `retries`, `repeat_each`, `workers`, `trace`).
10. **Upload per-shard artifacts** — Playwright blob reports and Allure results — regardless of pass/fail.
11. **Tear down** the app stack (`docker compose down -v`) unconditionally, keeping the runner clean.
12. A separate `merge-report` job downloads and merges all shards' blob/Allure results into a single HTML report and Allure report, uploaded as final artifacts.

### `env` and secrets

- **`UI_BASE_URL`** / **`API_BASE_URL`**: default to `http://localhost:4200` / `http://localhost:8091` (matching the in-job Docker stack's exposed ports), overridable via repository/organization `vars` if the workflow is ever pointed at an already-running or hosted instance instead of building the stack in-job.

### Manual runs (`workflow_dispatch`)

- **`scope`**: `regression` (default) or `smoke` — maps to `--grep @<scope>`.
- **`browser`**: `chromium` (default), `firefox`, `webkit`, or `all` (no `--project` filter).
- **`test_name`**: regex to filter by test title, overrides `scope`.
- **`spec`**: run a single spec file, e.g. `tests/checkout/checkout-order.spec.ts`.
- **`shards`**: `2` (default) or `1` — automatically forced to `1` when `test_name`/`spec` narrows the run, so a shard doesn't end up with 0 tests.
- **`retries`**, **`repeat_each`**, **`workers`**, **`trace`**: passed straight through to the corresponding Playwright CLI flags.

**Trade-off**: building the app from source in CI (rather than pulling prebuilt images or hitting a hosted environment) adds a few minutes to each run, but guarantees the pipeline is self-contained and doesn't depend on external hosted environments being available or in a known state.
