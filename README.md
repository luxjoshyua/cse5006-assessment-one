# RSS Server & LMS — Frontend (CSE5006 Assessment 1)

Joshua Fielding — 22846849

Frontend-only interface for an RSS Server feeding into an LMS.
Backend and live RSS processing arrive in Assessment 2; this stage uses
the Module 4 blog dataset as a stand-in for feed content.

## Demo

[Video walkthrough](https://www.youtube.com/watch?v=6hqAdmKsyn4)

## Getting started

Requires Node 24 (see `.nvmrc`).

```bash
nvm use
corepack enable pnpm
pnpm install
pnpm dev                  # http://localhost:3000
pnpm build && pnpm start  # production build
```

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

## Pages

| Route           | Purpose                                            |
| --------------- | -------------------------------------------------- |
| `/`             | Landing page, project intro, links to all sections |
| `/about`        | Project scope, student details, video walkthrough  |
| `/feeds`        | Sample posts in a card layout                      |
| `/feeds/[slug]` | Individual post view                               |
| `/settings`     | Theme and layout preferences                       |

## Features

- Light/dark theme, persisted in a **cookie** so the server can render the
  correct theme on first paint (no flash of incorrect theme)
- Layout preferences persisted in **localStorage** (client-only state)
- Responsive hamburger navigation with CSS transform animation
- Breadcrumbs and dynamic post routing
- Hide/show content sections
- Keyboard-navigable, WCAG AA contrast

## Project structure

```

app/
layout.tsx # Root layout, theme hydration, Header/Footer
page.tsx # Home
about/
feeds/
page.tsx # Feed list
[slug]/page.tsx # Post detail
settings/
components/ # Reusable UI (Header, Footer, Nav, FeedCard, ...)
lib/ # Sample post data, theme + preference helpers

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
