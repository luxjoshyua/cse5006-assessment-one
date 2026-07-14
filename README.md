# RSS Server & LMS — Frontend (CSE5006 Assessment 1)

Joshua Fielding — 22846849

Frontend-only interface for an RSS Server feeding into an LMS.
Backend and live RSS processing arrive in Assessment 2; this stage uses
the Module 4 blog dataset as a stand-in for feed content.

## Correct branching

git switch -c feat/feat-name e.g. feat/theme-persistence

# ... work, commit

git push -u origin feat/theme-persistence
gh pr create --fill && gh pr merge --squash --delete-branch

## Demo

[Video walkthrough](link) ·

## Getting started

Requires Node 24+.

first use correct node version:

```bash
nvm use
```

second install dependencies:

```bash
npx pnpm install
```

```bash
npx pnpm dev          # http://localhost:3000
```

```bash
npx pnpm build && npx pnpm start   # production build
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

- Light/dark theme, persisted via cookie (no flash on first paint)
- Responsive hamburger navigation with CSS transform animation
- Breadcrumbs and dynamic post routing
- Hide/show content sections
- Keyboard-navigable, WCAG AA contrast

## Project structure

## Branch strategy

| Branch                  | Scope                                                                              |
| ----------------------- | ---------------------------------------------------------------------------------- |
| `feature/layout`        | Root layout, Header, Footer, Navbar (desktop), page shells, ThemeProvider wired in |
| `feature/theme`         | Light/dark toggle, no-flash cookie, consistent token application across all pages  |
| `feature/hamburger`     | Responsive hamburger menu, CSS transform animation, ARIA roles                     |
| `feature/feeds`         | Sample post data, `FeedCard` component, Feeds list, dynamic `/feeds/[slug]`        |
| `feature/interactivity` | Breadcrumbs, Settings page, hide/show blocks, localStorage for preferences         |
| `feature/accessibility` | WCAG AA contrast audit, keyboard navigation, skip link, ARIA polish                |
