# P1 bug auto-fix routine — setup notes for this repo

Companion to the main reference docs at:
- `F:\Job\automation\claude-routines-integration.md`
- `F:\Job\automation\routine-prompt-p1-triage.md`

This file records the **repo-specific** values that need to be plugged
into the routine prompt and the cloud environment. Treat it as source of
truth for this one repo's routine config.

## Identifiers (to fill in once)

| Field | Value |
|-------|-------|
| GitHub owner | `Metakirin` |
| Repository | `Metakirin/Automation` |
| Default branch | `main` |
| GitHub Project v2 owner | _TODO: confirm whether user-owned or org-owned_ |
| GitHub Project v2 number | _TODO_ |
| Priority field name (on the project) | _TODO: "Priority" single-select, option "P1"?_ |
| Type field / label | _TODO: confirm whether "bug" is an issue label or a project field_ |
| Triage label | `claude/triaged` |
| Branch prefix | `claude/fix-<issue>-<slug>` |

## Cloud environment variables

| Name | Value |
|------|-------|
| `GH_TOKEN` | classic PAT with `project` + `repo` scopes (required for `gh api graphql`) |
| `DRY_RUN` | set to `1` for first 1-2 shakedown runs, remove afterwards |

## Filter criteria

- Issue state: `OPEN`
- Priority (project custom field **or** label): `P1`
- Type (project custom field **or** label): `bug`
- Repository: `Metakirin/Automation`
- Does **not** already carry label `claude/triaged`
- No open PR with body matching `Fixes #<issue-number>`
- No existing remote branch matching `claude/fix-<issue-number>-*`

## Verification command inside the routine

```bash
npm install && npm run test && npm run build
```

All three must succeed before pushing.

## Deliverables per issue

1. Branch `claude/fix-<issue>-<slug>`
2. Commit `fix: <title> (#<issue>)`
3. Draft PR with body `Fixes #<issue>` + summary + session URL
4. Comment on the issue linking the PR
5. Label the issue `claude/triaged`

## First-run checklist

- [ ] Install the Claude GitHub App on `Metakirin/Automation`
- [ ] Generate a classic PAT with `project` + `repo` scopes
- [ ] Create the routine at <https://claude.ai/code/routines>
  - Prompt: copy from `F:\Job\automation\routine-prompt-p1-triage.md`,
    fill in placeholders with values in the table above
  - Repositories: `Metakirin/Automation`
  - Environment: new one named `automation-demo` with `GH_TOKEN` + `DRY_RUN=1`
  - Trigger: start with **Run now** only; add the cron once dry-run looks right
- [ ] File the test ticket on the Project board (see "Test ticket contents" below)
- [ ] Hit **Run now** with `DRY_RUN=1` — confirm it finds the ticket
- [ ] Unset `DRY_RUN`, Run now again — confirm PR appears
- [ ] Only then add the schedule trigger `0 2 * * *`

## Test ticket contents

See `F:\Job\automation\Automation\.claude\TEST_TICKET.md`.
