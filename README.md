# RSS Server & LMS (CSE5006)

Joshua Fielding — 22846849

RSS Server feeding into an LMS with PostgreSQL database and Prisma ORM.
Provides a web interface for viewing and managing RSS feeds and items.

## Demo

[Video walkthrough](https://youtu.be/pQjeabk_tSo)

## Repository Link

[GitHub](https://github.com/luxjoshyua/cse5006-rss-server)

## Prerequisites

- Node 24 (see `.nvmrc`)
- Docker Desktop (for PostgreSQL database)
- pnpm (enabled via corepack)

## Getting started

### 1. Install dependencies

```bash
nvm use
corepack enable pnpm
pnpm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
# Edit .env if you want to change database credentials
```

### 3. Start the database

**Important:** Docker Desktop must be running first.

```bash
docker-compose up -d
```

Verify the database is running:

```bash
docker ps | grep rss-db
```

To stop the database:

```bash
docker-compose down
```

### 4. Run database migrations

```bash
pnpm prisma migrate deploy
# Or for development with seed data:
pnpm prisma migrate dev
```

### 5. Start the application

```bash
pnpm dev                  # Development: http://localhost:3000
pnpm build && pnpm start  # Production build
```

## Troubleshooting

**Prisma errors**: Make sure Docker is running and the database container is up (`docker-compose up -d`)

**Port 5432 in use**: Another PostgreSQL instance may be running. Stop it or change the port in `docker-compose.yml` and `.env`

**Database connection failed**: Check that `DATABASE_URL` in `.env` matches the credentials in `docker-compose.yml`

## Git workflow

`main` is kept releasable. All work lands via feature branch and pull request.

```bash
git switch -c feature/layout
# ... work, commit ...
pnpm check # lint, typecheck, format
git add -A && git commit -m "feat: add layout"
git push -u origin feature/layout
# once happy with the feature, create a PR and merge with squash commit
gh pr create --fill && gh pr merge --squash --delete-branch
```

## Quick scripts to handle repeating patterns

Script to setup a new component

```bash
pnpm component MyComponent
```

Script to setup a new page

```bash
pnpm page my-page
```

## Linting & formatting

```bash
pnpm fix
```

## Database commands

```bash
pnpm prisma studio          # Open Prisma Studio GUI (http://localhost:5555)
pnpm prisma migrate dev     # Create and apply migrations
pnpm prisma migrate deploy  # Apply migrations (production)
pnpm prisma generate        # Regenerate Prisma Client
pnpm prisma db seed         # Run seed script
```

## Pages

| Route           | Purpose                                            |
| --------------- | -------------------------------------------------- |
| `/`             | Landing page, project intro, links to all sections |
| `/about`        | Project scope, student details, video walkthrough  |
| `/feeds`        | Sample posts in a card layout                      |
| `/feeds/[slug]` | Individual post view                               |
| `/settings`     | Theme and layout preferences                       |

## Features

- **PostgreSQL database** with Prisma ORM for data persistence
- **Repository pattern** with swappable implementations (Prisma/sample data)
- Light/dark theme, persisted in a **cookie** so the server can render the
  correct theme on first paint (no flash of incorrect theme)
- Layout preferences persisted in **localStorage** (client-only state)
- Responsive hamburger navigation with CSS transform animation
- Breadcrumbs and dynamic post routing
- Hide/show content sections
- Keyboard-navigable, WCAG AA contrast
- Health check API endpoint at `/api/health`

## Project structure

```
app/
  layout.tsx           # Root layout, theme hydration, Header/Footer
  page.tsx             # Home
  about/
  feeds/
    page.tsx           # Feed list
    [slug]/page.tsx    # Post detail
  settings/
  api/
    health/route.ts    # Health check endpoint
components/            # Reusable UI (Header, Footer, Nav, FeedCard, ...)
lib/
  prisma.ts            # Prisma client initialization
  feeds/               # Feed repository implementations
    prisma-repository.ts
    sample-repository.ts
  theme/               # Theme + preference helpers
prisma/
  schema.prisma        # Database schema
  migrations/          # Database migrations
  seed.ts              # Sample data seeder
docker-compose.yml     # PostgreSQL database container
```

## Design decisions

| Branch                  | Scope                                                                              |
| ----------------------- | ---------------------------------------------------------------------------------- |
| `feature/layout`        | Root layout, Header, Footer, Navbar (desktop), page shells, ThemeProvider wired in |
| `feature/theme`         | Light/dark toggle, no-flash cookie, consistent token application across all pages  |
| `feature/hamburger`     | Responsive hamburger menu, CSS transform animation, ARIA roles                     |
| `feature/feeds`         | Sample post data, `FeedCard` component, Feeds list, dynamic `/feeds/[slug]`        |
| `feature/interactivity` | Breadcrumbs, Settings page, hide/show blocks, localStorage for preferences         |
| `feature/accessibility` | WCAG AA contrast audit, keyboard navigation, skip link, ARIA polish                |
