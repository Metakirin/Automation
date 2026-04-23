# Automation Routine Demo

Minimal Vite + React + TypeScript app used as a test bed for Claude Code
**Routines** — nightly cloud agents that pick up bug tickets from a GitHub
Project v2 board, create a branch, fix the bug, and open a draft PR.

## Quick start

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check + production build
npm run test      # vitest, non-watch
```

## The deliberate bug

`src/FixMeButton.tsx` contains a button whose click handler throws. The
test in `src/FixMeButton.test.tsx` asserts clicking it should *not* throw,
so `npm run test` currently fails. That failing test is the verification
signal a routine will use to confirm its fix.

## How the routine is wired

See [`.claude/ROUTINE.md`](.claude/ROUTINE.md) in this repo and the
reference docs in `F:\Job\automation\claude-routines-integration.md` and
`F:\Job\automation\routine-prompt-p1-triage.md`.
