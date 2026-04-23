# CLAUDE.md — repo conventions for Claude (interactive and unattended routines)

This file is read by Claude Code at session start. It tells you how to
work in this repo. Unattended routines rely on it; keep it short, concrete,
and accurate.

## What this repo is

A throwaway Vite + React + TypeScript app used to validate the nightly
**P1 bug auto-fix routine** described in
`F:\Job\automation\claude-routines-integration.md`. The only "feature" is
a `<FixMeButton>` component that is deliberately broken.

## Commands

| Intent | Command |
|--------|---------|
| Install deps | `npm install` |
| Type-check + build | `npm run build` |
| Run tests (non-watch) | `npm run test` |
| Lint | `npm run lint` (present but not wired into CI) |
| Dev server | `npm run dev` |

**Verification command for routines: `npm run test`.** This must pass
before opening a PR. `npm run build` must also succeed (it catches TS
errors the test suite won't).

## Conventions

- Strict TypeScript. No `any` without a code comment justifying it.
- Use `function` components, no classes.
- Keep changes surgical. Scope a fix to the ticket; do not refactor
  opportunistically.
- Do not introduce new dependencies without a justification in the PR body.

## Branch & PR policy

- Unattended routines push to branches prefixed `claude/` only (enforced
  by the routine's branch-policy toggle; do not disable).
- PR title format: `fix: <short description> (#<issue-number>)`.
- PR body must include `Fixes #<issue-number>` on its own line so the
  issue auto-closes on merge.
- Routines open PRs as **draft**. A human promotes them to ready.

## Hard rules (apply to interactive sessions and routines alike)

- Never push to `main`, never merge a PR, never force-push.
- Never pass `--no-verify` to `git commit` or `git push`. If a hook fails,
  fix the underlying issue.
- Never commit `.env` files or secrets.
- If tests fail after an honest attempt to fix the fix, abandon the issue,
  do not push the branch, log the failure in the run summary.
