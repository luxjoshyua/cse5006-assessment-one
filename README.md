# RSS Server & LMS (CSE5006)

Joshua Fielding — 22846849

An RSS Server with a PostgreSQL database, a CRUD and operational API, and a
client that consumes it. Runs entirely in Docker.

## Demo

[Video walkthrough](https://youtu.be/pQjeabk_tSo)

## Repository

[GitHub](https://github.com/luxjoshyua/cse5006-rss-server)

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

## API

All endpoints return a consistent envelope: `{ "data": ..., "error": null }`
on success, `{ "data": null, "error": "message" }` on failure.

| Method | Route               | Purpose                                          |
| ------ | ------------------- | ------------------------------------------------ |
| GET    | `/api/health`       | Health check — verifies database connectivity    |
| GET    | `/api/count`        | Request totals, unique clients, counts by method |
| GET    | `/api/items`        | List all feed items, newest first                |
| POST   | `/api/items`        | Create a feed item                               |
| GET    | `/api/items/[slug]` | Retrieve a single item                           |
| PATCH  | `/api/items/[slug]` | Update an item                                   |
| DELETE | `/api/items/[slug]` | Delete an item                                   |

Clients may identify themselves with an `x-client-id` header; requests without
one are attributed by IP. Every request to a logged route is recorded in the
`requests` table, which backs `/api/count`.

## Pages

| Route           | Purpose                                                     |
| --------------- | ----------------------------------------------------------- |
| `/`             | Landing page and project introduction                       |
| `/feeds`        | Feed items in a card layout, from the database              |
| `/feeds/[slug]` | Individual item view with breadcrumb                        |
| `/client`       | RSS Client — fetches from the API, shows live request stats |
| `/about`        | Project scope, student details, video walkthrough           |
| `/settings`     | Theme and feed density preferences                          |

## Database

PostgreSQL via Prisma. Six models:

- **Feed** — an RSS channel
- **Item** — a post within a feed (one-to-many)
- **Author** — normalised, one author to many items
- **Category** — many-to-many with items
- **Enclosure** — media attached to an item
- **RequestLog** — one row per API request, indexed for metrics

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
  layout.tsx             # Root layout, theme, providers
  client/                # RSS Client page
  feeds/                 # Feed list and [slug] detail
  api/
    health/route.ts      # Health check
    count/route.ts       # Request statistics
    items/route.ts       # List and create
    items/[slug]/route.ts # Read, update, delete
components/              # Reusable UI
config/constants.ts      # Student and site metadata
lib/
  prisma.ts              # Prisma client singleton
  api/                   # Response envelope, logging, client identification
  feeds/                 # Repository interface and implementations
prisma/
  schema.prisma          # Database schema
  migrations/            # Applied migrations
  seed.ts                # Sample data seeder
Dockerfile               # Multi-stage build
docker-entrypoint.sh     # Runs migrations, then starts the app
docker-compose.yml       # App and database services
```

## Architecture notes

Feed data is read through a `FeedRepository` interface rather than imported
directly. Assessment 1 used an in-memory sample implementation; Assessment 2
swapped it for a Prisma-backed one by changing a single binding, with no
changes to any page or component.

## Git workflow

`main` is frozen at the Assessment 1 submission (tag `a1-submission`).
Assessment 2 work lands on `assessment-two` via feature branches and pull
requests.

```bash
git switch -c feature/thing
pnpm check                 # format, lint, typecheck
git add -A && git commit -m "feat: thing"
git push -u origin feature/thing
gh pr create --base assessment-two --fill && gh pr merge --squash --delete-branch
```

## Scripts

```bash
pnpm component MyComponent  # scaffold a component
pnpm page my-page           # scaffold a page
pnpm fix                    # format and lint
pnpm check                  # format check, lint, typecheck
```
