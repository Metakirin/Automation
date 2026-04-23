# Test ticket contents — paste into "Test bug 1" on the Project board

The routine's candidate query only needs the ticket to have label `bug`
and project field `Priority = P1`, both of which you've already set. The
body below is what lets the routine understand what to fix.

## Ticket fields to confirm

| Field | Value |
|-------|-------|
| Title | **Test bug 1** (already set) |
| Label(s) | **`bug`** (already set) |
| Project custom field `Priority` | **`P1`** (already set) |
| Project status | `Backlog` or `Todo` — anything that isn't `Done`/`Closed` |
| `claude/triaged` label | **Not** present (create this label in advance, empty) |

## Body — paste this into the issue body

```markdown
## Description
The **Fix me** button on the app's home page throws an error as soon as
it is clicked. QA noticed this while smoke-testing the initial scaffold.

## Steps to reproduce
1. `npm install`
2. `npm run dev`
3. Open http://localhost:5173/
4. Click the **Fix me** button
5. Observe the browser console

## Expected behaviour
Clicking **Fix me** should do something safe and user-visible — for
example, display a brief friendly message (inline text or a simple
`alert`) — and must not throw an unhandled exception.

## Actual behaviour
An unhandled exception is raised in the click handler:

> `Error: FixMeButton is broken: this should not throw.`

## Impact / acceptance criterion
- Unit test `FixMeButton > does not throw when clicked`
  (`src/FixMeButton.test.tsx`) currently fails.
- `npm run test` exits non-zero.
- The fix is accepted when `npm run test` and `npm run build` both
  exit 0, and the button performs a harmless visible action on click.

## Files likely involved
- `src/FixMeButton.tsx` — the broken component
- `src/FixMeButton.test.tsx` — the failing test that defines the contract
```

## Why this body shape

This mimics a real QA ticket:

- **Repro** points at the file without saying *what* to change.
- **Expected** defines the behavioural contract loosely — so the routine
  has room to pick a sensible implementation, not a mandated one.
- **Acceptance criterion** is an objective, machine-checkable condition
  (`npm run test` and `npm run build` pass). That is what the routine
  verifies before pushing.
- **Files likely involved** is a mild nudge; in a real ticket QA usually
  doesn't know, but when present it saves the routine from grepping.

## After populating

Save the issue. Do NOT manually add the `claude/triaged` label (the
routine will add it after opening the PR — that's the idempotency
marker).
