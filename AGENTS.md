# AGENTS.md

## Project

Minimal contact card for damian.tziamtzis.com (personal site is damitzi.com). One static page,
`public/index.html`, with inline CSS and no JavaScript or build step. Arial; light/dark colors follow
the system (no switcher). Deployed as Cloudflare Workers static assets (`wrangler.jsonc`). Node 24+,
pnpm (pinned via `packageManager`).

## Commands

- `pnpm dev` — serve `public/` locally with `wrangler dev`
- `pnpm lint` — `oxfmt --check`; CI runs this and validates the Worker config, then deploys on `main`
- `pnpm format`

## Conventions

- Conventional Commits with sentence-case subjects, enforced by commitlint (`.husky/commit-msg`).
- lint-staged runs oxfmt on pre-commit (`.husky/pre-commit`).
- Keep it one file; don't add a framework or build step without asking.
