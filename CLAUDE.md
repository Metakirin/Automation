# CLAUDE.md — repo conventions for Claude (interactive and unattended routines)

This file is read by Claude Code at session start. It tells you how to
work in this repo. Unattended routines rely on it; keep it short, concrete,
and accurate.

## What this repo is

A throwaway Vite + React + TypeScript app used to validate the nightly
**P1 bug auto-fix routine** described in
`F:\Job\automation\claude-routines-integration.md`. The page renders a few
deliberately broken components (or recently-fixed ones) for routine
shakedowns — `<FixMeButton>`, `<Counter>`, `<ColoredButton>`.

## Commands

| Intent | Command |
|--------|---------|
| Install deps | `npm install` |
| Type-check + build | `npm run build` |
| Run tests (non-watch) | `npm run test` |
| Lint | `npm run lint` (present but not wired into CI) |
| Dev / preview server | `npm run dev` (port 5173) / `npm run preview` (port 4173 — for routine screenshots) |

**Verification command for routines: `npm run test && npm run build`.**
Both must exit 0 before pushing.

## Conventions

- Strict TypeScript. No `any` without a code comment justifying it.
- Use `function` components, no classes.
- Keep changes surgical. Scope a fix to the ticket; do not refactor
  opportunistically.
- Do not introduce new dependencies without a justification in the PR body.

## Bug categories the routine handles

The same routine handles two flavours of bug. Detection is based on the
ticket body:

### Code / logic bugs (default mode)

- No Figma URL in the ticket body.
- Fix the code, run `npm run test && npm run build`, push, draft PR.
- Existing examples: FixMeButton (throw-on-click), Counter (off-by-one).

### UI / visual bugs (Figma mode)

Triggered when the ticket body contains a `https://www.figma.com/design/...`
URL. The fix workflow has extra steps:

1. **Read the Figma node** via `mcp__figma__get_design_context` (the Figma
   connector is enabled on this routine). Extract the colour values,
   spacing, typography from the design context — these are source of
   truth, not the existing code.
2. **Capture a "before" screenshot.** Start the preview server on the
   pre-fix code:
   ```bash
   npm ci
   npm run build
   npm run preview &
   PID=$!
   sleep 3
   npx playwright screenshot --full-page http://localhost:4173 \
     /tmp/before.png
   kill $PID
   ```
3. **Apply the fix** based on the Figma values.
4. **Verify with tests:** `npm run test && npm run build`.
5. **Capture an "after" screenshot** the same way against the patched
   code:
   ```bash
   npm run build
   npm run preview &
   PID=$!
   sleep 3
   npx playwright screenshot --full-page http://localhost:4173 \
     /tmp/after.png
   kill $PID
   ```
6. **Commit screenshots into the branch** under
   `__screenshots__/issue-<N>/`:
   ```bash
   mkdir -p __screenshots__/issue-$N
   cp /tmp/before.png /tmp/after.png __screenshots__/issue-$N/
   git add -f __screenshots__/issue-$N/
   git commit -m "screenshots: before/after for #$N"
   ```
   Force-add (`-f`) is needed because `__screenshots__/` is in
   `.gitignore` to prevent accidental commits during interactive work.
7. **Embed both images in the PR body** using `raw.githubusercontent.com`
   URLs. Template:
   ```markdown
   Fixes #<N>

   <2-4 sentence summary of the visual change.>

   ## Before / After

   | Before | After |
   |--------|-------|
   | ![before](https://github.com/Metakirin/Automation/raw/<branch>/__screenshots__/issue-<N>/before.png) | ![after](https://github.com/Metakirin/Automation/raw/<branch>/__screenshots__/issue-<N>/after.png) |
   ```

If Playwright is not installed (sandbox setup script issue), fall back
to: skip the screenshots, open the PR with code-only diff, mention in
the PR body that screenshots were skipped due to environment limitation.
Do NOT block the fix on the screenshot step.

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
- Never commit `node_modules/` or build artifacts (the `dist/` and
  `coverage/` directories are in `.gitignore` already).
- If tests fail after an honest attempt to fix the fix, abandon the issue,
  do not push the branch, log the failure in the run summary.
