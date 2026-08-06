# RSS Server & LMS (CSE5006)

Joshua Fielding — 22846849

An RSS Server with a PostgreSQL database, a CRUD and operational API, a client
that consumes it, and an operational dashboard. Runs entirely in Docker.

## Demo

[Assessment 2 walkthrough](https://youtu.be/vgWd3fq_bkI) · [Assessment 1 walkthrough](https://www.youtube.com/watch?v=6hqAdmKsyn4)

## Repository

[github.com/luxjoshyua/cse5006-rss-server](https://github.com/luxjoshyua/cse5006-rss-server)

## Quick start (Docker)

The whole stack — app and database — runs in Docker. Migrations are applied
automatically on startup.

```bash
cp .env.example .env      # adjust credentials if you like
docker compose up --build
```

The app is then at http://localhost:3000.

To seed sample feed data (first run only). Seeding runs from the host against
the containerised database, so it needs local dependencies installed:

```bash
pnpm install
pnpm prisma generate
pnpm prisma db seed
```

To stop:

```bash
docker compose down       # keeps data
docker compose down -v    # also removes the database volume
```

## Local development (app on host, database in Docker)

Requires Node 24 (see `.nvmrc`).

```bash
corepack enable pnpm
pnpm install
cp .env.example .env

docker compose up db -d   # database only
pnpm prisma generate
pnpm prisma migrate deploy
pnpm prisma db seed

pnpm dev                  # http://localhost:3000
```

## Testing

### Playwright (end-to-end)

The database and application must be running first:

```bash
pnpm install
docker compose up db -d
pnpm dev
```

Run tests from the project root, not from inside `e2e/`:

```bash
pnpm test:e2e                                      # all end-to-end tests
pnpm test:e2e:report                               # open the HTML report
pnpm exec playwright test e2e/server-crud.spec.ts  # server use case only
pnpm exec playwright test e2e/client-feed.spec.ts  # client use case only
```

Two suites cover the required cases:

- `e2e/server-crud.spec.ts` — server use case: create, read, update and delete
  a feed item through the API, plus validation and health checks
- `e2e/client-feed.spec.ts` — client use case: the RSS Client retrieving and
  rendering feed items, opening an item from the feed list, and the dashboard
  reporting metrics

Tests run serially against a shared database, so the Playwright config sets
`workers: 1`.

### JMeter (load testing)

The test plan lives at `load-tests/rss-load-test.jmx`. Load levels are supplied
as JMeter properties, so one plan covers every stage:

```bash
docker compose up -d --build   # test the production build, not pnpm dev
mkdir -p load-tests/results load-tests/reports

jmeter -n -t load-tests/rss-load-test.jmx -Jusers=1 -Jrampup=1 \
  -l load-tests/results/x1.jtl -e -o load-tests/reports/x1
jmeter -n -t load-tests/rss-load-test.jmx -Jusers=10 -Jrampup=2 \
  -l load-tests/results/x10.jtl -e -o load-tests/reports/x10
jmeter -n -t load-tests/rss-load-test.jmx -Jusers=100 -Jrampup=10 \
  -l load-tests/results/x100.jtl -e -o load-tests/reports/x100
jmeter -n -t load-tests/rss-load-test.jmx -Jusers=1000 -Jrampup=30 \
  -l load-tests/results/x1000.jtl -e -o load-tests/reports/x1000
jmeter -n -t load-tests/rss-load-test.jmx -Jusers=100 -Jrampup=5 -Jloops=100 \
  -l load-tests/results/x10000.jtl -e -o load-tests/reports/x10000
```

Results against the RSS client workflow (`GET /api/items` followed by
`GET /api/feeds`, so each virtual user issues two requests):

| Stage  | Configuration              | Samples | Throughput | Avg   | Max    | Errors |
| ------ | -------------------------- | ------- | ---------- | ----- | ------ | ------ |
| x1     | 1 user, 1s ramp            | 2       | 17.4/s     | 30 ms | 49 ms  | 0      |
| x10    | 10 users, 2s ramp          | 20      | 10.8/s     | 13 ms | 44 ms  | 0      |
| x100   | 100 users, 10s ramp        | 200     | 20.1/s     | 10 ms | 33 ms  | 0      |
| x1000  | 1000 users, 30s ramp       | 2,000   | 66.7/s     | 5 ms  | 36 ms  | 0      |
| x10000 | 100 concurrent × 100 loops | 20,000  | 1,461/s    | 46 ms | 118 ms | 0      |

The first four stages issue one pass per thread, so throughput is bounded by the
ramp-up schedule rather than by the application; they confirm correctness as the
arrival rate increases. The final stage holds 100 threads concurrently for 100
iterations each, applying genuine concurrent load: the system sustained 1,461
requests per second across 20,000 samples with no errors, a 46 ms mean and an
82 ms 99th percentile. Every request also wrote a row to the request log, so
these figures include a database write per request.

The per-endpoint breakdown shows `GET /api/feeds` averaging 51 ms against 41 ms
for `GET /api/items`, with 99th percentiles of 86 ms and 74 ms respectively. The
feeds endpoint is the more expensive of the two because it returns each feed
with its items nested, where the items endpoint returns a flat list. The
difference is consistent but modest, and neither endpoint approached failure at
this concurrency level, so the saturation point was not reached.

Running 10,000 simultaneous threads was not attempted, as thread and file
descriptor limits on the test machine would have been measured rather than the
application.

### Lighthouse (accessibility)

Run against the Docker build with Chrome DevTools → Lighthouse → Accessibility.
All routes (`/`, `/dashboard`, `/feeds`, `/client`, `/about`, `/settings`) score 100.

Automated tooling covers only part of WCAG, so a manual review was also carried
out. That review found the dashboard metric cards signalled warning and error
states through border colour alone, which fails WCAG 1.4.1 (Use of Colour) and
is not something Lighthouse can detect. Screen-reader-only state prefixes were
added to `MetricCard`, matching the pattern already used in `AlertPanel`, so the
state is announced as well as shown.

## API

All endpoints return a consistent envelope: `{ "data": ..., "error": null }`
on success, `{ "data": null, "error": "message" }` on failure.

| Method | Route                   | Purpose                                                                                                   |
| ------ | ----------------------- | --------------------------------------------------------------------------------------------------------- |
| GET    | `/api/health`           | Health check — verifies database connectivity                                                             |
| GET    | `/api/count`            | Request totals, unique clients, counts by method                                                          |
| GET    | `/api/metrics`          | Feed and item counts, per-feed and per-client request breakdowns, response statuses, and alert conditions |
| GET    | `/api/feeds`            | List all feeds with their items                                                                           |
| GET    | `/api/feeds/[id]/items` | Items for a single feed; requests are attributed to that feed                                             |
| GET    | `/api/items`            | List all feed items, newest first                                                                         |
| POST   | `/api/items`            | Create a feed item                                                                                        |
| GET    | `/api/items/[slug]`     | Retrieve a single item                                                                                    |
| PATCH  | `/api/items/[slug]`     | Update an item                                                                                            |
| DELETE | `/api/items/[slug]`     | Delete an item                                                                                            |

Clients may identify themselves with an `x-client-id` header; requests without
one are attributed by IP. Every request to a logged route is recorded in the
`requests` table, which backs `/api/count` and `/api/metrics`.

Monitoring endpoints (`/api/health`, `/api/count`, `/api/metrics`) are
deliberately not logged, so observing the system does not distort the figures
it reports.

## Pages

| Route           | Purpose                                                     |
| --------------- | ----------------------------------------------------------- |
| `/`             | Landing page and project introduction                       |
| `/dashboard`    | Operational metrics, reporting tables, and alerts           |
| `/feeds`        | Feed items in a card layout, from the database              |
| `/feeds/[slug]` | Individual item view with breadcrumb                        |
| `/client`       | RSS Client — fetches from the API, shows live request stats |
| `/about`        | Project scope, student details, video walkthrough           |
| `/settings`     | Theme and feed density preferences                          |

## Dashboard and observability

`/dashboard` polls `/api/metrics` and `/api/health` and reports:

- RSS feed and feed item counts
- Total requests, unique clients, and failed requests
- Requests per feed and per client
- Responses grouped by status code
- Database connectivity

Alerts are derived from that data and cover database connectivity loss, failed
requests, feeds containing no items, and prolonged inactivity. Polling pauses
while the browser tab is hidden.

## Database

PostgreSQL via Prisma. Six models:

- **Feed** — an RSS channel
- **Item** — a post within a feed (one-to-many)
- **Author** — normalised, one author to many items
- **Category** — many-to-many with items
- **Enclosure** — media attached to an item
- **RequestLog** — one row per API request, indexed by client, feed and date to
  support the metrics queries

Deleting a feed cascades to its items; deleting an author nulls the item's
author rather than removing the post.

```bash
pnpm prisma studio          # GUI at http://localhost:5555
pnpm prisma migrate dev     # create and apply a migration
pnpm prisma migrate deploy  # apply migrations (production)
pnpm prisma generate        # regenerate the client
pnpm prisma db seed         # load sample data
```

## Project structure

```
app/
  layout.tsx               # Root layout, theme, providers
  dashboard/               # Operational dashboard
  client/                  # RSS Client page
  feeds/                   # Feed list and [slug] detail
  api/
    health/route.ts        # Health check
    count/route.ts         # Request statistics
    metrics/route.ts       # Dashboard metrics
    feeds/route.ts         # List feeds
    feeds/[id]/items/route.ts # Feed-scoped items
    items/route.ts         # List and create
    items/[slug]/route.ts  # Read, update, delete
components/                # Reusable UI
config/constants.ts        # Student and site metadata
e2e/                       # Playwright end-to-end tests
lib/
  prisma.ts                # Prisma client singleton
  api/                     # Response envelope, logging, client identification
  feeds/                   # Repository interface and implementations
  metrics/                 # Metric types and alert derivation
load-tests/
  rss-load-test.jmx        # JMeter plan, parameterised by load level
prisma/
  schema.prisma            # Database schema
  migrations/              # Applied migrations
  seed.ts                  # Sample data seeder
Dockerfile                 # Multi-stage build
docker-entrypoint.sh       # Runs migrations, then starts the app
docker-compose.yml         # App and database services
playwright.config.ts       # End-to-end test configuration
```

## Architecture notes

Feed data is read through a `FeedRepository` interface rather than imported
directly. Assessment 1 used an in-memory sample implementation; Assessment 2
swapped it for a Prisma-backed one by changing a single binding, with no
changes to any page or component.

Alert derivation lives in `lib/metrics` as a pure function of metrics and
health state, so the dashboard components stay presentational.

## Git workflow

`main` is frozen at the Assessment 1 submission. Each submission is tagged
(`a1-submission`, `a2-submission`), and each assessment's work lands on its own
integration branch via feature branches and pull requests.

```bash
git switch -c feature/thing
pnpm check                 # format, lint, typecheck
git add -A && git commit -m "feat: thing"
git push -u origin feature/thing
gh pr create --base assessment-three --fill && gh pr merge --squash --delete-branch
```

## Scripts

```bash
pnpm component MyComponent  # scaffold a component
pnpm page my-page           # scaffold a page
pnpm fix                    # format and lint
pnpm check                  # format check, lint, typecheck
pnpm test:e2e               # run end-to-end tests
```
